// backend/src/db/seeds/YYYYMMDD_initial_organizational_data.js

exports.seed = async function(knex) {
  // Hapus data organisasi yang sudah ada (opsional, untuk memastikan data bersih)
  await knex('organizational_data').del();

  // Masukkan data organisasi awal
  // Ini akan memasukkan Warek II sebagai root bagan
  await knex('organizational_data').insert([
    {
      id: 'warek_ii', // <-- Ini adalah ID yang dicari oleh ChartPage.js
      name: 'Prof. Dr. Ir. Budi Santosa, M.Eng.',
      title: 'Pimpinan Universitas',
      email: 'budi.s@universitas.ac.id',
      phone: '+628123456789',
      description: 'Wakil Rektor bidang Administrasi Umum dan Keuangan.',
      photo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Warek_II', // Contoh URL foto
      children_json: JSON.stringify(['kepala_biro_a', 'kepala_biro_b']), // Anak-anak sebagai JSON string
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 'kepala_biro_a',
      name: 'Dr. Ani Wijaya',
      title: 'Kepala Biro Akademik',
      email: 'ani.w@universitas.ac.id',
      phone: '+628123456790',
      description: 'Bertanggung jawab atas urusan akademik.',
      photo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Biro_A',
      children_json: JSON.stringify([]), // Tidak punya anak
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 'kepala_biro_b',
      name: 'Tn. Cahyo Utomo, SE',
      title: 'Kepala Biro Keuangan',
      email: 'cahyo.u@universitas.ac.id',
      phone: '+628123456791',
      description: 'Bertanggung jawab atas pengelolaan keuangan.',
      photo: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Biro_B',
      children_json: JSON.stringify([]),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);

  console.log('Data organisasi awal berhasil ditambahkan.');
};