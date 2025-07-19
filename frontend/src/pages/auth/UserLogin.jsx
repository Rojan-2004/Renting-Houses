import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

export default function UserLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors }
  } = useForm();

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors },
    reset: resetForgot
  } = useForm();

  const onSubmitLogin = async (data) => {
    setLoginMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      const result = await response.json();
      
      if (response.ok && result.user.role === 'user') {
        login(result.token, result.user);
        setLoginMessage("Login successful!");
        setTimeout(() => {
          navigate("/user/rental-houses");
        }, 1000);
      } else if (response.ok && result.user.role !== 'user') {
        setLoginMessage("Access denied. This login is for users only.");
      } else {
        setLoginMessage(result.message || result.error || "Login failed.");
      }
    } catch (error) {
      setLoginMessage("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitForgot = async (data) => {
    try {
      setLoginMessage("Password reset instructions sent to your email.");
      setShowModal(false);
      resetForgot();
    } catch (error) {
      setLoginMessage("Failed to send reset instructions.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img src="/luxuryhouse.jpg" alt="Background" className="w-full h-full object-cover object-center blur-[2px] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-white/10 to-purple-900/40" />
      </div>
      
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
      
      <div className="flex-1 flex items-center justify-center w-full py-16 px-2 md:px-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 relative">
          <h2 className="text-4xl font-extrabold mb-2 text-blue-700 tracking-tight drop-shadow text-center">User Login</h2>
          <p className="mb-6 text-gray-600 text-lg font-medium text-center">Login to your account</p>
          
          <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="w-full space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="Email Address"
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 cursor-pointer" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
              {loginErrors.password && <p className="text-red-600 text-xs mt-1">{loginErrors.password.message}</p>}
              
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          {loginMessage && (
            <p className={`mt-4 font-semibold text-center ${
              loginMessage.includes('successful') ? 'text-green-600' : 'text-red-600'
            }`}>{loginMessage}</p>
          )}
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/user-register" className="font-semibold text-blue-600 hover:underline">Register Now</Link>
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/seller-login" className="text-green-600 hover:underline">Seller Login</Link>
              <Link to="/admin-login" className="text-purple-600 hover:underline">Admin Login</Link>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">Reset Account Password</h2>
            <p className="text-center text-sm mb-6">
              Enter the email associated with your account and we'll send you password reset instructions.
            </p>
            <form onSubmit={handleSubmitForgot(onSubmitForgot)} className="space-y-4">
              <div>
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
                  className="w-full p-3 border rounded bg-gray-100"
                />
                {forgotErrors.email && <p className="text-red-600 text-sm">{forgotErrors.email.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black"
              >
                Send Reset Instructions
              </button>
            </form>
            <p
              className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Return to Login
            </p>
          </div>
        </div>
      )}
    </div>
  );
}