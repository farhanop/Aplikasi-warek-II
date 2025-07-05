// frontend/src/admin/FacilitiesManagement/FacilityForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { getTranslation } from '../../utils/translations';
import { v4 as uuidv4 } from 'uuid'; // Untuk menghasilkan ID unik

function FacilityForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [language, setLanguage] = useState('id');
    const [currentLang, setCurrentLang] = useState('id');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            api.get(`/facilities/${id}`)
                .then(response => {
                    const facilityItem = response.data;
                    setName(facilityItem.name);
                    setDetail(facilityItem.detail);
                    setImageUrl(facilityItem.imageUrl);
                    setLanguage(facilityItem.language);
                })
                .catch(err => {
                    console.error('Error fetching facility for edit:', err);
                    setError(getTranslation(currentLang, 'actionFailed'));
                })
                .finally(() => setLoading(false));
        }
    }, [id, currentLang]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const facilityData = {
            id: id || `${uuidv4()}_${language}`, // Generate ID baru jika mode tambah, dengan suffix bahasa
            name,
            detail,
            imageUrl,
            language,
        };

        try {
            if (id) {
                await api.put(`/facilities/${id}`, facilityData);
                alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'edit'));
            } else {
                await api.post('/facilities', facilityData);
                alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'add'));
            }
            navigate('/admin/facilities');
        } catch (err) {
            console.error('Error saving facility:', err.response ? err.response.data : err.message);
            setError(getTranslation(currentLang, 'actionFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {id ? getTranslation(currentLang, 'editFacility') : getTranslation(currentLang, 'addFacility')}
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center">Memuat...</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'name')}
                    </label>
                    <input type="text" id="name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <label htmlFor="detail" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'detail')}
                    </label>
                    <textarea id="detail" className="input-field h-32" value={detail} onChange={(e) => setDetail(e.target.value)} required></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'imageUrl')}
                    </label>
                    <input type="text" id="imageUrl" className="input-field" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>

                <div className="mb-6">
                    <label htmlFor="language" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'language')}
                    </label>
                    <select id="language" className="input-field" value={language} onChange={(e) => setLanguage(e.target.value)} required>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : getTranslation(currentLang, 'save')}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/facilities')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {getTranslation(currentLang, 'cancel')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FacilityForm;