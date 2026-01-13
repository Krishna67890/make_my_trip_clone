// BusResults.jsx
import React, { useState, useEffect } from 'react';
import './BusResults.css';

const BusResults = ({ searchParams }) => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortBy, setSortBy] = useState('departure');
  const [filters, setFilters] = useState({
    priceRange: [0, 300],
    operators: [],
    amenities: [],
    departureTime: { min: 0, max: 24 },
    arrivalTime: { min: 0, max: 24 }
  });
  const [loading, setLoading] = useState(true);
  const [selectedBus, setSelectedBus] = useState(null);
  const [expandedBus, setExpandedBus] = useState(null);

  // Mock data fetch
  useEffect(() => {
    const mockBuses = [
      {
        id: 1,
        operator: 'Greyhound',
        operatorCode: 'GH',
        busType: 'Standard',
        departure: { 
          station: 'New York Port Authority', 
          time: '08:30 AM', 
          date: '2023-06-15',
          city: 'New York, NY'
        },
        arrival: { 
          station: 'Boston South Station', 
          time: '01:45 PM', 
          date: '2023-06-15',
          city: 'Boston, MA'
        },
        duration: '5h 15m',
        price: 35,
        amenities: ['Wi-Fi', 'Power Outlets', 'Restroom', 'Air Conditioning'],
        seats: 45,
        availableSeats: 12,
        operatorRating: 4.2,
        cancellation: 'Flexible',
        busNumber: 'GH 2345'
      },
      {
        id: 2,
        operator: 'Megabus',
        operatorCode: 'MB',
        busType: 'Double Decker',
        departure: { 
          station: 'New York 34th St', 
          time: '09:15 AM', 
          date: '2023-06-15',
          city: 'New York, NY'
        },
        arrival: { 
          station: 'Boston South Station', 
          time: '02:30 PM', 
          date: '2023-06-15',
          city: 'Boston, MA'
        },
        duration: '5h 15m',
        price: 28,
        amenities: ['Wi-Fi', 'Power Outlets', 'Restroom', 'Air Conditioning', 'Extra Legroom'],
        seats: 78,
        availableSeats: 5,
        operatorRating: 4.5,
        cancellation: 'Standard',
        busNumber: 'MB 6789'
      },
      {
        id: 3,
        operator: 'Peter Pan',
        operatorCode: 'PP',
        busType: 'Luxury',
        departure: { 
          station: 'New York GW Bridge Station', 
          time: '10:00 AM', 
          date: '2023-06-15',
          city: 'New York, NY'
        },
        arrival: { 
          station: 'Boston Logan Airport', 
          time: '03:15 PM', 
          date: '2023-06-15',
          city: 'Boston, MA'
        },
        duration: '5h 15m',
        price: 42,
        amenities: ['Wi-Fi', 'Power Outlets', 'Restroom', 'Air Conditioning', 'Reclining Seats', 'Entertainment'],
        seats: 36,
        availableSeats: 20,
        operatorRating: 4.7,
        cancellation: 'Free Cancellation',
        busNumber: 'PP 1234'
      },
      {
        id: 4,
        operator: 'BoltBus',
        operatorCode: 'BB',
        busType: 'Express',
        departure: { 
          station: 'New York Chinatown', 
          time: '07:45 AM', 
          date: '2023-06-15',
          city: 'New York, NY'
        },
        arrival: { 
          station: 'Boston Downtown', 
          time: '12:30 PM', 
          date: '2023-06-15',
          city: 'Boston, MA'
        },
        duration: '4h 45m',
        price: 31,
        amenities: ['Wi-Fi', 'Power Outlets', 'Restroom'],
        seats: 52,
        availableSeats: 8,
        operatorRating: 4.3,
        cancellation: 'Standard',
        busNumber: 'BB 5567'
      },
      {
        id: 5,
        operator: 'Trailways',
        operatorCode: 'TW',
        busType: 'Standard',
        departure: { 
          station: 'New York Penn Station', 
          time: '11:30 AM', 
          date: '2023-06-15',
          city: 'New York, NY'
        },
        arrival: { 
          station: 'Boston Back Bay', 
          time: '05:15 PM', 
          date: '2023-06-15',
          city: 'Boston, MA'
        },
        duration: '5h 45m',
        price: 25,
        amenities: ['Restroom', 'Air Conditioning'],
        seats: 50,
        availableSeats: 35,
        operatorRating: 3.9,
        cancellation: 'Non-refundable',
        busNumber: 'TW 8890'
      }
    ];

    setBuses(mockBuses);
    setFilteredBuses(mockBuses);
    setLoading(false);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...buses];
    
    // Apply price filter
    result = result.filter(bus => 
      bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );
    
    // Apply operator filter
    if (filters.operators.length > 0) {
      result = result.filter(bus => filters.operators.includes(bus.operator));
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(bus => 
        filters.amenities.every(amenity => bus.amenities.includes(amenity))
      );
    }
    
    // Apply departure time filter
    result = result.filter(bus => {
      const departureHour = parseInt(bus.departure.time.split(':')[0]);
      const isPM = bus.departure.time.includes('PM');
      const departure24 = isPM && departureHour !== 12 ? departureHour + 12 : departureHour;
      return departure24 >= filters.departureTime.min && departure24 <= filters.departureTime.max;
    });
    
    // Apply arrival time filter
    result = result.filter(bus => {
      const arrivalHour = parseInt(bus.arrival.time.split(':')[0]);
      const isPM = bus.arrival.time.includes('PM');
      const arrival24 = isPM && arrivalHour !== 12 ? arrivalHour + 12 : arrivalHour;
      return arrival24 >= filters.arrivalTime.min && arrival24 <= filters.arrivalTime.max;
    });
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'departure') {
        return a.departure.time.localeCompare(b.departure.time);
      }
      if (sortBy === 'arrival') {
        return a.arrival.time.localeCompare(b.arrival.time);
      }
      if (sortBy === 'duration') {
        const aDuration = parseInt(a.duration);
        const bDuration = parseInt(b.duration);
        return aDuration - bDuration;
      }
      if (sortBy === 'rating') {
        return b.operatorRating - a.operatorRating;
      }
      return 0;
    });
    
    setFilteredBuses(result);
  }, [filters, sortBy, buses]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'operators' || filterType === 'amenities') {
        const items = [...prev[filterType]];
        const index = items.indexOf(value);
        
        if (index >= 0) {
          items.splice(index, 1);
        } else {
          items.push(value);
        }
        
        return { ...prev, [filterType]: items };
      }
      
      return { ...prev, [filterType]: value };
    });
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
  };

  const handleTimeRangeChange = (type, min, max) => {
    setFilters(prev => ({ ...prev, [type]: { min, max } }));
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
  };

  const handleExpandBus = (busId) => {
    setExpandedBus(expandedBus === busId ? null : busId);
  };

  const handleBookBus = (bus) => {
    alert(`Booking bus: ${bus.operator} ${bus.busNumber}`);
    // In a real app, this would navigate to the booking page
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  const getSeatAvailabilityClass = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return 'seats-low';
    if (percentage < 30) return 'seats-medium';
    return 'seats-high';
  };

  if (loading) {
    return <div className="loading">Searching for buses...</div>;
  }

  return (
    <div className="bus-results">
      <div className="results-header">
        <h2>Buses from {searchParams.origin} to {searchParams.destination}</h2>
        <div className="results-summary">
          {filteredBuses.length} buses found · {searchParams.departureDate} · {searchParams.passengers} passenger(s)
        </div>
      </div>

      <div className="results-container">
        <div className="filters-sidebar">
          <div className="filter-group">
            <h3>Sort by</h3>
            <div className="sort-options">
              <button 
                className={sortBy === 'departure' ? 'active' : ''} 
                onClick={() => handleSortChange('departure')}
              >
                Departure Time
              </button>
              <button 
                className={sortBy === 'arrival' ? 'active' : ''} 
                onClick={() => handleSortChange('arrival')}
              >
                Arrival Time
              </button>
              <button 
                className={sortBy === 'duration' ? 'active' : ''} 
                onClick={() => handleSortChange('duration')}
              >
                Duration
              </button>
              <button 
                className={sortBy === 'price' ? 'active' : ''} 
                onClick={() => handleSortChange('price')}
              >
                Price (Lowest)
              </button>
              <button 
                className={sortBy === 'rating' ? 'active' : ''} 
                onClick={() => handleSortChange('rating')}
              >
                Rating
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <div className="price-range">
              <input 
                type="range" 
                min="0" 
                max="300" 
                value={filters.priceRange[1]} 
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
              />
              <div className="price-labels">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>Departure Time</h3>
            <div className="time-range">
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={filters.departureTime.max} 
                onChange={(e) => handleTimeRangeChange('departureTime', filters.departureTime.min, parseInt(e.target.value))}
              />
              <div className="time-labels">
                <span>12 AM</span>
                <span>12 PM</span>
                <span>11 PM</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>Arrival Time</h3>
            <div className="time-range">
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={filters.arrivalTime.max} 
                onChange={(e) => handleTimeRangeChange('arrivalTime', filters.arrivalTime.min, parseInt(e.target.value))}
              />
              <div className="time-labels">
                <span>12 AM</span>
                <span>12 PM</span>
                <span>11 PM</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>Bus Operators</h3>
            <div className="operator-options">
              {[...new Set(buses.map(bus => bus.operator))].map(operator => (
                <label key={operator}>
                  <input 
                    type="checkbox" 
                    checked={filters.operators.includes(operator)} 
                    onChange={() => handleFilterChange('operators', operator)} 
                  />
                  {operator}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Amenities</h3>
            <div className="amenity-options">
              {['Wi-Fi', 'Power Outlets', 'Restroom', 'Air Conditioning', 'Extra Legroom', 'Entertainment'].map(amenity => (
                <label key={amenity}>
                  <input 
                    type="checkbox" 
                    checked={filters.amenities.includes(amenity)} 
                    onChange={() => handleFilterChange('amenities', amenity)} 
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="results-list">
          {filteredBuses.length === 0 ? (
            <div className="no-results">
              <h3>No buses match your filters</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          ) : (
            filteredBuses.map(bus => (
              <div key={bus.id} className={`bus-card ${selectedBus?.id === bus.id ? 'selected' : ''}`}>
                <div className="bus-main">
                  <div className="operator-info">
                    <div className="operator-logo">{bus.operatorCode}</div>
                    <div className="operator-details">
                      <div className="operator-name">{bus.operator}</div>
                      <div className="bus-type">{bus.busType}</div>
                      <div className="operator-rating">
                        {renderStars(bus.operatorRating)}
                        <span className="rating-value">{bus.operatorRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bus-times">
                    <div className="departure">
                      <div className="time">{bus.departure.time}</div>
                      <div className="station">{bus.departure.station}</div>
                      <div className="city">{bus.departure.city}</div>
                    </div>
                    
                    <div className="duration">
                      <div className="duration-line">
                        <span className="line"></span>
                        <span className="bus-icon">🚌</span>
                      </div>
                      <div className="duration-text">{bus.duration}</div>
                    </div>
                    
                    <div className="arrival">
                      <div className="time">{bus.arrival.time}</div>
                      <div className="station">{bus.arrival.station}</div>
                      <div className="city">{bus.arrival.city}</div>
                    </div>
                  </div>

                  <div className="bus-price">
                    <div className="price">${bus.price}</div>
                    <div className={`seats ${getSeatAvailabilityClass(bus.availableSeats, bus.seats)}`}>
                      {bus.availableSeats} seats left
                    </div>
                    <button 
                      className="select-btn"
                      onClick={() => handleSelectBus(bus)}
                    >
                      {selectedBus?.id === bus.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>

                <div className="bus-details-toggle" onClick={() => handleExpandBus(bus.id)}>
                  {expandedBus === bus.id ? 'Hide details' : 'Show details'}
                  <span className={`toggle-arrow ${expandedBus === bus.id ? 'expanded' : ''}`}>▼</span>
                </div>

                {expandedBus === bus.id && (
                  <div className="bus-details">
                    <div className="details-row">
                      <div className="bus-number">Bus: {bus.busNumber}</div>
                      <div className="cancellation">Cancellation: {bus.cancellation}</div>
                    </div>
                    
                    <div className="amenities">
                      <span>Amenities: </span>
                      {bus.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-tag">
                          {amenity === 'Wi-Fi' && '📶'}
                          {amenity === 'Power Outlets' && '🔌'}
                          {amenity === 'Restroom' && '🚻'}
                          {amenity === 'Air Conditioning' && '❄️'}
                          {amenity === 'Extra Legroom' && '🦵'}
                          {amenity === 'Entertainment' && '📺'}
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="seating-info">
                      <div className="seating-chart">
                        <div className="driver">🚗</div>
                        <div className="seats-grid">
                          {Array.from({ length: bus.seats }, (_, i) => (
                            <div 
                              key={i} 
                              className={`seat ${i < bus.availableSeats ? 'available' : 'occupied'}`}
                            >
                              {i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBus && (
        <div className="selected-bus-footer">
          <div className="selected-details">
            <div className="selected-summary">
              {selectedBus.operator} · {selectedBus.departure.time} - {selectedBus.arrival.time} · ${selectedBus.price}
            </div>
            <button 
              className="book-btn"
              onClick={() => handleBookBus(selectedBus)}
            >
              Book Bus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusResults;