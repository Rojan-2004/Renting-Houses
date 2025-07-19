import React, { useEffect, useState } from 'react';
import { Home, Calendar, MapPin, Bed, Bath, Square, Check, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  approved: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  rejected: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  approved: 'Approved',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
  completed: 'Completed',
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('#user-dropdown-btn') && !event.target.closest('#user-dropdown-menu')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        console.log('API Response:', data);
        if (data.data) {
          setBookings(data.data || []);
        } else {
          throw new Error(data.message || 'Failed to fetch bookings');
        }
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
          <div className="flex items-center space-x-4">
            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  id="user-dropdown-btn"
                  onClick={() => setUserDropdownOpen(v => !v)}
                  className="text-blue-700 font-semibold px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {user.name}
                </button>
                {userDropdownOpen && (
                  <div id="user-dropdown-menu" className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      onClick={() => { setUserDropdownOpen(false); navigate('/profile'); }}
                    >
                      View Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 border-t border-gray-100"
                      onClick={() => { setUserDropdownOpen(false); localStorage.removeItem('user'); localStorage.removeItem('token'); window.dispatchEvent(new Event('userLogin')); navigate('/login'); }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-300"
              >
                Login
              </button>
            )}
            
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-200"
            >
              Back
            </button>
          </div>
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
            key={booking._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full flex items-center justify-center bg-gray-100">
              <img
                src={booking.property?.images?.[0]?.url ? `http://localhost:5000${booking.property.images[0].url}` : (booking.property?.images?.[0] ? `http://localhost:5000${booking.property.images[0]}` : '/luxuryhouse.jpg')}
                alt={booking.property?.title || 'Property'}
                className="object-cover w-full h-full"
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status] || 'bg-gray-100 text-gray-700'}`}>{statusLabels[booking.status] || booking.status}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{booking.property?.title || `Property #${booking.property?._id}`}</h2>
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {typeof booking.property?.location === 'object' 
                  ? `${booking.property.location.address || ''}, ${booking.property.location.city || ''}, ${booking.property.location.state || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',') || 'Location not available'
                  : booking.property?.location || 'Location not available'}
              </div>
              <div className="flex space-x-4 text-gray-500 mb-2">
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1" />{booking.property?.bedrooms || '-'} Beds</span>
                <span className="flex items-center"><Bath className="w-4 h-4 mr-1" />{booking.property?.bathrooms || '-'} Baths</span>
                <span className="flex items-center"><Square className="w-4 h-4 mr-1" />{booking.property?.sqft || '-'} sqft</span>
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Booked on: <span className="font-medium text-gray-700">{new Date(booking.createdAt).toLocaleDateString()}</span></span>
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <span className="font-medium text-gray-700">Total Amount: NPR {booking.totalAmount?.toLocaleString()}</span>
              </div>
              {booking.bookingType && (
                <div className="flex items-center text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">Type: {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)}</span>
                </div>
              )}
              {booking.approvalDate && (
                <div className="flex items-center text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">Approved: {new Date(booking.approvalDate).toLocaleDateString()}</span>
                </div>
              )}
              {booking.rejectionReason && (
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Rejection Reason:</span>
                  <p className="text-sm text-red-600 mt-1">{booking.rejectionReason}</p>
                </div>
              )}
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
                  onClick={() => navigate(`/property/${booking.property?._id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" /> View Property
                </button>
                {(booking.status === 'confirmed' || (booking.bookingType === 'purchase' && booking.status === 'pending')) && (
                  <button className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold shadow hover:bg-red-200 transition-colors duration-200">
                    {booking.bookingType === 'purchase' ? 'Cancel Request' : 'Cancel'}
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