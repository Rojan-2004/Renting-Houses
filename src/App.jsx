import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import LoginPage from './pages/auth/LoginPage';
import PropertyDetail from './pages/user/PropertyDetail';
import RentalWebsite from './pages/RentalWebsite';
import MyFavorites from './pages/user/MyFavorites';
import AdminDashboard from './pages/admin/AdminDashboard';
import Reseller from './components/Reseller';
import OrderHistory from './pages/user/OrderHistory';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AdminProperties from './pages/admin/AdminProperties';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminReports from './pages/admin/AdminReports';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerDashboardHome from './pages/seller/SellerDashboardHome';
import SellerProperties from './pages/seller/SellerProperties';
import SellerTransactions from './pages/seller/SellerTransactions';
import SellerMessages from './pages/seller/SellerMessages';
import SellerSettings from './pages/seller/SellerSettings';
import BookingPage from './BookingPage';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import HelpPage from './pages/help/HelpPage';
import LogoutHandler from './components/LogoutHandler';
import AdminLogin from './pages/auth/AdminLogin';

function App() {
  return (
    <Routes>
      {/* Main Home Page */}
      <Route path="/" element={<RentalWebsite />} />
      {/* Favorites Page */}
      <Route path="/favorites" element={<MyFavorites />} />
      {/* Other routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/help" element={<HelpPage />} />
      {/* Admin Dashboard Nested Routes */}
      <Route path="/admin/*" element={<AdminDashboard />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardHome />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="logout" element={<LogoutHandler />} />
      </Route>
      {/* Seller Dashboard Nested Routes */}
      <Route path="/seller/*" element={<SellerDashboard />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SellerDashboardHome />} />
        <Route path="properties" element={<SellerProperties />} />
        <Route path="transactions" element={<SellerTransactions />} />
        <Route path="messages" element={<SellerMessages />} />
        <Route path="settings" element={<SellerSettings />} />
        <Route path="logout" element={<LogoutHandler />} />
      </Route>
      {/* Reseller Page */}
      <Route path="/reseller" element={<Reseller />} />
    </Routes>
  );
}

export default App;