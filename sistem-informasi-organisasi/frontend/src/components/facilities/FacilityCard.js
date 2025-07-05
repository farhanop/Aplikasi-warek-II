// frontend/src/components/facilities/FacilityCard.js
import React, { useState } from 'react';
import FacilityDetailModal from './FacilityDetailModal'; // Impor FacilityDetailModal

const FacilityCard = ({ facility, translations }) => {
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleOpenDetailModal = () => {
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
    };

    return (
        <div
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-3 m-2 flex-shrink-0 w-48 border border-gray-300 dark:border-gray-600 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={handleOpenDetailModal}
        >
            {facility.imageUrl && (
                <img src={facility.imageUrl} alt={facility.name} className="w-full h-32 object-cover rounded-md mb-3" />
            )}
            <h3 className="font-bold text-md text-gray-800 dark:text-gray-100 text-center">{facility.name}</h3>

            {showDetailModal && (
                <FacilityDetailModal facility={facility} onClose={handleCloseDetailModal} translations={translations} />
            )}
        </div>
    );
};

export default FacilityCard;
