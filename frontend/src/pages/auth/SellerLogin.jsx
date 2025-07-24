import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

export default function SellerLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmitLogin = async (data) => {
    setLoginMessage("");
    setIsLoading(true);
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
      
      if (response.ok && result.user.role === 'seller') {
        login(result.token, result.user);
        setLoginMessage("Login successful!");
        setTimeout(() => {
          navigate("/seller/dashboard");
        }, 1000);
      } else if (response.ok && result.user.role !== 'seller') {
        setLoginMessage("Access denied. This login is for sellers only.");
      } else {
        setLoginMessage(result.message || result.error || "Login failed.");
      }
    } catch (error) {
      setLoginMessage("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img src="/luxuryhouse.jpg" alt="Background" className="w-full h-full object-cover object-center blur-[2px] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-white/10 to-blue-900/40" />
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
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-green-100 relative">
          <h2 className="text-4xl font-extrabold mb-2 text-green-700 tracking-tight drop-shadow text-center">Seller Login</h2>
          <p className="mb-6 text-gray-600 text-lg font-medium text-center">Login to your seller account</p>
          
          <form onSubmit={handleSubmit(onSubmitLogin)} className="w-full space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="Seller Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email"
                  }
                })}
                className="w-full pl-10 pr-3 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm bg-green-50 text-base"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full pl-10 pr-10 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm bg-green-50 text-base"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 cursor-pointer" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:from-green-700 hover:to-blue-700 transition text-lg mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login as Seller'}
            </button>
          </form>
          
          {loginMessage && (
            <p className={`mt-4 font-semibold text-center ${
              loginMessage.includes('successful') ? 'text-green-600' : 'text-red-600'
            }`}>{loginMessage}</p>
          )}
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have a seller account? <Link to="/seller-register" className="font-semibold text-green-600 hover:underline">Register Now</Link>
            </p>
            <button
              className="text-green-600 underline hover:text-green-800 font-semibold text-sm transition"
              onClick={() => navigate('/login')}
            >
              Back to user login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
