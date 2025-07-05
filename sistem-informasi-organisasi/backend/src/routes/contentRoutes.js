// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\src\routes\contentRoutes.js

const express = require('express');
// Kita akan membutuhkan ContentController dan authMiddleware nanti
// const ContentController = require('../controllers/contentController');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Contoh rute (akan diisi nanti)
router.get('/', (req, res) => {
    res.send('Content Pages API is working (placeholder)!');
});

module.exports = router;