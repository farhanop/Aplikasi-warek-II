const knex = require('../config/database');

const NewsModel = {
    getAll: async (language = null) => {
        let query = knex('news').select('*');
        if (language) {
            query = query.where({ language });
        }
        return query.orderBy('date', 'desc');
    },

    findById: async (id) => {
        return knex('news').where({ id }).first();
    },

    create: async (newsData) => {
        await knex('news').insert(newsData);
        return NewsModel.findById(newsData.id);
    },

    update: async (id, newsData) => {
        const dataToUpdate = {
            ...newsData,
            updated_at: new Date()
        };
        await knex('news').where({ id }).update(dataToUpdate);
        return NewsModel.findById(id);
    },

    remove: async (id) => {
        return knex('news').where({ id }).del();
    },

    removeByBaseId: async (baseId) => {
        return knex('news').where('id', 'like', `${baseId}%`).del();
    }
};

module.exports = NewsModel;