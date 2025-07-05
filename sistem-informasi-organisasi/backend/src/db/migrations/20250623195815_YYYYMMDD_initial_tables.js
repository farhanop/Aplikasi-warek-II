// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\src\db\migrations\YYYYMMDD_initial_tables.js

exports.up = function(knex) {
    return knex.schema
        // Tabel untuk data organisasi (Warek II dan struktur bawahannya)
        .createTable('organizational_data', function(table) {
            table.string('id').primary(); // Contoh: 'warek_ii_profile'
            table.string('name').notNullable();
            table.string('title').notNullable();
            table.string('email');
            table.string('phone');
            table.text('description');
            table.string('photo');
            table.json('children_json'); // Menggunakan tipe JSON
            table.timestamps(true, true); // created_at dan updated_at
        })

        // Tabel untuk fasilitas kampus
        .createTable('facilities', function(table) {
            table.string('id').primary(); // Contoh: 'f1_en', 'f1_id'
            table.string('name').notNullable();
            table.string('imageUrl');
            table.text('detail');
            table.string('language', 10).defaultTo('en'); // Bahasa dari fasilitas (en/id), batasi panjang string
            table.timestamps(true, true);
        })

        // Tabel untuk berita universitas
        .createTable('news', function(table) {
            table.string('id').primary(); // Contoh: 'n1_en', 'n1_id'
            table.string('title').notNullable();
            table.date('date').notNullable(); // Tanggal berita
            table.text('content');
            table.string('imageUrl');
            table.string('language', 10).defaultTo('en'); // Bahasa dari berita (en/id), batasi panjang string
            table.timestamps(true, true);
        })

        // Tabel untuk konten halaman statis (Visi & Misi, Tentang Kami, Kontak)
        .createTable('content_pages', function(table) {
            table.string('id').primary(); // Contoh: 'vision_mission', 'about_us', 'contact_us'
            table.string('key', 255).notNullable().unique(); // <--- BARIS KRUSIAL YANG DITAMBAHKAN
            table.text('content_en'); // Konten dalam Bahasa Inggris
            table.text('content_id'); // Konten dalam Bahasa Indonesia
            table.timestamps(true, true);
        })

        // Tabel untuk pengguna yang dapat login (misalnya admin)
        .createTable('users', function(table) {
            table.increments('id').primary(); // Auto-incrementing primary key
            table.string('username', 255).unique().notNullable(); // Nama pengguna harus unik
            table.string('password_hash', 255).notNullable(); // Hash password (penting untuk keamanan)
            table.string('role', 50).defaultTo('user'); // Peran pengguna (admin, editor, user)
            table.timestamps(true, true);
        });
};

exports.down = function(knex) {
    // Fungsi 'down' akan menghapus tabel jika migrasi di-rollback (dibatalkan).
    // Urutan drop tabel penting jika ada foreign key constraints.
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('content_pages')
        .dropTableIfExists('news')
        .dropTableIfExists('facilities')
        .dropTableIfExists('organizational_data');
};