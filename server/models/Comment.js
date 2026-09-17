const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Comment content cannot be empty'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
