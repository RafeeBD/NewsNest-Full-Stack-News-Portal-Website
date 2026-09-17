const express = require('express');
const router = express.Router();
const { getMyNews } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-news', protect, getMyNews);

module.exports = router;
