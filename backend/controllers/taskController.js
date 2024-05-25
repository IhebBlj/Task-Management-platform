const Notice =require( "../models/notification.js");
const Subtask =require( "../models/subtask.js");
const Task = require("../models/task.js");
const User =require("../models/userModel.js") ;
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  try {
    const { userId } = req.body; 

    const { title, team, stage, date, priority, assets } = req.body;

    const owner = await User.findById(userId);
    const ownerName = `${owner.first_name} ${owner.last_name}`; 

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      owner: userId 
    });
    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });
    text = `${ownerName} added you to a project: "${title}".`;
    const notification = await Notice.create({
      text: text,
      task: task._id,
      notiType: 'project'
    });

    for (const memberId of team) {
      // Update the notification text with member's name
      const member = await User.findById(memberId);


      // Push the notification into the member's notifications array
      await User.findByIdAndUpdate(memberId, { $push: { notifications: notification._id } });

      // Update each team member's document to include the task in their tasks array
      await User.findByIdAndUpdate(memberId, { $push: { tasks: task._id } });
    }

    // Respond with success message and the created task
    res.status(200).json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};


 
 const dashboardStatistics = async (req, res) => {
  try {
    // Fetch all tasks without considering user permissions
    const allTasks = await Task.find({ isTrashed: false })
      .populate({
        path: "team",
        select: "name role title email",
      })
      .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt")
      .limit(10)
      .sort({ _id: -1 });

    // Group tasks by stage and calculate counts
    const groupTasks = allTasks.reduce((result, task) => {
      const stage = task.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    // Group tasks by priority
    const groupData = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    // Calculate total tasks
    const totalTasks = allTasks.length;
    const lastTasks = allTasks.slice(0, 10);

    const summary = {
      totalTasks,
      lastTasks,
      users,
      tasks: groupTasks,
      graphData: groupData,
    };

    res.status(200).json({
      status: true,
      message: "Successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

 const getTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    await user.populate({ path: 'tasks', populate: [{ path: 'subTasks' }, { path: 'team' } ]}).execPopulate();
    // Retrieve the tasks associated with the user
    const userTasks = user.tasks;

    res.status(200).json({ tasks: userTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
 const deleteTask=async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find the task by its ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Remove the task from the tasks of users
    await User.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
const deleteSubTask =  async (req, res) => {
  const { subTaskId } = req.params;
const {taskId} = req.body;
console.log(taskId);
  try {
    // Find the subtask by its ID and delete it
    const deletedSubtask = await Subtask.findByIdAndDelete(subTaskId);

    if (!deletedSubtask) {
      return res.status(404).json({ message: 'Subtask not found.' });
    }

    // Remove the subtask ID from all tasks that reference it
    await Task.updateMany({ subtasks: subTaskId }, { $pull: { subtasks: subTaskId } });

    await updateTaskStage(taskId);
    res.status(200).json({ message: 'Subtask and its references deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

 const getTask = async (req, res) => {
  const { id } = req.params;
    console.log(id);
  try {
    
    const task = await Task.findById(id)
    .populate({
        path: "team",
        select: "first_name last_name title role email",
      });
      console.log(task);

    res.status(200).json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

 const createSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, stage, priority, assigned } = req.body;
 // Ensure 'id' is valid before proceeding
 if (!id) {
  return res.status(400).json({ status: false, message: "Invalid task ID." });
}
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found.' });
    }

    // Create a new subtask object based on the provided data
    const newSubTask = {
      title: title || 'Untitled Subtask',
      description: description || '',
      date: date || new Date(),
      stage: stage || 'TODO', // Default stage to 'todo' if not provided
      priority: priority || 'NORMAL', // Default priority to 'normal' if not provided
      assigned: assigned, // Default team to an empty array if not provided
    };
const subtask=new Subtask(newSubTask);
    // Push the new subtask into the task's subTasks array
    task.subTasks.push(subtask);

    // Save the updated task document
    await subtask.save();
    await task.save();
    const notification = await Notice.create({
      text: "A new task has been assigned to you !",
      
      notiType: 'project'
    });

    // Iterate over the team members
    for (const memberId of assigned) {
      const member = await User.findById(memberId);

      await User.findByIdAndUpdate(memberId, { $push: { notifications: notification._id } });

    }
     await updateTaskStage(id);
    res.status(200).json({ status: true, message: 'Subtask created successfully.', subTask: subtask });
  } catch (error) {
    console.error('Error creating subtask:', error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const updateSubTask=async (req, res) => {
  const { subTaskId } = req.params;
  console.log(subTaskId);
  const { title, description, date, stage, priority, assigned } = req.body;

  // Build the update object dynamically
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (date !== undefined) updates.date = date;
  if (stage !== undefined) updates.stage = stage;
  if (priority !== undefined) updates.priority = priority;
  if (assigned !== undefined) updates.assigned = assigned.map(id => mongoose.Types.ObjectId(id)); // Ensure ObjectIds are correctly formatted

  try {
      const updatedSubtask = await Subtask.findByIdAndUpdate(subTaskId, { $set: updates }, {
          new: true,
          runValidators: true
      }).populate('assigned'); // Populate to retrieve user details if necessary

      if (!updatedSubtask) {
          return res.status(404).send({ message: 'Subtask not found' });
      }

      res.json(updatedSubtask);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
}

const updateTaskStage = async (taskId) => {
  try {
    // Find the task by its ID
    const task = await Task.findById(taskId).populate('subTasks');

    if (!task) {
      console.error('Task not found');
      return;
    }

    // Get the stages of all subtasks
    const subtaskStages = task.subTasks.map(subtask => subtask.stage);

    // Determine the task's stage based on subtasks' stages
    let taskStage = 'todo';
    if (subtaskStages.every(stage => stage === 'COMPLETED')) {
      taskStage = 'completed';
    } else if (subtaskStages.some(stage => stage === 'IN PROGRESS') || subtaskStages.some(stage => stage === 'COMPLETED')) {
      taskStage = 'in progress';
    }
    if(task.subTasks.length===0){
      taskStage = 'todo';
    }

    // Update the task's stage
    task.stage = taskStage;
    await task.save();

    console.log('Task stage updated successfully');
  } catch (error) {
    console.error('Error updating task stage:', error);
  }
};



const updateSubTaskStage= async (req, res) => {
  const { subTaskId } = req.params;
  const { newStage } = req.body;
   const {taskId}   = req.body;
  try {
    // Find the subtask by its ID
    const subtask = await Subtask.findById(subTaskId);

    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found.' });
    }

    // Update the subtask stage
    subtask.stage = newStage;

    // Save the subtask with the updated stage
    await subtask.save();

    await updateTaskStage(taskId);
    res.status(200).json({ message: 'Subtask stage updated successfully.', subtask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

 const getAllSubTasks  = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the task by ID from the database
    const task = await Task.findById(id).populate({
      path: 'subTasks',
      populate: {
        path: 'assigned'
      }
    });

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found.' });
    }

    // Retrieve all subtasks of the task
    const subTasks = task.subTasks;

    res.status(200).json({ status: true, subTasks,taskName:task.title });
  } catch (error) {
    console.error('Error fetching subtasks:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};


const updateTask=async (req, res) => {
  const { taskId } = req.body;
  const { title, stage } = req.body; // Required fields
  const { team, date, priority, assets } = req.body; // Optional fields
  
console.log(taskId);
  // Check if required fields are present
  if (!title || !stage) {
    return res.status(400).json({ message: 'Title and stage are required fields.' });
  }

  try {
    // Find the task by its ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Update the task's fields
    task.title = title;
    task.stage = stage.toLowerCase(); // Ensure lowercase for consistency

    // Update optional fields if provided
    if (team) task.team = team;
    if (date) task.date = date;
    if (priority) task.priority = priority.toLowerCase(); // Ensure lowercase for consistency
    if (assets) task.assets = assets;

    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Task updated successfully.', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

 

module.exports={getTasks,getTask,dashboardStatistics,deleteSubTask,deleteTask,postTaskActivity,duplicateTask,createTask,trashTask,createSubTask,deleteRestoreTask,updateTask,getAllSubTasks,updateSubTaskStage,updateSubTask}