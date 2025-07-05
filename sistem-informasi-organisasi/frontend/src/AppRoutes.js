// src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Komponen umum
import Header from './components/Header';
import Footer from './components/Footer';

// Pages publik
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OrganizationStructurePage from './pages/OrganizationStructurePage';
import FacilitiesPage from './pages/FacilitiesPage';
import UniversityNewsPage from './pages/UniversityNewsPage';
import VisionMissionPage from './pages/VisionMissionPage';
import LoginPage from './pages/LoginPage';

// Admin pages
import AdminDashboard from './admin/AdminDashboard';
import AdminChartEdit from './admin/AdminChartEdit';
import AdminFacilitiesEdit from './admin/AdminFacilitiesEdit';
import AdminNewsEdit from './admin/AdminNewsEdit';

function AppRoutes() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/organization-structure" element={<OrganizationStructurePage />} />
                    <Route path="/facilities" element={<FacilitiesPage />} />
                    <Route path="/university-news" element={<UniversityNewsPage />} />
                    <Route path="/vision-mission" element={<VisionMissionPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/chart-edit" element={<AdminChartEdit />} />
                    <Route path="/admin/facilities-edit" element={<AdminFacilitiesEdit />} />
                    <Route path="/admin/news-edit" element={<AdminNewsEdit />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default AppRoutes;
