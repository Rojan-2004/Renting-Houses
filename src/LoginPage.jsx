// import React from "react";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
//         <div className="flex items-center space-x-2">
//           <img src="/logo.png" alt="Logo" className="h-10 w-10" />
//           <span className="text-xl font-bold">RENTAL BUDDY</span>
//         </div>
//         <ul className="flex space-x-6 text-sm font-medium">
//           <li><a href="#" className="hover:text-blue-600">Home</a></li>
//           <li><a href="#" className="hover:text-blue-600">Landlord</a></li>
//           <li><a href="#" className="hover:text-blue-600">Tenants</a></li>
//           <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
//           <li><a href="#" className="hover:text-blue-600">Login/Sign-Up</a></li>
//         </ul>
//       </nav>

//       {/* Main Section */}
//       <div className="flex flex-col md:flex-row flex-grow">
//         {/* Login Form */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
//           <h1 className="text-2xl font-bold mb-2">Hello! Welcome!</h1>
//           <p className="mb-4">Lets Login To Your Account</p>
//           <input
//             type="email"
//             placeholder="Email ID"
//             className="w-full max-w-sm p-2 mb-4 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full max-w-sm p-2 mb-4 border rounded"
//           />
//           <button className="w-full max-w-sm bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//             Login
//           </button>
//           <p className="mt-4">
//             Don’t have an Account? <a href="#" className="text-blue-600">Sign In Now</a>
//           </p>
//         </div>

//         {/* Image */}
//         <div className="w-full md:w-1/2">
//           <img
//             src="../public/luxuryhouse.jpg"
//             alt="Luxury House"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white py-6 px-8 border-t">
//         <div className="flex flex-col items-center space-y-2">
//           <img src="/logo.png" alt="Logo" className="h-10" />
//           <p className="text-sm">Primary: 46003 Balkumari Nagar, KATHMANDU, Valley</p>
//           <p className="text-sm">+1234 456 888 | rentalbuddy@gmail.com</p>
//           <div className="flex space-x-4 mt-2">
//             <a href="#" className="text-red-600">❤️</a>
//             <a href="#" className="text-blue-600">📘</a>
//             <a href="#" className="text-red-500">📷</a>
//             <a href="#" className="text-blue-400">🐦</a>
//           </div>
//           <div className="mt-4 text-xs space-x-4">
//             <a href="#" className="hover:underline">ABOUT US</a>
//             <a href="#" className="hover:underline">CONTACT US</a>
//             <a href="#" className="hover:underline">HELP</a>
//             <a href="#" className="hover:underline">PRIVACY POLICY</a>
//             <a href="#" className="hover:underline">DISCLAIMER</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">RENTAL BUDDY</span>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><a href="#" className="hover:text-blue-600">Landlord</a></li>
          <li><a href="#" className="hover:text-blue-600">Tenants</a></li>
          <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
          <li><a href="#" className="hover:text-blue-600">Login/Sign-Up</a></li>
        </ul>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-2xl font-bold mb-2">Hello! Welcome!</h1>
          <p className="mb-4">Lets Login To Your Account</p>
          <input
            type="email"
            placeholder="Email ID"
            className="w-full max-w-sm p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full max-w-sm p-2 mb-4 border rounded"
          />
          <button className="w-full max-w-sm bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
          <p className="mt-4">
            Don’t have an Account? <Link to="/signup" className="text-blue-600">Sign In Now</Link>
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/luxuryhouse.jpg" // Place image inside `public/`
            alt="Luxury House"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 px-8 border-t">
        <div className="flex flex-col items-center space-y-2">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <p className="text-sm">Primary: 46003 Balkumari Nagar, KATHMANDU, Valley</p>
          <p className="text-sm">+1234 456 888 | rentalbuddy@gmail.com</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-red-600">❤️</a>
            <a href="#" className="text-blue-600">📘</a>
            <a href="#" className="text-red-500">📷</a>
            <a href="#" className="text-blue-400">🐦</a>
          </div>
          <div className="mt-4 text-xs space-x-4">
            <a href="#" className="hover:underline">ABOUT US</a>
            <a href="#" className="hover:underline">CONTACT US</a>
            <a href="#" className="hover:underline">HELP</a>
            <a href="#" className="hover:underline">PRIVACY POLICY</a>
            <a href="#" className="hover:underline">DISCLAIMER</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
