import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  Calendar,
  Plane,
  Luggage,
  Shield,
  DollarSign,
  Compass,
  Cloud,
  Sun,
  Leaf,
  Snowflake,
  Globe,
  Mountain,
  Building,
  Castle,
  Waves,
  UtensilsCrossed,
  Wifi,
  Heart,
  Download,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Clock,
  Users,
  Star,
  TrendingUp,
  Navigation,
  Smartphone,
  Camera,
  CreditCard,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import './TravelGuide.css';

const TravelGuide = () => {
  const [activeSection, setActiveSection] = useState('planning');
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [budgetRange, setBudgetRange] = useState(5000);
  const [travelType, setTravelType] = useState('all');
  const [savedGuides, setSavedGuides] = useState([]);
  const [showPackingList, setShowPackingList] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [weatherData, setWeatherData] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const seasons = [
    { id: 'spring', name: 'Spring', icon: <Leaf />, color: '#10b981', months: 'Mar-May' },
    { id: 'summer', name: 'Summer', icon: <Sun />, color: '#f59e0b', months: 'Jun-Aug' },
    { id: 'autumn', name: 'Autumn', icon: <Leaf fill="#ef4444" />, color: '#ef4444', months: 'Sep-Nov' },
    { id: 'winter', name: 'Winter', icon: <Snowflake />, color: '#60a5fa', months: 'Dec-Feb' },
  ];

  const travelTypes = [
    { id: 'beach', name: 'Beach', icon: <Waves />, color: '#06b6d4' },
    { id: 'mountain', name: 'Mountain', icon: <Mountain />, color: '#10b981' },
    { id: 'city', name: 'City', icon: <Building />, color: '#8b5cf6' },
    { id: 'cultural', name: 'Cultural', icon: <Castle />, color: '#f97316' },
    { id: 'adventure', name: 'Adventure', icon: <Compass />, color: '#ef4444' },
    { id: 'luxury', name: 'Luxury', icon: <Star />, color: '#fbbf24' },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Maldives',
      type: 'beach',
      rating: 4.8,
      price: 45000,
      season: 'winter',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tags: ['Luxury', 'Romantic', 'Water Villas'],
      description: 'Crystal clear waters and overwater bungalows',
      bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    },
    {
      id: 2,
      name: 'Swiss Alps',
      type: 'mountain',
      rating: 4.9,
      price: 35000,
      season: 'winter',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tags: ['Skiing', 'Scenic', 'Adventure'],
      description: 'Majestic mountains and world-class ski resorts',
      bestMonths: ['Dec', 'Jan', 'Feb', 'Mar'],
    },
    {
      id: 3,
      name: 'Tokyo',
      type: 'city',
      rating: 4.7,
      price: 25000,
      season: 'spring',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tags: ['Modern', 'Cultural', 'Food'],
      description: 'Blend of traditional culture and modern technology',
      bestMonths: ['Mar', 'Apr', 'May', 'Sep', 'Oct'],
    },
    {
      id: 4,
      name: 'Rome',
      type: 'cultural',
      rating: 4.6,
      price: 30000,
      season: 'spring',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tags: ['Historical', 'Architecture', 'Art'],
      description: 'Ancient ruins and Renaissance art',
      bestMonths: ['Apr', 'May', 'Sep', 'Oct'],
    },
  ];

  const packingCategories = [
    {
      category: 'Clothing',
      items: [
        { name: 'T-shirts', essential: true, checked: false },
        { name: 'Jeans/Pants', essential: true, checked: false },
        { name: 'Underwear', essential: true, checked: false },
        { name: 'Swimwear', essential: false, checked: false },
        { name: 'Jacket', essential: false, checked: false },
        { name: 'Comfortable Shoes', essential: true, checked: false },
      ],
    },
    {
      category: 'Electronics',
      items: [
        { name: 'Phone + Charger', essential: true, checked: false },
        { name: 'Power Bank', essential: true, checked: false },
        { name: 'Universal Adapter', essential: true, checked: false },
        { name: 'Camera', essential: false, checked: false },
        { name: 'Headphones', essential: false, checked: false },
        { name: 'E-reader', essential: false, checked: false },
      ],
    },
    {
      category: 'Documents',
      items: [
        { name: 'Passport', essential: true, checked: false },
        { name: 'Visas', essential: true, checked: false },
        { name: 'Travel Insurance', essential: true, checked: false },
        { name: 'Flight Tickets', essential: true, checked: false },
        { name: 'Hotel Bookings', essential: true, checked: false },
        { name: 'Credit Cards', essential: true, checked: false },
      ],
    },
  ];

  const filteredDestinations = destinations.filter(dest => {
    if (travelType !== 'all' && dest.type !== travelType) return false;
    if (selectedSeason !== 'all' && dest.season !== selectedSeason) return false;
    if (dest.price > budgetRange) return false;
    if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const saveGuide = (guideId) => {
    if (!savedGuides.includes(guideId)) {
      setSavedGuides([...savedGuides, guideId]);
    } else {
      setSavedGuides(savedGuides.filter(id => id !== guideId));
    }
  };

  const generateItinerary = (destination) => {
    // AI-generated itinerary based on destination
    console.log('Generating itinerary for:', destination);
  };

  const downloadPackingList = () => {
    // Generate and download packing list PDF
    console.log('Downloading packing list');
  };

  useEffect(() => {
    // Simulate weather data
    const mockWeather = {
      temperature: '22°C',
      condition: 'Sunny',
      humidity: '65%',
      wind: '12 km/h',
      forecast: [
        { day: 'Mon', high: 24, low: 18, condition: 'sunny' },
        { day: 'Tue', high: 23, low: 17, condition: 'partly-cloudy' },
        { day: 'Wed', high: 21, low: 16, condition: 'rainy' },
        { day: 'Thu', high: 22, low: 17, condition: 'cloudy' },
        { day: 'Fri', high: 25, low: 19, condition: 'sunny' },
      ],
    };
    setWeatherData(mockWeather);

    // Timeline animation
    const interval = setInterval(() => {
      setTimelineProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="travel-guide cosmic-bg">
      {/* Animated Background Elements */}
      <div className="guide-bg-elements">
        <div className="floating-plane">
          <Plane size={32} />
        </div>
        <div className="floating-compass">
          <Compass size={28} />
        </div>
        <div className="floating-luggage">
          <Luggage size={24} />
        </div>
      </div>

      <div className="container">
        {/* Enhanced Hero Section */}
        <motion.section 
          className="guide-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <h1 className="cosmic-gradient">
              Complete Travel Guide
              <span className="hero-subtitle">Your Ultimate Journey Planner</span>
            </h1>
            <p className="hero-description">
              AI-powered travel planning, interactive guides, and personalized recommendations
              for your perfect adventure
            </p>
            
            {/* Interactive Search */}
            <div className="hero-search cosmic-card">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search destinations, tips, or guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">
                  <Filter size={20} />
                  Filters
                </button>
              </div>
              <div className="search-suggestions">
                <span>Trending:</span>
                <button className="suggestion-tag">Bali 2024</button>
                <button className="suggestion-tag">Europe Spring</button>
                <button className="suggestion-tag">Budget Travel</button>
                <button className="suggestion-tag">Solo Travel Tips</button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">500+</div>
                <div className="stat-label">Destinations</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">50+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">AI Support</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">1M+</div>
                <div className="stat-label">Travellers</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.div 
          className="guide-navigation cosmic-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <nav className="nav-tabs">
            {['planning', 'destinations', 'packing', 'safety', 'budget', 'tools'].map((tab) => (
              <button
                key={tab}
                className={`nav-tab ${activeSection === tab ? 'active' : ''}`}
                onClick={() => setActiveSection(tab)}
              >
                <span className="tab-icon">
                  {tab === 'planning' && <Calendar size={20} />}
                  {tab === 'destinations' && <Map size={20} />}
                  {tab === 'packing' && <Luggage size={20} />}
                  {tab === 'safety' && <Shield size={20} />}
                  {tab === 'budget' && <DollarSign size={20} />}
                  {tab === 'tools' && <Compass size={20} />}
                </span>
                <span className="tab-label">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Interactive Planning Dashboard */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeSection}
            className="guide-dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'planning' && (
              <div className="planning-section">
                <div className="section-header">
                  <h2 className="section-title cosmic-text">
                    <Calendar size={28} />
                    Trip Planning Timeline
                  </h2>
                  <p className="section-subtitle">Step-by-step guide from dream to departure</p>
                </div>

                {/* Interactive Timeline */}
                <div className="planning-timeline cosmic-card">
                  <div className="timeline-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${timelineProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="timeline-steps">
                    {[
                      { step: 1, title: 'Dream & Research', duration: '3-6 months before', icon: <Compass /> },
                      { step: 2, title: 'Budget Planning', duration: '2-3 months before', icon: <DollarSign /> },
                      { step: 3, title: 'Book Flights', duration: '2 months before', icon: <Plane /> },
                      { step: 4, title: 'Accommodation', duration: '1-2 months before', icon: <Building /> },
                      { step: 5, title: 'Activities & Visas', duration: '1 month before', icon: <Calendar /> },
                      { step: 6, title: 'Packing & Prep', duration: '1 week before', icon: <Luggage /> },
                    ].map((step) => (
                      <div key={step.step} className="timeline-step">
                        <div className="step-icon">{step.icon}</div>
                        <div className="step-content">
                          <h4>{step.title}</h4>
                          <p className="step-duration">{step.duration}</p>
                          <button className="step-details-btn">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Season Selector */}
                <div className="season-selector cosmic-card">
                  <h3>Best Time to Travel</h3>
                  <p>Select a season to see recommended destinations</p>
                  
                  <div className="season-cards">
                    {seasons.map((season) => (
                      <motion.button
                        key={season.id}
                        className={`season-card ${selectedSeason === season.id ? 'selected' : ''}`}
                        onClick={() => setSelectedSeason(season.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ '--season-color': season.color }}
                      >
                        <div className="season-icon" style={{ color: season.color }}>
                          {season.icon}
                        </div>
                        <h4>{season.name}</h4>
                        <p className="season-months">{season.months}</p>
                        <div className="season-recommendations">
                          <span>Japan Cherry Blossoms</span>
                          <span>European Spring Tours</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'destinations' && (
              <div className="destinations-section">
                <div className="section-header">
                  <h2 className="section-title cosmic-text">
                    <Globe size={28} />
                    Smart Destination Finder
                  </h2>
                  <p className="section-subtitle">Discover perfect places based on your preferences</p>
                </div>

                {/* Filters */}
                <div className="destination-filters cosmic-card">
                  <div className="filter-group">
                    <h4>Travel Type</h4>
                    <div className="type-filters">
                      {travelTypes.map((type) => (
                        <button
                          key={type.id}
                          className={`type-filter ${travelType === type.id ? 'active' : ''}`}
                          onClick={() => setTravelType(type.id)}
                          style={{ '--type-color': type.color }}
                        >
                          <span className="type-icon">{type.icon}</span>
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <h4>Budget Range</h4>
                    <div className="budget-slider">
                      <input
                        type="range"
                        min="1000"
                        max="100000"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(Number(e.target.value))}
                        className="slider"
                      />
                      <div className="budget-labels">
                        <span>₹1K</span>
                        <span className="current-budget">₹{budgetRange.toLocaleString()}</span>
                        <span>₹1L</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destination Cards */}
                <div className={`destinations-grid ${viewMode}`}>
                  {filteredDestinations.map((destination) => (
                    <motion.div
                      key={destination.id}
                      className="destination-card cosmic-card"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedDestination(destination)}
                    >
                      <div className="card-image">
                        <img src={destination.image} alt={destination.name} />
                        <div className="card-overlay">
                          <button 
                            className={`save-btn ${savedGuides.includes(destination.id) ? 'saved' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              saveGuide(destination.id);
                            }}
                          >
                            <Bookmark size={20} />
                          </button>
                          <button className="share-btn">
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-content">
                        <div className="card-header">
                          <h3>{destination.name}</h3>
                          <div className="destination-rating">
                            <Star size={16} fill="#fbbf24" />
                            <span>{destination.rating}</span>
                          </div>
                        </div>
                        
                        <p className="destination-description">{destination.description}</p>
                        
                        <div className="destination-tags">
                          {destination.tags.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                        
                        <div className="destination-meta">
                          <div className="meta-item">
                            <Clock size={16} />
                            <span>Best: {destination.bestMonths.join(', ')}</span>
                          </div>
                          <div className="meta-item">
                            <DollarSign size={16} />
                            <span>From ₹{destination.price.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="card-actions">
                          <button 
                            className="action-btn primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              generateItinerary(destination);
                            }}
                          >
                            Generate Itinerary
                          </button>
                          <button className="action-btn secondary">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Weather Widget */}
                {weatherData && (
                  <div className="weather-widget cosmic-card">
                    <h3>Weather Forecast</h3>
                    <div className="weather-current">
                      <div className="current-temp">
                        <Cloud size={32} />
                        <div>
                          <div className="temp-value">{weatherData.temperature}</div>
                          <div className="temp-condition">{weatherData.condition}</div>
                        </div>
                      </div>
                      <div className="weather-details">
                        <div className="detail-item">
                          <span>Humidity</span>
                          <span>{weatherData.humidity}</span>
                        </div>
                        <div className="detail-item">
                          <span>Wind</span>
                          <span>{weatherData.wind}</span>
                        </div>
                      </div>
                    </div>
                    <div className="weather-forecast">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="forecast-day">
                          <div className="forecast-date">{day.day}</div>
                          <div className="forecast-temp">
                            <span className="high">{day.high}°</span>
                            <span className="low">{day.low}°</span>
                          </div>
                          <div className={`forecast-icon ${day.condition}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'packing' && (
              <div className="packing-section">
                <div className="section-header">
                  <h2 className="section-title cosmic-text">
                    <Luggage size={28} />
                    Smart Packing Assistant
                  </h2>
                  <p className="section-subtitle">AI-powered packing list tailored to your trip</p>
                </div>

                {/* Packing List */}
                <div className="packing-list cosmic-card">
                  <div className="packing-header">
                    <h3>Your Packing List</h3>
                    <div className="packing-actions">
                      <button className="action-btn" onClick={() => setShowPackingList(!showPackingList)}>
                        {showPackingList ? 'Hide' : 'Show'} List
                      </button>
                      <button className="action-btn" onClick={downloadPackingList}>
                        <Download size={16} />
                        Download PDF
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showPackingList && (
                      <motion.div
                        className="packing-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {packingCategories.map((category, catIndex) => (
                          <div key={catIndex} className="packing-category">
                            <h4>{category.category}</h4>
                            <div className="category-items">
                              {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="packing-item">
                                  <label className="item-checkbox">
                                    <input type="checkbox" checked={item.checked} />
                                    <span className="checkmark"></span>
                                    <span className="item-name">{item.name}</span>
                                  </label>
                                  {item.essential && (
                                    <span className="essential-badge">Essential</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Packing Tips */}
                <div className="packing-tips cosmic-card">
                  <h3>Pro Packing Tips</h3>
                  <div className="tips-grid">
                    <div className="tip-item">
                      <div className="tip-icon">🎒</div>
                      <h4>Roll, Don't Fold</h4>
                      <p>Save space and prevent wrinkles by rolling clothes</p>
                    </div>
                    <div className="tip-item">
                      <div className="tip-icon">📱</div>
                      <h4>Digital Copies</h4>
                      <p>Scan important documents and save to cloud storage</p>
                    </div>
                    <div className="tip-item">
                      <div className="tip-icon">💊</div>
                      <h4>Medication Kit</h4>
                      <p>Pack essential medicines and basic first aid supplies</p>
                    </div>
                    <div className="tip-item">
                      <div className="tip-icon">🔋</div>
                      <h4>Power Management</h4>
                      <p>Carry portable chargers and universal adapters</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'safety' && (
              <div className="safety-section">
                <div className="section-header">
                  <h2 className="section-title cosmic-text">
                    <Shield size={28} />
                    Travel Safety Hub
                  </h2>
                  <p className="section-subtitle">Comprehensive safety guides and emergency resources</p>
                </div>

                <div className="safety-grid">
                  <div className="safety-card cosmic-card">
                    <div className="safety-icon danger">
                      <AlertCircle size={32} />
                    </div>
                    <h3>Emergency Contacts</h3>
                    <ul className="emergency-list">
                      <li>Local Police: 112</li>
                      <li>Medical Emergency: 102</li>
                      <li>Fire Department: 101</li>
                      <li>Tourist Helpline: 1363</li>
                    </ul>
                  </div>

                  <div className="safety-card cosmic-card">
                    <div className="safety-icon success">
                      <CheckCircle size={32} />
                    </div>
                    <h3>Health Precautions</h3>
                    <ul className="health-list">
                      <li>Travel Insurance is mandatory</li>
                      <li>Carry vaccination certificates</li>
                      <li>Know nearest hospital locations</li>
                      <li>Pack essential medications</li>
                    </ul>
                  </div>

                  <div className="safety-card cosmic-card">
                    <div className="safety-icon warning">
                      <Shield size={32} />
                    </div>
                    <h3>Safety Checklist</h3>
                    <div className="checklist">
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Register with embassy
                      </label>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Share itinerary
                      </label>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Backup documents
                      </label>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Know local laws
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'budget' && (
              <div className="budget-section">
                <div className="section-header">
                  <h2 className="section-title cosmic-text">
                    <DollarSign size={28} />
                    Smart Budget Planner
                  </h2>
                  <p className="section-subtitle">Plan and track your travel expenses effectively</p>
                </div>

                <div className="budget-planner cosmic-card">
                  <h3>Travel Budget Calculator</h3>
                  <div className="budget-categories">
                    {[
                      { name: 'Flights', percentage: 35, color: '#3b82f6' },
                      { name: 'Accommodation', percentage: 25, color: '#10b981' },
                      { name: 'Food & Dining', percentage: 20, color: '#f59e0b' },
                      { name: 'Activities', percentage: 10, color: '#ef4444' },
                      { name: 'Transport', percentage: 5, color: '#8b5cf6' },
                      { name: 'Shopping', percentage: 5, color: '#ec4899' },
                    ].map((category, index) => (
                      <div key={index} className="budget-category">
                        <div className="category-header">
                          <span className="category-name">{category.name}</span>
                          <span className="category-percentage">{category.percentage}%</span>
                        </div>
                        <div className="category-bar">
                          <div 
                            className="bar-fill"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: category.color
                            }}
                          ></div>
                        </div>
                        <div className="category-amount">
                          ₹{(budgetRange * category.percentage / 100).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="budget-total">
                    <div className="total-label">Total Budget</div>
                    <div className="total-amount">₹{budgetRange.toLocaleString()}</div>
                  </div>
                </div>

                <div className="money-saving-tips cosmic-card">
                  <h3>Money Saving Tips</h3>
                  <div className="tips-carousel">
                    <div className="tip-card">
                      <div className="tip-number">1</div>
                      <h4>Travel Off-Peak</h4>
                      <p>Save up to 40% on flights and accommodation</p>
                    </div>
                    <div className="tip-card">
                      <div className="tip-number">2</div>
                      <h4>Local Transportation</h4>
                      <p>Use public transport instead of taxis</p>
                    </div>
                    <div className="tip-card">
                      <div className="tip-number">3</div>
                      <h4>Free Activities</h4>
                      <p>Explore parks, museums, and walking tours</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'tools' && (
              <div className="tools-section">
                <div className="section-header">
                  <h2 className="section-title cosmic-text">
                    <Compass size={28} />
                    Travel Tools & Resources
                  </h2>
                  <p className="section-subtitle">Essential digital tools for modern travelers</p>
                </div>

                <div className="tools-grid">
                  <div className="tool-card cosmic-card">
                    <div className="tool-icon">
                      <Navigation size={32} />
                    </div>
                    <h3>Route Planner</h3>
                    <p>Plan multi-city itineraries with optimized routes</p>
                    <button className="tool-btn">Open Tool</button>
                  </div>

                  <div className="tool-card cosmic-card">
                    <div className="tool-icon">
                      <Smartphone size={32} />
                    </div>
                    <h3>App Recommendations</h3>
                    <p>Essential travel apps for every destination</p>
                    <button className="tool-btn">View Apps</button>
                  </div>

                  <div className="tool-card cosmic-card">
                    <div className="tool-icon">
                      <Camera size={32} />
                    </div>
                    <h3>Photo Checklist</h3>
                    <p>Must-capture moments for your destination</p>
                    <button className="tool-btn">View Checklist</button>
                  </div>

                  <div className="tool-card cosmic-card">
                    <div className="tool-icon">
                      <CreditCard size={32} />
                    </div>
                    <h3>Currency Converter</h3>
                    <p>Real-time exchange rates and conversion</p>
                    <button className="tool-btn">Convert Now</button>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {/* Interactive Map Preview */}
        <section className="map-preview-section">
          <div className="section-header">
            <h2 className="section-title cosmic-text">
              <Map size={28} />
              Interactive Travel Map
            </h2>
            <p className="section-subtitle">Explore destinations with our interactive world map</p>
          </div>

          <div className="map-container cosmic-card">
            <div className="map-visualization">
              {/* Interactive map would go here */}
              <div className="map-placeholder">
                <Globe size={64} />
                <p>Interactive World Map</p>
                <button className="explore-map-btn">Explore Destinations</button>
              </div>
            </div>
            
            <div className="map-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                <span>Best Time to Visit</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                <span>Peak Season</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                <span>Good Deals Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Downloadable Resources */}
        <section className="resources-section">
          <div className="section-header">
            <h2 className="section-title cosmic-text">
              <Download size={28} />
              Free Travel Resources
            </h2>
            <p className="section-subtitle">Download templates, checklists, and guides</p>
          </div>

          <div className="resources-grid">
            <div className="resource-card cosmic-card">
              <div className="resource-icon">
                <Calendar size={32} />
              </div>
              <h3>Trip Planner Template</h3>
              <p>Excel template for comprehensive trip planning</p>
              <button className="download-resource-btn">
                <Download size={16} />
                Download
              </button>
            </div>

            <div className="resource-card cosmic-card">
              <div className="resource-icon">
                <Luggage size={32} />
              </div>
              <h3>Packing Checklist</h3>
              <p>Customizable packing list for different trip types</p>
              <button className="download-resource-btn">
                <Download size={16} />
                Download
              </button>
            </div>

            <div className="resource-card cosmic-card">
              <div className="resource-icon">
                <DollarSign size={32} />
              </div>
              <h3>Budget Tracker</h3>
              <p>Expense tracker spreadsheet for travel budgeting</p>
              <button className="download-resource-btn">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TravelGuide;