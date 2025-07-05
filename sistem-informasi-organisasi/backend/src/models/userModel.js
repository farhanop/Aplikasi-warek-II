// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\src\models\userModel.js

const knex = require('../config/database');

const UserModel = {
    findByUsername: async (username) => {
        return knex('users').where({ username }).first();
    },

    create: async (userData) => {
        return knex('users').insert(userData);
    },

    findById: async (id) => {
        return knex('users').where({ id }).first();
    }
};

module.exports = UserModel;