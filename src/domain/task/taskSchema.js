const { Schema } = require('mongoose');

module.exports = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Task should have a name'],
    minlength: [3, 'Name too short'],
    maxlength: [20, 'Name too long'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
