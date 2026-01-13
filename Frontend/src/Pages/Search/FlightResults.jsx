// FlightResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearch } from '../../Context/SearchContext';
import './FlightResults.css';

const FlightResults = () => {
  const { searchData } = useSearch();
  // Safe access with fallbacks
  const searchParams = searchData || {
    origin: 'Unknown',
    destination: 'Unknown',
    departureDate: 'N/A',
    passengers: 1
  };

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    airlines: [],
    stops: 'any',
    departureTime: 'any',
    duration: [0, 24]
  });
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Mock data fetch
  useEffect(() => {
    const mockFlights = [
      {
        id: 1,
        airline: 'Delta Airlines',
        airlineCode: 'DL',
        flightNumber: 'DL 2345',
        departure: { airport: 'JFK', time: '08:30 AM', date: '2023-06-15' },
        arrival: { airport: 'LAX', time: '11:45 AM', date: '2023-06-15' },
        duration: '6h 15m',
        stops: 0,
        price: 349,
        aircraft: 'Boeing 737',
        amenities: ['Wi-Fi', 'Entertainment', 'Power Outlets'],
        carbonEmissions: '85% avg'
      },
      {
        id: 2,
        airline: 'United Airlines',
        airlineCode: 'UA',
        flightNumber: 'UA 1567',
        departure: { airport: 'JFK', time: '10:15 AM', date: '2023-06-15' },
        arrival: { airport: 'LAX', time: '01:45 PM', date: '2023-06-15' },
        duration: '6h 30m',
        stops: 1,
        stopDetails: [{ airport: 'ORD', duration: '1h 15m' }],
        price: 289,
        aircraft: 'Airbus A320',
        amenities: ['Wi-Fi', 'Power Outlets'],
        carbonEmissions: '92% avg'
      },
      {
        id: 3,
        airline: 'American Airlines',
        airlineCode: 'AA',
        flightNumber: 'AA 3456',
        departure: { airport: 'JFK', time: '07:00 AM', date: '2023-06-15' },
        arrival: { airport: 'LAX', time: '10:15 AM', date: '2023-06-15' },
        duration: '6h 15m',
        stops: 0,
        price: 399,
        aircraft: 'Boeing 787',
        amenities: ['Wi-Fi', 'Entertainment', 'Power Outlets', 'USB Ports'],
        carbonEmissions: '78% avg'
      },
      {
        id: 4,
        airline: 'JetBlue',
        airlineCode: 'B6',
        flightNumber: 'B6 789',
        departure: { airport: 'JFK', time: '09:45 AM', date: '2023-06-15' },
        arrival: { airport: 'LAX', time: '01:00 PM', date: '2023-06-15' },
        duration: '6h 15m',
        stops: 0,
        price: 329,
        aircraft: 'Airbus A321',
        amenities: ['Wi-Fi', 'Entertainment', 'Snacks', 'Power Outlets'],
        carbonEmissions: '82% avg'
      },
      {
        id: 5,
        airline: 'Spirit Airlines',
        airlineCode: 'NK',
        flightNumber: 'NK 567',
        departure: { airport: 'JFK', time: '11:30 AM', date: '2023-06-15' },
        arrival: { airport: 'LAX', time: '03:15 PM', date: '2023-06-15' },
        duration: '6h 45m',
        stops: 1,
        stopDetails: [{ airport: 'LAS', duration: '1h 30m' }],
        price: 219,
        aircraft: 'Airbus A320',
        amenities: [],
        carbonEmissions: '95% avg'
      }
    ];

    setFlights(mockFlights);
    setFilteredFlights(mockFlights);
    setLoading(false);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...flights];
    
    // Apply price filter
    result = result.filter(flight => 
      flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1]
    );
    
    // Apply stops filter
    if (filters.stops !== 'any') {
      result = result.filter(flight => flight.stops === parseInt(filters.stops));
    }
    
    // Apply airline filter
    if (filters.airlines.length > 0) {
      result = result.filter(flight => filters.airlines.includes(flight.airline));
    }
    
    // Apply duration filter
    result = result.filter(flight => {
      const durationHours = parseInt(flight.duration);
      return durationHours >= filters.duration[0] && durationHours <= filters.duration[1];
    });
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') {
        const aDuration = parseInt(a.duration);
        const bDuration = parseInt(b.duration);
        return aDuration - bDuration;
      }
      if (sortBy === 'departure') {
        return a.departure.time.localeCompare(b.departure.time);
      }
      return 0;
    });
    
    setFilteredFlights(result);
  }, [filters, sortBy, flights]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'airlines') {
        const airlines = [...prev.airlines];
        const index = airlines.indexOf(value);
        
        if (index >= 0) {
          airlines.splice(index, 1);
        } else {
          airlines.push(value);
        }
        
        return { ...prev, airlines };
      }
      
      return { ...prev, [filterType]: value };
    });
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleBookFlight = (flight) => {
    alert(`Booking flight: ${flight.airline} ${flight.flightNumber}`);
    // In a real app, this would navigate to the booking page
  };

  if (loading) {
    return <div className="loading">Searching for flights...</div>;
  }

  return (
    <div className="flight-results">
      <div className="results-header">
        <h2>Flights from {searchParams.origin} to {searchParams.destination}</h2>
        <div className="results-summary">
          {filteredFlights.length} flights found · {searchParams.departureDate} · {searchParams.passengers} passenger(s)
        </div>
      </div>

      <div className="results-container">
        <div className="filters-sidebar">
          <div className="filter-group">
            <h3>Sort by</h3>
            <div className="sort-options">
              <button 
                className={sortBy === 'price' ? 'active' : ''} 
                onClick={() => handleSortChange('price')}
              >
                Price (Lowest)
              </button>
              <button 
                className={sortBy === 'duration' ? 'active' : ''} 
                onClick={() => handleSortChange('duration')}
              >
                Duration
              </button>
              <button 
                className={sortBy === 'departure' ? 'active' : ''} 
                onClick={() => handleSortChange('departure')}
              >
                Departure Time
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <div className="price-range">
              <input 
                type="range" 
                min="0" 
                max="2000" 
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
            <h3>Stops</h3>
            <div className="stop-options">
              <label>
                <input 
                  type="radio" 
                  name="stops" 
                  value="any" 
                  checked={filters.stops === 'any'} 
                  onChange={() => handleFilterChange('stops', 'any')} 
                />
                Any
              </label>
              <label>
                <input 
                  type="radio" 
                  name="stops" 
                  value="0" 
                  checked={filters.stops === 0} 
                  onChange={() => handleFilterChange('stops', 0)} 
                />
                Non-stop
              </label>
              <label>
                <input 
                  type="radio" 
                  name="stops" 
                  value="1" 
                  checked={filters.stops === 1} 
                  onChange={() => handleFilterChange('stops', 1)} 
                />
                1 Stop
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h3>Airlines</h3>
            <div className="airline-options">
              {[...new Set(flights.map(flight => flight.airline))].map(airline => (
                <label key={airline}>
                  <input 
                    type="checkbox" 
                    checked={filters.airlines.includes(airline)} 
                    onChange={() => handleFilterChange('airlines', airline)} 
                  />
                  {airline}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Duration</h3>
            <div className="duration-range">
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={filters.duration[1]} 
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  duration: [prev.duration[0], parseInt(e.target.value)] 
                }))}
              />
              <div className="duration-labels">
                <span>0h</span>
                <span>{filters.duration[1]}h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="results-list">
          {filteredFlights.length === 0 ? (
            <div className="no-results">
              <h3>No flights match your filters</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          ) : (
            filteredFlights.map(flight => (
              <div key={flight.id} className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}>
                <div className="flight-main">
                  <div className="airline-info">
                    <div className="airline-logo">{flight.airlineCode}</div>
                    <div className="airline-details">
                      <div className="airline-name">{flight.airline}</div>
                      <div className="flight-number">{flight.flightNumber}</div>
                    </div>
                  </div>

                  <div className="flight-times">
                    <div className="departure">
                      <div className="time">{flight.departure.time}</div>
                      <div className="airport">{flight.departure.airport}</div>
                    </div>
                    
                    <div className="duration">
                      <div className="duration-line">
                        <span className="line"></span>
                        <span className="stops">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
                      </div>
                      <div className="duration-text">{flight.duration}</div>
                    </div>
                    
                    <div className="arrival">
                      <div className="time">{flight.arrival.time}</div>
                      <div className="airport">{flight.arrival.airport}</div>
                    </div>
                  </div>

                  <div className="flight-price">
                    <div className="price">${flight.price}</div>
                    <button 
                      className="select-btn"
                      onClick={() => handleSelectFlight(flight)}
                    >
                      {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>

                <div className="flight-details">
                  <div className="details-row">
                    <div className="aircraft">Aircraft: {flight.aircraft}</div>
                    <div className="carbon">Carbon emissions: {flight.carbonEmissions}</div>
                  </div>
                  
                  {flight.amenities.length > 0 && (
                    <div className="amenities">
                      <span>Amenities: </span>
                      {flight.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  )}
                  
                  {flight.stopDetails && (
                    <div className="stop-info">
                      <div className="stop-title">Layover:</div>
                      {flight.stopDetails.map((stop, index) => (
                        <div key={index} className="stop-detail">
                          {stop.airport} ({stop.duration})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedFlight && (
        <div className="selected-flight-footer">
          <div className="selected-details">
            <div className="selected-summary">
              {selectedFlight.airline} {selectedFlight.flightNumber} · {selectedFlight.departure.time} - {selectedFlight.arrival.time} · ${selectedFlight.price}
            </div>
            <button 
              className="book-btn"
              onClick={() => handleBookFlight(selectedFlight)}
            >
              Book Flight
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightResults;