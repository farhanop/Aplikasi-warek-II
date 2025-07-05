// frontend/src/admin/OrganizationManagement/OrganizationForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Untuk navigasi dan mengambil parameter URL
import api from '../../utils/apiConfig'; // Import instance Axios yang sudah dikonfigurasi
import { getTranslation } from '../../utils/translations'; // Untuk terjemahan multibahasa
import { v4 as uuidv4 } from 'uuid'; // Untuk menghasilkan ID unik (saat menambah baru)

function OrganizationForm() {
    const { id } = useParams(); // Mengambil ID dari URL jika dalam mode edit (misal: /edit/:id)
    const navigate = useNavigate(); // Hook untuk navigasi programatis

    // --- State untuk Form Input ---
    const [name, setName] = useState('');
    const [title, setTitle] = useState(''); // 'title' akan diisi dari dropdown level
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    // --- State Khusus untuk Upload Foto ---
    const [photoFile, setPhotoFile] = useState(null); // Menyimpan objek File yang dipilih oleh user
    const [existingPhotoUrl, setExistingPhotoUrl] = useState(''); // Menyimpan URL foto yang sudah ada dari database

    // --- State untuk Status UI ---
    const [currentLang, setCurrentLang] = useState('id'); // Untuk terjemahan di komponen
    const [loading, setLoading] = useState(false); // Untuk status loading saat submit/fetch
    const [error, setError] = useState(null); // Untuk pesan error yang ditampilkan di UI

    // --- Opsi untuk Dropdown Level Organisasi ---
    const organizationalLevels = [
        { value: '', label: getTranslation(currentLang, 'selectLevel') }, // Placeholder/opsi default
        { value: 'Pimpinan Universitas', label: getTranslation(currentLang, 'universityLeader') },
        { value: 'Kepala Biro', label: getTranslation(currentLang, 'bureauHead') },
        { value: 'Kepala Divisi', label: getTranslation(currentLang, 'divisionHead') },
        { value: 'Staf', label: getTranslation(currentLang, 'staff') },
        // Tambahkan level lain sesuai kebutuhan di sini
    ];

    // --- useEffect untuk Memuat Data Saat Mode Edit ---
    useEffect(() => {
        if (id) { // Jika ada ID di URL, berarti kita dalam mode edit
            setLoading(true); // Aktifkan loading
            setError(null); // Reset error
            api.get(`/organization/${id}`) // Panggil API untuk mendapatkan data organisasi berdasarkan ID
                .then(response => {
                    const orgData = response.data;
                    // Isi state form dengan data yang diterima dari backend
                    setName(orgData.name);
                    setTitle(orgData.title);
                    setEmail(orgData.email || ''); // Gunakan || '' untuk memastikan tidak ada null/undefined
                    setPhone(orgData.phone || '');
                    setDescription(orgData.description || '');
                    setExistingPhotoUrl(orgData.photo || ''); // Set URL foto yang sudah ada
                    // photoFile tetap null, kecuali user memilih file baru
                })
                .catch(err => {
                    console.error('Error fetching organization for edit:', err); // Log error
                    setError(getTranslation(currentLang, 'actionFailed')); // Tampilkan pesan error
                })
                .finally(() => setLoading(false)); // Nonaktifkan loading
        }
    }, [id, currentLang]); // Dependensi: Berjalan saat ID atau bahasa berubah

    // --- Fungsi untuk Menangani Submit Form (Tambah atau Edit) ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah refresh halaman default form
        setLoading(true); // Aktifkan loading
        setError(null); // Reset error

        // Membuat objek FormData diperlukan untuk mengirim data form yang mengandung file
        const formData = new FormData();
        formData.append('id', id || uuidv4()); // Tambahkan ID (gunakan ID dari URL jika edit, atau generate baru jika tambah)
        formData.append('name', name);
        formData.append('title', title);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('description', description);
        // children_json diset ke array kosong karena tidak ada input di form ini
        formData.append('children_json', JSON.stringify([]));

        // --- Logika Penting untuk Menambahkan File Foto atau URL Foto Lama ---
        console.log('--- Frontend handleSubmit Debug ---');
        console.log('photoFile (state value):', photoFile); // Menampilkan objek File yang dipilih user (atau null)
        console.log('existingPhotoUrl (state value):', existingPhotoUrl); // Menampilkan URL foto lama (atau '')

        if (photoFile) {
            // Jika ada file foto baru yang dipilih oleh user
            console.log('Appending photoFile to FormData (name:', photoFile.name, 'type:', photoFile.type, 'size:', photoFile.size, ')');
            formData.append('photo', photoFile); // Menambahkan objek File ke FormData dengan fieldname 'photo'
        } else if (existingPhotoUrl) {
            // Jika tidak ada file baru yang dipilih, tetapi ada URL foto lama (dalam mode edit)
            console.log('Appending existing_photo to FormData:', existingPhotoUrl);
            formData.append('existing_photo', existingPhotoUrl); // Menambahkan URL foto lama ke FormData
        } else {
            console.log('No photoFile or existingPhotoUrl to append to FormData.');
        }

        // --- Opsional: Untuk melihat semua isi FormData di konsol sebelum dikirim ---
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        // console.log('--- END Frontend handleSubmit Debug ---');

        try {
            // Konfigurasi Axios. Penting: Axios akan otomatis mengatur 'Content-Type': 'multipart/form-data'
            // saat Anda mengirim objek FormData. Tidak perlu menentukannya secara manual di sini.
            const config = {
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Dihapus karena otomatis oleh Axios
                },
            };

            if (id) {
                // Jika mode edit, gunakan PUT request ke endpoint dengan ID
                await api.put(`/organization/${id}`, formData, config);
                alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'edit'));
            } else {
                // Jika mode tambah, gunakan POST request
                await api.post('/organization', formData, config);
                alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'add'));
            }
            navigate('/admin/organizations'); // Redirect kembali ke daftar organisasi setelah sukses
        } catch (err) {
            console.error('Error saving organization:', err.response ? err.response.data : err.message); // Log error API
            setError(getTranslation(currentLang, 'actionFailed') + ': ' + (err.response?.data?.message || err.message)); // Tampilkan pesan error
        } finally {
            setLoading(false); // Nonaktifkan loading
        }
    };

    // --- Render JSX Komponen Form Organisasi ---
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto text-gray-900 dark:text-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {id ? getTranslation(currentLang, 'editOrganization') : getTranslation(currentLang, 'addOrganization')}
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center text-gray-700 dark:text-gray-300">Memuat...</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'name')}
                    </label>
                    <input type="text" id="name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'organizationLevel')}
                    </label>
                    <select
                        id="title"
                        className="input-field"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    >
                        {organizationalLevels.map(level => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input type="email" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'phone')}
                    </label>
                    <input type="tel" id="phone" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'description')}
                    </label>
                    <textarea id="description" className="input-field h-32" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                {/* Bagian Upload Foto */}
                <div className="mb-4">
                    <label htmlFor="photoUpload" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'profilePhoto')}
                    </label>
                    <input
                        type="file" // Input bertipe "file"
                        id="photoUpload"
                        accept="image/*" // Hanya menerima file gambar
                        className="input-field border-none p-0 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" // Styling kustom untuk input type="file"
                        onChange={(e) => setPhotoFile(e.target.files[0])} // Menyimpan objek File yang dipilih
                    />
                    {/* Menampilkan preview foto yang sudah ada atau yang baru di-upload */}
                    {(existingPhotoUrl || photoFile) && (
                        <div className="mt-4 flex flex-col items-center">
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                                {getTranslation(currentLang, 'currentPhoto')}:
                            </p>
                            <img
                                // Logic untuk menampilkan URL: Jika ada file baru, buat URL objek. Jika ada URL lama dari backend, gunakan itu.
                                // Jika URL lama dimulai dengan /uploads, tambahkan base URL backend.
                                src={photoFile ? URL.createObjectURL(photoFile) : (existingPhotoUrl.startsWith('/uploads') ? `http://localhost:5000${existingPhotoUrl}` : existingPhotoUrl)}
                                alt="Current Profile"
                                className="w-32 h-32 object-cover rounded-full shadow-lg border-2 border-gray-300 dark:border-gray-600"
                            />
                            {photoFile && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {getTranslation(currentLang, 'newPhotoSelected')}: {photoFile.name}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Tombol Simpan dan Batal */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                        disabled={loading} // Nonaktifkan tombol saat loading
                    >
                        {loading ? 'Menyimpan...' : getTranslation(currentLang, 'save')}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/organizations')} // Kembali ke daftar organisasi
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                        disabled={loading} // Nonaktifkan tombol saat loading
                    >
                        {getTranslation(currentLang, 'cancel')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OrganizationForm;