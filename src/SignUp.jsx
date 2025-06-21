

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Success
    alert(`Welcome, ${data.username}! You have successfully signed up.`);
    setSuccessMessage(`Hello ${data.username}, your account has been created.`);
    console.log("Submitted data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b">
        <img src="/logo.png" alt="Rental Buddy" className="h-10" />
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/landlord" className="hover:underline">Landlord</Link>
          <Link to="/tenants" className="hover:underline">Tenants</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/signup" className="hover:underline">Login/Sign Up</Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Left image */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: 'url(/livingroom.jpg)' }}
        ></div>

        {/* Form */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center px-16 py-10">
          <h2 className="text-2xl font-bold mb-2">Hello!<br />Nice to meet you!</h2>
          <p className="mb-4 font-semibold">Let's Sign Up</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="User Name"
                {...register("username", { required: "Username is required" })}
                className="w-full p-3 border rounded"
              />
              {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone No."
                {...register("phone", { required: "Phone number is required" })}
                className="w-full p-3 border rounded"
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email ID"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 border rounded"
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
                className="w-full p-3 border rounded"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match"
                })}
                className="w-full p-3 border rounded"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" className="w-full p-3 bg-indigo-500 text-white font-bold rounded">
              Sign Up
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
          )}

          <p className="mt-2 text-sm">
            Already have an Account? <Link to="/login" className="font-semibold text-black">Login Now</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 border-t">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Rental Buddy" className="h-12 mb-2" />
          <p className="text-sm text-center">Bhotahity-449002, Sifalganj Nayafer, Kathmandu Valley</p>
          <p className="text-sm">(123) 456-7890 | rentalbuddy@gmail.com</p>
          <div className="flex space-x-3 mt-2">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="mt-4 space-x-4 text-xs">
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT US</Link>
            <Link to="/help">HELP</Link>
            <Link to="/privacy">PRIVACY POLICY</Link>
            <Link to="/disclaimer">DISCLAIMER</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
