// backend/src/routes/newsRoutes.js
const express = require('express');
const NewsController = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rute publik (siapa pun bisa melihat berita)
router.get('/', NewsController.getAllNews);
router.get('/:id', NewsController.getNewsById);

// Rute yang dilindungi (hanya admin yang bisa mengelola)
router.post('/', authMiddleware, NewsController.createNews);
router.put('/:id', authMiddleware, NewsController.updateNews);
router.delete('/:id', authMiddleware, NewsController.deleteNews);

module.exports = router;