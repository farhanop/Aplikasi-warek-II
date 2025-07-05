// frontend/src/pages/ContactUsPage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/apiConfig';
import { getTranslation } from '../utils/translations';

function ContactUsPage() {
    const [contactContent, setContactContent] = useState(null);
    const [currentLang, setCurrentLang] = useState('id');

    useEffect(() => {
        const fetchContactContent = async () => {
            try {
                const response = await api.get('/content/contact_us');
                setContactContent(response.data);
            } catch (error) {
                console.error('Error fetching contact content:', error);
            }
        };
        fetchContactContent();
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
                {getTranslation(currentLang, 'contactUs')}
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                {contactContent ? (
                    <div dangerouslySetInnerHTML={{ __html: getContentByLang(contactContent, currentLang) }} />
                ) : (
                    <p className="text-center">Memuat informasi kontak...</p>
                )}
            </div>
        </div>
    );
}

export default ContactUsPage;