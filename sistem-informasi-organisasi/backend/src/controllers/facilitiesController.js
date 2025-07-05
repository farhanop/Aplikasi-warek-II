// backend/src/controllers/facilitiesController.js
const FacilitiesModel = require('../models/facilitiesModel');
const { v4: uuidv4 } = require('uuid'); // Perlu npm install uuid di backend jika belum

const FacilitiesController = {
    getAllFacilities: async (req, res) => {
        const { lang } = req.query;
        try {
            const facilities = await FacilitiesModel.getAll(lang);
            res.status(200).json(facilities);
        } catch (error) {
            console.error('Error saat mengambil fasilitas:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil fasilitas.' });
        }
    },

    getFacilityById: async (req, res) => {
        const { id } = req.params;
        try {
            const facilityItem = await FacilitiesModel.findById(id);
            if (!facilityItem) {
                return res.status(404).json({ message: 'Fasilitas tidak ditemukan.' });
            }
            res.status(200).json(facilityItem);
        } catch (error) {
            console.error('Error saat mengambil fasilitas berdasarkan ID:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    createFacility: async (req, res) => {
        const { id, name, detail, imageUrl, language } = req.body;
        if (!name || !detail || !language) {
            return res.status(400).json({ message: 'Nama, Detail, dan Bahasa wajib diisi.' });
        }
        try {
            const newFacility = await FacilitiesModel.create({
                id: id || `${uuidv4()}_${language}`, // Generate ID jika tidak ada
                name, detail, imageUrl, language
            });
            res.status(201).json({ message: 'Fasilitas berhasil ditambahkan.', data: newFacility });
        } catch (error) {
            console.error('Error saat membuat fasilitas:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    updateFacility: async (req, res) => {
        const { id } = req.params;
        const { name, detail, imageUrl, language } = req.body;
        if (!name || !detail || !language) {
            return res.status(400).json({ message: 'Nama, Detail, dan Bahasa wajib diisi.' });
        }
        try {
            const updatedFacility = await FacilitiesModel.update(id, {
                name, detail, imageUrl, language
            });
            if (!updatedFacility) {
                return res.status(404).json({ message: 'Fasilitas tidak ditemukan.' });
            }
            res.status(200).json({ message: 'Fasilitas berhasil diperbarui.', data: updatedFacility });
        } catch (error) {
            console.error('Error saat memperbarui fasilitas:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    deleteFacility: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await FacilitiesModel.remove(id);
            if (deleted === 0) {
                return res.status(404).json({ message: 'Fasilitas tidak ditemukan.' });
            }
            res.status(200).json({ message: 'Fasilitas berhasil dihapus.' });
        } catch (error) {
            console.error('Error saat menghapus fasilitas:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    }
};

module.exports = FacilitiesController;