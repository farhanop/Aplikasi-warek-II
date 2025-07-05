// frontend/src/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react'; // Pastikan useState dan useEffect diimpor
import { useNavigate, Link, Outlet } from 'react-router-dom'; // Pastikan useNavigate, Link, dan Outlet diimpor
import api from '../utils/apiConfig'; // Untuk memanggil API backend
import { getTranslation } from '../utils/translations'; // Untuk multibahasa

function AdminDashboard() {
    const navigate = useNavigate(); // Hook untuk navigasi programatis

    // State untuk bahasa yang aktif di komponen ini (dihapus setCurrentLang dari deps useEffect karena tidak digunakan)
    const [currentLang, setCurrentLang] = useState('id'); // <--- PASTIKAN BARIS INI ADA
    // State untuk peran pengguna (misal: 'admin')
    const [userRole, setUserRole] = useState(null); // <--- PASTIKAN BARIS INI ADA
    // State untuk nama pengguna yang login
    const [username, setUsername] = useState(null); // <--- PASTIKAN BARIS INI ADA

    // useEffect akan berjalan saat komponen pertama kali dirender atau saat dependensi berubah
    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Ambil token dari local storage
        const role = localStorage.getItem('userRole'); // Ambil peran dari local storage

        // Periksa apakah token ada dan peran adalah 'admin'
        if (!token || role !== 'admin') {
            alert(getTranslation(currentLang, 'accessDeniedAdmin')); // Beri tahu user akses ditolak
            navigate('/admin-login'); // Redirect ke halaman login jika tidak diautentikasi/otorisasi
        } else {
            setUserRole(role); // Set peran pengguna
            // Panggil API untuk mendapatkan profil user (memverifikasi token di backend)
            api.get('/auth/profile')
                .then(response => {
                    setUsername(response.data.user.username); // Set username dari respons API
                })
                .catch(err => {
                    // Jika gagal mengambil profil (misal: token tidak valid/kadaluarsa)
                    console.error('Error fetching profile:', err);
                    alert(getTranslation(currentLang, 'failedToLoadProfile'));
                    localStorage.removeItem('jwtToken'); // Hapus token yang mungkin tidak valid
                    localStorage.removeItem('userRole'); // Hapus peran
                    navigate('/admin-login'); // Redirect kembali ke login
                });
        }
    }, [navigate, currentLang]); // Dependensi: navigate (stabil) dan currentLang (untuk terjemahan alert)

    // Fungsi untuk menangani proses logout
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout'); // Panggil endpoint logout di backend (opsional, hanya untuk konsistensi)
            localStorage.removeItem('jwtToken'); // Hapus token dari local storage
            localStorage.removeItem('userRole'); // Hapus peran dari local storage
            // alert(getTranslation(currentLang, 'logoutSuccess')); // Baris ini dihapus/dikomentari agar tidak ada alert
            navigate('/admin-login'); // Langsung redirect ke halaman login
        } catch (error) {
            console.error('Logout error:', error);
            alert(getTranslation(currentLang, 'logoutFailed')); // Alert ini tetap bisa Anda biarkan untuk error
        }
    };

    // Tampilkan pesan "Memuat..." jika peran pengguna belum diketahui (saat fetching)
    if (!userRole) {
        return <div className="text-center p-8 text-gray-900 dark:text-gray-100">Memuat...</div>;
    }

    // Render dashboard jika userRole sudah valid
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
                {getTranslation(currentLang, 'adminDashboard')}
            </h1>
            <div className="text-center mb-6">
                {username && <p className="text-xl text-gray-900 dark:text-gray-100">Selamat datang, {username} ({userRole})!</p>}
                <button
                    onClick={handleLogout}
                    className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                >
                    {getTranslation(currentLang, 'logout')}
                </button>
            </div>

            {/* Navigasi Modul Admin */}
            <nav className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300 ease-in-out">
                <ul className="flex flex-wrap justify-center gap-4">
                    <li>
                        {/* Link ke daftar manajemen organisasi */}
                        <Link to="organizations" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            {getTranslation(currentLang, 'manageOrganizations')}
                        </Link>
                    </li>
                    <li>
                        {/* Link ke daftar manajemen berita */}
                        <Link to="news" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            {getTranslation(currentLang, 'manageNews')}
                        </Link>
                    </li>
                    <li>
                        {/* Link ke daftar manajemen fasilitas */}
                        <Link to="facilities" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            {getTranslation(currentLang, 'manageFacilities')}
                        </Link>
                    </li>
                    <li>
                        {/* Link ke daftar manajemen konten statis */}
                        <Link to="content" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            {getTranslation(currentLang, 'manageStaticContent')}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Konten Sub-Rute Admin akan dirender di sini oleh React Router Outlet */}
            <div className="admin-content">
                <Outlet /> {/* Penting: Ini merender komponen yang cocok dengan rute bersarang */}
            </div>
        </div>
    );
}

export default AdminDashboard;