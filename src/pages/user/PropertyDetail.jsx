import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Home, Bed, Bath, Soup, MapPin, Heart, ArrowLeft } from 'lucide-react';

const propertyData = {
  1: {
    images: [
      {
        src: '/house1.png',
        desc: 'Front view of the house with a beautiful garden and modern facade.',
        title: '4 BHK WITH GOOD FURNISHING AND GOOD NEIGHBOURHOOD',
        features: [
          'Spacious 4 BHK with natural light and city view.',
          'Modular kitchen and fully-furnished hall.',
          'Parking space, Wi-Fi, security, and garden.',
        ],
        tags: [
          { label: '4 Bedrooms', icon: <Bed className="w-4 h-4 mr-1" /> },
          { label: '2 Bathrooms', icon: <Bath className="w-4 h-4 mr-1" /> },
          { label: '1 Kitchen', icon: <Soup className="w-4 h-4 mr-1" /> },
        ],
      },
      {
        src: '/house2.jpg',
        desc: 'Spacious living room with elegant furnishings and natural light.',
        title: 'Elegant Living Room with Modern Furnishings',
        features: [
          'Large living area with premium sofa set.',
          'Floor-to-ceiling windows for ample sunlight.',
          'Open plan with dining and entertainment zone.',
        ],
        tags: [
          { label: 'Spacious Living', icon: <Bed className="w-4 h-4 mr-1" /> },
          { label: 'Modern Decor', icon: <Bath className="w-4 h-4 mr-1" /> },
        ],
      },
      {
        src: '/house3.jpg',
        desc: 'Modern kitchen with all amenities and a cozy dining area.',
        title: 'Modern Kitchen & Dining Area',
        features: [
          'Fully equipped modular kitchen.',
          'Cozy dining space for family meals.',
          'Premium appliances and ample storage.',
        ],
        tags: [
          { label: 'Modular Kitchen', icon: <Soup className="w-4 h-4 mr-1" /> },
          { label: 'Dining Area', icon: <Bed className="w-4 h-4 mr-1" /> },
        ],
      },
    ],
    price: 'Rs 56,000/month',
    location: 'Srijana Nagar, Bhaktapur, Kathmandu Valley',
  },
};

const similarHomes = [
  { id: 1, image: '/similar1.png', title: 'Modern 2BHK Apartment', price: 'Rs 42,000' },
  { id: 2, image: '/similar2.png', title: 'Spacious 3BHK Flat', price: 'Rs 55,000' },
  { id: 3, image: '/similar3.png', title: 'Luxury Villa with Garden', price: 'Rs 75,000' },
  { id: 4, image: '/similar4.png', title: 'Affordable Family House', price: 'Rs 36,000' },
];

const bgImage = '/luxuryhouse.jpg';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImg, setMainImg] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const property = propertyData[id] || propertyData[1];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 -z-20">
        <img src={bgImage} alt="Luxury House" className="w-full h-full object-cover object-center opacity-40" />
        <div
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
        <div
          className="w-full md:w-3/5 flex flex-col items-center justify-center relative"
        >
          {/* Floating Main Image */}
          <div
            className="relative drop-shadow-2xl"
          >
            <img
              src={property.images[mainImg].src}
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
          </div>
          {/* Thumbnails */}
          <div className="flex gap-6 mt-6 justify-center">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                onClick={() => setMainImg(idx)}
                className={`h-20 w-32 rounded-xl object-cover border-2 cursor-pointer transition-all duration-200 ${mainImg === idx ? 'border-blue-500 ring-2 ring-blue-300 scale-105' : 'border-white/70 hover:border-blue-300'}`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>
          {/* Dynamic Description for Main Image */}
          <div
            key={mainImg}
            className="mt-6 bg-white/80 rounded-xl shadow p-4 max-w-2xl text-center text-base text-gray-700"
          >
            {property.images[mainImg].desc}
          </div>
        </div>

        {/* Info Card */}
        <div
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
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1 drop-shadow">{property.images[mainImg].title}</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {property.images[mainImg].tags.map((tag, i) => (
              <span key={i} className="inline-flex items-center px-5 py-2 rounded-full text-base font-semibold shadow bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 gap-1">
                {tag.icon}{tag.label}
              </span>
            ))}
          </div>
          <ul className="list-disc ml-6 text-base space-y-2 text-gray-700 mt-2">
            {property.images[mainImg].features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold text-green-600">{property.price}</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-base font-semibold">Available</span>
          </div>
          <button
            onClick={() => navigate(`/booking/${id}`)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-xl mt-2"
          >
            Book Now
          </button>
        </div>
      </main>

      {/* Description */}
      <section
        className="max-w-4xl mx-auto px-6 mb-16"
      >
        <h3 className="text-3xl font-semibold mb-4 text-blue-700">Description</h3>
        <p className="text-lg text-gray-700 bg-white/80 rounded-2xl p-8 shadow-lg">
          This beautifully furnished property is perfect for families looking for a spacious and peaceful living environment.
          It features modern amenities and is located in a safe, green neighborhood close to shops, schools, and hospitals.
        </p>
      </section>

      {/* Similar Homes */}
      <section
        className="max-w-7xl mx-auto px-2 mb-24"
      >
        <h3 className="text-3xl font-semibold mb-8 text-blue-700">Similar Homes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
          {similarHomes.map((home) => (
            <div
              key={home.id}
              className="rounded-3xl shadow-2xl overflow-hidden bg-white/90 border-2 border-blue-200 flex flex-col transition-all duration-300 hover:shadow-3xl hover:border-blue-400 group"
            >
              <img src={home.image} alt={home.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xl font-bold text-blue-700 mb-2">{home.title}</p>
                  <p className="text-lg text-gray-600 mb-4">{home.price}</p>
                </div>
                <button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition mt-2 text-lg" onClick={() => navigate(`/booking/${home.id}`)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-blue-100 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
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
};

export default PropertyDetail;
