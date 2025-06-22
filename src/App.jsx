// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import PropertyDetail from './PropertyDetail'; // make sure the path is correct

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={<div className="text-center p-10 text-xl">Welcome to Rental Buddy</div>}
        />

        {/* Auth Pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Property Detail Page (dynamic ID) */}
        <Route path="/property/:id" element={<PropertyDetail />} />

        {/* Placeholder Pages */}
        <Route path="/landlord" element={<div className="text-center p-10 text-xl">Landlord Page (Coming Soon)</div>} />
        <Route path="/tenants" element={<div className="text-center p-10 text-xl">Tenants Page (Coming Soon)</div>} />
        <Route path="/contact" element={<div className="text-center p-10 text-xl">Contact Us (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
