import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow">About Rental Buddy</h1>
        <p className="text-lg text-gray-700 mb-4">
          Rental Buddy is your trusted partner in finding the perfect home in Kathmandu Valley. We specialize in premium properties with modern amenities and exceptional service. Our mission is to make renting easy, transparent, and enjoyable for everyone.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you are looking for a family home, a luxury apartment, or a cozy studio, Rental Buddy offers a curated selection of properties to suit your needs. Our team is dedicated to providing personalized support and guidance throughout your rental journey.
        </p>
        <p className="text-lg text-gray-700">
          Thank you for choosing Rental Buddy. We look forward to helping you find your next home!
        </p>
      </div>
    </div>
  );
} 