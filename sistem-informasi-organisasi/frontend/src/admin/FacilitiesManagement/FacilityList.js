// frontend/src/admin/FacilitiesManagement/FacilityList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { getTranslation } from '../../utils/translations';

function FacilityList() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLang, setCurrentLang] = useState('id');

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/facilities');
            setFacilities(response.data);
        } catch (err) {
            console.error('Error fetching facilities:', err);
            setError(getTranslation(currentLang, 'actionFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(getTranslation(currentLang, 'confirmDelete'))) {
            try {
                await api.delete(`/facilities/${id}`);
                alert(getTranslation(currentLang, 'actionSuccessful'));
                fetchFacilities();
            } catch (err) {
                console.error('Error deleting facility:', err);
                alert(getTranslation(currentLang, 'actionFailed'));
            }
        }
    };

    if (loading) {
        return <div className="text-center p-4">Memuat fasilitas...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">{getTranslation(currentLang, 'manageFacilities')}</h2>
            <div className="flex justify-end mb-4">
                <Link to="new" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    {getTranslation(currentLang, 'addFacility')}
                </Link>
            </div>

            {facilities.length === 0 ? (
                <p className="text-center">Belum ada fasilitas.</p>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'name')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'language')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {getTranslation(currentLang, 'actions')}
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {facilities.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.language.toUpperCase()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link to={`edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                        {getTranslation(currentLang, 'edit')}
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        {getTranslation(currentLang, 'delete')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FacilityList;