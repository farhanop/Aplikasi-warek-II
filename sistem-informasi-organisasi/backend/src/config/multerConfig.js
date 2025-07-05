// backend/src/config/multerConfig.js
const multer = require('multer');
const path = require('path'); // Modul path bawaan Node.js

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Tentukan folder tujuan upload. 'path.join' memastikan path yang benar di berbagai OS.
        // __dirname adalah direktori file saat ini (src/config).
        // '../../uploads' berarti naik dua level ke folder 'backend', lalu masuk ke 'uploads'.
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        // Tentukan nama file yang unik untuk menghindari konflik
        // Gunakan fieldname (nama input file), timestamp, dan ekstensi asli file
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Filter file untuk hanya mengizinkan gambar
const fileFilter = (req, file, cb) => {
    // Periksa mimetype file (misal: 'image/jpeg', 'image/png')
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Izinkan file gambar
    } else {
        // Jika bukan gambar, tolak dengan pesan error.
        // Error ini bisa diakses di controller melalui req.fileValidationError jika diatur di route.
        req.fileValidationError = 'Hanya file gambar yang diizinkan!'; // Tambahkan pesan error kustom
        cb(null, false); // Tolak file non-gambar
    }
};

// Inisialisasi Multer dengan konfigurasi
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Batasi ukuran file hingga 5MB (5 * 1024 * 1024 bytes)
    }
});

module.exports = upload;