import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Train, Hotel, Bus, ArrowLeftRight, Calendar, Users, ShieldCheck, RefreshCcw, Award, CheckCircle, Navigation } from 'lucide-react';
import './QuickBook.css';

const QuickBook = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    travelers: 1,
    class: 'economy'
  });

  const tabs = [
    { id: 'flights', label: 'Flights', icon: <Plane size={20} /> },
    { id: 'trains', label: 'Trains', icon: <Train size={20} /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel size={20} /> },
    { id: 'buses', label: 'Buses', icon: <Bus size={20} /> },
  ];

  const popularDestinations = [
    { 
      name: 'Goa', 
      tags: 'Beaches • Nightlife', 
      price: '₹4,999', 
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Kerala', 
      tags: 'Backwaters • Nature', 
      price: '₹5,499', 
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Rajasthan', 
      tags: 'Heritage • Desert', 
      price: '₹3,999', 
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Manali', 
      tags: 'Mountains • Snow', 
      price: '₹6,299', 
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const swapCities = () => {
    setFormData({ ...formData, from: formData.to, to: formData.from });
  };

  return (
    <section className="quickbook-modern">
      <div className="container">
        <div className="qb-wrapper-glass">
          <div className="qb-header">
            <div className="qb-title-box">
              <span className="qb-tag">Travel Planning</span>
              <h2 className="qb-title">QuickBook <span className="text-gradient">Premium</span></h2>
              <p className="qb-subtitle">Effortless bookings across India with guaranteed lowest prices.</p>
            </div>
            
            <div className="qb-tabs-modern">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  className={`qb-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="qb-tab-icon">{tab.icon}</span>
                  <span className="qb-tab-label">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="qbTab" className="qb-active-indicator" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="qb-form-area">
            <form className="qb-grid-form" onSubmit={(e) => e.preventDefault()}>
              <div className="qb-input-row">
                <div className="qb-input-group">
                  <label><Navigation size={14} /> From</label>
                  <input type="text" name="from" value={formData.from} onChange={handleInputChange} placeholder="Origin" />
                </div>

                <motion.button 
                  whileHover={{ rotate: 180 }}
                  type="button" 
                  className="qb-swap-btn" 
                  onClick={swapCities}
                >
                  <ArrowLeftRight size={18} />
                </motion.button>

                <div className="qb-input-group">
                  <label><Navigation size={14} /> To</label>
                  <input type="text" name="to" value={formData.to} onChange={handleInputChange} placeholder="Destination" />
                </div>

                <div className="qb-input-group">
                  <label><Calendar size={14} /> Date</label>
                  <input type="date" name="departure" value={formData.departure} onChange={handleInputChange} />
                </div>

                <div className="qb-input-group">
                  <label><Users size={14} /> {activeTab === 'hotels' ? 'Guests' : 'Travelers'}</label>
                  <select name="travelers" value={formData.travelers} onChange={handleInputChange}>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {n===1 ? 'Person' : 'People'}</option>)}
                  </select>
                </div>

                <button type="submit" className="qb-search-btn">
                  Explore
                </button>
              </div>
            </form>
          </div>

          <div className="qb-trust-grid">
            <div className="trust-card">
              <ShieldCheck className="trust-icon" />
              <div>
                <h5>Secure Payments</h5>
                <p>100% encrypted transactions</p>
              </div>
            </div>
            <div className="trust-card">
              <RefreshCcw className="trust-icon" />
              <div>
                <h5>Easy Refunds</h5>
                <p>Instant returns on cancellation</p>
              </div>
            </div>
            <div className="trust-card">
              <Award className="trust-icon" />
              <div>
                <h5>Best Price</h5>
                <p>Match & beat guarantee</p>
              </div>
            </div>
          </div>
        </div>

        <div className="popular-modern-section">
          <div className="popular-header">
            <h3>Trending in <span className="text-gradient">India</span></h3>
            <button className="btn-link">View All Destinations</button>
          </div>
          <div className="popular-grid">
            {popularDestinations.map((dest, i) => (
              <motion.div 
                key={dest.name}
                className="pop-card"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="pop-img-box">
                  <img src={dest.image} alt={dest.name} />
                  <div className="pop-price-tag">{dest.price}</div>
                </div>
                <div className="pop-info">
                  <h4>{dest.name}</h4>
                  <p>{dest.tags}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickBook;