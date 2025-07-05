// frontend/src/admin/ContentManagement/ContentForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { getTranslation } from '../../utils/translations';

function ContentForm() {
    const { id } = useParams(); // ID adalah 'vision_mission', 'about_us', 'contact_us'
    const navigate = useNavigate();
    const [key, setKey] = useState(''); // Key seperti 'vision_mission'
    const [contentEn, setContentEn] = useState('');
    const [contentId, setContentId] = useState('');
    const [currentLang, setCurrentLang] = useState('id');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            api.get(`/content/${id}`)
                .then(response => {
                    const contentItem = response.data;
                    setKey(contentItem.key);
                    setContentEn(contentItem.content_en || '');
                    setContentId(contentItem.content_id || '');
                })
                .catch(err => {
                    console.error('Error fetching content for edit:', err);
                    setError(getTranslation(currentLang, 'actionFailed'));
                })
                .finally(() => setLoading(false));
        }
    }, [id, currentLang]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const contentData = {
            key: id, // Key sama dengan ID untuk konten statis
            content_en: contentEn,
            content_id: contentId,
        };

        try {
            await api.put(`/content/${id}`, contentData); // Gunakan PUT karena kita mengedit yang sudah ada
            alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'edit'));
            navigate('/admin/content');
        } catch (err) {
            console.error('Error saving content:', err.response ? err.response.data : err.message);
            setError(getTranslation(currentLang, 'actionFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {getTranslation(currentLang, 'editStaticContent')} ({key})
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center">Memuat...</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="key" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'key')}
                    </label>
                    <input type="text" id="key" className="input-field bg-gray-200 dark:bg-gray-600 cursor-not-allowed" value={key} readOnly disabled />
                </div>

                <div className="mb-4">
                    <label htmlFor="contentEn" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'englishContent')}
                    </label>
                    <textarea
                        id="contentEn"
                        className="input-field h-48"
                        value={contentEn}
                        onChange={(e) => setContentEn(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label htmlFor="contentId" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'indonesianContent')}
                    </label>
                    <textarea
                        id="contentId"
                        className="input-field h-48"
                        value={contentId}
                        onChange={(e) => setContentId(e.target.value)}
                    ></textarea>
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
                        onClick={() => navigate('/admin/content')}
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

export default ContentForm;