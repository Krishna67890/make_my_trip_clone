import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Calendar, ArrowUpRight, Search, Navigation } from 'lucide-react';
import '../../Styles/Pages/Home/FeaturedDestinations.css';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockDestinations = [
      {
        id: 1,
        name: "Taj Mahal",
        city: "Agra",
        state: "Uttar Pradesh",
        description: "An ivory-white marble mausoleum and one of the Seven Wonders of the World.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        price: "₹50",
        category: "Historical",
        coords: { x: "40%", y: "45%" }
      },
      {
        id: 2,
        name: "Varanasi Ghats",
        city: "Varanasi",
        state: "Uttar Pradesh",
        description: "Spiritual capital of India with sacred ghats along the Ganges River.",
        image: "https://images.unsplash.com/photo-1582492156150-6b7a3d3b79c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        rating: 4.8,
        price: "Free",
        category: "Spiritual",
        coords: { x: "45%", y: "48%" }
      },
      {
        id: 3,
        name: "Backwaters",
        city: "Alleppey",
        state: "Kerala",
        description: "Network of canals, lagoons and lakes along the Arabian Sea coast.",
        image: "https://images.unsplash.com/photo-1580585981725-4a78db35cf00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        rating: 4.7,
        price: "₹1500",
        category: "Nature",
        coords: { x: "28%", y: "85%" }
      },
      {
        id: 4,
        name: "Jaipur Forts",
        city: "Jaipur",
        state: "Rajasthan",
        description: "The Pink City with magnificent forts and palaces showcasing Rajput architecture.",
        image: "https://images.unsplash.com/photo-1534759850793-9d44168633f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        rating: 4.8,
        price: "₹100",
        category: "Heritage",
        coords: { x: "32%", y: "48%" }
      },
      {
        id: 5,
        name: "Goa Beaches",
        city: "Goa",
        state: "Goa",
        description: "Pristine beaches, Portuguese architecture, and vibrant nightlife.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        rating: 4.6,
        price: "Free",
        category: "Beach",
        coords: { x: "25%", y: "68%" }
      },
      {
        id: 6,
        name: "Darjeeling Tea Gardens",
        city: "Darjeeling",
        state: "West Bengal",
        description: "Famous for its tea industry and views of Kangchenjunga.",
        image: "https://images.unsplash.com/photo-1568832359670-5d5e77ab6c2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        rating: 4.7,
        price: "Free",
        category: "Nature",
        coords: { x: "65%", y: "45%" }
      }
    ];
    setDestinations(mockDestinations);
  }, []);

  useEffect(() => {
    let results = destinations;
    if (selectedState !== 'All') {
      results = results.filter(dest => dest.state === selectedState);
    }
    if (searchTerm) {
      results = results.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDestinations(results);
  }, [selectedState, searchTerm, destinations]);

  const states = ['All', ...new Set(destinations.map(dest => dest.state))];

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header-modern">
          <div className="title-area">
            <span className="subtitle-tag">Exotic Escapes</span>
            <h2 className="section-title">Discover Incredible <span className="text-gradient">India</span></h2>
          </div>
          
          <div className="header-controls">
            <div className="search-pill">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Find your next destination..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Travel Map Preview */}
        <div className="travel-map-wrapper">
          <div className="india-map-svg">
            {/* Simple abstract map representaton */}
            <div className="map-base"></div>
            {filteredDestinations.map(dest => (
              <motion.div 
                key={dest.id}
                className="map-pin-pulse"
                style={{ left: dest.coords.x, top: dest.coords.y }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="pulse-circle"></div>
                <div className="pin-tooltip">{dest.name}</div>
              </motion.div>
            ))}
          </div>
          <div className="map-info">
            <h3>Explore the <br/>Unexplored</h3>
            <p>From the snowy peaks of Himalayas to the serene backwaters of Kerala.</p>
            <button className="btn-map">
              <Navigation size={18} /> Open Interactive Map
            </button>
          </div>
        </div>

        {/* Categories / States */}
        <div className="state-chips-wrapper">
          {states.map(state => (
            <button
              key={state}
              className={`state-chip ${selectedState === state ? 'active' : ''}`}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <motion.div 
          className="dest-grid-modern"
          layout
        >
          <AnimatePresence>
            {filteredDestinations.map((dest, index) => (
              <motion.div 
                key={dest.id}
                className="dest-card-modern"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="dest-image-box">
                  <img src={dest.image} alt={dest.name} />
                  <div className="dest-badge">{dest.category}</div>
                  <div className="dest-actions">
                    <button className="icon-btn"><ArrowUpRight size={20} /></button>
                  </div>
                </div>
                
                <div className="dest-info-box">
                  <div className="dest-top">
                    <h3>{dest.name}</h3>
                    <div className="dest-rating">
                      <Star size={14} fill="var(--accent)" color="var(--accent)" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>
                  <div className="dest-loc">
                    <MapPin size={14} />
                    <span>{dest.city}, {dest.state}</span>
                  </div>
                  <p className="dest-desc">{dest.description}</p>
                  <div className="dest-footer">
                    <div className="dest-price">
                      <span className="label">Starts from</span>
                      <span className="val">{dest.price}</span>
                    </div>
                    <button className="btn-explore">Explore</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;