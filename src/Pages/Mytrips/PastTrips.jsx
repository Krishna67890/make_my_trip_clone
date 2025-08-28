import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import './PastTrips.css';

// Mock data for past trips
const mockTrips = [
  {
    id: 1,
    destination: 'Paris, France',
    date: '2023-05-15',
    duration: 7,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52',
    rating: 4.8,
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
    cost: 2450,
    travelers: 2,
    review: 'An amazing cultural experience with incredible food and architecture.'
  },
  {
    id: 2,
    destination: 'Kyoto, Japan',
    date: '2023-03-22',
    duration: 10,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    rating: 4.9,
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Forest', 'Kinkaku-ji'],
    cost: 3200,
    travelers: 1,
    review: 'The perfect blend of traditional culture and modern convenience.'
  },
  {
    id: 3,
    destination: 'Santorini, Greece',
    date: '2022-09-10',
    duration: 5,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    rating: 4.7,
    highlights: ['Oia Sunset', 'Wine Tasting Tour', 'Red Beach'],
    cost: 1850,
    travelers: 2,
    review: 'Breathtaking views and incredible Mediterranean cuisine.'
  },
  {
    id: 4,
    destination: 'New York, USA',
    date: '2022-12-05',
    duration: 4,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    rating: 4.5,
    highlights: ['Central Park', 'Statue of Liberty', 'Broadway Show'],
    cost: 2100,
    travelers: 3,
    review: 'The city that never sleeps lived up to its reputation!'
  },
  {
    id: 5,
    destination: 'Bali, Indonesia',
    date: '2022-07-18',
    duration: 14,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
    rating: 4.9,
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Uluwatu Cliff'],
    cost: 2750,
    travelers: 2,
    review: 'A perfect blend of relaxation, culture, and adventure.'
  },
  {
    id: 6,
    destination: 'Rome, Italy',
    date: '2022-04-30',
    duration: 6,
    image: 'https://images.unsplash.com/photo-1552832230-c0197043a9e3',
    rating: 4.6,
    highlights: ['Colosseum', 'Vatican Museums', 'Trevi Fountain'],
    cost: 1950,
    travelers: 2,
    review: 'History comes alive around every corner in this magnificent city.'
  }
];

// Custom hook for fetching past trips
const usePastTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchTrips = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrips(mockTrips);
        setLoading(false);
      } catch (err) {
        setError('Failed to load past trips');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return { trips, loading, error };
};

// Trip Card Component with animation on scroll
const TripCard = React.memo(({ trip, onSelect }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleClick = useCallback(() => {
    onSelect(trip);
  }, [onSelect, trip]);

  return (
    <div 
      ref={ref}
      className={`trip-card ${inView ? 'visible' : ''}`}
      onClick={handleClick}
    >
      <div className="trip-image">
        <img src={trip.image} alt={trip.destination} />
        <div className="trip-rating">
          <span className="star">★</span>
          {trip.rating}
        </div>
      </div>
      <div className="trip-content">
        <h3>{trip.destination}</h3>
        <div className="trip-details">
          <span className="trip-date">{new Date(trip.date).toLocaleDateString()}</span>
          <span className="trip-duration">{trip.duration} days</span>
        </div>
        <div className="trip-cost">${trip.cost}</div>
      </div>
    </div>
  );
});

// Modal Component for trip details
const TripModal = ({ trip, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <img src={trip.image} alt={trip.destination} />
          <h2>{trip.destination}</h2>
        </div>
        <div className="modal-body">
          <div className="trip-info">
            <div className="info-item">
              <span className="label">Date:</span>
              <span>{new Date(trip.date).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <span className="label">Duration:</span>
              <span>{trip.duration} days</span>
            </div>
            <div className="info-item">
              <span className="label">Travelers:</span>
              <span>{trip.travelers}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Cost:</span>
              <span>${trip.cost}</span>
            </div>
          </div>
          
          <div className="highlights-section">
            <h3>Trip Highlights</h3>
            <ul>
              {trip.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          
          <div className="review-section">
            <h3>Your Review</h3>
            <p>{trip.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main PastTrips Component
const PastTrips = () => {
  const { trips, loading, error } = usePastTrips();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterYear, setFilterYear] = useState('all');

  // Get unique years for filter
  const years = useMemo(() => {
    const uniqueYears = [...new Set(trips.map(trip => new Date(trip.date).getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, [trips]);

  // Filter and sort trips
  const filteredAndSortedTrips = useMemo(() => {
    let result = [...trips];
    
    // Filter by year
    if (filterYear !== 'all') {
      result = result.filter(trip => new Date(trip.date).getFullYear().toString() === filterYear);
    }
    
    // Sort trips
    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'cost':
        result.sort((a, b) => b.cost - a.cost);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }
    
    return result;
  }, [trips, sortBy, filterYear]);

  const handleSelectTrip = useCallback((trip) => {
    setSelectedTrip(trip);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTrip(null);
  }, []);

  if (loading) {
    return (
      <div className="past-trips-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="past-trips-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="past-trips-container">
      <header className="past-trips-header">
        <h1>Past Trips</h1>
        <p>Relive your favorite travel memories</p>
      </header>
      
      <div className="controls-section">
        <div className="filter-control">
          <label htmlFor="year-filter">Filter by Year:</label>
          <select 
            id="year-filter"
            value={filterYear} 
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="sort-control">
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date (Newest First)</option>
            <option value="cost">Cost (Highest First)</option>
            <option value="rating">Rating (Highest First)</option>
            <option value="duration">Duration (Longest First)</option>
          </select>
        </div>
      </div>
      
      {filteredAndSortedTrips.length === 0 ? (
        <div className="no-trips-message">
          <h2>No past trips found</h2>
          <p>You don't have any trips matching your filters.</p>
        </div>
      ) : (
        <div className="trips-grid">
          {filteredAndSortedTrips.map(trip => (
            <TripCard 
              key={trip.id} 
              trip={trip} 
              onSelect={handleSelectTrip}
            />
          ))}
        </div>
      )}
      
      {selectedTrip && (
        <TripModal 
          trip={selectedTrip} 
          isOpen={!!selectedTrip} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PastTrips;