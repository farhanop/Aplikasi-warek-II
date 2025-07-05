// backend/src/models/contentModel.js
const knex = require('../config/database');

const ContentModel = {
    getAll: async () => {
        // Ini seharusnya selalu mengembalikan array oleh Knex (bahkan jika kosong)
        const data = await knex('content').select('*').orderBy('key', 'asc');
        return data; // Pastikan ini mengembalikan array
    },
    // ... (fungsi lain)
};
module.exports = ContentModel;