

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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm();

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors },
    reset: resetForgot
  } = useForm();

  const [otpSentMessage, setOtpSentMessage] = useState("");

  const onSubmitLogin = async (data) => {
    setSuccessMessage("");
    try {
      
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      const result = await response.json();
      if (response.success) {
        localStorage.setItem('token', result.data.access_token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          if (result.user.role === 'seller') {
          navigate("/seller/dashboard");
          }else {
            navigate("/");
          }
        }, 1000);
      } else {
        setSuccessMessage(result.message || result.error || "Login failed.");
      }
    } catch (error) {
      setSuccessMessage("Login failed. Please try again.");
    }
  };

  const onSubmitForgot = (data) => {
    setOtpSentMessage(`OTP sent to ${data.email}`);
    setTimeout(() => {
      setShowModal(false);
      setOtpSentMessage("");
      resetForgot();
    }, 2000);
  };

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
      <div className="flex-1 flex items-center justify-center w-full py-16 px-2 md:px-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 relative">
          <h2 className="text-4xl font-extrabold mb-2 text-blue-700 tracking-tight drop-shadow text-center">Login</h2>
          <p className="mb-6 text-gray-600 text-lg font-medium text-center">Welcome back! Please login to your account</p>
          <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="w-full space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="Email ID"
                {...registerLogin("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email"
                  }
                })}
                className="w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
              />
              {loginErrors.email && <p className="text-red-600 text-xs mt-1">{loginErrors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...registerLogin("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  className="w-full pl-10 pr-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
              {loginErrors.password && (
                <p className="text-red-600 text-xs ml-1">{loginErrors.password.message}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 text-sm hover:text-blue-700 hover:underline transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg mt-2">
              Login
            </button>
          </form>
          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold text-center">{successMessage}</p>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Don't have an Account? <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign Up</Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <Link to="/admin-login" className="font-semibold text-purple-600 hover:underline">Login as admin</Link>
          </p>
        </div>
      </div>
      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 w-[90%] max-w-md shadow-2xl border border-blue-100 relative">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Reset Account Password</h2>
            <p className="text-center text-base mb-6 text-gray-600">
              Enter the email associated with your account and we'll send you password reset instructions.
            </p>
            <form onSubmit={handleSubmitForgot(onSubmitForgot)} className="space-y-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...registerForgot("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email"
                    }
                  })}
                  className="w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
                />
                {forgotErrors.email && <p className="text-red-600 text-xs mt-1">{forgotErrors.email.message}</p>}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setOtpSentMessage("");
                    resetForgot();
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
            {otpSentMessage && (
              <p className="mt-4 text-green-600 font-semibold text-center">{otpSentMessage}</p>
            )}
          </div>
        </div>
      )}
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
