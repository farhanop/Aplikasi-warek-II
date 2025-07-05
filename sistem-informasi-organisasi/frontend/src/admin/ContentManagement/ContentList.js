// frontend/src/admin/ContentManagement/ContentList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Untuk navigasi ke halaman edit
import api from '../../utils/apiConfig'; // Untuk interaksi dengan API backend
import { getTranslation } from '../../utils/translations'; // Untuk terjemahan multibahasa

function ContentList() {
    // State untuk menyimpan daftar item konten statis
    const [contentItems, setContentItems] = useState([]);
    // State untuk status loading data
    const [loading, setLoading] = useState(true);
    // State untuk pesan error
    const [error, setError] = useState(null);
    // State untuk bahasa yang aktif di komponen ini (misal untuk pesan alert/log)
    const [currentLang, setCurrentLang] = useState('id'); // Default bahasa Indonesia

    // useEffect untuk memanggil fetchContent saat komponen pertama kali dirender
    useEffect(() => {
        fetchContent();
    }, []); // Array dependensi kosong agar hanya berjalan sekali

    // Fungsi untuk mengambil data konten statis dari backend
    const fetchContent = async () => {
        setLoading(true); // Set loading ke true saat memulai fetch
        setError(null); // Reset error
        try {
            const response = await api.get('/content'); // Memanggil API GET /api/content
            // Penting: Pastikan response.data adalah array. Jika tidak, set ke array kosong.
            setContentItems(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            // Menangkap error jika permintaan API gagal
            console.error('Error fetching content:', err);
            // Menampilkan pesan error yang diterjemahkan
            setError(getTranslation(currentLang, 'actionFailed'));
        } finally {
            setLoading(false); // Set loading ke false setelah fetch selesai (berhasil atau gagal)
        }
    };

    // Komponen ini tidak memiliki fungsi delete karena konten statis tidak dihapus, hanya diedit.

    // Tampilkan pesan loading saat data sedang diambil
    if (loading) {
        return <div className="text-center p-4 text-gray-900 dark:text-gray-100">Memuat konten statis...</div>;
    }

    // Tampilkan pesan error jika terjadi kesalahan saat mengambil data
    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    // Render daftar konten statis
    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                {getTranslation(currentLang, 'manageStaticContent')}
            </h2>
            {/* Tidak ada tombol 'Add' karena ini adalah konten statis dengan ID spesifik (vision_mission, about_us, contact_us) */}

            {/* Kondisi untuk menampilkan tabel atau pesan "belum ada konten" */}
            {contentItems && contentItems.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Header Tabel */}
                        <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'key')} {/* Kolom untuk 'id' atau 'key' konten */}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'previewEnglish')} {/* Pratinjau konten Inggris */}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'previewIndonesian')} {/* Pratinjau konten Indonesia */}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'actions')} {/* Kolom untuk aksi (Edit) */}
                            </th>
                        </tr>
                        </thead>
                        {/* Body Tabel */}
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {contentItems.map((item) => ( // Memetakan setiap item konten ke baris tabel
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{item.key}</td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs text-gray-700 dark:text-gray-300">
                                    {/* Menampilkan 50 karakter pertama dari konten Inggris sebagai pratinjau */}
                                    {item.content_en?.substring(0, 50)}...
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs text-gray-700 dark:text-gray-300">
                                    {/* Menampilkan 50 karakter pertama dari konten Indonesia sebagai pratinjau */}
                                    {item.content_id?.substring(0, 50)}...
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {/* Link untuk mengedit konten, mengarah ke /admin/content/edit/:id */}
                                    <Link to={`edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                        {getTranslation(currentLang, 'edit')}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Tampilkan pesan ini jika tidak ada item konten statis yang ditemukan
                <p className="text-center text-xl text-gray-700 dark:text-gray-300">
                    {getTranslation(currentLang, 'noStaticContentAvailable')}
                </p>
            )}
        </div>
    );
}

export default ContentList;