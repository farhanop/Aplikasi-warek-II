const knex = require('knex');

const knexConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: '../db/migrations'
    },
    seeds: {
        directory: '../db/seeds'
    }
};

module.exports = knex(knexConfig);