// frontend/src/pages/AboutUsPage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/apiConfig';
import { getTranslation } from '../utils/translations';

function AboutUsPage() {
    const [aboutContent, setAboutContent] = useState(null);
    const [currentLang, setCurrentLang] = useState('id');

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const response = await api.get('/content/about_us');
                setAboutContent(response.data);
            } catch (error) {
                console.error('Error fetching about us content:', error);
            }
        };
        fetchAboutContent();
    }, []);

    const getContentByLang = (contentObj, lang) => {
        if (!contentObj) return '';
        return lang === 'id' ? contentObj.content_id : contentObj.content_en;
    };

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
                {getTranslation(currentLang, 'aboutUs')}
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
                {aboutContent ? (
                    <div dangerouslySetInnerHTML={{ __html: getContentByLang(aboutContent, currentLang) }} />
                ) : (
                    <p className="text-center">Memuat informasi tentang kami...</p>
                )}
            </div>
        </div>
    );
}

export default AboutUsPage;