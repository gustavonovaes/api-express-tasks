const { Schema } = require('mongoose');

const isEmail = require('validator/lib/isEmail');

module.exports = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    maxlength: 255,
    validate: [isEmail, 'Email invalid!'],
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
