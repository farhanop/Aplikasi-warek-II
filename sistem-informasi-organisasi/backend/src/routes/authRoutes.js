// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\src\routes\authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Pastikan Anda mengimpor ini

const router = express.Router();

// Rute untuk registrasi pengguna (misalnya untuk admin awal)
router.post('/register', authController.register);

// Rute untuk login pengguna
router.post('/login', authController.login); // <--- INI ADALAH BARIS KRUSIAL UNTUK LOGIN

// Rute yang dilindungi (membutuhkan token JWT)
router.post('/logout', authMiddleware, authController.logout);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;