// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/chart">Chart</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/news">News</Link>
                <Link to="/vision-mission">Vision & Mission</Link>
            </div>
        </nav>
    );
}
