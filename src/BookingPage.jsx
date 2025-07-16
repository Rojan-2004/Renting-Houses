import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
  });

  const [isBooked, setIsBooked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();

    // Validation (basic)
    if (!formData.name || !formData.email || !formData.address || !formData.contact) {
      alert('Please fill all the fields!');
      return;
    }

    // Simulate booking
    setIsBooked(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-blue-600 py-4 shadow-md">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Rental Buddy" className="h-10 w-10" />
            <span className="text-white text-2xl font-bold">Rental Buddy</span>
          </Link>
          <nav className="space-x-6 text-white text-sm font-medium">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/help" className="hover:underline">Help</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 px-6 py-10 flex flex-col items-center"
      >
        <div className="max-w-xl w-full bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Book Property #{id}</h2>

          {isBooked ? (
            <div className="text-center">
              <h3 className="text-green-600 text-xl font-semibold">✅ Booked Successfully!</h3>
              <p className="text-gray-600 mt-2">We will contact you soon.</p>
              <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Go to Home</Link>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block font-medium text-sm">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your city or street"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Book
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-white py-6 border-t">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Rental Buddy" className="h-12 mb-2" />
          <p className="text-sm text-center">44800,Bhaktapur,Srijana Nagar,Kathamndu Valley,Nepal</p>
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
};

export default BookingPage;
