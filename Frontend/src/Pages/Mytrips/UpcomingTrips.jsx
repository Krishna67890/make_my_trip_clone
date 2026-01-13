import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import './UpcomingTrips.css';

// Mock data for upcoming trips
const mockUpcomingTrips = [
  {
    id: 1,
    destination: 'Tokyo, Japan',
    startDate: '2023-11-15',
    endDate: '2023-11-25',
    duration: 10,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    status: 'confirmed',
    bookingReference: 'TK2023JPN',
    travelers: 2,
    totalCost: 3850,
    itinerary: [
      { day: 1, activity: 'Arrival at Narita Airport' },
      { day: 1, activity: 'Check-in at Hotel' },
      { day: 2, activity: 'Explore Shibuya and Harajuku' },
      { day: 3, activity: 'Visit Asakusa and Senso-ji Temple' },
      { day: 4, activity: 'Day trip to Mount Fuji' }
    ],
    accommodations: [
      { name: 'Tokyo Grand Hotel', nights: 4, type: 'Hotel' },
      { name: 'Traditional Ryokan Experience', nights: 2, type: 'Ryokan' }
    ],
    flights: [
      { airline: 'Japan Airlines', departure: '09:00 AM', arrival: '02:30 PM' }
    ]
  },
  {
    id: 2,
    destination: 'Barcelona, Spain',
    startDate: '2023-12-10',
    endDate: '2023-12-17',
    duration: 7,
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    status: 'confirmed',
    bookingReference: 'BCN2023ESP',
    travelers: 4,
    totalCost: 2750,
    itinerary: [
      { day: 1, activity: 'Arrival at Barcelona Airport' },
      { day: 1, activity: 'Check-in at Apartment' },
      { day: 2, activity: 'Visit Sagrada Familia' },
      { day: 3, activity: 'Explore Gothic Quarter' },
      { day: 4, activity: 'Day at Barceloneta Beach' }
    ],
    accommodations: [
      { name: 'Seaside Apartment', nights: 6, type: 'Apartment' }
    ],
    flights: [
      { airline: 'Iberia', departure: '11:30 AM', arrival: '02:00 PM' }
    ]
  },
  {
    id: 3,
    destination: 'Bali, Indonesia',
    startDate: '2024-01-05',
    endDate: '2024-01-20',
    duration: 15,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
    status: 'pending',
    bookingReference: 'BL2024IDN',
    travelers: 2,
    totalCost: 2950,
    itinerary: [
      { day: 1, activity: 'Arrival at Denpasar Airport' },
      { day: 1, activity: 'Transfer to Ubud Villa' },
      { day: 2, activity: 'Yoga and Meditation Retreat' },
      { day: 3, activity: 'Visit Tegallalang Rice Terraces' },
      { day: 4, activity: 'Monkey Forest Sanctuary' }
    ],
    accommodations: [
      { name: 'Ubud Luxury Villa', nights: 7, type: 'Villa' },
      { name: 'Beachfront Resort', nights: 7, type: 'Resort' }
    ],
    flights: [
      { airline: 'Garuda Indonesia', departure: '08:45 PM', arrival: '06:30 AM' }
    ]
  },
  {
    id: 4,
    destination: 'New York, USA',
    startDate: '2023-10-28',
    endDate: '2023-11-02',
    duration: 5,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    status: 'completed',
    bookingReference: 'NYC2023USA',
    travelers: 1,
    totalCost: 1850,
    itinerary: [
      { day: 1, activity: 'Arrival at JFK Airport' },
      { day: 1, activity: 'Check-in at Times Square Hotel' },
      { day: 2, activity: 'Broadway Show' },
      { day: 3, activity: 'Statue of Liberty Tour' },
      { day: 4, activity: 'Central Park Exploration' }
    ],
    accommodations: [
      { name: 'Manhattan Skyline Hotel', nights: 4, type: 'Hotel' }
    ],
    flights: [
      { airline: 'Delta Airlines', departure: '07:00 AM', arrival: '10:15 AM' }
    ]
  }
];

// Custom hook for fetching upcoming trips
const useUpcomingTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchTrips = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        setTrips(mockUpcomingTrips);
        setLoading(false);
      } catch (err) {
        setError('Failed to load upcoming trips');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const cancelTrip = useCallback((id) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  }, []);

  return { trips, loading, error, cancelTrip };
};

// Status Badge Component
const StatusBadge = React.memo(({ status }) => {
  const statusConfig = {
    confirmed: { label: 'Confirmed', className: 'status-confirmed' },
    pending: { label: 'Pending', className: 'status-pending' },
    completed: { label: 'Completed', className: 'status-completed' },
    cancelled: { label: 'Cancelled', className: 'status-cancelled' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`status-badge ${config.className}`}>
      {config.label}
    </span>
  );
});

// Countdown Component
const Countdown = React.memo(({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(startDate) - new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        };
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (Object.keys(timeLeft).length === 0) {
    return <div className="countdown">Trip in progress or completed</div>;
  }

  return (
    <div className="countdown">
      <span className="countdown-item">
        <span className="countdown-value">{timeLeft.days || 0}</span>
        <span className="countdown-label">days</span>
      </span>
      <span className="countdown-item">
        <span className="countdown-value">{timeLeft.hours || 0}</span>
        <span className="countdown-label">hours</span>
      </span>
      <span className="countdown-item">
        <span className="countdown-value">{timeLeft.minutes || 0}</span>
        <span className="countdown-label">min</span>
      </span>
    </div>
  );
});

// Trip Card Component
const TripCard = React.memo(({ trip, onCancel, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expanded, setExpanded] = useState(false);

  const handleCancel = useCallback(() => {
    onCancel(trip.id);
  }, [trip.id, onCancel]);

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = new Date(trip.startDate) > new Date();
  const isCompleted = trip.status === 'completed';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="trip-card"
    >
      <div className="trip-image">
        <img src={trip.image} alt={trip.destination} />
        <StatusBadge status={trip.status} />
        {isUpcoming && <Countdown startDate={trip.startDate} />}
      </div>
      
      <div className="trip-content">
        <div className="trip-header">
          <h3>{trip.destination}</h3>
          <div className="trip-dates">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </div>
        </div>
        
        <div className="trip-details">
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{trip.duration} days</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Travelers:</span>
            <span className="detail-value">{trip.travelers}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Reference:</span>
            <span className="detail-value">{trip.bookingReference}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Cost:</span>
            <span className="detail-value">${trip.totalCost}</span>
          </div>
        </div>
        
        <div className="trip-actions">
          {isUpcoming && (
            <>
              <button className="action-btn primary">View Itinerary</button>
              <button className="action-btn secondary">Modify</button>
              <button className="action-btn warning" onClick={handleCancel}>
                Cancel Trip
              </button>
            </>
          )}
          {isCompleted && (
            <button className="action-btn primary">Add Review</button>
          )}
        </div>
        
        <button 
          className={`expand-btn ${expanded ? 'expanded' : ''}`}
          onClick={toggleExpand}
        >
          {expanded ? 'Show Less' : 'View Details'}
        </button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="trip-expanded-details"
            >
              <div className="expanded-section">
                <h4>Accommodations</h4>
                <ul>
                  {trip.accommodations.map((acc, idx) => (
                    <li key={idx}>
                      {acc.name} ({acc.nights} nights) - {acc.type}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="expanded-section">
                <h4>Flights</h4>
                <ul>
                  {trip.flights.map((flight, idx) => (
                    <li key={idx}>
                      {flight.airline}: Departure {flight.departure}, Arrival {flight.arrival}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="expanded-section">
                <h4>Itinerary Highlights</h4>
                <ul>
                  {trip.itinerary.slice(0, 5).map((item, idx) => (
                    <li key={idx}>
                      Day {item.day}: {item.activity}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

// Filter Component
const TripFilter = React.memo(({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Trips' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="trip-filters">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});

// Empty State Component
const EmptyState = React.memo(({ activeFilter }) => {
  const getMessage = () => {
    switch(activeFilter) {
      case 'upcoming': return "You don't have any upcoming trips";
      case 'pending': return "You don't have any pending trips";
      case 'completed': return "You haven't completed any trips yet";
      default: return "You don't have any trips planned";
    }
  };

  const getSubmessage = () => {
    switch(activeFilter) {
      case 'upcoming': return "Start planning your next adventure!";
      case 'pending': return "Your pending trips will appear here";
      case 'completed': return "Your completed trips will appear here";
      default: return "Start exploring destinations to plan your next trip";
    }
  };

  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="empty-icon">✈️</div>
      <h2>{getMessage()}</h2>
      <p>{getSubmessage()}</p>
      <button className="explore-btn">Explore Destinations</button>
    </motion.div>
  );
});

// Main UpcomingTrips Component
const UpcomingTrips = () => {
  const { trips, loading, error, cancelTrip } = useUpcomingTrips();
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter trips based on active filter
  const filteredTrips = useMemo(() => {
    if (activeFilter === 'all') return trips;
    
    return trips.filter(trip => {
      if (activeFilter === 'upcoming') {
        return trip.status === 'confirmed' && new Date(trip.startDate) > new Date();
      }
      return trip.status === activeFilter;
    });
  }, [trips, activeFilter]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handleCancelTrip = useCallback((id) => {
    if (window.confirm('Are you sure you want to cancel this trip?')) {
      cancelTrip(id);
    }
  }, [cancelTrip]);

  if (loading) {
    return (
      <div className="upcoming-trips-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="upcoming-trips-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="upcoming-trips-container">
      <header className="upcoming-trips-header">
        <h1>Upcoming Trips</h1>
        <p>Manage your upcoming adventures and travel plans</p>
      </header>
      
      {trips.length > 0 ? (
        <>
          <div className="controls-section">
            <TripFilter 
              activeFilter={activeFilter} 
              onFilterChange={handleFilterChange} 
            />
          </div>
          
          <div className="stats-bar">
            <span>
              {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}
              {activeFilter !== 'all' && ` ${activeFilter}`}
            </span>
          </div>
          
          <motion.div 
            className="trips-grid"
            layout
          >
            <AnimatePresence>
              {filteredTrips.map((trip, index) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onCancel={handleCancelTrip}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <EmptyState activeFilter={activeFilter} />
      )}
    </div>
  );
};

export default UpcomingTrips;