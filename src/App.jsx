import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import PropertyDetail from './PropertyDetail';
import RentalWebsite from './components/RentalWebsite';
import MyFavorites from './components/MyFavorites';
import AdminDashboard from './AdminDashboard';
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