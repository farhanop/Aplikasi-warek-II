// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/apiConfig';
import { getTranslation } from '../utils/translations';

function HomePage() {
    const [currentLang, setCurrentLang] = useState('id');
    const [leaderProfile, setLeaderProfile] = useState(null);
    const [latestNews, setLatestNews] = useState([]);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchLeaderProfile = async () => {
            try {
                const response = await api.get('/organization/warek_ii');
                setLeaderProfile(response.data);
            } catch (error) {
                console.error('Error fetching leader profile:', error);
            }
        };

        const fetchLatestNews = async () => {
            try {
                const response = await api.get(`/news?lang=${currentLang}`);
                setLatestNews(response.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching latest news:', error);
            }
        };

        const fetchFacilities = async () => {
            try {
                const response = await api.get(`/facilities?lang=${currentLang}`);
                setFacilities(response.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };

        fetchLeaderProfile();
        fetchLatestNews();
        fetchFacilities();
    }, [currentLang]);

    return (
        <div className="container mx-auto p-4">
            {/* Tombol Ganti Bahasa & Dark Mode */}
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
                {getTranslation(currentLang, 'home')}
            </h1>

            {/* Profil Pimpinan */}
            <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center">
                    {getTranslation(currentLang, 'leaderProfile')}
                </h2>
                {leaderProfile ? (
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                        <img
                            src={leaderProfile.photo || 'https://via.placeholder.com/150'}
                            alt={leaderProfile.name}
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                        <div>
                            <h3 className="text-2xl font-bold">{leaderProfile.name}</h3>
                            <p className="text-xl text-blue-600 dark:text-blue-400">{leaderProfile.title}</p>
                            <p className="mt-2">{leaderProfile.description}</p>
                            <p>Email: {leaderProfile.email}</p>
                            <p>Telepon: {leaderProfile.phone}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Memuat profil pimpinan...</p>
                )}
            </section>

            {/* Berita Terbaru */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-center">
                    {getTranslation(currentLang, 'latestNews')}
                </h2>
                {latestNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestNews.map((newsItem) => (
                            <div key={newsItem.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                <img
                                    src={newsItem.imageUrl || 'https://via.placeholder.com/300x200'}
                                    alt={newsItem.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-bold mb-2">{newsItem.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    {new Date(newsItem.date).toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US')}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">{newsItem.content?.substring(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Tidak ada berita terbaru.</p>
                )}
            </section>

            {/* Fasilitas Kampus */}
            <section>
                <h2 className="text-3xl font-semibold mb-4 text-center">
                    {getTranslation(currentLang, 'campusFacilities')}
                </h2>
                {facilities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {facilities.map((facility) => (
                            <div key={facility.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                <img
                                    src={facility.imageUrl || 'https://via.placeholder.com/300x200'}
                                    alt={facility.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{facility.detail?.substring(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Tidak ada fasilitas yang tersedia.</p>
                )}
            </section>
        </div>
    );
}

export default HomePage;