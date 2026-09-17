const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a headline title'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please add a short summary/excerpt'],
    },
    content: {
      type: String,
      required: [true, 'Please add detailed content'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['World', 'Technology', 'Business', 'Sports', 'Politics', 'Entertainment', 'Science'],
      default: 'World',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
    },
    authorAvatar: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    readTime: {
      type: String,
      default: '3 min read',
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search
newsSchema.index({ title: 'text', excerpt: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('News', newsSchema);
