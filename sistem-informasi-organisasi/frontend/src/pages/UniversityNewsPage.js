// frontend/src/pages/UniversityNewsPage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/apiConfig';
import { getTranslation } from '../utils/translations';

function UniversityNewsPage() {
    const [news, setNews] = useState([]);
    const [currentLang, setCurrentLang] = useState('id');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get(`/news?lang=${currentLang}`);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, [currentLang]);

    return (
        <div className="container mx-auto p-4">
            {/* Tombol Ganti Bahasa */}
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setCurrentLang('id')}
                >
                    ID
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => setCurrentLang('en')}
                >
                    EN
                </button>
            </div>

            <h1 className="text-4xl font-bold mb-8 text-center">
                {getTranslation(currentLang, 'universityNews')}
            </h1>

            {news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((newsItem) => (
                        <div key={newsItem.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                            <img
                                src={newsItem.imageUrl || 'https://via.placeholder.com/400x250'}
                                alt={newsItem.title}
                                className="w-full h-56 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                {new Date(newsItem.date).toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US')}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 flex-grow">{newsItem.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl">{getTranslation(currentLang, 'noNewsAvailable')}</p>
            )}
        </div>
    );
}

export default UniversityNewsPage;