// frontend/src/components/auth/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { getTranslation } from '../../utils/translations';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentLang, setCurrentLang] = useState('id');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('userRole', response.data.user.role);
            // alert(getTranslation(currentLang, 'loginSuccess')); // Baris ini dihapus/dikomentari
            navigate('/admin'); // Langsung redirect tanpa alert
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            setError(getTranslation(currentLang, 'loginFailed'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
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

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    {getTranslation(currentLang, 'adminLogin')}
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                            {getTranslation(currentLang, 'username')}
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            {getTranslation(currentLang, 'password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {getTranslation(currentLang, 'login')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;