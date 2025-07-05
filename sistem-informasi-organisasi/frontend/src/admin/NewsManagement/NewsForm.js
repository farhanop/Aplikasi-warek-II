// frontend/src/admin/NewsManagement/NewsForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { getTranslation } from '../../utils/translations';
import { v4 as uuidv4 } from 'uuid'; // Untuk menghasilkan ID unik

function NewsForm() {
    const { id } = useParams(); // Untuk mode edit
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');
    const [language, setLanguage] = useState('id'); // Default bahasa Indonesia
    const [currentLang, setCurrentLang] = useState('id'); // Untuk terjemahan internal komponen
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            api.get(`/news/${id}`)
                .then(response => {
                    const newsItem = response.data;
                    setTitle(newsItem.title);
                    setContent(newsItem.content);
                    setImageUrl(newsItem.imageUrl);
                    setDate(newsItem.date.split('T')[0]); // Format tanggal untuk input type="date"
                    setLanguage(newsItem.language);
                })
                .catch(err => {
                    console.error('Error fetching news for edit:', err);
                    setError(getTranslation(currentLang, 'actionFailed'));
                })
                .finally(() => setLoading(false));
        }
    }, [id, currentLang]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newsData = {
            id: id || `${uuidv4()}_${language}`, // Generate ID baru jika mode tambah, dengan suffix bahasa
            title,
            content,
            imageUrl,
            date,
            language,
        };

        try {
            if (id) {
                await api.put(`/news/${id}`, newsData);
                alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'edit'));
            } else {
                await api.post('/news', newsData);
                alert(getTranslation(currentLang, 'actionSuccessful') + ' ' + getTranslation(currentLang, 'add'));
            }
            navigate('/admin/news'); // Kembali ke daftar berita
        } catch (err) {
            console.error('Error saving news:', err.response ? err.response.data : err.message);
            setError(getTranslation(currentLang, 'actionFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {id ? getTranslation(currentLang, 'editNews') : getTranslation(currentLang, 'addNews')}
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center">Memuat...</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'title')}
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="input-field"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'content')}
                    </label>
                    <textarea
                        id="content"
                        className="input-field h-32"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'imageUrl')}
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="input-field"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'date')}
                    </label>
                    <input
                        type="date"
                        id="date"
                        className="input-field"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="language" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        {getTranslation(currentLang, 'language')}
                    </label>
                    <select
                        id="language"
                        className="input-field"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    >
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
                        onClick={() => navigate('/admin/news')}
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

export default NewsForm;