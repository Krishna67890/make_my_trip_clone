import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Train, Bus, MapPin, Calendar, Users, Search, ArrowRight, Sparkles } from 'lucide-react';
import '../../Styles/Pages/Home/HeroSection.css';

const HeroSection = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('flights');
  
  const tabs = [
    { id: 'flights', label: 'Flights', icon: <Plane size={20} /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel size={20} /> },
    { id: 'trains', label: 'Trains', icon: <Train size={20} /> },
    { id: 'buses', label: 'Buses', icon: <Bus size={20} /> },
    { id: 'tours', label: 'Holidays', icon: <Sparkles size={20} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="hero-modern">
      {/* Dynamic Background */}
      <div className="hero-bg-wrapper">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="mesh-grid"></div>
      </div>

      <div className="container">
        <motion.div 
          className="hero-content-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Header */}
          <div className="hero-text-center">
            <motion.div variants={itemVariants} className="hero-badge-modern">
              <span className="badge-dot"></span>
              India's Favorite Travel App
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-main-title">
              Your Journey <span className="text-gradient">Starts Here.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-description">
              Experience seamless bookings for flights, hotels, and tours. 
              Discover the world with exclusive deals and personalized travel plans.
            </motion.p>
          </div>

          {/* Advanced Search Widget */}
          <motion.div variants={itemVariants} className="search-card-glass">
            <div className="search-tabs-modern">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon-wrapper">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="active-underline" />
                  )}
                </button>
              ))}
            </div>

            <div className="search-fields-grid">
              <div className="input-group-modern">
                <label><MapPin size={14} /> From</label>
                <input type="text" placeholder="Where are you from?" />
              </div>

              <div className="swap-button">
                <ArrowRight size={16} />
              </div>

              <div className="input-group-modern">
                <label><MapPin size={14} /> To</label>
                <input type="text" placeholder="Where to?" />
              </div>

              <div className="input-group-modern">
                <label><Calendar size={14} /> Departure</label>
                <input type="text" placeholder="Select Date" />
              </div>

              <div className="input-group-modern">
                <label><Users size={14} /> Travellers</label>
                <input type="text" placeholder="1 Adult, Economy" />
              </div>

              <button className="search-btn-modern">
                <Search size={20} />
                <span>Explore Now</span>
              </button>
            </div>

            <div className="search-footer-modern">
              <div className="trending-chips">
                <span>Trending:</span>
                <button className="chip">New York</button>
                <button className="chip">Bali</button>
                <button className="chip">Switzerland</button>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-val">15M+</span>
              <span className="trust-lab">Users Worldwide</span>
            </div>
            <div className="divider"></div>
            <div className="trust-item">
              <span className="trust-val">4.9/5</span>
              <span className="trust-lab">App Rating</span>
            </div>
            <div className="divider"></div>
            <div className="trust-item">
              <span className="trust-val">24/7</span>
              <span className="trust-lab">Travel Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;