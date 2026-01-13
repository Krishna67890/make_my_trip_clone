import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Hotel, 
  Train, 
  Bus,
  Car,
  Navigation,
  Calendar,
  Users,
  MapPin,
  Search,
  TrendingUp,
  Shield,
  Award,
  Globe,
  Sparkles,
  Star,
  ChevronRight,
  ChevronLeft,
  Play,
  Headphones,
  Smartphone,
  CreditCard,
  Clock,
  ShieldCheck,
  X,
  Menu,
  User,
  Bell,
  Heart
} from 'lucide-react';
import HeroSection from './HeroSection';
import FeaturedDestinations from './FeaturedDestinations';
import TrendingOffers from './TrendingOffers';
import Testimonials from './Testimonials';
import SearchWidget from '../../Components/Common/SearchWidget/SearchWidget';
import QuickBook from '../../Components/Common/QuickBook/QuickBook';
import PromoBanner from '../../Components/Common/PromoBanner/PromoBanner';
import DestinationInspiration from "../../Components/Common/DestinationInspiration/DestinationInspiration";
import AppDownload from "../../Components/Common/AppDownload/AppDownload";
import { useSearch } from '../../Context/SearchContext.jsx';
import { useUser } from "../../Context/UserContext.jsx";
import { getFeaturedDestinations, getTrendingOffers } from '../../Data/MockData/DestinationsData';
import '../../Styles/Pages/Home.css';

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [trendingOffers, setTrendingOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flights');
  const [scrolled, setScrolled] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [activeDealIndex, setActiveDealIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [liveFlightDeals, setLiveFlightDeals] = useState([]);
  const { setSearchData } = useSearch();
  const { user } = useUser();
  const navigate = useNavigate();
  const dealIntervalRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const serviceCategories = [
    { id: 'flights', icon: <Plane size={24} />, label: 'Flights', color: '#ff6b6b' },
    { id: 'hotels', icon: <Hotel size={24} />, label: 'Hotels', color: '#4ecdc4' },
    { id: 'trains', icon: <Train size={24} />, label: 'Trains', color: '#45b7d1' },
    { id: 'buses', icon: <Bus size={24} />, label: 'Buses', color: '#96ceb4' },
    { id: 'cabs', icon: <Car size={24} />, label: 'Cabs', color: '#feca57' },
    { id: 'holidays', icon: <Globe size={24} />, label: 'Holidays', color: '#ff9ff3' },
    { id: 'forex', icon: <CreditCard size={24} />, label: 'Forex', color: '#54a0ff' },
    { id: 'activities', icon: <Navigation size={24} />, label: 'Activities', color: '#5f27cd' },
  ];

  const quickLinks = [
    { label: 'International Flights', url: '/flights/international' },
    { label: 'Hotels in Goa', url: '/hotels/goa' },
    { label: 'IRCTC Trains', url: '/trains/irctc' },
    { label: 'Bus Tickets', url: '/buses' },
    { label: 'Car Rentals', url: '/cabs' },
    { label: 'Holiday Packages', url: '/holidays' },
    { label: 'Travel Insurance', url: '/insurance' },
    { label: 'Gift Cards', url: '/gift-cards' },
  ];

  const flightDeals = [
    { 
      id: 1, 
      from: 'DEL', 
      to: 'BOM', 
      price: '₹2,499', 
      airline: 'IndiGo',
      duration: '2h 15m',
      departure: '06:00 AM'
    },
    { 
      id: 2, 
      from: 'BLR', 
      to: 'MAA', 
      price: '₹1,899', 
      airline: 'SpiceJet',
      duration: '1h 05m',
      departure: '08:30 AM'
    },
    { 
      id: 3, 
      from: 'HYD', 
      to: 'GOI', 
      price: '₹3,299', 
      airline: 'Air India',
      duration: '1h 45m',
      departure: '10:15 AM'
    },
  ];

  const chatbotMessages = [
    "Hi! I'm your travel assistant. How can I help you today?",
    "Looking for flight deals? I can find the best prices!",
    "Need hotel recommendations? Tell me your destination.",
    "Want to book a holiday package? I have amazing offers!"
  ];

  useEffect(() => {
    // Simulate API calls
    const loadData = async () => {
      try {
        setLoading(true);
        const destinations = await getFeaturedDestinations();
        const offers = await getTrendingOffers();
        
        // Mock live flight deals
        const mockDeals = flightDeals.map(deal => ({
          ...deal,
          live: true,
          seatsLeft: Math.floor(Math.random() * 10) + 1,
          timestamp: new Date().toLocaleTimeString()
        }));

        setFeaturedDestinations(destinations || []);
        setTrendingOffers(offers || []);
        setLiveFlightDeals(mockDeals);
        
        // Mock weather data
        setWeatherInfo({
          location: 'New Delhi',
          temp: '32°C',
          condition: 'Sunny',
          icon: '☀️'
        });
        
        // Mock notifications
        setNotifications([
          { id: 1, message: 'Flight DEL → BOM price dropped by 15%', type: 'flight', time: '5 min ago' },
          { id: 2, message: 'Special offer: Get 20% off on Goa hotels', type: 'hotel', time: '1 hour ago' },
          { id: 3, message: 'Your booking MMT12345 is confirmed', type: 'booking', time: '2 hours ago' },
        ]);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Auto-rotate deals
    dealIntervalRef.current = setInterval(() => {
      setActiveDealIndex((prev) => (prev + 1) % flightDeals.length);
    }, 5000);

    loadData();

    // Scroll listener for header effects
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dealIntervalRef.current) clearInterval(dealIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll chat messages
    if (chatMessagesRef.current && showChatbot) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [showChatbot]);

  const handleSearch = (searchData) => {
    setSearchData(searchData);
    
    // Add search to recent searches
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recentSearches.unshift({
      ...searchData,
      timestamp: new Date().toISOString()
    });
    
    if (recentSearches.length > 5) recentSearches.pop();
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

    // Navigate to search results page based on search type
    switch (searchData.type) {
      case 'flights':
        navigate('/search/flights', { state: { searchData } });
        break;
      case 'hotels':
        navigate('/search/hotels', { state: { searchData } });
        break;
      case 'trains':
        navigate('/search/trains', { state: { searchData } });
        break;
      case 'buses':
        navigate('/search/buses', { state: { searchData } });
        break;
      default:
        navigate('/search', { state: { searchData } });
    }
  };

  const handleQuickBook = (type, data) => {
    console.log(`Quick booking ${type}`, data);
    navigate(`/booking/${type}`, { state: { bookingData: data } });
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // Remove notification
    setNotifications(prev => prev.filter(n => n.id !== notification.id));
  };

  const sendChatMessage = (message) => {
    // In a real app, this would send to backend
    console.log('Sending chat message:', message);
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner">
          <Plane className="spinner-plane" size={48} />
        </div>
        <p>Loading amazing travel experiences...</p>
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="home-bg-animation">
        <div className="floating-plane">
          <Plane size={32} />
        </div>
        <div className="floating-hotel">
          <Hotel size={28} />
        </div>
        <div className="floating-train">
          <Train size={30} />
        </div>
      </div>

      {/* Fixed Header */}
      <motion.header 
        className={`main-header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <Menu size={24} />
              </button>
              <div className="logo" onClick={() => navigate('/')}>
                <Sparkles className="logo-sparkle" size={24} />
                <h1>MyTravel<span>Mate</span></h1>
              </div>
            </div>

            <nav className={`main-nav ${showMobileMenu ? 'show' : ''}`}>
              <div className="nav-items">
                {serviceCategories.slice(0, 4).map((cat) => (
                  <a 
                    key={cat.id} 
                    href={`/${cat.id}`}
                    className={`nav-item ${activeTab === cat.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(cat.id);
                    }}
                  >
                    <span className="nav-icon">{cat.icon}</span>
                    <span className="nav-label">{cat.label}</span>
                  </a>
                ))}
              </div>
            </nav>

            <div className="header-actions">
              {user ? (
                <div className="user-section">
                  <button className="notification-btn">
                    <Bell size={20} />
                    {notifications.length > 0 && (
                      <span className="notification-badge">{notifications.length}</span>
                    )}
                  </button>
                  <button className="user-btn">
                    <User size={20} />
                    <span className="user-name">{user.name?.split(' ')[0]}</span>
                  </button>
                  <button className="wishlist-btn">
                    <Heart size={20} />
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button className="login-btn" onClick={() => navigate('/login')}>
                    Login
                  </button>
                  <button className="signup-btn" onClick={() => navigate('/signup')}>
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-content">
              <div className="mobile-menu-header">
                <h3>Menu</h3>
                <button className="close-menu" onClick={() => setShowMobileMenu(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="mobile-menu-items">
                {serviceCategories.map((cat) => (
                  <a 
                    key={cat.id}
                    href={`/${cat.id}`}
                    className="mobile-menu-item"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(cat.id);
                      setShowMobileMenu(false);
                    }}
                  >
                    <span className="menu-icon" style={{ color: cat.color }}>
                      {cat.icon}
                    </span>
                    <span className="menu-label">{cat.label}</span>
                    <ChevronRight size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Panel */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div 
            className="notification-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="container">
              <div className="notification-slider">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="notification-item"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-icon">
                      {notification.type === 'flight' && <Plane size={16} />}
                      {notification.type === 'hotel' && <Hotel size={16} />}
                      {notification.type === 'booking' && <ShieldCheck size={16} />}
                    </div>
                    <span className="notification-text">{notification.message}</span>
                    <span className="notification-time">{notification.time}</span>
                    <button className="notification-close">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection user={user} />
      
      {/* Main Search Section */}
      <section className="main-search-section">
        <div className="container">
          <motion.div 
            className="search-container-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Service Tabs */}
            <div className="service-tabs">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`service-tab ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    '--tab-color': cat.color,
                    '--tab-bg': cat.color + '20'
                  }}
                >
                  <span className="tab-icon">{cat.icon}</span>
                  <span className="tab-label">{cat.label}</span>
                  {activeTab === cat.id && (
                    <motion.div 
                      className="tab-indicator"
                      layoutId="tab-indicator"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main Search Widget */}
            <div className="main-search-widget cosmic-card">
              <SearchWidget 
                type={activeTab} 
                onSearch={handleSearch} 
                className="advanced-search-widget"
              />
              
              {/* Quick Search Suggestions */}
              <div className="quick-suggestions">
                <span className="suggestions-label">Popular searches:</span>
                <div className="suggestion-chips">
                  <button className="suggestion-chip" onClick={() => handleSearch({ type: 'flights', from: 'DEL', to: 'GOI' })}>
                    Delhi to Goa
                  </button>
                  <button className="suggestion-chip" onClick={() => handleSearch({ type: 'hotels', location: 'Manali' })}>
                    Hotels in Manali
                  </button>
                  <button className="suggestion-chip" onClick={() => handleSearch({ type: 'trains', from: 'Mumbai', to: 'Chennai' })}>
                    Mumbai to Chennai Trains
                  </button>
                  <button className="suggestion-chip" onClick={() => handleSearch({ type: 'holidays', destination: 'Maldives' })}>
                    Maldives Packages
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <ShieldCheck size={20} />
                <span>Safe & Secure</span>
              </div>
              <div className="trust-badge">
                <Award size={20} />
                <span>Best Price Guarantee</span>
              </div>
              <div className="trust-badge">
                <Headphones size={20} />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Flight Deals Ticker */}
      <div className="live-deals-ticker">
        <div className="container">
          <div className="ticker-header">
            <TrendingUp size={20} />
            <span className="ticker-title">Live Flight Deals</span>
            <div className="ticker-controls">
              <button className="ticker-btn" onClick={() => setActiveDealIndex(prev => (prev - 1 + flightDeals.length) % flightDeals.length)}>
                <ChevronLeft size={20} />
              </button>
              <button className="ticker-btn" onClick={() => setActiveDealIndex(prev => (prev + 1) % flightDeals.length)}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDealIndex}
              className="ticker-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {liveFlightDeals.map((deal, index) => (
                index === activeDealIndex && (
                  <div key={deal.id} className="live-deal">
                    <div className="route">
                      <span className="city-code">{deal.from}</span>
                      <div className="route-line">
                        <div className="plane-icon">
                          <Plane size={16} />
                        </div>
                      </div>
                      <span className="city-code">{deal.to}</span>
                    </div>
                    <div className="deal-details">
                      <span className="airline">{deal.airline}</span>
                      <span className="duration">{deal.duration}</span>
                      <span className="departure">{deal.departure}</span>
                    </div>
                    <div className="deal-price">
                      <span className="price">{deal.price}</span>
                      <span className="seats-left">{deal.seatsLeft} seats left</span>
                    </div>
                    <button className="book-now-btn" onClick={() => handleQuickBook('flight', deal)}>
                      Book Now
                    </button>
                    <span className="live-badge">
                      <span className="live-dot"></span>
                      LIVE
                    </span>
                  </div>
                )
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Weather & Quick Info */}
      <div className="quick-info-bar">
        <div className="container">
          <div className="quick-info-content">
            {weatherInfo && (
              <div className="weather-widget">
                <span className="weather-icon">{weatherInfo.icon}</span>
                <div className="weather-info">
                  <span className="weather-temp">{weatherInfo.temp}</span>
                  <span className="weather-location">{weatherInfo.location}</span>
                </div>
              </div>
            )}
            
            <div className="quick-links">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.url} className="quick-link">
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className="currency-converter">
              <span className="converter-label">1 USD = </span>
              <span className="converter-value">₹83.45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="main-content">
        <QuickBook onQuickBook={handleQuickBook} />
        
        <FeaturedDestinations 
          destinations={featuredDestinations} 
          onDestinationClick={(destination) => navigate(`/destinations/${destination.id}`)}
        />
        
        <TrendingOffers 
          offers={trendingOffers} 
          onOfferClick={(offer) => navigate(`/booking/${offer.type}/${offer.id}`)}
        />
        
        <PromoBanner />
        
        <DestinationInspiration 
          onInspirationSelect={(destination) => navigate(`/destinations/${destination.id}`)}
        />
        
        {/* Why Choose Us Section */}
        <section className="why-choose-section">
          <div className="container">
            <h2 className="section-title">Why Choose MyTravelMate?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={32} />
                </div>
                <h3>Safe & Secure</h3>
                <p>Your security is our priority. Book with confidence.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Star size={32} />
                </div>
                <h3>Best Prices</h3>
                <p>Guaranteed best prices on flights, hotels & packages.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Headphones size={32} />
                </div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock customer support for all your needs.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Award size={32} />
                </div>
                <h3>Award Winning</h3>
                <p>Recognized as India's most trusted travel brand.</p>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        <AppDownload />
      </div>

      {/* Floating Chatbot */}
      <AnimatePresence>
        {showChatbot ? (
          <motion.div 
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <Sparkles size={20} />
                <span>Travel Assistant</span>
              </div>
              <button className="chatbot-close" onClick={() => setShowChatbot(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="chatbot-messages" ref={chatMessagesRef}>
              {chatbotMessages.map((msg, index) => (
                <div key={index} className="chatbot-message">
                  {msg}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input type="text" placeholder="Type your message..." />
              <button className="send-btn">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button 
            className="chatbot-toggle"
            onClick={() => setShowChatbot(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Headphones size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Company</h3>
              <a href="/about">About Us</a>
              <a href="/careers">Careers</a>
              <a href="/press">Press</a>
              <a href="/blog">Blog</a>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <a href="/help">Help Center</a>
              <a href="/contact">Contact Us</a>
              <a href="/safety">Safety Center</a>
              <a href="/cancellation">Cancellation Options</a>
            </div>
            <div className="footer-section">
              <h3>Legal</h3>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
              <a href="/accessibility">Accessibility</a>
            </div>
            <div className="footer-section">
              <h3>Download Our App</h3>
              <div className="app-download-buttons">
                <button className="app-store-btn">
                  <Smartphone size={20} />
                  <div>
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </button>
                <button className="play-store-btn">
                  <Smartphone size={20} />
                  <div>
                    <span>GET IT ON</span>
                    <strong>Google Play</strong>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 MyTravelMate. All rights reserved.</p>
            <div className="payment-methods">
              <CreditCard size={20} />
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Rupay</span>
              <span>UPI</span>
              <span>Net Banking</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;