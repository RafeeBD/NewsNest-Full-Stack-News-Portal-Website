const News = require('../models/News');
const { inMemoryNews } = require('./newsController');

// @desc    Get logged in user's news articles & dashboard statistics
// @route   GET /api/user/my-news
// @access  Private
const getMyNews = async (req, res) => {
  try {
    try {
      const userNews = await News.find({ author: req.user._id }).sort({ createdAt: -1 });

      const totalViews = userNews.reduce((acc, curr) => acc + (curr.views || 0), 0);
      const totalLikes = userNews.reduce((acc, curr) => acc + (curr.likes || 0), 0);

      return res.json({
        news: userNews,
        stats: {
          totalArticles: userNews.length,
          totalViews,
          totalLikes,
        },
      });
    } catch (dbErr) {}

    // Fallback for memory mode
    const userArticles = inMemoryNews.filter((n) => {
      if (typeof n.author === 'object' && n.author._id) {
        return n.author._id.toString() === req.user._id.toString();
      }
      return n.author === req.user._id || n.authorName === req.user.name;
    });

    const totalViews = userArticles.reduce((acc, curr) => acc + (curr.views || 0), 0);
    const totalLikes = userArticles.reduce((acc, curr) => acc + (curr.likes || 0), 0);

    res.json({
      news: userArticles,
      stats: {
        totalArticles: userArticles.length,
        totalViews,
        totalLikes,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyNews,
};
