// C:\Users\farhanop\Documents\Projects\sistem-informasi-organisasi\backend\src\controllers\authController.js

const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        const { username, password, role } = req.body;
        try {
            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(409).json({ message: 'Username sudah terdaftar.' });
            }

            const password_hash = await bcrypt.hash(password, 10);

            const newUser = {
                username,
                password_hash,
                role: role || 'user'
            };
            await UserModel.create(newUser);

            res.status(201).json({ message: 'Registrasi berhasil.' });
        } catch (error) {
            console.error('Error saat registrasi:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Username atau password salah.' });
            }

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Username atau password salah.' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(200).json({
                message: 'Login berhasil.',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Error saat login:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server.' });
        }
    },

    logout: (req, res) => {
        res.status(200).json({ message: 'Logout berhasil. Token telah dihapus dari sisi klien.' });
    },

    getProfile: (req, res) => {
        if (req.user) {
            res.status(200).json({
                message: 'Data profil pengguna.',
                user: {
                    id: req.user.id,
                    username: req.user.username,
                    role: req.user.role
                }
            });
        } else {
            res.status(401).json({ message: 'Tidak terotentikasi.' });
        }
    }
};

module.exports = authController;