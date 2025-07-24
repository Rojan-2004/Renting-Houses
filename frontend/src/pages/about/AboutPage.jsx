import React from 'react';

const galleryImages = [
  '/house1.png',
  '/house2.jpg',
  '/house3.jpg',
  '/livingroom.jpg',
  '/luxuryhouse.jpg',
  '/public/images/home.jpg',
  '/public/images/house.jpg',
  '/similar1.png',
  '/similar2.png',
  '/similar3.png',
  '/similar4.png',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-72 md:h-96 flex items-center justify-center">
        <img
          src="/luxuryhouse.jpg"
          alt="Luxury House"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-[2px] brightness-90 -z-10"
        />
        {/* Stronger dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/70 -z-10" />
        <div className="z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] mb-4">
            About Rental Buddy
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Your trusted partner for finding the perfect home in Kathmandu Valley. Modern, easy, and transparent renting.
          </p>
        </div>
      </div>
      {/* About Description */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Rental Buddy specializes in premium properties with modern amenities and exceptional service. Our mission is to make renting easy, transparent, and enjoyable for everyone. Whether you are looking for a family home, a luxury apartment, or a cozy studio, Rental Buddy offers a curated selection of properties to suit your needs.
          </p>
          <p className="text-lg text-gray-700 text-center">
            Our team is dedicated to providing personalized support and guidance throughout your rental journey. Thank you for choosing Rental Buddy. We look forward to helping you find your next home!
          </p>
        </div>
      </div>
      {/* Services Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-purple-100 hover:scale-105 transition-transform">
            <img src="/house1.png" alt="Property Selection" className="w-24 h-24 object-cover rounded-xl mb-4 shadow" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Curated Property Listings</h3>
            <p className="text-gray-600 text-center">Browse a handpicked selection of premium homes, apartments, and studios tailored to your needs and budget.</p>
          </div>
          {/* Service 2 */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-purple-100 hover:scale-105 transition-transform">
            <img src="/livingroom.jpg" alt="Virtual Tours" className="w-24 h-24 object-cover rounded-xl mb-4 shadow" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Virtual Tours & Photos</h3>
            <p className="text-gray-600 text-center">Experience properties online with high-quality images and virtual tours, making your search convenient and efficient.</p>
          </div>
          {/* Service 3 */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-purple-100 hover:scale-105 transition-transform">
            <img src="/images/User.png" alt="Support" className="w-24 h-24 object-cover rounded-xl mb-4 shadow" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Personalized Support</h3>
            <p className="text-gray-600 text-center">Get expert guidance and support throughout your rental journey, from search to move-in and beyond.</p>
          </div>
        </div>
      </div>
      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl shadow-lg border border-blue-100 bg-white/70 hover:scale-105 hover:z-10 transition-transform duration-300"
            >
              <img
                src={src}
                alt={`Property ${idx + 1}`}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 