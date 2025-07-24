import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const propertyData = {
  1: {
    images: [
      { src: '/house1.png', title: '4 BHK WITH GOOD FURNISHING', desc: 'Front view of the house.' },
    ],
    price: 'Rs 56,000/month',
    location: 'Srijana Nagar, Bhaktapur, Kathmandu Valley',
  },
  2: {
    images: [
      { src: '/house2.jpg', title: 'Elegant Living Room', desc: 'Spacious living room.' },
    ],
    price: 'Rs 42,000/month',
    location: 'Baneshwor, Kathmandu',
  },
  3: {
    images: [
      { src: '/house3.jpg', title: 'Modern Kitchen & Dining', desc: 'Modern kitchen and dining area.' },
    ],
    price: 'Rs 75,000/month',
    location: 'Lalitpur, Kathmandu Valley',
  },
};

export default function PropertyList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4">
      <header className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-20 mb-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Rental Buddy</span>
          </Link>
        </div>
      </header>
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center drop-shadow">All Properties</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {Object.entries(propertyData).map(([id, property]) => (
          <div key={id} className="bg-white/90 rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden hover:scale-105 transition-transform">
            <img src={property.images[0].src} alt={property.images[0].title} className="w-full h-64 object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">{property.images[0].title}</h2>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-lg font-semibold text-green-600 mb-4">{property.price}</p>
              </div>
              <Link
                to={`/property/${id}`}
                className="inline-block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg text-center mt-auto"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 