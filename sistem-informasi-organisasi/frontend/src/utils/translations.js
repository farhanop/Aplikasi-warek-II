// frontend/src/utils/translations.js
const translations = {
    en: {
        // Navigasi Umum
        home: "Home",
        chart: "Organizational Chart",
        visionMission: "Vision & Mission",
        aboutUs: "About Us",
        universityNews: "University News",
        contactUs: "Contact Us",
        adminLogin: "Admin Login",

        // Halaman Beranda (HomePage.js)
        leaderProfile: "Leader's Profile",
        latestNews: "Latest News",
        campusFacilities: "Campus Facilities",

        // Halaman Bagan Organisasi (ChartPage.js)
        downloadChart: "Download Chart as Image",
        chartDataMissing: "Chart data missing or incomplete.",
        loadingChart: "Loading organizational chart...",
        language: "Language", // Ditambahkan untuk seleksi bahasa di form

        // Halaman Berita Universitas (UniversityNewsPage.js)
        noNewsAvailable: "No news available.",

        // Halaman Login Admin (LoginPage.js)
        username: "Username",
        password: "Password",
        login: "Login",
        loginSuccess: "Login successful!",
        loginFailed: "Login failed. Invalid username or password.",

        // Dashboard Admin (AdminDashboard.js)
        accessDeniedAdmin: "Access Denied! You must be logged in as an administrator.",
        failedToLoadProfile: "Failed to load user profile. Please try logging in again.",
        logoutSuccess: "You have been logged out successfully.",
        logoutFailed: "Logout failed. Please try again.",
        logout: "Logout",
        adminDashboard: "Admin Dashboard",
        manageOrganizations: "Manage Organizations",
        manageOrgDesc: "Add, edit, or delete organizational structure profiles.",
        editOrganizations: "Edit Organizations",
        manageNews: "Manage News",
        manageNewsDesc: "Create, update, and delete university news.",
        editNews: "Edit News",
        manageFacilities: "Manage Facilities",
        manageFacilitiesDesc: "Manage campus facilities information.",
        editFacilities: "Edit Facilities",
        manageStaticContent: "Manage Static Content",
        manageStaticContentDesc: "Update content for Vision & Mission, About Us, and Contact Us pages.",
        editStaticContent: "Edit Static Content",

        // Label Form Umum & Aksi
        add: "Add",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to delete this item?",
        actionSuccessful: "Operation completed successfully!",
        actionFailed: "Operation failed. Please try again.",
        title: "Title",
        date: "Date",
        content: "Content",
        imageUrl: "Image URL",
        name: "Name",
        detail: "Detail",
        key: "Key",
        englishContent: "English Content",
        indonesianContent: "Indonesian Content",
        actions: "Actions", // Untuk kolom tabel
        addNews: "Add News",
        addFacility: "Add Facility",
        addOrganization: "Add Organization",
        editFacility: "Edit Facility",
        editOrganization: "Edit Organization",
        phone: "Phone",
        description: "Description",
        photoUrl: "Photo URL",
        childrenIds: "Children IDs (comma-separated)"
    },
    id: {
        // Navigasi Umum
        home: "Beranda",
        chart: "Bagan Organisasi",
        visionMission: "Visi & Misi",
        aboutUs: "Tentang Kami",
        universityNews: "Berita Universitas",
        contactUs: "Hubungi Kami",
        adminLogin: "Login Admin",

        // Halaman Beranda (HomePage.js)
        leaderProfile: "Profil Pimpinan",
        latestNews: "Berita Terbaru",
        campusFacilities: "Fasilitas Kampus",

        // Halaman Bagan Organisasi (ChartPage.js)
        downloadChart: "Unduh Bagan sebagai Gambar",
        chartDataMissing: "Data bagan tidak ada atau tidak lengkap.",
        loadingChart: "Memuat bagan organisasi...",
        language: "Bahasa",

        // Halaman Berita Universitas (UniversityNewsPage.js)
        noNewsAvailable: "Belum ada berita.",

        // Halaman Login Admin (LoginPage.js)
        username: "Nama Pengguna",
        password: "Kata Sandi",
        login: "Masuk",
        loginSuccess: "Login berhasil!",
        loginFailed: "Login gagal. Nama pengguna atau kata sandi salah.",

        // Dashboard Admin (AdminDashboard.js)
        accessDeniedAdmin: "Akses Ditolak! Anda harus login sebagai administrator.",
        failedToLoadProfile: "Gagal memuat profil pengguna. Silakan coba login kembali.",
        logoutSuccess: "Anda telah berhasil keluar.",
        logoutFailed: "Keluar gagal. Silakan coba lagi.",
        logout: "Keluar",
        adminDashboard: "Dashboard Admin",
        manageOrganizations: "Kelola Organisasi",
        manageOrgDesc: "Tambah, edit, atau hapus profil struktur organisasi.",
        editOrganizations: "Edit Organisasi",
        manageNews: "Kelola Berita",
        manageNewsDesc: "Buat, perbarui, dan hapus berita universitas.",
        editNews: "Edit Berita",
        manageFacilities: "Kelola Fasilitas",
        manageFacilitiesDesc: "Kelola informasi fasilitas kampus.",
        editFacilities: "Edit Fasilitas",
        manageStaticContent: "Kelola Konten Statis",
        manageStaticContentDesc: "Perbarui konten untuk halaman Visi & Misi, Tentang Kami, dan Hubungi Kami.",
        editStaticContent: "Edit Konten Statis",

        // Label Form Umum & Aksi
        add: "Tambah",
        edit: "Edit",
        delete: "Hapus",
        save: "Simpan",
        cancel: "Batal",
        confirmDelete: "Apakah Anda yakin ingin menghapus item ini?",
        actionSuccessful: "Operasi berhasil diselesaikan!",
        actionFailed: "Operasi gagal. Silakan coba lagi.",
        title: "Judul",
        date: "Tanggal",
        content: "Konten",
        imageUrl: "URL Gambar",
        name: "Nama",
        detail: "Detail",
        key: "Kunci",
        englishContent: "Konten Bahasa Inggris",
        indonesianContent: "Konten Bahasa Indonesia",
        actions: "Aksi",
        addNews: "Tambah Berita",
        addFacility: "Tambah Fasilitas",
        addOrganization: "Tambah Organisasi",
        editFacility: "Edit Fasilitas",
        editOrganization: "Edit Organisasi",
        phone: "Telepon",
        description: "Deskripsi",
        photoUrl: "URL Foto",
        childrenIds: "ID Anak (dipisahkan koma)"
    }
};

export const getTranslation = (lang, key) => {
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
};

export default translations;