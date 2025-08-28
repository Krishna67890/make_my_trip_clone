import React, { useState, useEffect } from 'react';
import './FeaturedDestinations.css';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample destination data
  useEffect(() => {
    const mockDestinations = [
      {
        id: 1,
        name: "Taj Mahal",
        city: "Agra",
        state: "Uttar Pradesh",
        description: "An ivory-white marble mausoleum and one of the Seven Wonders of the World.",
        bestTime: "October to March",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        price: 50,
        category: "Historical"
      },
      {
        id: 2,
        name: "Varanasi Ghats",
        city: "Varanasi",
        state: "Uttar Pradesh",
        description: "Spiritual capital of India with sacred ghats along the Ganges River.",
        bestTime: "October to March",
        image: "https://images.unsplash.com/photo-1582492156150-6b7a3d3b79c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        price: 0,
        category: "Spiritual"
      },
      {
        id: 3,
        name: "Backwaters",
        city: "Alleppey",
        state: "Kerala",
        description: "Network of canals, lagoons and lakes along the Arabian Sea coast.",
        bestTime: "September to March",
        image: "https://images.unsplash.com/photo-1580585981725-4a78db35cf00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        price: 75,
        category: "Nature"
      },
      {
        id: 4,
        name: "Jaipur Forts",
        city: "Jaipur",
        state: "Rajasthan",
        description: "The Pink City with magnificent forts and palaces showcasing Rajput architecture.",
        bestTime: "October to March",
        image: "https://images.unsplash.com/photo-1534759850793-9d44168633f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        price: 40,
        category: "Historical"
      },
      {
        id: 5,
        name: "Goa Beaches",
        city: "Goa",
        state: "Goa",
        description: "Pristine beaches, Portuguese architecture, and vibrant nightlife.",
        bestTime: "November to February",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.4,
        price: 65,
        category: "Beach"
      },
      {
        id: 6,
        name: "Darjeeling Tea Gardens",
        city: "Darjeeling",
        state: "West Bengal",
        description: "Famous for its tea industry and views of Kangchenjunga, the world's third-highest mountain.",
        bestTime: "March to May, October to November",
        image: "https://images.unsplash.com/photo-1568832359670-5d5e77ab6c2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4.3,
        price: 30,
        category: "Nature"
      }
    ];
    
    setDestinations(mockDestinations);
    setFilteredDestinations(mockDestinations);
  }, []);

  // Get unique states for filter
  const states = ['All', ...new Set(destinations.map(dest => dest.state))];

  // Filter destinations based on state and search term
  useEffect(() => {
    let results = destinations;
    
    if (selectedState !== 'All') {
      results = results.filter(dest => dest.state === selectedState);
    }
    
    if (searchTerm) {
      results = results.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDestinations(results);
  }, [selectedState, searchTerm, destinations]);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="featured-destinations">
      <h2>Featured Destinations in India</h2>
      <p className="subtitle">Discover the incredible diversity of India's most beautiful places</p>
      
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          {states.map(state => (
            <button
              key={state}
              className={selectedState === state ? 'active' : ''}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
      
      <div className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map(destination => (
            <div 
              key={destination.id} 
              className="destination-card"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="card-image">
                <img src={destination.image} alt={destination.name} />
                <div className="card-overlay">
                  <span className="category">{destination.category}</span>
                  <span className="rating">⭐ {destination.rating}</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{destination.name}</h3>
                <p className="location">{destination.city}, {destination.state}</p>
                <p className="description">{destination.description}</p>
                <div className="card-details">
                  <span className="price">
                    {destination.price > 0 ? `₹${destination.price}` : 'Free'}
                  </span>
                  <span className="best-time">Best time: {destination.bestTime}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No destinations found. Try a different search or filter.</p>
          </div>
        )}
      </div>
      
      {selectedDestination && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <img src={selectedDestination.image} alt={selectedDestination.name} />
            <div className="modal-details">
              <h2>{selectedDestination.name}</h2>
              <p className="location">{selectedDestination.city}, {selectedDestination.state}</p>
              <p className="description">{selectedDestination.description}</p>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Best Time to Visit</strong>
                  <span>{selectedDestination.bestTime}</span>
                </div>
                <div className="detail-item">
                  <strong>Category</strong>
                  <span>{selectedDestination.category}</span>
                </div>
                <div className="detail-item">
                  <strong>Entry Fee</strong>
                  <span>{selectedDestination.price > 0 ? `₹${selectedDestination.price}` : 'Free'}</span>
                </div>
                <div className="detail-item">
                  <strong>Rating</strong>
                  <span>⭐ {selectedDestination.rating}/5</span>
                </div>
              </div>
              <button className="book-now-btn">Plan Your Visit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedDestinations;