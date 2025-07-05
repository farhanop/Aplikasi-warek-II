// backend/src/routes/organizationalRoutes.js
const express = require('express');
const ChartController = require('../controllers/chartController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig'); // <--- Impor Multer

const router = express.Router();

// Rute publik (siapa pun bisa melihat bagan)
router.get('/', ChartController.getAllOrganizationData);
router.get('/:id', ChartController.getOrganizationById);

// Rute yang dilindungi (hanya admin yang bisa mengelola)
// Gunakan upload.single('photo') untuk menerima satu file dengan fieldname 'photo'
// Middleware Multer diletakkan sebelum controller agar req.file tersedia di controller
router.post('/', authMiddleware, upload.single('photo'), ChartController.createOrganization);
router.put('/:id', authMiddleware, upload.single('photo'), ChartController.updateOrganization);
router.delete('/:id', authMiddleware, ChartController.deleteOrganization);

module.exports = router;