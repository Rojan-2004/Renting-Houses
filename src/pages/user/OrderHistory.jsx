import React, { useEffect, useState } from 'react';
import { Home, Calendar, MapPin, Bed, Bath, Square, Check, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Confirmed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  Completed: 'bg-blue-100 text-blue-700',
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Header */}
      <header className="w-full top-0 z-40 bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RENTAL BUDDY
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            Back
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Booking History
        </h1>
        <p className="text-gray-500 text-lg">View all your past and current property bookings.</p>
      </div>

      {/* Loading/Error States */}
      {loading && <div className="text-center text-lg text-gray-500">Loading bookings...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Booking Cards */}
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {!loading && !error && bookings.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No bookings found.</div>
        )}
        {bookings.map(booking => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full flex items-center justify-center bg-gray-100">
              {/* TODO: Replace with real property image when available */}
              <img
                src={booking.property?.image || '/luxuryhouse.jpg'}
                alt={booking.property?.name || 'Property'}
                className="object-cover w-full h-full"
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status] || 'bg-gray-100 text-gray-700'}`}>{booking.status}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{booking.property?.name || `Property #${booking.propertyId}`}</h2>
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {booking.property?.location || 'Location not available'}
              </div>
              <div className="flex space-x-4 text-gray-500 mb-2">
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1" />{booking.property?.beds || '-'} Beds</span>
                <span className="flex items-center"><Bath className="w-4 h-4 mr-1" />{booking.property?.baths || '-'} Baths</span>
                <span className="flex items-center"><Square className="w-4 h-4 mr-1" />{booking.property?.sqft || '-'} sqft</span>
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Booked on: <span className="font-medium text-gray-700">{new Date(booking.createdAt).toLocaleDateString()}</span></span>
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <Check className="w-4 h-4 mr-1 text-green-500" />
                <span>Check-in: <span className="font-medium text-gray-700">{new Date(booking.checkIn).toLocaleDateString()}</span></span>
                <span className="mx-2">-</span>
                <X className="w-4 h-4 mr-1 text-red-500" />
                <span>Check-out: <span className="font-medium text-gray-700">{new Date(booking.checkOut).toLocaleDateString()}</span></span>
              </div>
              <div className="mt-auto flex space-x-2">
                <button 
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-200 flex items-center justify-center"
                  onClick={() => navigate(`/user/property/${booking.propertyId}`)}
                >
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </button>
                {booking.status === 'Confirmed' && (
                  <button className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold shadow hover:bg-red-200 transition-colors duration-200">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 