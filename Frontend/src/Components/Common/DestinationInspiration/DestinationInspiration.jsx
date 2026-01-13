import React, { useState, useEffect } from 'react';
import './DestinationInspiration.css';

const DestinationInspiration = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Filter destinations based on selection and search
  const filteredDestinations = destinations.filter(dest => {
    const matchesState = selectedState === 'All' || dest.state === selectedState;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  // Fetch destination data (simulated)
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDestinations([
        {
          id: 1,
          name: "Taj Mahal",
          state: "Uttar Pradesh",
          description: "An ivory-white marble mausoleum and one of the Seven Wonders of the World.",
          image: "taj-mahal",
          bestTime: "Oct-Mar",
          rating: 4.9,
          culturalSignificance: "Mughal architecture masterpiece"
        },
        {
          id: 2,
          name: "Varanasi Ghats",
          state: "Uttar Pradesh",
          description: "Spiritual capital of India with sacred ghats along the Ganges River.",
          image: "varanasi",
          bestTime: "Oct-Mar",
          rating: 4.7,
          culturalSignificance: "One of the oldest continuously inhabited cities"
        },
        {
          id: 3,
          name: "Backwaters of Kerala",
          state: "Kerala",
          description: "Network of brackish lagoons and lakes lying parallel to the Arabian Sea.",
          image: "kerala",
          bestTime: "Sep-Mar",
          rating: 4.8,
          culturalSignificance: "Unique ecosystem and traditional houseboats"
        },
        {
          id: 4,
          name: "Jaipur Forts",
          state: "Rajasthan",
          description: "The Pink City with magnificent forts and palaces showcasing Rajput architecture.",
          image: "jaipur",
          bestTime: "Oct-Mar",
          rating: 4.6,
          culturalSignificance: "Part of the Golden Triangle and UNESCO sites"
        },
        {
          id: 5,
          name: "Goa Beaches",
          state: "Goa",
          description: "Pristine beaches, Portuguese heritage, and vibrant nightlife.",
          image: "goa",
          bestTime: "Oct-Mar",
          rating: 4.5,
          culturalSignificance: "Blend of Indian and Portuguese cultures"
        },
        {
          id: 6,
          name: "Darjeeling Tea Gardens",
          state: "West Bengal",
          description: "Famous for its tea industry and stunning views of the Himalayas.",
          image: "darjeeling",
          bestTime: "Feb-Mar, Sep-Dec",
          rating: 4.7,
          culturalSignificance: "Colonial hill station with UNESCO toy train"
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Get unique states for filter
  const states = ['All', ...new Set(destinations.map(dest => dest.state))];

  return (
    <div className="destination-inspiration">
      <div className="di-header">
        <h1>Incredible India</h1>
        <p>Discover the diverse beauty and rich heritage of India's most amazing destinations</p>
      </div>

      <div className="di-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="state-filter">
          <label>Filter by State:</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading incredible destinations...</p>
        </div>
      ) : (
        <>
          <div className="destinations-grid">
            {filteredDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="no-results">
              <h3>No destinations found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </>
      )}

      <div className="di-footer">
        <p>Explore the rich cultural heritage, diverse landscapes, and unforgettable experiences that India has to offer.</p>
      </div>
    </div>
  );
};

// Destination Card Component
const DestinationCard = ({ destination }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`destination-card ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="card-image"
        style={{ backgroundImage: `url(https://source.unsplash.com/400x300/?${destination.image})` }}
      >
        <div className="card-overlay">
          <span className="rating">⭐ {destination.rating}</span>
          <span className="best-time">Best Time: {destination.bestTime}</span>
        </div>
      </div>

      <div className="card-content">
        <h3>{destination.name}</h3>
        <p className="state">{destination.state}</p>
        <p className="description">{destination.description}</p>
        
        <div className="cultural-info">
          <strong>Cultural Significance:</strong> {destination.culturalSignificance}
        </div>

        <button 
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Explore More'}
        </button>

        {isExpanded && (
          <div className="expanded-content">
            <div className="detail-item">
              <strong>Best Time to Visit:</strong> {destination.bestTime}
            </div>
            <div className="detail-item">
              <strong>Experience:</strong> Historical, Cultural, Photography
            </div>
            <div className="detail-item">
              <strong>Nearby Attractions:</strong> Local markets, Traditional cuisine
            </div>
            <button className="plan-trip-btn">Plan Your Trip</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationInspiration;