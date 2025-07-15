<<<<<<< HEAD

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './SignUp';
// import LoginPage from './LoginPage';
// import PropertyDetail from './PropertyDetail'; // make sure the path is correct
// import RentalWebsite from './Components/RentalWebsite';

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* Home, Landlord, Tenants, etc. can be added later */}
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/" element={<RentalWebsite/>} />
//         <Route path="/login" element={<LoginPage/>} />
//         {/* Property Detail Page (dynamic ID) */}
//         <Route path="/property/:id" element={<PropertyDetail />} />
    
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SignUp from './SignUp';
import LoginPage from './LoginPage';
import PropertyDetail from './PropertyDetail';
import RentalWebsite from './Components/RentalWebsite';
import BookingPage from './BookingPage'; // ✅ newly added

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RentalWebsite />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import LoginPage from './pages/auth/LoginPage';
import PropertyDetail from './pages/user/PropertyDetail';
import RentalWebsite from './pages/RentalWebsite';
import MyFavorites from './pages/user/MyFavorites';
import AdminDashboard from './pages/admin/AdminDashboard';

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
    </Routes>
>>>>>>> 0e1c8ba04450bce82bcb326ef4c10a3264df6bac
  );
}

export default App;