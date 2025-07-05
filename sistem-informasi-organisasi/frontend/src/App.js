// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import komponen halaman publik (pastikan ekstensi .js)
import HomePage from './pages/HomePage';
import ChartPage from './pages/ChartPage';
import VisionMissionPage from './pages/VisionMissionPage';
import AboutUsPage from './pages/AboutUsPage';
import UniversityNewsPage from './pages/UniversityNewsPage';
import ContactUsPage from './pages/ContactUsPage';

// Import komponen login admin (pastikan ekstensi .js)
import LoginPage from './components/auth/LoginPage';

// Import komponen admin dashboard utama (pastikan ekstensi .js)
import AdminDashboard from './admin/AdminDashboard';

// Import komponen manajemen admin (PASTIKAN PATH INI SESUAI DENGAN NAMA FOLDER PASCALCASE ANDA DAN EKSTENSI .js)
import OrganizationList from './admin/OrganizationManagement/OrganizationList';
import OrganizationForm from './admin/OrganizationManagement/OrganizationForm';
import NewsList from './admin/NewsManagement/NewsList';
import NewsForm from './admin/NewsManagement/NewsForm';
import FacilityList from './admin/FacilitiesManagement/FacilityList';
import FacilityForm from './admin/FacilitiesManagement/FacilityForm';
import ContentList from './admin/ContentManagement/ContentList';
import ContentForm from './admin/ContentManagement/ContentForm';

function App() {
    // State untuk mengelola dark mode. Initial state bisa diambil dari localStorage jika diinginkan.
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Cek preferensi user dari sistem atau localStorage
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            return true;
        }
        return false;
    });

    // Fungsi untuk mengaktifkan/menonaktifkan dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    return (
        <Router>
            {/* Kontainer utama aplikasi, menerapkan kelas dark mode secara kondisional */}
            {/* Transisi warna background dan teks untuk efek dark mode yang halus */}
            <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out">

                {/* Navbar Aplikasi Utama */}
                <nav className="shadow-md p-4 bg-white dark:bg-gray-800 transition-colors duration-300 ease-in-out">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        {/*
              flex-col: Di layar kecil, elemen akan disusun dalam kolom.
              md:flex-row: Di layar menengah (md) ke atas, elemen akan disusun dalam baris.
              space-y-2: Jarak vertikal antar elemen di layar kecil.
              md:space-y-0: Hapus jarak vertikal di layar menengah ke atas.
            */}

                        {/* Link navigasi halaman publik */}
                        <ul className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
                            {/* flex-wrap: Membungkus item jika terlalu banyak untuk satu baris di layar kecil */}
                            {/* justify-center: Pusatkan item di layar kecil */}
                            {/* md:justify-start: Ratakan kiri di layar menengah ke atas */}
                            {/* gap-x-4, gap-y-2: Jarak antar item baik horizontal maupun vertikal */}
                            <li><Link to="/" className="hover:text-blue-500 rounded-md px-3 py-2">Beranda</Link></li>
                            <li><Link to="/chart" className="hover:text-blue-500 rounded-md px-3 py-2">Bagan Organisasi</Link></li>
                            <li><Link to="/vision-mission" className="hover:text-blue-500 rounded-md px-3 py-2">Visi & Misi</Link></li>
                            <li><Link to="/about-us" className="hover:text-blue-500 rounded-md px-3 py-2">Tentang Kami</Link></li>
                            <li><Link to="/news" className="hover:text-blue-500 rounded-md px-3 py-2">Berita Universitas</Link></li>
                            <li><Link to="/contact-us" className="hover:text-blue-500 rounded-md px-3 py-2">Hubungi Kami</Link></li>
                        </ul>
                        {/* Tombol Admin Login dan Dark Mode Toggle */}
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            {/* mt-4: Jarak atas di layar kecil, md:mt-0: Hapus jarak di layar menengah ke atas */}
                            <Link to="/admin-login" className="hover:text-blue-500 px-4 py-2 border border-blue-500 rounded-full transition-colors duration-200 ease-in-out">Admin Login</Link>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
                                aria-label="Toggle dark mode"
                            >
                                {/* Ikon matahari atau bulan berdasarkan mode */}
                                {isDarkMode ? '☀️' : '🌙'}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Definisi Rute Aplikasi */}
                <Routes>
                    {/* Rute untuk halaman publik */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chart" element={<ChartPage />} />
                    <Route path="/vision-mission" element={<VisionMissionPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/news" element={<UniversityNewsPage />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />

                    {/* Rute untuk halaman login admin */}
                    <Route path="/admin-login" element={<LoginPage />} />

                    {/* Rute Bersarang untuk Admin Dashboard */}
                    {/* AdminDashboard adalah layout utama untuk semua halaman admin yang memerlukan otentikasi */}
                    <Route path="/admin" element={<AdminDashboard />}>
                        {/* Rute default saat masuk ke /admin (akan menampilkan pesan instruksi) */}
                        <Route index element={<h2 className="text-2xl text-center mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto text-gray-900 dark:text-gray-100">Pilih modul manajemen dari navigasi di atas.</h2>} />

                        {/* Rute untuk Manajemen Organisasi */}
                        <Route path="organizations" element={<OrganizationList />} />
                        <Route path="organizations/new" element={<OrganizationForm />} />
                        <Route path="organizations/edit/:id" element={<OrganizationForm />} />

                        {/* Rute untuk Manajemen Berita */}
                        <Route path="news" element={<NewsList />} />
                        <Route path="news/new" element={<NewsForm />} />
                        <Route path="news/edit/:id" element={<NewsForm />} />

                        {/* Rute untuk Manajemen Fasilitas */}
                        <Route path="facilities" element={<FacilityList />} />
                        <Route path="facilities/new" element={<FacilityForm />} />
                        <Route path="facilities/edit/:id" element={<FacilityForm />} />

                        {/* Rute untuk Manajemen Konten Statis */}
                        {/* Konten statis tidak memiliki rute 'new' karena ID-nya fixed (vision_mission, about_us, contact_us) */}
                        <Route path="content" element={<ContentList />} />
                        <Route path="content/edit/:id" element={<ContentForm />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;