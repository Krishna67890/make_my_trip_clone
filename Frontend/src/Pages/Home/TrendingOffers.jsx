import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Star, ArrowRight, Tag, Zap, Percent } from 'lucide-react';
import '../../Styles/Pages/Home/TrendingOffers.css';

const TrendingOffers = () => {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    {
      id: 1,
      title: "Italian Dream Escape",
      destination: "Rome, Florence, Venice",
      duration: "8 days / 7 nights",
      originalPrice: 1899,
      discountedPrice: 1499,
      discount: 21,
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      rating: 4.8,
      reviews: 124,
      category: "europe",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
      featured: true
    },
    {
      id: 2,
      title: "Tropical Paradise Getaway",
      destination: "Maldives",
      duration: "6 days / 5 nights",
      originalPrice: 2200,
      discountedPrice: 1799,
      discount: 18,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      reviews: 98,
      category: "beach",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // 5 hours from now
      featured: true
    },
    {
      id: 3,
      title: "Asian Cultural Journey",
      destination: "Japan, South Korea",
      duration: "12 days / 11 nights",
      originalPrice: 2899,
      discountedPrice: 2399,
      discount: 17,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      rating: 4.7,
      reviews: 156,
      category: "asia",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString()
    },
    {
      id: 4,
      title: "African Safari Adventure",
      destination: "Kenya, Tanzania",
      duration: "10 days / 9 nights",
      originalPrice: 2499,
      discountedPrice: 1999,
      discount: 20,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      reviews: 87,
      category: "adventure",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString()
    },
    {
      id: 5,
      title: "Scandinavian Northern Lights",
      destination: "Norway, Sweden, Finland",
      duration: "9 days / 8 nights",
      originalPrice: 2199,
      discountedPrice: 1899,
      discount: 14,
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      rating: 4.6,
      reviews: 112,
      category: "europe",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString()
    },
    {
      id: 6,
      title: "Caribbean Cruise Experience",
      destination: "Bahamas, Jamaica, Cayman Islands",
      duration: "7 days / 6 nights",
      originalPrice: 1699,
      discountedPrice: 1399,
      discount: 18,
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      rating: 4.5,
      reviews: 134,
      category: "cruise",
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
    }
  ];

  const categories = [
    { id: 'all', name: 'Hot Deals' },
    { id: 'europe', name: 'Europe' },
    { id: 'beach', name: 'Beach' },
    { id: 'asia', name: 'Asia' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'cruise', name: 'Cruise' }
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  return (
    <section className="trending-modern">
      <div className="container">
        <div className="trending-header">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="offer-tag"><Zap size={14} /> Flash Sales</span>
            <h2 className="trending-title">Trending <span className="text-gradient">Limited-Time</span> Offers</h2>
            <p className="trending-subtitle">Grab these exclusive discounts before they vanish! Best prices guaranteed for your dream holidays.</p>
          </motion.div>
          
          <motion.div 
            className="offers-nav-glass"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map(category => (
              <button
                key={category.id}
                className={`offer-nav-item ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="offers-grid-modern"
          layout
        >
          <AnimatePresence mode='popLayout'>
            {filteredOffers.map((offer, index) => (
              <OfferCardModern key={offer.id} offer={offer} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="offers-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="btn-view-all">
            See All Exclusive Deals <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const OfferCardModern = ({ offer, index }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const updateTimer = () => {
      const diff = new Date(offer.endTime) - new Date();
      if (diff <= 0) return setTimeLeft(null);
      
      setTimeLeft({
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [offer.endTime]);

  return (
    <motion.div 
      className={`offer-card-modern ${offer.featured ? 'is-featured' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <div className="offer-image-container">
        <img src={offer.image} alt={offer.title} />
        <div className="discount-badge-premium">
          <Percent size={14} /> {offer.discount}% OFF
        </div>
        
        {timeLeft && (
          <div className="offer-timer-glass">
            <Clock size={14} className="timer-icon" />
            <span>{timeLeft.h}h {timeLeft.m}m {timeLeft.s}s left</span>
          </div>
        )}

        {offer.featured && <div className="featured-ribbon">Top Rated</div>}
      </div>

      <div className="offer-body">
        <div className="offer-meta">
          <span className="offer-cat">{offer.category}</span>
          <div className="offer-rating-box">
            <Star size={12} fill="#ffc107" color="#ffc107" />
            <span>{offer.rating}</span>
          </div>
        </div>
        
        <h3 className="offer-name">{offer.title}</h3>
        
        <div className="offer-loc-row">
          <MapPin size={14} />
          <span>{offer.destination}</span>
        </div>

        <div className="offer-dur-row">
          <Calendar size={14} />
          <span>{offer.duration}</span>
        </div>

        <div className="offer-pricing-row">
          <div className="price-box">
            <span className="old-price">${offer.originalPrice}</span>
            <div className="new-price-wrap">
              <span className="curr-sym">$</span>
              <span className="new-price">{offer.discountedPrice}</span>
              <span className="per-person">/ person</span>
            </div>
          </div>
          <button className="btn-grab">Grab Deal</button>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingOffers;