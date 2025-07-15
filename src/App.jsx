import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import LoginPage from './pages/auth/LoginPage';
import PropertyDetail from './pages/user/PropertyDetail';
import RentalWebsite from './pages/RentalWebsite';
import MyFavorites from './pages/user/MyFavorites';
import AdminDashboard from './pages/admin/AdminDashboard';
import Reseller from './components/Reseller';

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
      <Route path="/property/:id" element={<PropertyDetail />} />
      
      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />
      {/* Reseller Page */}
      <Route path="/reseller" element={<Reseller />} />
    </Routes>
  );
}

export default App;