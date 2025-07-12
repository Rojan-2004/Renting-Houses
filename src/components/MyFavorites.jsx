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
  const navigate = useNavigate();

  // Sample properties data (same as in RentalWebsite)
  const allProperties = [
    {
      id: 1,
      price: "NPR 2,50,000",
      originalPrice: "NPR 3,00,000",
      location: "Thamel, Kathmandu",
      beds: 3,
      baths: 2,
      sqft: 1200,
      rating: 4.8,
      reviews: 24,
      images: ["https://th.bing.com/th?id=OIF.P99VMlaALUDQY5%2bVPLtpSw&w=290&h=193&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3"],
      features: ["Furnished", "Parking", "WiFi", "Security"],
      type: "apartment",
      availableFrom: "Immediately",
      description: "Beautiful apartment in the heart of Thamel with modern amenities and great connectivity."
    },
    {
      id: 2,
      price: "NPR 3,75,000",
      originalPrice: "NPR 4,25,000",
      location: "Lazimpat, Kathmandu",
      beds: 4,
      baths: 3,
      sqft: 1800,
      rating: 4.9,
      reviews: 31,
      images: ["https://th.bing.com/th/id/OIF.52AEixZHsPHkL1zfk7B8RA?w=246&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3"],
      features: ["Garden", "Balcony", "Gym", "Pool"],
      type: "house",
      availableFrom: "Jan 15, 2025",
      description: "Spacious house in prestigious Lazimpat area with garden and modern facilities."
    },
    {
      id: 3,
      price: "NPR 1,85,000",
      originalPrice: "NPR 2,15,000",
      location: "Baneshwor, Kathmandu",
      beds: 2,
      baths: 2,
      sqft: 950,
      rating: 4.6,
      reviews: 18,
      images: ["https://ts4.mm.bing.net/th?id=OIP.xH9wwx9vubTb9x1yjyhIHgHaEO&pid=15.1"],
      features: ["Metro Access", "Shopping Mall", "Restaurants"],
      type: "apartment",
      availableFrom: "Feb 1, 2025",
      description: "Convenient apartment with excellent connectivity and nearby amenities."
    },
    {
      id: 4,
      price: "NPR 5,20,000",
      originalPrice: "NPR 6,00,000",
      location: "Durbarmarg, Kathmandu",
      beds: 5,
      baths: 4,
      sqft: 2500,
      rating: 5.0,
      reviews: 42,
      images: ["https://th.bing.com/th/id/OIP.Qe3WcOb7Flblmm2prUpCiAHaE8?w=212&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3"],
      features: ["Luxury", "City View", "Concierge", "Valet"],
      type: "villa",
      availableFrom: "March 1, 2025",
      description: "Luxury villa in the most prestigious location of Kathmandu with premium amenities."
    },
    {
      id: 5,
      price: "NPR 3,25,000",
      originalPrice: "NPR 3,75,000",
      location: "Boudha, Kathmandu",
      beds: 3,
      baths: 2,
      sqft: 1400,
      rating: 4.7,
      reviews: 27,
      images: ["https://th.bing.com/th/id/OIP.poFeymQbVib0Q2pZfxVqZwHaE8?w=1920&h=1281&rs=1&pid=ImgDetMain"],
      features: ["Temple View", "Peaceful", "Cultural Area"],
      type: "house",
      availableFrom: "Jan 20, 2025",
      description: "Peaceful home near Boudhanath Stupa with cultural significance and serene environment."
    },
    {
      id: 6,
      price: "NPR 2,95,000",
      originalPrice: "NPR 3,35,000",
      location: "Baluwatar, Kathmandu",
      beds: 3,
      baths: 3,
      sqft: 1350,
      rating: 4.8,
      reviews: 35,
      images: ["https://th.bing.com/th/id/OIP.EmigJblxF0nxRbwQVm6mowHaFk?w=208&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3"],
      features: ["Embassy Area", "Secure", "Premium Location"],
      type: "apartment",
      availableFrom: "Feb 15, 2025",
      description: "Premium apartment in diplomatic area with high security and excellent facilities."
    }
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  
  useEffect(() => {
    const favoriteProperties = allProperties.filter(property => favorites.has(property.id));
    setProperties(favoriteProperties);
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.delete(propertyId);
      localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
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
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Favorite Properties
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your saved properties that caught your eye. Keep track of the homes you love!
          </p>
        </div>

        {/* Search and Filter */}
        {properties.length > 0 && (
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
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.images[currentImageIndex[property.id] || 0]} 
                    alt={property.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <button
                    onClick={() => removeFromFavorites(property.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-all duration-300 group"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
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
                    {property.location}
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
                    {property.features.slice(0, 3).map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
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
        ) : favorites.size === 0 ? (
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
        ) : (
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

        {/* Quick Actions */}
        {favorites.size > 0 && (
          <div className="mt-16 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="flex items-center justify-center space-x-3 p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-300 group">
                <Phone className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-blue-600">Contact Agent</span>
              </button>
              <button className="flex items-center justify-center space-x-3 p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition-all duration-300 group">
                <Calendar className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-green-600">Schedule Viewing</span>
              </button>
              <button className="flex items-center justify-center space-x-3 p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all duration-300 group">
                <Mail className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-purple-600">Get Updates</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites; 