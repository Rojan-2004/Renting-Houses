

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    setSuccessMessage("");
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          password: data.password
        })
      });
      const result = await response.json();
      if (response.status) {
        setSuccessMessage("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        setSuccessMessage(result.error || "Registration failed.");
      }
    } catch (error) {
      setSuccessMessage("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 -z-20">
        <img src="/livingroom.jpg" alt="Background" className="w-full h-full object-cover object-center blur-[2px] scale-105" />
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
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 relative">
          <h2 className="text-4xl font-extrabold mb-2 text-blue-700 tracking-tight drop-shadow text-center">Sign Up</h2>
          <p className="mb-6 text-gray-600 text-lg font-medium text-center">Create your account to get started</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="User Name"
                {...register("username", { required: "Username is required" })}
                className="w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
              />
              {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Phone className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Phone No."
                {...register("phone", { required: "Phone number is required" })}
                className="w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="Email ID"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full pl-10 pr-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 cursor-pointer" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match"
                })}
                className="w-full pl-10 pr-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none shadow-sm bg-blue-50 text-base"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 cursor-pointer" onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
              {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg mt-2">
              Sign Up
            </button>
          </form>
          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold text-center">{successMessage}</p>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Already have an Account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Login Now</Link>
          </p>
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
