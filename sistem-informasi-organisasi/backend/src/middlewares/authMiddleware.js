const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan atau format salah.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Memverifikasi dengan JWT_SECRET
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error saat verifikasi token:', error); // Pesan ini penting
        // Pesan error dari jwt.verify bisa: JsonWebTokenError (invalid signature), TokenExpiredError (jwt expired), dll.
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token kadaluarsa. Silakan login kembali.' });
        }
        return res.status(403).json({ message: 'Token tidak valid. Akses ditolak.' });
    }
};

module.exports = authMiddleware;