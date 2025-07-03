
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import RentalWebsite from './Components/RentalWebsite.jsx';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home, Landlord, Tenants, etc. can be added later */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<div className="text-center p-10 text-xl">Welcome to Rental Buddy</div>} />
        <Route path="/login" element={<div className="text-center p-10 text-xl">Login Page (Coming Soon)</div>} />
        <Route path="/landlord" element={<div className="text-center p-10 text-xl">Landlord Page (Coming Soon)</div>} />
        <Route path="/tenants" element={<div className="text-center p-10 text-xl">Tenants Page (Coming Soon)</div>} />
        <Route path="/contact" element={<div className="text-center p-10 text-xl">Contact Us (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;

>>>>>>> origin/Jessica
