// frontend/src/components/news/NewsCard.js
import React, { useState } from 'react';
import NewsDetailModal from './NewsDetailModal'; // Impor NewsDetailModal

const NewsCard = ({ newsItem, translations }) => {
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleOpenDetailModal = () => {
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
    };

    return (
        <div
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 m-2 w-full md:w-80 flex-shrink-0 border border-gray-300 dark:border-gray-600 cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={handleOpenDetailModal}
        >
            {newsItem.imageUrl && (
                <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-40 object-cover rounded-md mb-4" />
            )}
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">{newsItem.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">{translations.date}: {newsItem.date}</p>
            <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-3">{newsItem.content}</p>

            {showDetailModal && (
                <NewsDetailModal newsItem={newsItem} onClose={handleCloseDetailModal} translations={translations} />
            )}
        </div>
    );
};

export default NewsCard;
