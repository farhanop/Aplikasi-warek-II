// backend/src/models/facilitiesModel.js
const knex = require('../config/database');

const FacilitiesModel = {
    getAll: async (language = null) => {
        let query = knex('facilities').select('*');
        if (language) {
            query = query.where({ language });
        }
        return query.orderBy('name', 'asc'); // Urutkan berdasarkan nama
    },

    findById: async (id) => {
        return knex('facilities').where({ id }).first();
    },

    create: async (facilityData) => {
        await knex('facilities').insert(facilityData);
        return FacilitiesModel.findById(facilityData.id);
    },

    update: async (id, facilityData) => {
        const dataToUpdate = {
            ...facilityData,
            updated_at: new Date()
        };
        await knex('facilities').where({ id }).update(dataToUpdate);
        return FacilitiesModel.findById(id);
    },

    remove: async (id) => {
        return knex('facilities').where({ id }).del();
    }
};

module.exports = FacilitiesModel;