// backend/src/db/seeds/YYYYMMDD_initial_admin_user.js

const bcrypt = require('bcryptjs'); // Impor bcryptjs

exports.seed = async function(knex) {
  // Hapus semua user yang sudah ada (opsional, untuk memastikan data bersih)
  await knex('users').del();

  // Hash password untuk user admin
  const hashedPassword = await bcrypt.hash('password123', 10); // Ganti 'password123' dengan password yang Anda inginkan

  // Masukkan user admin default
  await knex('users').insert([
    {
      username: 'admin',
      password_hash: hashedPassword, // Gunakan password_hash
      role: 'admin'
    }
  ]);

  console.log('User admin default berhasil ditambahkan.');
};