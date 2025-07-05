const NewsModel = require('../models/newsModel');
// const { v4: uuidv4 } = require('uuid'); // Hanya diperlukan jika Anda generate ID di backend

const NewsController = {
    getAllNews: async (req, res) => {
        const { lang } = req.query;
        try {
            const news = await NewsModel.getAll(lang);
            res.status(200).json(news);
        } catch (error) {
            console.error('Error saat mengambil berita:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil berita.' });
        }
    },

    getNewsById: async (req, res) => {
        const { id } = req.params;
        try {
            const newsItem = await NewsModel.findById(id);
            if (!newsItem) {
                return res.status(404).json({ message: 'Berita tidak ditemukan.' });
            }
            res.status(200).json(newsItem);
        } catch (error) {
            console.error('Error saat mengambil berita berdasarkan ID:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    createNews: async (req, res) => {
        const { id, title, date, content, imageUrl, language } = req.body;
        if (!id || !title || !date || !language) {
            return res.status(400).json({ message: 'ID, Judul, Tanggal, dan Bahasa wajib diisi.' });
        }
        try {
            const newNews = await NewsModel.create({
                id, title, date, content, imageUrl, language
            });
            res.status(201).json({ message: 'Berita berhasil ditambahkan.', data: newNews });
        } catch (error) {
            console.error('Error saat membuat berita:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    updateNews: async (req, res) => {
        const { id } = req.params;
        const { title, date, content, imageUrl, language } = req.body;
        if (!title || !date || !language) {
            return res.status(400).json({ message: 'Judul, Tanggal, dan Bahasa wajib diisi.' });
        }
        try {
            const updatedNews = await NewsModel.update(id, {
                title, date, content, imageUrl, language
            });
            if (!updatedNews) {
                return res.status(404).json({ message: 'Berita tidak ditemukan.' });
            }
            res.status(200).json({ message: 'Berita berhasil diperbarui.', data: updatedNews });
        } catch (error) {
            console.error('Error saat memperbarui berita:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    deleteNews: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await NewsModel.remove(id);
            if (deleted === 0) {
                return res.status(404).json({ message: 'Berita tidak ditemukan.' });
            }
            res.status(200).json({ message: 'Berita berhasil dihapus.' });
        } catch (error) {
            console.error('Error saat menghapus berita:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    }
};

module.exports = NewsController;