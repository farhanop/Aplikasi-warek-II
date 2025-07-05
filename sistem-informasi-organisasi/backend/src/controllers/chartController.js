// backend/src/controllers/chartController.js
const OrganizationModel = require('../models/organizationModel'); // Impor model organisasi
const { v4: uuidv4 } = require('uuid'); // Impor UUID untuk membuat ID unik

const ChartController = {
    // Metode untuk mengambil semua data organisasi
    getAllOrganizationData: async (req, res) => {
        try {
            const organizations = await OrganizationModel.getAll(); // Panggil metode getAll dari model
            res.status(200).json(organizations); // Kirim respons sukses dengan data
        } catch (error) {
            console.error('Error saat mengambil data organisasi:', error); // Log error
            res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil data organisasi.' }); // Kirim respons error
        }
    },

    // Metode untuk mengambil satu data organisasi berdasarkan ID
    getOrganizationById: async (req, res) => {
        const { id } = req.params; // Ambil ID dari parameter URL
        try {
            const organization = await OrganizationModel.findById(id); // Panggil metode findById dari model
            if (!organization) {
                return res.status(404).json({ message: 'Data organisasi tidak ditemukan.' }); // Kirim 404 jika tidak ditemukan
            }
            res.status(200).json(organization); // Kirim respons sukses dengan data
        } catch (error) {
            console.error('Error saat mengambil data organisasi berdasarkan ID:', error); // Log error
            res.status(500).json({ message: 'Terjadi kesalahan server.' }); // Kirim respons error
        }
    },

    // Metode untuk menambahkan data organisasi baru (dengan penanganan file upload)
    createOrganization: async (req, res) => {
        // req.body berisi field teks dari form (saat FormData digunakan, semua field teks ada di req.body)
        const { id, name, title, email, phone, description, children_json } = req.body;
        // req.file akan tersedia jika upload.single('photo') berhasil memproses file
        const photoPath = req.file ? `/uploads/${req.file.filename}` : null; // Simpan path relatif ke folder 'uploads'

        // --- Debugging Logs untuk Upload ---
        console.log('--- DEBUGGING UPLOAD (CREATE ORGANIZATION) ---');
        console.log('Request File (from Multer):', req.file); // Menampilkan detail file yang diupload oleh Multer
        console.log('Request Body (from Form):', req.body); // Menampilkan data teks dari form
        console.log('Constructed photoPath:', photoPath);
        console.log('--- END DEBUGGING UPLOAD ---');

        // Tangani error yang mungkin ditambahkan oleh Multer (misal: tipe file salah)
        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }
        // Validasi field wajib
        if (!id || !name || !title) {
            return res.status(400).json({ message: 'ID, Nama, dan Jabatan wajib diisi.' });
        }

        try {
            // Buat objek data untuk dimasukkan ke model
            const newOrg = await OrganizationModel.create({
                id,
                name,
                title,
                email,
                phone,
                description,
                photo: photoPath, // Simpan path file di database
                children_json: JSON.parse(children_json || '[]'), // FormData mengirim children_json sebagai string, jadi perlu diparse
            });
            res.status(201).json({ message: 'Data organisasi berhasil ditambahkan.', data: newOrg }); // Kirim respons sukses
        } catch (error) {
            console.error('Error saat membuat data organisasi:', error); // Log error
            res.status(500).json({ message: 'Terjadi kesalahan server.' }); // Kirim respons error
        }
    },

    // Metode untuk memperbarui data organisasi (dengan penanganan file upload)
    updateOrganization: async (req, res) => {
        // req.body berisi field teks dari form
        const { id } = req.params; // Ambil ID dari parameter URL
        const { name, title, email, phone, description, existing_photo, children_json } = req.body; // existing_photo adalah URL foto yang sudah ada
        // req.file akan tersedia jika ada file baru di-upload
        // Logika: Jika ada file baru (req.file), gunakan path file baru. Jika tidak, gunakan 'existing_photo' yang dikirim dari frontend.
        const photoPath = req.file ? `/uploads/${req.file.filename}` : (existing_photo || null);

        // --- Debugging Logs untuk Upload ---
        console.log('--- DEBUGGING UPLOAD (UPDATE ORGANIZATION) ---');
        console.log('Request File (from Multer):', req.file); // Menampilkan detail file yang diupload oleh Multer
        console.log('Request Body (from Form):', req.body); // Menampilkan data teks dari form
        console.log('Existing Photo URL (from form):', existing_photo); // Menampilkan URL foto lama dari form
        console.log('Constructed photoPath (for DB):', photoPath);
        console.log('--- END DEBUGGING UPLOAD ---');

        // Tangani error Multer
        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }
        // Validasi field wajib
        if (!name || !title) {
            return res.status(400).json({ message: 'Nama dan Jabatan wajib diisi.' });
        }

        try {
            // Buat objek data untuk diperbarui di model
            const updatedOrg = await OrganizationModel.update(id, {
                name,
                title,
                email,
                phone,
                description,
                photo: photoPath, // Simpan path file di database
                children_json: JSON.parse(children_json || '[]'), // FormData mengirim children_json sebagai string
            });
            if (!updatedOrg) {
                return res.status(404).json({ message: 'Data organisasi tidak ditemukan.' }); // Kirim 404 jika tidak ditemukan
            }
            res.status(200).json({ message: 'Data organisasi berhasil diperbarui.', data: updatedOrg }); // Kirim respons sukses
        } catch (error) {
            console.error('Error saat memperbarui data organisasi:', error); // Log error
            res.status(500).json({ message: 'Terjadi kesalahan server.' }); // Kirim respons error
        }
    },

    // Metode untuk menghapus data organisasi
    deleteOrganization: async (req, res) => {
        const { id } = req.params; // Ambil ID dari parameter URL
        try {
            const deleted = await OrganizationModel.remove(id); // Panggil metode remove dari model
            if (deleted === 0) {
                return res.status(404).json({ message: 'Data organisasi tidak ditemukan.' }); // Kirim 404 jika tidak ditemukan
            }
            res.status(200).json({ message: 'Data organisasi berhasil dihapus.' }); // Kirim respons sukses
        } catch (error) {
            console.error('Error saat menghapus data organisasi:', error); // Log error
            res.status(500).json({ message: 'Terjadi kesalahan server.' }); // Kirim respons error
        }
    }
};

module.exports = ChartController;