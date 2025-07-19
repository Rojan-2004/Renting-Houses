import React, { useState, useEffect } from 'react';
import { 
  Home, MapPin, Bed, Bath, Square, Star, Phone, Mail, Menu, X, Check, 
  ArrowRight, Calendar, Users, Shield, Award, Filter, Search, Heart,
  Facebook, Instagram, Linkedin, Twitter, Play, Eye, ChevronLeft, ChevronRight,
  Trash2, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [properties, setProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  // Fetch wishlist data from backend
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to view your favorites');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/wishlist/my-wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Wishlist API response:', data);
        if (data.success && data.wishlist) {
          const wishlistProperties = data.wishlist.properties || [];
          console.log('Wishlist properties:', wishlistProperties);
          const favoriteIds = new Set(wishlistProperties.map(item => item.property._id));
          const propertiesData = wishlistProperties.map(item => {
            console.log('Processing property:', item.property);
            console.log('Property images:', item.property.images);
            return {
              id: item.property._id,
              price: `NPR ${item.property.price?.toLocaleString()}`,
              location: item.property.location,
              beds: item.property.bedrooms,
              baths: item.property.bathrooms,
              sqft: item.property.sqft,
              rating: item.property.rating || 4.5,
              reviews: item.property.totalReviews || 0,
              images: item.property.images && item.property.images.length > 0 ? item.property.images : ['/house1.png'],
              features: item.property.features || [],
              type: item.property.propertyType,
              availableFrom: item.property.availableFrom ? new Date(item.property.availableFrom).toLocaleDateString() : 'Available',
              description: item.property.description || 'No description available',
              title: item.property.title
            };
          });
          console.log('Final properties data:', propertiesData);
          
          setFavorites(favoriteIds);
          setProperties(propertiesData);
        } else {
          setProperties([]);
          setFavorites(new Set());
        }
      } else {
        throw new Error('Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Failed to load favorites. Please try again.');
      setProperties([]);
      setFavorites(new Set());
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromFavorites = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to manage favorites');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/wishlist/remove-property/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Remove from local state
        const newFavorites = new Set(favorites);
        newFavorites.delete(propertyId);
        setFavorites(newFavorites);
        
        // Remove from properties list
        setProperties(properties.filter(property => property.id !== propertyId));
      } else {
        throw new Error('Failed to remove from favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setError('Failed to remove from favorites. Please try again.');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  const filterOptions = [
    { value: 'all', label: 'All Favorites' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'house', label: 'Houses' },
    { value: 'villa', label: 'Villas' }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesFilter = selectedFilter === 'all' || property.type === selectedFilter;
    
    const locationString = typeof property.location === 'object' 
      ? `${property.location.address || ''} ${property.location.city || ''}`.trim()
      : (property.location || '');
    
    const matchesSearch = locationString.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (property.features && property.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Favorites
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {favorites.size} {favorites.size === 1 ? 'Property' : 'Properties'} Saved
              </div>
              
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your favorites...</span>
          </div>
        )}

        {/* Page Title */}
        {!loading && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              My Favorite Properties
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your saved properties that caught your eye. Keep track of the homes you love!
            </p>
          </div>
        )}

        {/* Search and Filter */}
        {!loading && properties.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    selectedFilter === option.value
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={(() => {
                      console.log('Property images:', property.images);
                      console.log('Current image index:', currentImageIndex[property.id] || 0);
                      const imageUrl = property.images && property.images.length > 0 
                        ? `http://localhost:5000${property.images[currentImageIndex[property.id] || 0]?.url || (typeof property.images[currentImageIndex[property.id] || 0] === 'string' ? property.images[currentImageIndex[property.id] || 0] : '')}` 
                        : '/house1.png';
                      console.log('Final image URL:', imageUrl);
                      return imageUrl;
                    })()} 
                    alt={typeof property.location === 'object' ? `${property.location.address || ''} ${property.location.city || ''}`.trim() : property.location || 'Property'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <button
                    onClick={() => removeFromFavorites(property.id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                    title="Remove from favorites"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      {renderStars(property.rating)}
                      <span className="text-sm font-medium ml-1">{property.rating}</span>
                      <span className="text-xs text-gray-500">({property.reviews})</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Available {property.availableFrom}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{property.price}<span className="text-sm text-gray-500">/month</span></div>
                      {property.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{property.originalPrice}</div>
                      )}
                    </div>
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-medium">
                      Save {Math.round(((parseInt(property.originalPrice?.replace(/[^\d]/g, '')) - parseInt(property.price.replace(/[^\d]/g, ''))) / parseInt(property.originalPrice?.replace(/[^\d]/g, '')) * 100) || 0)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {typeof property.location === 'object' 
                      ? `${property.location.address || ''} ${property.location.city || ''} ${property.location.state || ''}`.trim() 
                      : property.location || 'Location not specified'
                    }
                  </div>

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
                    {property.features && property.features.slice(0, 3).map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features && property.features.length > 3 && (
                      <span className="text-blue-600 text-sm">+{property.features.length - 3} more</span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      View Details
                    </button>
                    <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && favorites.size === 0 ? (
          // No favorites at all
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Favorites Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring properties and save your favorites by clicking the heart icon. 
              Your saved properties will appear here for easy access.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Explore Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        ) : !loading && (
          // No properties match the search/filter
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Matching Favorites</h3>
            <p className="text-gray-600 mb-8">
              No favorites match your current search or filter criteria. 
              Try adjusting your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default MyFavorites;