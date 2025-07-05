// backend/src/models/organizationModel.js
const knex = require('../config/database');

const OrganizationModel = {
    getAll: async () => {
        const data = await knex('organizational_data').select('*');
        // Map data untuk memastikan children_json adalah array jika tidak ada
        return data.map(item => ({
            ...item,
            children_json: item.children_json || [] // <--- UBAH DI SINI
        }));
    },

    findById: async (id) => {
        const item = await knex('organizational_data').where({ id }).first();
        if (item) {
            return {
                ...item,
                children_json: item.children_json || [] // <--- UBAH DI SINI
            };
        }
        return null;
    },

    create: async (orgData) => {
        // Pastikan children_json di-string-ify SEBELUM disimpan
        const dataToInsert = {
            ...orgData,
            children_json: orgData.children_json ? JSON.stringify(orgData.children_json) : '[]' // <--- Tetap JSON.stringify di sini
        };
        await knex('organizational_data').insert(dataToInsert);
        return OrganizationModel.findById(orgData.id);
    },

    update: async (id, orgData) => {
        const dataToUpdate = {
            ...orgData,
            children_json: orgData.children_json ? JSON.stringify(orgData.children_json) : '[]', // <--- Tetap JSON.stringify di sini
            updated_at: new Date()
        };
        await knex('organizational_data').where({ id }).update(dataToUpdate);
        return OrganizationModel.findById(id);
    },

    remove: async (id) => {
        return knex('organizational_data').where({ id }).del();
    }
};

module.exports = OrganizationModel;