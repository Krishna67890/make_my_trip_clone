// TrainResults.jsx
import React, { useState, useEffect } from 'react';
import './TrainResults.css';

const TrainResults = ({ searchParams }) => {
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [sortBy, setSortBy] = useState('departure');
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    departureTime: { start: 0, end: 24 },
    arrivalTime: { start: 0, end: 24 },
    trainClass: [],
    trainType: [],
    amenities: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [expandedTrain, setExpandedTrain] = useState(null);

  // Mock data fetch
  useEffect(() => {
    const mockTrains = [
      {
        id: 1,
        name: 'Express 202',
        number: 'EXP202',
        departure: { time: '08:30', station: 'Central Station' },
        arrival: { time: '12:45', station: 'Grand Central' },
        duration: '4h 15m',
        price: 89,
        originalPrice: 110,
        discount: 19,
        class: 'First Class',
        type: 'Express',
        amenities: ['WiFi', 'Power Outlets', 'Food Service', 'Air Conditioning'],
        seats: { available: 12, total: 50 },
        status: 'On Time',
        operator: 'National Rail',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: 2,
        name: 'Bullet X',
        number: 'BULX305',
        departure: { time: '09:15', station: 'Central Station' },
        arrival: { time: '11:30', station: 'Metro Terminal' },
        duration: '2h 15m',
        price: 125,
        originalPrice: 150,
        discount: 17,
        class: 'Business',
        type: 'High Speed',
        amenities: ['WiFi', 'Power Outlets', 'Food Service', 'Air Conditioning', 'Entertainment'],
        seats: { available: 5, total: 40 },
        status: 'On Time',
        operator: 'High Speed Rail',
        coordinates: { lat: 40.7081, lng: -74.0120 }
      },
      {
        id: 3,
        name: 'Regional 45',
        number: 'REG45',
        departure: { time: '10:00', station: 'Central Station' },
        arrival: { time: '14:20', station: 'North Station' },
        duration: '4h 20m',
        price: 45,
        originalPrice: 55,
        discount: 18,
        class: 'Economy',
        type: 'Regional',
        amenities: ['Power Outlets', 'Air Conditioning'],
        seats: { available: 32, total: 60 },
        status: 'On Time',
        operator: 'Regional Rail',
        coordinates: { lat: 40.7200, lng: -74.0050 }
      },
      {
        id: 4,
        name: 'Night Owl',
        number: 'NGT755',
        departure: { time: '22:30', station: 'Central Station' },
        arrival: { time: '06:15', station: 'Lakeside Terminal' },
        duration: '7h 45m',
        price: 79,
        originalPrice: 99,
        discount: 20,
        class: 'Sleeper',
        type: 'Overnight',
        amenities: ['WiFi', 'Power Outlets', 'Bedding', 'Private Cabin', 'Breakfast'],
        seats: { available: 8, total: 20 },
        status: 'On Time',
        operator: 'National Rail',
        coordinates: { lat: 40.7090, lng: -74.0105 }
      },
      {
        id: 5,
        name: 'Coastal Express',
        number: 'CST601',
        departure: { time: '07:45', station: 'Central Station' },
        arrival: { time: '13:10', station: 'Seaside Central' },
        duration: '5h 25m',
        price: 65,
        originalPrice: 75,
        discount: 13,
        class: 'Economy',
        type: 'Scenic',
        amenities: ['WiFi', 'Power Outlets', 'Food Service', 'Air Conditioning', 'Observation Car'],
        seats: { available: 25, total: 55 },
        status: 'On Time',
        operator: 'Coastal Rail',
        coordinates: { lat: 40.7150, lng: -74.0150 }
      },
      {
        id: 6,
        name: 'Metro Rapid',
        number: 'MTR101',
        departure: { time: '06:30', station: 'Central Station' },
        arrival: { time: '08:45', station: 'Downtown Terminal' },
        duration: '2h 15m',
        price: 35,
        originalPrice: 40,
        discount: 13,
        class: 'Standard',
        type: 'Commuter',
        amenities: ['Power Outlets', 'Air Conditioning'],
        seats: { available: 42, total: 70 },
        status: 'On Time',
        operator: 'Metro Rail',
        coordinates: { lat: 40.6400, lng: -74.0850 }
      }
    ];

    setTrains(mockTrains);
    setFilteredTrains(mockTrains);
    setLoading(false);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...trains];
    
    // Apply price filter
    result = result.filter(train => 
      train.price >= filters.priceRange[0] && train.price <= filters.priceRange[1]
    );
    
    // Apply departure time filter
    result = result.filter(train => {
      const departureHour = parseInt(train.departure.time.split(':')[0]);
      return departureHour >= filters.departureTime.start && departureHour <= filters.departureTime.end;
    });
    
    // Apply arrival time filter
    result = result.filter(train => {
      const arrivalHour = parseInt(train.arrival.time.split(':')[0]);
      return arrivalHour >= filters.arrivalTime.start && arrivalHour <= filters.arrivalTime.end;
    });
    
    // Apply class filter
    if (filters.trainClass.length > 0) {
      result = result.filter(train => filters.trainClass.includes(train.class));
    }
    
    // Apply type filter
    if (filters.trainType.length > 0) {
      result = result.filter(train => filters.trainType.includes(train.type));
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(train => 
        filters.amenities.every(amenity => train.amenities.includes(amenity))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'departure') {
        return a.departure.time.localeCompare(b.departure.time);
      }
      if (sortBy === 'arrival') {
        return a.arrival.time.localeCompare(b.arrival.time);
      }
      if (sortBy === 'duration') {
        return a.duration.localeCompare(b.duration);
      }
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
    
    setFilteredTrains(result);
  }, [filters, sortBy, trains]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (['trainClass', 'trainType', 'amenities'].includes(filterType)) {
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

  const handleDepartureTimeChange = (start, end) => {
    setFilters(prev => ({ ...prev, departureTime: { start, end } }));
  };

  const handleArrivalTimeChange = (start, end) => {
    setFilters(prev => ({ ...prev, arrivalTime: { start, end } }));
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
  };

  const handleExpandTrain = (trainId) => {
    setExpandedTrain(expandedTrain === trainId ? null : trainId);
  };

  const handleBookTrain = (train) => {
    alert(`Booking train: ${train.name} (${train.number})`);
    // In a real app, this would navigate to the booking page
  };

  const formatTimeRange = (start, end) => {
    return `${start}:00 - ${end}:00`;
  };

  const getSeatAvailabilityClass = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'high';
    if (percentage > 20) return 'medium';
    return 'low';
  };

  if (loading) {
    return <div className="loading">Searching for trains...</div>;
  }

  return (
    <div className="train-results">
      <div className="results-header">
        <h2>Trains from {searchParams.origin} to {searchParams.destination}</h2>
        <div className="results-summary">
          {filteredTrains.length} trains found · {searchParams.date} · {searchParams.passengers} passenger(s)
        </div>
        
        <div className="controls">
          <div className="sort-by">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="departure">Departure Time</option>
              <option value="arrival">Arrival Time</option>
              <option value="duration">Duration</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-container">
        <div className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters">Clear all</button>
          </div>
          
          <div className="filter-group">
            <h4>Price (USD)</h4>
            <div className="range-slider">
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={filters.priceRange[1]} 
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                className="slider"
              />
              <div className="range-values">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Departure Time</h4>
            <div className="time-range">
              <div className="time-options">
                {[
                  {label: 'Early Morning', start: 0, end: 6},
                  {label: 'Morning', start: 6, end: 12},
                  {label: 'Afternoon', start: 12, end: 18},
                  {label: 'Evening', start: 18, end: 24}
                ].map(time => (
                  <button 
                    key={time.label}
                    className={filters.departureTime.start === time.start ? 'active' : ''}
                    onClick={() => handleDepartureTimeChange(time.start, time.end)}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
              <div className="custom-range">
                <span>Custom: {formatTimeRange(filters.departureTime.start, filters.departureTime.end)}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Arrival Time</h4>
            <div className="time-range">
              <div className="time-options">
                {[
                  {label: 'Morning', start: 0, end: 12},
                  {label: 'Afternoon', start: 12, end: 18},
                  {label: 'Evening', start: 18, end: 24}
                ].map(time => (
                  <button 
                    key={time.label}
                    className={filters.arrivalTime.start === time.start ? 'active' : ''}
                    onClick={() => handleArrivalTimeChange(time.start, time.end)}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
              <div className="custom-range">
                <span>Custom: {formatTimeRange(filters.arrivalTime.start, filters.arrivalTime.end)}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Train Class</h4>
            <div className="checkbox-options">
              {['First Class', 'Business', 'Economy', 'Standard', 'Sleeper'].map(trainClass => (
                <label key={trainClass}>
                  <input 
                    type="checkbox" 
                    checked={filters.trainClass.includes(trainClass)} 
                    onChange={() => handleFilterChange('trainClass', trainClass)} 
                  />
                  {trainClass}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Train Type</h4>
            <div className="checkbox-options">
              {['Express', 'High Speed', 'Regional', 'Overnight', 'Scenic', 'Commuter'].map(trainType => (
                <label key={trainType}>
                  <input 
                    type="checkbox" 
                    checked={filters.trainType.includes(trainType)} 
                    onChange={() => handleFilterChange('trainType', trainType)} 
                  />
                  {trainType}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Amenities</h4>
            <div className="checkbox-options">
              {['WiFi', 'Power Outlets', 'Food Service', 'Air Conditioning', 'Entertainment', 'Private Cabin'].map(amenity => (
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
          {filteredTrains.length === 0 ? (
            <div className="no-results">
              <h3>No trains match your filters</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          ) : (
            filteredTrains.map(train => (
              <div key={train.id} className={`train-card ${selectedTrain?.id === train.id ? 'selected' : ''}`}>
                <div className="train-header">
                  <div className="train-name">
                    <h3>{train.name}</h3>
                    <span className="train-number">{train.number}</span>
                  </div>
                  <div className="train-operator">
                    {train.operator}
                  </div>
                  <div className="train-status">
                    <span className={`status ${train.status.toLowerCase().replace(' ', '-')}`}>
                      {train.status}
                    </span>
                  </div>
                </div>

                <div className="train-schedule">
                  <div className="departure">
                    <div className="time">{train.departure.time}</div>
                    <div className="station">{train.departure.station}</div>
                  </div>
                  
                  <div className="journey">
                    <div className="duration">{train.duration}</div>
                    <div className="route">
                      <div className="line"></div>
                      <div className="stops">Direct</div>
                    </div>
                  </div>
                  
                  <div className="arrival">
                    <div className="time">{train.arrival.time}</div>
                    <div className="station">{train.arrival.station}</div>
                  </div>
                </div>

                <div className="train-details">
                  <div className="train-class">
                    <span className="class">{train.class}</span>
                    <span className="type">{train.type}</span>
                  </div>
                  
                  <div className="amenities">
                    {train.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                    {train.amenities.length > 3 && (
                      <span className="amenity-more">+{train.amenities.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="seats-availability">
                    <span className={`availability ${getSeatAvailabilityClass(train.seats.available, train.seats.total)}`}>
                      {train.seats.available} seats left
                    </span>
                  </div>
                </div>

                <div className="train-pricing">
                  <div className="price-info">
                    {train.originalPrice > train.price && (
                      <div className="original-price">${train.originalPrice}</div>
                    )}
                    <div className="final-price">${train.price}</div>
                    <div className="price-note">per passenger</div>
                  </div>
                  
                  <div className="train-actions">
                    <button 
                      className="view-details-btn"
                      onClick={() => handleExpandTrain(train.id)}
                    >
                      {expandedTrain === train.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button 
                      className="select-btn"
                      onClick={() => handleSelectTrain(train)}
                    >
                      {selectedTrain?.id === train.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>

                {expandedTrain === train.id && (
                  <div className="train-details-expanded">
                    <div className="expanded-section">
                      <h4>All Amenities</h4>
                      <div className="amenities-list">
                        {train.amenities.map((amenity, index) => (
                          <div key={index} className="amenity-item">{amenity}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="expanded-section">
                      <h4>Seating Information</h4>
                      <div className="seating-info">
                        <div className="seat-map">
                          <div className="coach">
                            <div className="coach-label">Coach A</div>
                            <div className="seats">
                              {Array.from({ length: train.seats.total }, (_, i) => (
                                <div 
                                  key={i} 
                                  className={`seat ${i < train.seats.available ? 'available' : 'occupied'}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="availability-detail">
                          <span className="available-count">{train.seats.available} seats available</span>
                          <span className="total-count">out of {train.seats.total}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="expanded-section">
                      <h4>Additional Information</h4>
                      <p>Check-in opens 60 minutes before departure. Please arrive at least 30 minutes before departure time.</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedTrain && (
        <div className="selected-train-footer">
          <div className="selected-details">
            <div className="selected-info">
              <h4>{selectedTrain.name} ({selectedTrain.number})</h4>
              <div className="selected-meta">
                <span>{selectedTrain.departure.time} → {selectedTrain.arrival.time}</span> • 
                <span>{selectedTrain.duration}</span> • 
                <span>{selectedTrain.class}</span>
              </div>
            </div>
            <div className="selected-price">
              <span className="price">${selectedTrain.price}</span>
              <span className="per-passenger">per passenger</span>
            </div>
            <button 
              className="book-btn"
              onClick={() => handleBookTrain(selectedTrain)}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainResults;