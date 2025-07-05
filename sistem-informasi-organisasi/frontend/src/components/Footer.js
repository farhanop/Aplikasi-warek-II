// frontend/src/components/Footer.js
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center p-4">
            © {new Date().getFullYear()} Universitas UIGM. All rights reserved.
        </footer>
    );
}
