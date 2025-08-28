// pages/Home/TrendingOffers.jsx
import React, { useState, useEffect } from 'react';
import './TrendingOffers.css';

const TrendingOffers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Italian Dream Escape",
      destination: "Rome, Florence, Venice",
      duration: "8 days / 7 nights",
      originalPrice: 1899,
      discountedPrice: 1499,
      discount: 21,
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      reviews: 124,
      category: "europe",
      timeLeft: "2024-07-15T23:59:59",
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
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 98,
      category: "beach",
      timeLeft: "2024-07-10T23:59:59",
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
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      reviews: 156,
      category: "asia",
      timeLeft: "2024-07-20T23:59:59"
    },
    {
      id: 4,
      title: "African Safari Adventure",
      destination: "Kenya, Tanzania",
      duration: "10 days / 9 nights",
      originalPrice: 2499,
      discountedPrice: 1999,
      discount: 20,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 87,
      category: "adventure",
      timeLeft: "2024-07-12T23:59:59"
    },
    {
      id: 5,
      title: "Scandinavian Northern Lights",
      destination: "Norway, Sweden, Finland",
      duration: "9 days / 8 nights",
      originalPrice: 2199,
      discountedPrice: 1899,
      discount: 14,
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviews: 112,
      category: "europe",
      timeLeft: "2024-07-18T23:59:59"
    },
    {
      id: 6,
      title: "Caribbean Cruise Experience",
      destination: "Bahamas, Jamaica, Cayman Islands",
      duration: "7 days / 6 nights",
      originalPrice: 1699,
      discountedPrice: 1399,
      discount: 18,
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      reviews: 134,
      category: "cruise",
      timeLeft: "2024-07-14T23:59:59"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Offers' },
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
    <section className="trending-offers-section">
      <div className="container">
        <div className="section-header">
          <h2>Trending Limited-Time Offers</h2>
          <p>Don't miss these exclusive deals with special discounts</p>
        </div>

        <div className="offers-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`tab ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="offers-grid">
          {filteredOffers.map(offer => (
            <OfferCard 
              key={offer.id} 
              offer={offer} 
              hovered={hoveredCard === offer.id}
              onHover={setHoveredCard}
            />
          ))}
        </div>

        <div className="view-all-container">
          <button className="view-all-btn">
            View All Offers
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

const OfferCard = ({ offer, hovered, onHover }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(offer.timeLeft));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(offer.timeLeft));
    }, 1000);

    return () => clearInterval(timer);
  }, [offer.timeLeft]);

  function calculateTimeLeft(endTime) {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  const handleMouseEnter = () => {
    onHover(offer.id);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  return (
    <div 
      className={`offer-card ${offer.featured ? 'featured' : ''} ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.featured && <div className="featured-badge">Featured</div>}
      
      <div className="card-image">
        <img src={offer.image} alt={offer.title} />
        <div className="image-overlay"></div>
        <div className="discount-badge">-{offer.discount}%</div>
        
        <div className="countdown-timer">
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.days || 0}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.hours || 0}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.minutes || 0}</span>
            <span className="countdown-label">Mins</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.seconds || 0}</span>
            <span className="countdown-label">Secs</span>
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3 className="offer-title">{offer.title}</h3>
        <p className="offer-destination">
          <i className="fas fa-map-marker-alt"></i>
          {offer.destination}
        </p>
        <p className="offer-duration">
          <i className="fas fa-calendar"></i>
          {offer.duration}
        </p>

        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas fa-star ${i < Math.floor(offer.rating) ? 'filled' : ''} ${i === Math.floor(offer.rating) && offer.rating % 1 !== 0 ? 'half-filled' : ''}`}
              ></i>
            ))}
          </div>
          <span className="rating-value">{offer.rating}</span>
          <span className="reviews">({offer.reviews} reviews)</span>
        </div>

        <div className="price-container">
          <div className="price-wrapper">
            <span className="original-price">${offer.originalPrice}</span>
            <span className="discounted-price">${offer.discountedPrice}</span>
            <span className="per-person">per person</span>
          </div>
        </div>

        <div className="card-actions">
          <button className="details-btn">View Details</button>
          <button className="book-now-btn">
            <i className="fas fa-shopping-cart"></i>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingOffers;