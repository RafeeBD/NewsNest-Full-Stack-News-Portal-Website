const News = require('../models/News');
const Comment = require('../models/Comment');

// Initial seed memory articles fallback if MongoDB is not connected
let inMemoryNews = [
  {
    _id: 'news_1',
    title: 'Global Climate Accord Reaches Breakthrough Agreement on Clean Tech Transfer',
    excerpt: 'Delegates from 140 nations agree to speed up technology sharing and green infrastructure investment.',
    content: `In a historic late-night plenary session, representatives from over 140 countries reached a landmark consensus to accelerate global clean technology sharing and establish a multi-billion dollar green infrastructure development initiative.\n\nThe global accord addresses long-standing economic disparities in renewable adoption while committing major global economies to mandatory emission targets for 2030.\n\nEnvironmental scientists and economic experts hailed the agreement as a crucial turning point for international climate diplomacy. Major investments will begin funding solar, wind, and smart grid technology deployment in vulnerable regions starting early next year.`,
    category: 'World',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_1',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    views: 1420,
    likes: 89,
    isFeatured: true,
    isTrending: true,
    tags: ['Climate', 'Environment', 'World', 'Energy'],
    readTime: '4 min read',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: 'news_2',
    title: 'Quantum Computing Chip Breaks Energy Efficiency Record in AI Simulations',
    excerpt: 'Tech researchers demonstrate unprecedented processing speed with 90% reduced power consumption.',
    content: `Engineers have unveiled a breakthrough quantum processor capable of running complex artificial intelligence neural networks at speeds 100 times faster than conventional silicon chips while using a fraction of the electricity.\n\nThe revolutionary architecture leverages superconducting qubits that remain stable at near room temperatures, potentially overcoming the biggest obstacle to commercial quantum deployment.\n\nIndustry leaders project commercial applications across medical diagnostic tools, financial risk modeling, and advanced material discovery within the next two years.`,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_2',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    views: 980,
    likes: 64,
    isFeatured: true,
    isTrending: true,
    tags: ['Technology', 'AI', 'Quantum', 'Innovation'],
    readTime: '5 min read',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    _id: 'news_3',
    title: 'Central Banks Announce Joint Framework for Cross-Border Digital Currency Payments',
    excerpt: 'A unified standard promises instant international transactions with negligible friction fees.',
    content: `Six major monetary institutions today published a unified regulatory and technological architecture for interoperable central bank digital currencies (CBDCs).\n\nThe framework aims to streamline global remittances, lower international trade settlement fees, and introduce real-time auditing capabilities for global financial institutions.\n\nFinancial markets reacted positively to the announcement, with tech indexes posting gains across European and Asian trading sessions.`,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_3',
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Sophia Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    views: 750,
    likes: 42,
    isFeatured: true,
    isTrending: false,
    tags: ['Finance', 'Business', 'Economy', 'CBDC'],
    readTime: '3 min read',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    _id: 'news_4',
    title: 'Underdog Team Secures Thrilling Last-Second Championship Victory',
    excerpt: 'An unforgettable buzzer-beater seals a historic comeback trophy win before a roaring crowd of 80,000.',
    content: `In one of the most remarkable championship finals in sports history, underdog outfit Metro United rallied back from a 15-point deficit to secure the title with a spectacular last-second play.\n\nThe stadium erupted as captain David Miller delivered an extraordinary clutch performance in the final two minutes.\n\nAnalysts are calling this victory one of the greatest tactical comebacks of the decade.`,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_4',
      name: 'Liam Gallagher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Liam Gallagher',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    views: 2150,
    likes: 180,
    isFeatured: true,
    isTrending: true,
    tags: ['Sports', 'Championship', 'Victory', 'Highlights'],
    readTime: '4 min read',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    _id: 'news_5',
    title: 'Independent Film Festival Celebrates Next Generation of Visionary Directors',
    excerpt: 'Experimental storytelling and immersive cinematography shine at this year’s international cinema summit.',
    content: `This year's international film festival concluded with top honors awarded to indie filmmakers exploring themes of human connection, digital isolation, and resilience.\n\nThe Grand Jury prize was awarded to a captivating drama filmed entirely on medium-format cameras in rural Scandinavia.\n\nCritiques praised the festival for championing diverse voices and pushing cinematic boundaries beyond mainstream blockbusters.`,
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_1',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    views: 640,
    likes: 38,
    isFeatured: true,
    isTrending: false,
    tags: ['Cinema', 'Entertainment', 'Film', 'Festival'],
    readTime: '3 min read',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: 'news_6',
    title: 'Parliamentary Summit Passes Bipartisan Transparency Bill on Public Infrastructure',
    excerpt: 'Legislators unite to establish real-time public access portals for all state project spendings.',
    content: `In a rare display of bipartisan collaboration, lawmakers voted overwhelmingly to pass landmark legislation enforcing complete transparency across public infrastructure procurement.\n\nThe new mandate requires all municipal and federal capital projects exceeding $5 million to maintain open-source financial ledgers accessible to citizens.\n\nCivic oversight organizations have commended the law as a benchmark for democratic accountability.`,
    category: 'Politics',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_3',
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Sophia Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    views: 890,
    likes: 55,
    isFeatured: true,
    isTrending: true,
    tags: ['Politics', 'Government', 'Policy', 'Reform'],
    readTime: '4 min read',
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
  {
    _id: 'news_7',
    title: 'James Webb Telescope Uncovers Atmospheric Water Vapor on Earth-Sized Exoplanet',
    excerpt: 'Spectroscopic analysis reveals chemical biosignatures in a star system 40 light-years away.',
    content: `Astronomers analyzing spectroscopic data captured by the James Webb Space Telescope have detected abundant atmospheric water vapor and trace methane gas surrounding an Earth-mass rocky exoplanet orbiting a quiet red dwarf star.\n\nThe discovery marks the clearest atmospheric fingerprint ever recorded for a planet within its host star's habitable zone.\n\nFurther observation campaigns are already scheduled to determine atmospheric density and surface temperature profiles.`,
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_2',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    views: 1840,
    likes: 125,
    isFeatured: false,
    isTrending: true,
    tags: ['Space', 'Science', 'Astronomy', 'Exoplanet'],
    readTime: '5 min read',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    _id: 'news_8',
    title: 'Electric Aviation Startup Successfully Completes First Zero-Emission Commercial Test Flight',
    excerpt: 'The 40-passenger hydrogen-electric aircraft completed a 400-mile regional corridor flight.',
    content: `An aerospace innovator achieved a historic milestone today as its twin-engine hydrogen-electric airliner completed a 400-mile flight between regional hubs without producing carbon emissions.\n\nThe aircraft operated with whisper-quiet noise levels and generated zero operational exhaust apart from pure water vapor.\n\nCommercial passenger routes are planned to launch by 2028 pending aviation safety certifications.`,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    author: {
      _id: 'author_4',
      name: 'Liam Gallagher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    authorName: 'Liam Gallagher',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    views: 1120,
    likes: 92,
    isFeatured: false,
    isTrending: false,
    tags: ['Aviation', 'Technology', 'GreenEnergy', 'Travel'],
    readTime: '4 min read',
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
  },
];

let inMemoryComments = [
  {
    _id: 'comment_1',
    news: 'news_1',
    userName: 'David Miller',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    content: 'This is a monumental step forward for clean technology deployment! Hope countries adhere strictly to these milestones.',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    _id: 'comment_2',
    news: 'news_1',
    userName: 'Sophia Chen',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    content: 'Very encouraging to see cross-border technology transfer getting actual funding commitments.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: 'comment_3',
    news: 'news_2',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    content: 'Energy efficiency is the single biggest bottleneck in modern AI models. Quantum computing might solve it sooner than expected.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
];

// @desc    Get all news articles (with search, category filter, pagination)
// @route   GET /api/news
// @access  Public
const getAllNews = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 9 } = req.query;

    try {
      let query = {};

      if (category && category !== 'All') {
        query.category = category;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'popular') sortOptions = { views: -1 };
      if (sort === 'oldest') sortOptions = { createdAt: 1 };

      const skip = (Number(page) - 1) * Number(limit);

      const totalCount = await News.countDocuments(query);
      const newsList = await News.find(query)
        .populate('author', 'name avatar email bio')
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

      if (newsList && newsList.length > 0) {
        return res.json({
          news: newsList,
          page: Number(page),
          pages: Math.ceil(totalCount / Number(limit)),
          total: totalCount,
        });
      }
    } catch (dbErr) {}

    // Fallback logic for memory mode
    let filtered = [...inMemoryNews];

    if (category && category !== 'All') {
      filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.category.toLowerCase().includes(q));
    }

    if (sort === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = filtered.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginated = filtered.slice(startIndex, startIndex + Number(limit));

    res.json({
      news: paginated,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top 6 breaking / featured news (API Call for Home Section 1 & 2)
// @route   GET /api/news/top
// @access  Public
const getTopNews = async (req, res) => {
  try {
    try {
      const topNews = await News.find({})
        .populate('author', 'name avatar')
        .sort({ isFeatured: -1, createdAt: -1 })
        .limit(6);

      if (topNews && topNews.length > 0) {
        return res.json(topNews);
      }
    } catch (dbErr) {}

    // Fallback for memory mode top 6
    const top6 = inMemoryNews.slice(0, 6);
    res.json(top6);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single news details by ID
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const newsItem = await News.findById(id).populate('author', 'name avatar email bio');
      if (newsItem) {
        newsItem.views += 1;
        await newsItem.save();
        return res.json(newsItem);
      }
    } catch (dbErr) {}

    // Fallback for memory mode
    const item = inMemoryNews.find((n) => n._id === id);
    if (item) {
      item.views = (item.views || 0) + 1;
      return res.json(item);
    }

    res.status(404).json({ message: 'News article not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create and publish news article (Registered user)
// @route   POST /api/news
// @access  Private
const createNews = async (req, res) => {
  try {
    const { title, excerpt, content, category, image, tags, isFeatured } = req.body;

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({ message: 'Please provide title, excerpt, content, and category' });
    }

    const tagArray = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [];

    try {
      const newsArticle = await News.create({
        title,
        excerpt,
        content,
        category,
        image: image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
        author: req.user._id,
        authorName: req.user.name,
        authorAvatar: req.user.avatar,
        tags: tagArray.length > 0 ? tagArray : [category],
        isFeatured: Boolean(isFeatured),
        readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 150))} min read`,
      });

      return res.status(201).json(newsArticle);
    } catch (dbErr) {
      // Memory fallback mode
      const newArticle = {
        _id: 'news_' + Date.now(),
        title,
        excerpt,
        content,
        category,
        image: image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
        author: {
          _id: req.user._id,
          name: req.user.name,
          avatar: req.user.avatar,
        },
        authorName: req.user.name,
        authorAvatar: req.user.avatar,
        views: 1,
        likes: 0,
        isFeatured: Boolean(isFeatured),
        isTrending: false,
        tags: tagArray.length > 0 ? tagArray : [category],
        readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 150))} min read`,
        createdAt: new Date().toISOString(),
      };

      inMemoryNews.unshift(newArticle);
      return res.status(201).json(newArticle);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user's news article
// @route   PUT /api/news/:id
// @access  Private
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, image, tags, isFeatured } = req.body;

    try {
      const article = await News.findById(id);

      if (!article) {
        return res.status(404).json({ message: 'News article not found' });
      }

      // Authorization check (user can only update their own article or admin)
      if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to edit this news article' });
      }

      article.title = title || article.title;
      article.excerpt = excerpt || article.excerpt;
      article.content = content || article.content;
      article.category = category || article.category;
      if (image) article.image = image;
      if (tags) article.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim());
      if (isFeatured !== undefined) article.isFeatured = isFeatured;

      const updatedArticle = await article.save();
      return res.json(updatedArticle);
    } catch (dbErr) {}

    // Memory fallback
    const index = inMemoryNews.findIndex((n) => n._id === id);
    if (index !== -1) {
      const existing = inMemoryNews[index];
      const updated = {
        ...existing,
        title: title || existing.title,
        excerpt: excerpt || existing.excerpt,
        content: content || existing.content,
        category: category || existing.category,
        image: image || existing.image,
        tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim())) : existing.tags,
      };
      inMemoryNews[index] = updated;
      return res.json(updated);
    }

    res.status(404).json({ message: 'News article not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user's news article
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const article = await News.findById(id);

      if (!article) {
        return res.status(404).json({ message: 'News article not found' });
      }

      if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this news article' });
      }

      await article.deleteOne();
      return res.json({ message: 'News article removed successfully' });
    } catch (dbErr) {}

    // Memory fallback
    const index = inMemoryNews.findIndex((n) => n._id === id);
    if (index !== -1) {
      inMemoryNews.splice(index, 1);
      return res.json({ message: 'News article removed successfully' });
    }

    res.status(404).json({ message: 'News article not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add comment to a news article
// @route   POST /api/news/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    try {
      const comment = await Comment.create({
        news: id,
        user: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar,
        content,
      });

      return res.status(201).json(comment);
    } catch (dbErr) {
      // Memory fallback
      const newComment = {
        _id: 'comment_' + Date.now(),
        news: id,
        user: req.user._id,
        userName: req.user.name,
        userAvatar: req.user.avatar,
        content,
        createdAt: new Date().toISOString(),
      };
      inMemoryComments.unshift(newComment);
      return res.status(201).json(newComment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for a news article
// @route   GET /api/news/:id/comments
// @access  Public
const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const comments = await Comment.find({ news: id }).sort({ createdAt: -1 });
      if (comments && comments.length > 0) {
        return res.json(comments);
      }
    } catch (dbErr) {}

    // Memory fallback
    const comments = inMemoryComments.filter((c) => c.news === id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNews,
  getTopNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  addComment,
  getComments,
  inMemoryNews, // Exported for user dashboard controller fallback
};
