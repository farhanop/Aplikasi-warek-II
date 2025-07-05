// backend/src/controllers/contentController.js
const ContentModel = require('../models/contentModel');

const ContentController = {
    getAllContent: async (req, res) => {
        try {
            const content = await ContentModel.getAll();
            // PASTIKAN INI MENGEMBALIKAN ARRAY JSON
            res.status(200).json(content);
        } catch (error) {
            console.error('Error saat mengambil konten statis:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil konten statis.' });
        }
    },
    // ... (fungsi lain)
};
module.exports = ContentController;