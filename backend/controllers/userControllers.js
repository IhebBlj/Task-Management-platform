const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Task = require("../models/task");
const generateToken = require("../config/generateToken");
const Request = require("../models/request");
const Notice = require("../models/notification");
const ContactForm=require("../models/contact");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { first_name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  // console.log(users);
  res.send(users);
  
});


const registerUser = asyncHandler(async (req, res) => {
  const { first_name,last_name, email, password,title} = req.body;
console.log("api works")
  if (!first_name ||!last_name || !email || !password ||!title) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    title
   
  });
console.log("user created");
  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name:user.first_name,
      last_name:user.last_name,
      title:user.title,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const response =  await user.matchPassword(password);
    // console.log(response);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    
    throw new Error("Invalid Email or Password");
  }
});

const getSender =asyncHandler(async(req,res)=>{
  const userID = req.body._id;
  const user = await User.findById(userID).select('-password');
  if(user){
  
    res.status(200).send(user);
  }else{
    res.status(404);
    throw new Error("User not found!!");
  }

});

const getTeam=async (req, res) => {
 

  try {
    const userId = req.params.userId;
    // Get the user ID from request parameters
    // Find the user by ID and populate the team field
    const user = await User.findById(userId).populate('team', 'first_name last_name email title');
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the team members
    res.status(200).json({ team: user.team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


const sendInvitation= async (req, res) => {
  const { senderEmail, receiverEmail } = req.body;
  // console.log(req.body);
    try {
   

    // Check if sender and receiver exist
    const sender = await User.findOne({ email: senderEmail });
    const receiver = await User.findOne({ email: receiverEmail });

    if (!sender || !receiver) {

      return res.status(404).json({ message: 'Sender or receiver not found' });
    }

    // Create invitation document
    const request = new Request({ senderEmail, receiverEmail });
    await request.save();

    // Store invitation in receiver's invitations array
    receiver.requests.push(request._id);
    await receiver.save();

    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
const getNotifications=async (req, res) => {
  const { userId } = req.params;
  try {
    // Find the user and populate their notifications
    const user = await User.findById(userId).populate('notifications').exec();

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Return the populated notifications array
    res.status(200).json({
      status: true,
      notifications: user.notifications
    });
  } catch (error) {
    console.error('Fetch Notifications Error:', error);
    res.status(500).json({
      status: false,
      message: 'Error fetching notifications'
    });
  }
}

const changePassword =  async (req, res) => {
    const {userId} = req.params;
    try {
      const { current, password } = req.body;

      const user = await User.findById(userId);
      const isPasswordCorrect = await bcrypt.compare(current, user?.password || "");
  
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
      if(isPasswordCorrect){
        user.password = password;
        await user.save();
      }
      return res.status(201).json({
        status: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  console.log(notificationId);
  try {
    // First, find the notification to ensure it exists
    const notification = await Notice.findById(notificationId);
    console.log(notification);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Remove the notification from the Notice collection
    await notification.remove();

    // Remove the reference from all users' notifications array
    await User.updateMany({}, { $pull: { notifications: notificationId } });

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification', error: error.message });
  }
};


const responseInvitaion = async (req, res) => {
  try {
    const { invitationId, response } = req.body;

    // Find invitation by ID
    const invitation = await Request.findById(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    // Update invitation status
    invitation.status = response;
    await invitation.save();

    const sender = await User.findOne({ email: invitation.senderEmail });
    const receiver = await User.findOne({ email: invitation.receiverEmail });

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver not found' });
    }

    // Create a notice to inform the sender of the response
    const noticeText = response === 'accepted'
      ? `${receiver.first_name} ${receiver.last_name} has accepted your invitation.`
      : `${receiver.first_name} ${receiver.last_name} has declined your invitation.`;

    const newNotice = new Notice({
      text: noticeText,
      notiType: 'alert', // or use 'invitation' if you prefer
    });

    await newNotice.save();

    // Push the new notice to sender's notifications
    sender.notifications.push(newNotice._id);
    await sender.save();

    // If response is accepted, update teams
    if (response === 'accepted') {
      sender.team.push(receiver._id);
      receiver.team.push(sender._id);

      await sender.save();
      await receiver.save();

      await invitation.remove();
    } else {
      await invitation.remove();
    }

    res.status(200).json({ message: 'Response recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
const getInvitations = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('requests');

    if (user) {
      res.status(200).send(user.requests);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const deleteTeamMember= async (req, res) => {
  const { email } = req.params;
  const {userID} = req.body;
  try {
    // Find the user initiating the deletion
    const userInitiatingDeletion = await User.findById(userID); // Assuming the authenticated user initiating the deletion

    // Find the user to be removed from the team
    const userToRemove = await User.findOne({ email });

    if (!userToRemove) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user initiating the deletion is in the same team as the user to be removed
    if (!userInitiatingDeletion.team.includes(userToRemove._id)) {
      return res.status(403).json({ message: 'You do not have permission to remove this user from the team.' });
    }

    // Remove the user to be removed from the team
    userInitiatingDeletion.team = userInitiatingDeletion.team.filter(memberId => memberId.toString() !== userToRemove._id.toString());

    await userInitiatingDeletion.save();
    userToRemove.team = userToRemove.team.filter(memberId => memberId.toString() !== userInitiatingDeletion._id.toString());

    await userToRemove.save();

    // Remove the user from every task where the current user is the owner
    await Task.updateMany({ owner: userID }, { $pull: { team: userToRemove._id } });

    // Remove the user from every subtask where they are assigned
    await Task.updateMany({ owner: userID }, { $pull: { "subtasks.$[].assigned": userToRemove._id } });

    res.json({ message: 'User removed from the team, tasks, and subtasks successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }

}


const updateName=async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    // Find user by ID
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's first name and last name
    if (firstName) {
      user.first_name = firstName;
    }

    if (lastName) {
      user.last_name = lastName;
    }

    // Save the updated user
    await user.save();

    res.json({ message: 'Full name updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const addUserByadmin = async (req, res) => {
  //  console.log("------------/////////////");
  try {
    const {first_name,last_name,password,email,title,isAdmin} = req.body;
    const newUser = new User(
      {first_name:first_name,last_name:last_name,password:password,email:email,title:title,isAdmin:isAdmin}
    );

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const postInquiries = (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a new contact form entry
  const newContactForm = new ContactForm({
    name,
    email,
    subject,
    message,
  });

  newContactForm.save()
    .then(() => {
      res.status(201).json({ message: 'Contact form submission saved successfully!' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error saving contact form submission:', error });
    });
};

const getInquiries =async (req, res) => {
  try {
    const inquiries = await ContactForm.find();
    res.json(inquiries);
    
  } catch (err) {
    console.error('Error fetching contact inquiries:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = { allUsers, addUserByadmin,postInquiries,getUsers,getInquiries,deleteUser,registerUser, changePassword,deleteNotification,updateName,getNotifications,authUser ,getSender,getTeam,getInvitations,sendInvitation,responseInvitaion,deleteTeamMember};
