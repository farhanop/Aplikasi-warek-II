// backend/src/db/seeds/YYYYMMDD_initial_static_content.js

exports.seed = async function(knex) {
  // Hapus konten statis yang sudah ada berdasarkan ID yang akan kita masukkan
  await knex('content_pages').whereIn('id', ['vision_mission', 'about_us', 'contact_us']).del(); // <-- DIUBAH

  // Masukkan data konten statis
  await knex('content_pages').insert([ // <-- DIUBAH
    {
      id: 'vision_mission',
      key: 'vision_mission',
      content_en: "<h2>Our Vision (EN)</h2><p>To be a leading university with global impact.</p><h2>Our Mission (EN)</h2><ul><li>Excellence in education</li><li>Innovative research</li><li>Community engagement</li></ul>",
      content_id: "<h2>Visi Kami (ID)</h2><p>Menjadi universitas terkemuka dengan dampak global.</p><h2>Misi Kami (ID)</h2><ul><li>Keunggulan dalam pendidikan</li><li>Penelitian inovatif</li><li>Keterlibatan masyarakat</li></ul>",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 'about_us',
      key: 'about_us',
      content_en: "<p>This is the About Us page content in English. Our organization strives to create a dynamic learning environment and foster innovation.</p>",
      content_id: "<p>Ini adalah konten halaman Tentang Kami dalam Bahasa Indonesia. Organisasi kami berupaya menciptakan lingkungan belajar yang dinamis dan mendorong inovasi.</p>",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 'contact_us',
      key: 'contact_us',
      content_en: "<p><strong>Contact Us (EN)</strong></p><p>Email: contact@university.ac.id</p><p>Phone: +1 (234) 567-8900</p><p>Address: 123 University Ave, City, Country</p>",
      content_id: "<p><strong>Hubungi Kami (ID)</strong></p><p>Email: kontak@universitas.ac.id</p><p>Telepon: +62 812-3456-7890</p><p>Alamat: Jl. Universitas No. 1, Kota, Negara</p>",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);

  console.log('Konten statis default berhasil ditambahkan.');
};