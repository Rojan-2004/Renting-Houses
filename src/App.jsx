
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import PropertyDetail from './PropertyDetail'; // make sure the path is correct
import RentalWebsite from './Components/RentalWebsite';
import MyFavorites from './components/MyFavorites';


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Home Page */}
        <Route path="/" element={<RentalWebsite/>} />
        
        {/* Favorites Page */}
        <Route path="/favorites" element={<MyFavorites/>} />
        
        {/* Other routes can be added later */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage/>} />
        {/* Property Detail Page (dynamic ID) */}
        {/* <Route path="/property/:id" element={<PropertyDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
