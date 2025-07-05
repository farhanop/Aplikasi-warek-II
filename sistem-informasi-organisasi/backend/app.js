// backend/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexfile = require('./knexfile');

const getAuthRoutes = require('./src/api/auth');
const getOrganizationalRoutes = require('./src/api/organizational');
const getFacilitiesRoutes = require('./src/api/facilities');
const getNewsRoutes = require('./src/api/news');
const getContentRoutes = require('./src/api/content');

const app = express();
const port = process.env.PORT || 5000;

const db = knex(knexfile[process.env.NODE_ENV || 'development']);

db.raw('SELECT 1')
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Organizational Information System Backend API!');
});

app.use('/api/auth', getAuthRoutes(db));
app.use('/api/organizational', getOrganizationalRoutes(db));
app.use('/api/facilities', getFacilitiesRoutes(db));
app.use('/api/news', getNewsRoutes(db));
app.use('/api/content', getContentRoutes(db));

// Optional: Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
