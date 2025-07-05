// frontend/src/components/news/NewsDetailModal.js
import React from 'react';

const NewsDetailModal = ({ newsItem, onClose, translations }) => {
    if (!newsItem) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{newsItem.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-3xl font-light leading-none"
                        aria-label={translations.close}
                    >
                        &times;
                    </button>
                </div>
                {newsItem.imageUrl && (
                    <div className="flex justify-center mb-4">
                        <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-56 object-cover rounded-md border border-gray-200 dark:border-gray-600 shadow-sm" />
                    </div>
                )}
                <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-300"><span className="font-semibold">{translations.date}:</span> {newsItem.date}</p>
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{newsItem.content}</p>
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                    >
                        {translations.close}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailModal;
