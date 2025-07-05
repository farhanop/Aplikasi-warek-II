// frontend/src/components/charts/OrgChartCard.js

import React, { useState } from 'react';
import ProfileDetailModal from '../common/ProfileDetailModal';

const OrgChartCard = ({ node, translations }) => {
    // Panggil semua hooks di top-level, jangan di bawah kondisi
    const [showChildren, setShowChildren] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Pastikan selalu array
    const childrenNodes = node?.children || [];

    // Aman: validasi setelah hooks
    if (!node) {
        console.error("OrgChartCard received an undefined or null node. Skipping render.");
        return null;
    }

    const handleToggleChildren = (e) => {
        e.stopPropagation();
        setShowChildren((prev) => !prev);
    };

    const handleOpenProfileModal = (e) => {
        e.stopPropagation();
        setShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
    };

    return (
        <div className="flex flex-col items-center p-2 relative">
            <div
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 m-2 border border-gray-300 dark:border-gray-600 transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between items-center w-48 min-h-[100px]"
            >
                {node.photo && (
                    <img
                        src={node.photo}
                        alt={node.name}
                        className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-blue-100"
                    />
                )}
                <div className="text-center">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{node.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{node.title}</p>
                </div>
                <div className="mt-3 flex justify-center space-x-2">
                    <button
                        onClick={handleOpenProfileModal}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                    >
                        {translations.viewDetails}
                    </button>
                    {childrenNodes.length > 0 && (
                        <button
                            onClick={handleToggleChildren}
                            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 text-xs font-semibold py-1 px-3 rounded-full transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                            {showChildren ? translations.hideSubordinates : translations.showSubordinates}
                        </button>
                    )}
                </div>
            </div>

            {childrenNodes.length > 0 && showChildren && (
                <div className="flex flex-col items-center mt-2 w-full">
                    <div className="w-px h-6 bg-gray-400 dark:bg-gray-500"></div>
                    <div className="flex justify-center w-full">
                        {childrenNodes.map((child, index) => (
                            <React.Fragment key={child.id}>
                                {index > 0 && <div className="h-px w-6 bg-gray-400 dark:bg-gray-500"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex flex-row justify-center w-full">
                        {childrenNodes.map((child) => (
                            <OrgChartCard key={child.id} node={child} translations={translations} />
                        ))}
                    </div>
                </div>
            )}

            {showProfileModal && (
                <ProfileDetailModal
                    node={node}
                    onClose={handleCloseProfileModal}
                    translations={translations}
                />
            )}
        </div>
    );
};

export default OrgChartCard;
