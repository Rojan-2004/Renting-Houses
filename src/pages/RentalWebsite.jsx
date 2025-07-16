import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Home, MapPin, Bed, Bath, Square, Star, Phone, Mail, Menu, X, Check, 
  ArrowRight, Calendar, Users, Shield, Award, Filter, Search, Heart,
  Facebook, Instagram, Linkedin, Twitter, Play, Eye, ChevronLeft, ChevronRight
} from 'lucide-react';

const RentalWebsite = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const intervalRef = useRef({});

  const properties = [
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
      images: ["/house1.png"],
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
      images: ["/house2.jpg"],
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
      images: ["/house3.jpg"],
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
      images: ["/luxuryhouse.jpg"],
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
      images: ["/livingroom.jpg"],
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
      images: ["/similar1.png"],
      features: ["Embassy Area", "Secure", "Premium Location"],
      type: "apartment",
      availableFrom: "Feb 15, 2025",
      description: "Premium apartment in diplomatic area with high security and excellent facilities."
    }
  ];

  const stats = [
    { number: "500+", label: "Premium Properties", icon: Home },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "2000+", label: "Happy Clients", icon: Users },
    { number: "95%", label: "Satisfaction Rate", icon: Shield }
  ];

  const services = [
    "Professional property consultation and guidance",
    "Complete legal documentation assistance",
    "Accurate property valuation services",
    "24/7 dedicated customer support",
    "Virtual and in-person property tours",
    "Flexible financing options available"
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Thamel Resident",
      text: "Found my dream apartment through Rental Buddy. The process was smooth and the team was incredibly helpful!",
      rating: 5
    },
    {
      name: "Rajesh Maharjan", 
      location: "Lazimpat Resident",
      text: "Excellent service and genuine listings. They helped me find the perfect home for my family.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      location: "Expat Community",
      text: "As a foreigner, finding housing was challenging until I found Rental Buddy. Highly recommended!",
      rating: 5
    }
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Auto-slide images for properties
  useEffect(() => {
    properties.forEach(property => {
      if (property.images.length > 1) {
        intervalRef.current[property.id] = setInterval(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [property.id]: ((prev[property.id] || 0) + 1) % property.images.length
          }));
        }, 3000);
      }
    });

    return () => {
      Object.values(intervalRef.current).forEach(interval => clearInterval(interval));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

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

  const filteredProperties = properties.filter(property => {
    const matchesFilter = selectedFilter === 'all' || property.type === selectedFilter;
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { value: 'all', label: 'All Properties' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'house', label: 'Houses' },
    { value: 'villa', label: 'Villas' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrollY > 100 ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RENTAL BUDDY
              </div>
            </div>
            
            {/* Desktop Menu */}
           <ul className="hidden md:flex space-x-8">
  {['home', 'properties', 'services'].map(item => (
    <li key={item}>
      <button
        onClick={() => scrollToSection(item)}
        className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 capitalize relative group"
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
      </button>
    </li>
  ))}
  <li>
    <button
      onClick={() => scrollToSection('comment')}
      className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 capitalize relative group"
    >
      Comment
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
    </button>
  </li>
  <li>
    <button
      onClick={() => navigate('/favorites')}
      className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 capitalize relative group flex items-center"
    >
      <Heart className="w-4 h-4 mr-1" />
      Favorites
      {favorites.size > 0 && (
        <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
          {favorites.size}
        </span>
      )}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
    </button>
  </li>
  <li>
    <button
      onClick={() => navigate('/login')}
      className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 capitalize relative group"
    >
      login/register
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
    </button>
  </li>
  <li>
    <button
      onClick={() => navigate('/order-history')}
      className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 capitalize relative group flex items-center"
    >
      <Calendar className="w-4 h-4 mr-1" />
      Booking History
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
    </button>
  </li>
</ul>


            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <ul className="space-y-2 pt-4">
                {['home', 'properties', 'services', 'comment', 'contact'].map(item => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="block w-full text-left py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300 capitalize"
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      navigate('/favorites');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Favorites
                    </span>
                    {favorites.size > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {favorites.size}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300 capitalize"
                  >
                    login/register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/order-history');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Booking History
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden"
        style={{
  backgroundImage: `url('/Background.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
 backgroundRepeat: 'no-repeat',
}}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div 
          className={`relative z-10 max-w-5xl px-4 transition-all duration-1000 ${
            animatedElements.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
          id="hero"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
           
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Dream Home
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover premium properties with modern amenities and breathtaking views. 
            Your dream home awaits in the heart of Nepal's capital city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('properties')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Home className="w-5 h-5 mr-2" />
              Explore Properties
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Tour
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
              animatedElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate
            id="stats"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              animatedElements.has('properties-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate
            id="properties-title"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked premium properties that offer the perfect blend of comfort, style, and convenience
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location or features..."
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
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className={`bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group ${
                  animatedElements.has(`property-${property.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                data-animate
                id={`property-${property.id}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.images[currentImageIndex[property.id] || 0]} 
                    alt={property.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
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

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No properties found matching your criteria.</div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              className={`transition-all duration-1000 ${
                animatedElements.has('services-text') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              data-animate
              id="services-text"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Flexibility and Options to Suit Your Lifestyle
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                We provide comprehensive real estate services tailored to your unique needs. 
                From luxury apartments to family homes, we ensure you find the perfect 
                property that matches your lifestyle and budget.
              </p>
              
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{service}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <div 
              className={`transition-all duration-1000 ${
                animatedElements.has('services-image') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              data-animate
              id="services-image"
            >
              <div className="relative">
                <div className="h-96 bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden">
                  <img 
                    src="data:image/webp;base64,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" 
                    alt="Services" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-yellow-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real people who found their perfect home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section id="comment" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Leave a Comment</h2>
            <p className="text-gray-600">We value your feedback! Share your thoughts or experiences below.</p>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (commentInput.trim()) {
                setComments(prev => [commentInput.trim(), ...prev]);
                setCommentInput("");
              }
            }}
            className="mb-8"
          >
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
              rows={4}
              placeholder="Write your comment here..."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow hover:shadow-lg transition-all duration-300"
            >
              Submit Comment
            </button>
          </form>
          <div>
            {comments.length === 0 ? (
              <div className="text-gray-400 text-center">No comments yet. Be the first to comment!</div>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment, idx) => (
                  <li key={idx} className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="text-gray-700">{comment}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RENTAL BUDDY
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted partner in finding the perfect home in Kathmandu. 
                We specialize in premium properties with modern amenities and exceptional service.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors duration-300" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Properties', 'Services', 'About Us', 'Contact'].map(link => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center group">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <div className="font-medium">Durbar Marg, Kathmandu</div>
                    <div className="text-sm">Nepal 44600</div>
                  </div>
                </div>
                <div className="flex items-center group">
                  <Phone className="w-5 h-5 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <div className="font-medium">+977-1-4234567</div>
                    <div className="text-sm">24/7 Support</div>
                  </div>
                </div>
                <div className="flex items-center group">
                  <Mail className="w-5 h-5 mr-3 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <div className="font-medium">info@rentalbuddy.com</div>
                    <div className="text-sm">Get in touch</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Rental Buddy. All rights reserved. | 
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer"> Privacy Policy</span> | 
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer"> Terms of Service</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalWebsite;