// frontend/src/pages/ChartPage.js
import React, { useEffect, useState, useRef } from 'react';
import api from '../utils/apiConfig'; // Untuk interaksi dengan API backend
import html2canvas from 'html2canvas'; // Untuk mengambil screenshot (download bagan sebagai gambar)
import { getTranslation } from '../utils/translations'; // Untuk terjemahan multibahasa

function ChartPage() {
    const [organizations, setOrganizations] = useState([]); // State untuk menyimpan semua data organisasi
    const [currentLang, setCurrentLang] = useState('id'); // State untuk bahasa aktif (digunakan untuk terjemahan UI)
    const chartRef = useRef(null); // Ref untuk elemen DOM yang akan di-screenshot oleh html2canvas

    // useEffect untuk mengambil data organisasi dari backend saat komponen pertama kali dirender
    useEffect(() => {
        const fetchOrganizationChart = async () => {
            try {
                const response = await api.get('/organization'); // Memanggil API GET /api/organization
                setOrganizations(response.data); // Menyimpan data yang diterima ke state
            } catch (error) {
                console.error('Error fetching organizational chart:', error); // Log error jika gagal
            }
        };
        fetchOrganizationChart(); // Panggil fungsi fetch data
    }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali saat mount

    // Fungsi untuk membangun struktur hierarki bagan dari array datar data organisasi
    // Asumsi: Bagan dimulai dari node dengan ID 'warek_ii' sebagai root
    const buildTree = (data) => {
        const map = new Map(); // Membuat Map untuk akses cepat ke node berdasarkan ID
        data.forEach(item => map.set(item.id, { ...item, children: [] })); // Salin data dan tambahkan array children kosong

        // Mengambil node root berdasarkan ID 'warek_ii'
        const rootNode = map.get('warek_ii');
        if (rootNode) { // Jika node root ditemukan
            // Fungsi rekursif untuk menemukan dan menghubungkan anak-anak
            const findChildren = (nodeId) => {
                const node = map.get(nodeId);
                if (!node) return null; // Jika node tidak ditemukan, kembalikan null

                node.children = []; // Inisialisasi array children untuk node ini
                // Jika node memiliki daftar ID anak di children_json dan itu adalah array
                if (node.children_json && Array.isArray(node.children_json)) {
                    node.children_json.forEach(childId => {
                        const child = findChildren(childId); // Panggil rekursif untuk setiap ID anak
                        if (child) node.children.push(child); // Tambahkan anak yang ditemukan ke daftar children
                    });
                }
                return node; // Kembalikan node yang sudah memiliki children
            };
            return findChildren('warek_ii'); // Mulai membangun pohon dari node root 'warek_ii'
        }
        return null; // Jika node root 'warek_ii' tidak ditemukan, kembalikan null
    };

    // Membangun pohon organisasi saat data 'organizations' berubah
    const organizationalTree = buildTree(organizations);

    // Fungsi untuk mengunduh bagan sebagai gambar (menggunakan html2canvas)
    const downloadChartAsImage = () => {
        if (chartRef.current) { // Pastikan elemen bagan ada
            html2canvas(chartRef.current).then(canvas => {
                const link = document.createElement('a'); // Buat elemen <a>
                link.href = canvas.toDataURL('image/png'); // Set href ke data URL gambar
                link.download = 'organizational-chart.png'; // Set nama file untuk download
                link.click(); // Klik link secara programatis untuk memulai download
            });
        }
    };

    // Komponen rekursif untuk merender setiap node bagan
    const renderNode = (node) => {
        // Membentuk URL gambar profil. Prioritas: 1. Upload lokal -> URL backend, 2. URL eksternal, 3. Placeholder
        const imageUrl = node.photo && node.photo.startsWith('/uploads')
            ? `http://localhost:5000${node.photo}` // Jika path dari upload lokal
            : (node.photo || 'https://via.placeholder.com/100'); // Jika URL eksternal atau placeholder

        // Debugging logs - akan muncul di konsol browser
        console.log(`Debug: Rendering node ID: ${node.id}, Name: ${node.name}`);
        console.log(`Debug: Photo URL constructed: ${imageUrl}`);
        console.log('Debug: Full node data:', node); // Lihat semua data node

        return (
            <div key={node.id} className="relative border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-4 bg-white dark:bg-gray-700 flex flex-col items-center min-w-[200px] transition-colors duration-300 ease-in-out">
                {/* Gambar profil node */}
                <img
                    src={imageUrl} // Menggunakan URL gambar yang sudah dibentuk
                    alt={node.name}
                    // Kelas CSS untuk ukuran, bentuk, dan border gambar
                    className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-200 dark:border-gray-600"
                />
                {/* Nama dan Jabatan/Tingkat Organisasi */}
                <h3 className="font-bold text-lg text-center text-gray-900 dark:text-gray-100">{node.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 text-center">{node.title}</p>
                {/* Jika node memiliki anak-anak, render anak-anaknya */}
                {node.children && node.children.length > 0 && (
                    <div className="absolute top-full mt-8 w-full flex justify-center space-x-8">
                        {/* Garis koneksi (sangat dasar, bisa lebih kompleks dengan SVG/library D3.js) */}
                        {/* Untuk visualisasi yang kompleks, library khusus seperti react-flow atau GoJS direkomendasikan */}
                        {node.children.map(child => (
                            <div key={child.id} className="relative flex flex-col items-center">
                                {/* Garis vertikal dari parent ke garis horizontal */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gray-400"></div>
                                {/* Garis horizontal (placeholder, perlu logika lebih untuk menghubungkan banyak anak) */}
                                {renderNode(child)} {/* Panggil rekursif untuk anak */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
                {getTranslation(currentLang, 'chart')}
            </h1>

            <div className="flex justify-center mb-6">
                <button
                    onClick={downloadChartAsImage}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                >
                    {getTranslation(currentLang, 'downloadChart')}
                </button>
            </div>

            {/* Area Bagan Organisasi yang akan di-screenshot */}
            <div ref={chartRef} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg overflow-x-auto min-h-[300px] flex justify-center items-start transition-colors duration-300 ease-in-out">
                {organizations.length > 0 ? (
                    // Jika ada data organisasi, coba render pohon
                    <div className="relative min-w-max flex justify-center py-4">
                        {organizationalTree ? (
                            renderNode(organizationalTree)
                        ) : (
                            // Pesan jika data ada tapi tidak ada root (warek_ii) atau struktur tidak lengkap
                            <p className="text-center text-gray-700 dark:text-gray-300">
                                {getTranslation(currentLang, 'chartDataMissing')}
                            </p>
                        )}
                    </div>
                ) : (
                    // Pesan jika tidak ada data organisasi sama sekali
                    <p className="text-center text-gray-700 dark:text-gray-300">
                        {getTranslation(currentLang, 'loadingChart')}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ChartPage;