// frontend/src/utils/apiConfig.js
import axios from 'axios';

// Sesuaikan dengan URL backend Anda
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token JWT ke setiap request yang memerlukan otentikasi
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // Ambil token dari localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;