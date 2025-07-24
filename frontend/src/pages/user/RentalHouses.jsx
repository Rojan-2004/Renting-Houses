import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Heart, Search, Filter, MapPin, Bed, Bath, Car, Star, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RentalHouses = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    fetchProperties();
    fetchWishlist();
  }, [currentPage, searchTerm, filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 12,
        search: searchTerm,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });

      const response = await fetch(`http://localhost:4000/api/properties?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setProperties(data.data || []);
        setTotalPages(data.totalPages || 1);
        
        const imageIndexes = {};
        data.data?.forEach(property => {
          imageIndexes[property._id] = 0;
        });
        setCurrentImageIndex(imageIndexes);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/wishlist/my-wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.wishlist) {
        setWishlist(data.wishlist.properties.map(p => p.property._id));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async (propertyId) => {
    try {
      const isInWishlist = wishlist.includes(propertyId);
      const url = isInWishlist 
        ? `http://localhost:4000/api/wishlist/remove-property/${propertyId}`
        : 'http://localhost:4000/api/wishlist/add-property';
      
      const method = isInWishlist ? 'DELETE' : 'POST';
      const body = isInWishlist ? undefined : JSON.stringify({ propertyId });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body
      });
      
      if (response.ok) {
        setWishlist(prev => 
          isInWishlist 
            ? prev.filter(id => id !== propertyId)
            : [...prev, propertyId]
        );
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handlePurchase = async (propertyId) => {
    try {
      const checkInDate = new Date();
      checkInDate.setDate(checkInDate.getDate() + 1);
      const checkOutDate = new Date();
      checkOutDate.setDate(checkOutDate.getDate() + 8);
      
      const response = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          property: propertyId,
          checkIn: checkInDate.toISOString(),
          checkOut: checkOutDate.toISOString(),
          guestDetails: {
            adults: 1,
            children: 0
          },
          specialRequests: 'Purchase request - awaiting seller approval'
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Purchase request sent successfully! Awaiting seller approval.');
      } else {
        alert(data.message || 'Failed to send purchase request');
      }
    } catch (error) {
      console.error('Error creating purchase request:', error);
      alert('Failed to send purchase request');
    }
  };

  const nextImage = (propertyId, imagesLength) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: (prev[propertyId] + 1) % imagesLength
    }));
  };

  const prevImage = (propertyId, imagesLength) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: prev[propertyId] === 0 ? imagesLength - 1 : prev[propertyId] - 1
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Rental Buddy</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/user/favorites" className="text-gray-700 hover:text-blue-600 transition flex items-center gap-2">
              <Heart className="w-5 h-5" /> Favorites
            </Link>
            <Link to="/user/order-history" className="text-gray-700 hover:text-blue-600 transition flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Orders
            </Link>
            <Link to="/user/profile" className="text-gray-700 hover:text-blue-600 transition">
              Profile
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Available Rental Houses</h1>
          <p className="text-gray-600">Find your perfect home from our collection of premium properties</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="condo">Condo</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {properties.map((property) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <>
                        <img
                          src={`http://localhost:4000${property.images[currentImageIndex[property._id] || 0]?.url || (typeof property.images[currentImageIndex[property._id] || 0] === 'string' ? property.images[currentImageIndex[property._id] || 0] : '')}`}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {property.images.length > 1 && (
                          <>
                            <button
                              onClick={() => prevImage(property._id, property.images.length)}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                            >
                              ‹
                            </button>
                            <button
                              onClick={() => nextImage(property._id, property.images.length)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                            >
                              ›
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Home className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(property._id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.includes(property._id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                    {property.isAvailable && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Available
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{property.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm line-clamp-1">
                        {property.location && typeof property.location === 'object' 
                          ? `${property.location.address || ''}, ${property.location.city || ''}, ${property.location.state || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',') 
                          : property.location || 'Location not specified'
                        }
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                        {property.parking && (
                          <div className="flex items-center">
                            <Car className="w-4 h-4 mr-1" />
                            <span>Parking</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(property.price)}
                        <span className="text-sm text-gray-500 font-normal">/month</span>
                      </div>
                      {property.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/property/${property._id}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition text-center text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> View
                      </Link>
                      <button
                        onClick={() => handlePurchase(property._id)}
                        disabled={!property.isAvailable}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-4 h-4" /> Purchase
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {properties.length === 0 && (
              <div className="text-center py-20">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default RentalHouses;