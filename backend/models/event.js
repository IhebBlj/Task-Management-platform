const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  Subject: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
  },
  StartTime: {
    type: Date,
    required: true,
  },
  EndTime: {
    type: Date,
    required: true,
  },
  isAllDay: {
    type: Boolean,
    default: false,
  },
  repeat: {
    type: String,
    default: "Never",
  },
  calendar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar',
  },
  Description: {
    type: String,
  },
});

module.exports = mongoose.model('Event', eventSchema);
