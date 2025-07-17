import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Bed, Bath, Soup, MapPin, Heart, ArrowLeft, Square } from 'lucide-react';

const propertyData = {
  1: {
    images: ['/house1.png'],
    price: 'NPR 2,50,000',
    originalPrice: 'NPR 3,00,000',
    location: 'Thamel, Kathmandu',
    beds: 3,
    baths: 2,
    sqft: 1200,
    features: ['Furnished', 'Parking', 'WiFi', 'Security'],
    type: 'apartment',
    availableFrom: 'Immediately',
    description: 'Beautiful apartment in the heart of Thamel with modern amenities and great connectivity.',
    rating: 4.8,
    reviews: 24,
  },
  2: {
    images: ['/house2.jpg'],
    price: 'NPR 3,75,000',
    originalPrice: 'NPR 4,25,000',
    location: 'Lazimpat, Kathmandu',
    beds: 4,
    baths: 3,
    sqft: 1800,
    features: ['Garden', 'Balcony', 'Gym', 'Pool'],
    type: 'house',
    availableFrom: 'Jan 15, 2025',
    description: 'Spacious house in prestigious Lazimpat area with garden and modern facilities.',
    rating: 4.9,
    reviews: 31,
  },
  3: {
    images: ['/house3.jpg'],
    price: 'NPR 1,85,000',
    originalPrice: 'NPR 2,15,000',
    location: 'Baneshwor, Kathmandu',
    beds: 2,
    baths: 2,
    sqft: 950,
    features: ['Metro Access', 'Shopping Mall', 'Restaurants'],
    type: 'apartment',
    availableFrom: 'Feb 1, 2025',
    description: 'Convenient apartment with excellent connectivity and nearby amenities.',
    rating: 4.6,
    reviews: 18,
  },
  4: {
    images: ['/luxuryhouse.jpg'],
    price: 'NPR 5,20,000',
    originalPrice: 'NPR 6,00,000',
    location: 'Durbarmarg, Kathmandu',
    beds: 5,
    baths: 4,
    sqft: 2500,
    features: ['Luxury', 'City View', 'Concierge', 'Valet'],
    type: 'villa',
    availableFrom: 'March 1, 2025',
    description: 'Luxury villa in the most prestigious location of Kathmandu with premium amenities.',
    rating: 5.0,
    reviews: 42,
  },
  5: {
    images: ['/livingroom.jpg'],
    price: 'NPR 3,25,000',
    originalPrice: 'NPR 3,75,000',
    location: 'Boudha, Kathmandu',
    beds: 3,
    baths: 2,
    sqft: 1400,
    features: ['Temple View', 'Peaceful', 'Cultural Area'],
    type: 'house',
    availableFrom: 'Jan 20, 2025',
    description: 'Peaceful home near Boudhanath Stupa with cultural significance and serene environment.',
    rating: 4.7,
    reviews: 27,
  },
  6: {
    images: ['/similar1.png'],
    price: 'NPR 2,95,000',
    originalPrice: 'NPR 3,35,000',
    location: 'Baluwatar, Kathmandu',
    beds: 3,
    baths: 3,
    sqft: 1350,
    features: ['Embassy Area', 'Secure', 'Premium Location'],
    type: 'apartment',
    availableFrom: 'Feb 15, 2025',
    description: 'Premium apartment in diplomatic area with high security and excellent facilities.',
    rating: 4.8,
    reviews: 35,
  },
};

const bgImage = '/luxuryhouse.jpg';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImg, setMainImg] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const property = propertyData[id];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-red-600 font-bold">
        Property not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 -z-20">
        <img src={bgImage} alt="Luxury House" className="w-full h-full object-cover object-center opacity-40" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-400/10 to-purple-900/60 animate-gradient-x"
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
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
      <main className="flex-1 flex flex-col md:flex-row gap-10 px-0 py-12 max-w-7xl mx-auto w-full">
        {/* Images + Description */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-3/5 flex flex-col items-center justify-center relative"
        >
          {/* Floating Main Image */}
          <motion.div
            className="relative drop-shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src={property.images[mainImg]}
              className="w-full max-w-3xl h-96 object-cover rounded-2xl shadow-xl border-4 border-white/70 transition-all duration-300"
              alt="Main Property"
            />
            {/* Heart/Favorite Button */}
            <button
              onClick={() => setIsFavorite(fav => !fav)}
              className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 shadow-lg border-2 border-white transition-all duration-300 ${isFavorite ? 'scale-110' : ''}`}
              aria-label="Add to favorites"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </motion.div>
          {/* Thumbnails */}
          <div className="flex gap-6 mt-6 justify-center">
            {property.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                onClick={() => setMainImg(idx)}
                whileHover={{ scale: 1.12 }}
                className={`h-20 w-32 rounded-xl object-cover border-2 cursor-pointer transition-all duration-200 ${mainImg === idx ? 'border-blue-500 ring-2 ring-blue-300 scale-105' : 'border-white/70 hover:border-blue-300'}`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>
          {/* Dynamic Description for Main Image */}
          <motion.div
            key={mainImg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-white/80 rounded-xl shadow p-4 max-w-2xl text-center text-base text-gray-700"
          >
            {property.description}
          </motion.div>
        </motion.div>
        {/* Info Card */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-2/5 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100 relative mt-8 md:mt-0"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)' }}
        >
          <button onClick={() => navigate(-1)} className="absolute left-6 top-6 text-blue-500 hover:text-blue-700 transition flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="text-gray-600 font-medium text-sm">{property.location}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1 drop-shadow">{property.location}</h2>
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.beds} Beds
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths} Baths
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.sqft} sqft
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.map((feature, featureIndex) => (
              <span 
                key={featureIndex}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
          <ul className="list-disc ml-6 text-base space-y-2 text-gray-700 mt-2">
            <li>{property.description}</li>
          </ul>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold text-green-600">{property.price}</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-base font-semibold">Available {property.availableFrom}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/booking/${id}`)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-xl mt-2"
          >
            Book Now
          </motion.button>
        </motion.div>
      </main>
      {/* Description */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 mb-16"
      >
        <h3 className="text-3xl font-semibold mb-4 text-blue-700">Description</h3>
        <p className="text-lg text-gray-700 bg-white/80 rounded-2xl p-8 shadow-lg">
          {property.description}
        </p>
      </motion.section>
      {/* Footer and similar homes remain unchanged */}
    </div>
  );
};

export default PropertyDetail;
