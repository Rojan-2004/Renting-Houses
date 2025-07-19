

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";

// export default function LoginPage() {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [showModal, setShowModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const onSubmitLogin = (data) => {
//     alert(`Welcome back, ${data.email}!`);
//     setSuccessMessage(`Login successful for ${data.email}`);
//   };

//   const onSubmitForgot = (data) => {
//     alert(`OTP sent to ${data.email}`);
//     setShowModal(false);
//     reset();
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
//         <div className="flex items-center space-x-2">
//           <img src="/logo.png" alt="Logo" className="h-10 w-10" />
//           <span className="text-xl font-bold">RENTAL BUDDY</span>
//         </div>
//         <ul className="flex space-x-6 text-sm font-medium">
//           <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
//         </ul>
//       </nav>

//       {/* Main Section */}
//       <div className="flex flex-col md:flex-row flex-grow">
//         {/* Login Form */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
//           <h1 className="text-2xl font-bold mb-2">Hello! Welcome!</h1>
//           <p className="mb-4">Let's Login To Your Account</p>

//           <form onSubmit={handleSubmit(onSubmitLogin)} className="w-full max-w-sm space-y-4">
//             <div>
//               <input
//                 type="email"
//                 placeholder="Email ID"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Invalid email"
//                   }
//                 })}
//                 className="w-full p-2 border rounded"
//               />
//               {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Minimum 6 characters" }
//                 })}
//                 className="w-full p-2 border rounded"
//               />
//               {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
//               <div className="text-right mt-1">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(true)}
//                   className="text-blue-600 text-sm hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//               Login
//             </button>
//           </form>

//           {successMessage && (
//             <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
//           )}

//           <p className="mt-4">
//             Don’t have an Account? <Link to="/signup" className="text-blue-600">Sign In Now</Link>
//           </p>
//         </div>

//         {/* Image */}
//         <div className="w-full md:w-1/2">
//           <img
//             src="/luxuryhouse.jpg"
//             alt="Luxury House"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-8 w-[90%] max-w-md shadow-lg">
//             <h2 className="text-xl font-bold text-center mb-4">Reset Account Password</h2>
//             <p className="text-center text-sm mb-6">
//               Enter The Email Associated With Your Account And We'll Send You Password Reset Instructions.
//             </p>
//             <form onSubmit={handleSubmit(onSubmitForgot)} className="space-y-4">
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email ID"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: "Invalid email"
//                     }
//                   })}
//                   className="w-full p-3 border rounded bg-gray-100"
//                 />
//                 {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black"
//               >
//                 Send OTP
//               </button>
//             </form>
//             <p
//               className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer"
//               onClick={() => setShowModal(false)}
//             >
//               Return to Signin
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building, Shield } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const loginOptions = [
    {
      title: "User Login",
      description: "Login as a regular user to browse and rent properties",
      icon: User,
      path: "/user-login",
      color: "from-blue-600 to-purple-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Seller Login",
      description: "Login as a property seller to manage your listings",
      icon: Building,
      path: "/seller-login",
      color: "from-green-600 to-blue-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Admin Login",
      description: "Login as an administrator to manage the platform",
      icon: Shield,
      path: "/admin-login",
      color: "from-purple-600 to-blue-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];


  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 -z-20">
        <img src="/luxuryhouse.jpg" alt="Background" className="w-full h-full object-cover object-center blur-[2px] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-white/10 to-purple-900/40" />
      </div>
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Rental Buddy" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Rental Buddy</span>
          </Link>
          <nav className="space-x-6 text-gray-700 text-sm font-medium hidden md:block">
            <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
            <Link to="/help" className="hover:text-blue-600 transition">Help</Link>
          </nav>
        </div>
      </header>
      {/* Main Section */}
      <div className="flex-1 flex items-center justify-center w-full py-16 px-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Login Type
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Select your account type to continue
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {loginOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(option.path)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`${option.bgColor} rounded-3xl p-8 shadow-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 h-full flex flex-col items-center text-center`}>
                    <div className={`${option.iconColor} mb-6 p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <IconComponent className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <button className={`w-full py-3 bg-gradient-to-r ${option.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                      Continue
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600">
              Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign Up Here</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-blue-100 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/logo.png" alt="Rental Buddy" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Rental Buddy</span>
          </div>
          <div className="text-gray-500 text-sm text-center md:text-left">
            44800, Bhaktapur, Srijana Nagar, Kathmandu Valley, Nepal<br />
            (123) 456-7890 | rentalbuddy@gmail.com
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">
          &copy; 2025 Rental Buddy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
