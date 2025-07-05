// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\src\routes\facilitiesRoutes.js

const express = require('express');
const FacilitiesController = require('../controllers/facilitiesController'); // <-- Uncomment dan import ini
const authMiddleware = require('../middlewares/authMiddleware'); // <-- Uncomment dan import ini

const router = express.Router();

// Rute publik (siapa pun bisa melihat fasilitas)
router.get('/', FacilitiesController.getAllFacilities);
router.get('/:id', FacilitiesController.getFacilityById);

// Rute yang dilindungi (hanya admin yang bisa mengelola)
router.post('/', authMiddleware, FacilitiesController.createFacility);
router.put('/:id', authMiddleware, FacilitiesController.updateFacility);
router.delete('/:id', authMiddleware, FacilitiesController.deleteFacility);

module.exports = router;