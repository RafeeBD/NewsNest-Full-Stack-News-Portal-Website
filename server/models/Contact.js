const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide a message subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please write your message'],
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'responded'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
