// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\server.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const knex = require('./src/config/database');
const path = require('path'); // <--- Tambahkan ini untuk path file statis

// Impor semua rute
const authRoutes = require('./src/routes/authRoutes');
const organizationalRoutes = require('./src/routes/organizationalRoutes');
const facilitiesRoutes = require('./src/routes/facilitiesRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const contentRoutes = require('./src/routes/contentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Penting: express.json() hanya untuk JSON. Untuk form-data Multer akan menanganinya.
// Jika Anda punya rute yang tidak pakai Multer tapi terima JSON, tetap perlu express.json()
app.use(express.json());

// Tambahkan middleware untuk melayani file statis dari folder 'uploads'
// Ini akan membuat file di backend/uploads/ diakses melalui http://localhost:5000/uploads/namafile.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <--- Tambahkan baris ini

// Gunakan rute
app.use('/api/auth', authRoutes);
app.use('/api/organization', organizationalRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/content', contentRoutes);

// Rute dasar untuk menguji server
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Status</title>
    </head>
    <body>
        <h1>Server Sistem Informasi Organisasi Berjalan!</h1>
        <p>Backend API tersedia di <code>/api</code> endpoints.</p>
    </body>
    </html>
  `);
});

// Uji koneksi database
knex.raw('SELECT 1+1 AS result')
    .then(() => {
        console.log('Koneksi database berhasil!');
    })
    .catch((err) => {
        console.error('Koneksi database gagal:', err);
    });

// Mulai server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});