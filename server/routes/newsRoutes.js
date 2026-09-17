const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getTopNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  addComment,
  getComments,
} = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/top', getTopNews);
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);
router.get('/:id/comments', getComments);
router.post('/:id/comments', protect, addComment);

module.exports = router;
