// backend/src/db/seeds/YYYYMMDD_initial_static_content.js (atau initial_data.js)

exports.seed = async function(knex) {
  await knex('content_pages').del(); // Hapus data lama jika ada

  await knex('content_pages').insert([
    {
      id: 'vision_mission',
      key: 'vision_mission', // <-- TAMBAHKAN BARIS INI
      content_id: 'Visi:\nMenjadi institusi pendidikan tinggi terkemuka yang menghasilkan lulusan berdaya saing global dan berkontribusi pada pengembangan masyarakat.\n\nMisi:\n1. Menyelenggarakan pendidikan yang berkualitas tinggi dan relevan dengan kebutuhan industri.\n2. Melaksanakan penelitian inovatif yang memberikan dampak positif bagi masyarakat.\n3. Mengembangkan kemitraan strategis dengan berbagai pihak untuk meningkatkan kualitas pendidikan dan penelitian.\n4. Menciptakan lingkungan akademik yang kondusif untuk pertumbuhan intelektual dan pribadi.',
      content_en: 'Vision:\nTo be a leading higher education institution that produces globally competitive graduates and contributes to community development.\n\nMission:\n1. Provide high-quality education relevant to industry needs.\n2. Conduct innovative research that has a positive impact on society.\n3. Develop strategic partnerships with various parties to improve the quality of education and research.\n4. Create an academic environment conducive to intellectual and personal growth.',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 'about_us',
      key: 'about_us', // <-- TAMBAHKAN BARIS INI
      content_id: 'Konten default Tentang Kami dalam Bahasa Indonesia. Bagian ini akan diisi secara dinamis dari data organisasi di frontend.',
      content_en: 'Default English About Us content. This section will be dynamically populated from organizational data in the frontend.',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 'contact_us',
      key: 'contact_us', // <-- TAMBAHKAN BARIS INI
      content_id: 'Alamat: Jl. Jend. A. Yani No.123, Palembang\nTelepon: +62 711 123456\nEmail: info@university.ac.id\nJam Kerja: Senin - Jumat, 08:00 - 16:00',
      content_en: 'Address: Jl. Jend. A. Yani No.123, Palembang\nPhone: +62 711 123456\nEmail: info@university.ac.id\nWorking Hours: Monday - Friday, 08:00 - 16:00',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
  console.log('Konten statis default berhasil ditambahkan.');
};