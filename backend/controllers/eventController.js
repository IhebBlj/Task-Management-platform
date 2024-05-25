const Event = require("../models/event");
const User = require("../models/userModel");

const addEvent=async (req, res) => {
    try {
      const { Subject, Location, StartTime, EndTime, IsAllDay, repeat, CalendarId, Description } = req.body;
      const {userId} = req.body;
      const event = new Event({
        Subject,
        Location,
        StartTime,
        EndTime,
        IsAllDay,
        repeat,
        CalendarId,
        Description
      });
  
      await event.save();
  
      const user = await User.findById(userId);
  
      user.events.push(event._id);
  
      await user.save();
  
      res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports={addEvent};