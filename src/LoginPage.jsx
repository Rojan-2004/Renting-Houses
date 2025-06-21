

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data) => {
    console.log("Login data submitted:", data);
    alert(`Welcome back, ${data.email}!`);
    setSuccessMessage(`Login successful for ${data.email}`);
  };

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
          <p className="mb-4">Let's Login To Your Account</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email ID"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full p-2 border rounded"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
          )}

          <p className="mt-4">
            Don’t have an Account? <Link to="/signup" className="text-blue-600">Sign In Now</Link>
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/luxuryhouse.jpg"
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
