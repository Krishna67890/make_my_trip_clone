import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/Booking/BusBooking.css';

const BusBooking = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    adults: 1,
    children: 0,
    busType: 'all',
    boardingPoint: '',
    droppingPoint: '',
    priceRange: [0, 200],
    comfortLevel: 'all'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardingPoints, setBoardingPoints] = useState([]);
  const [droppingPoints, setDroppingPoints] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    amenities: [],
    operators: [],
    departureTime: [0, 24],
    duration: [0, 12],
    comfortLevel: 'all'
  });
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Advanced sample bus data
  const busData = [
    {
      id: 1,
      operator: 'GreenLine Express',
      departure: '08:00 AM',
      arrival: '12:30 PM',
      departureTime: 8,
      arrivalTime: 12.5,
      duration: '4h 30m',
      durationHours: 4.5,
      price: 45,
      basePrice: 40,
      discount: 12,
      seats: 32,
      availableSeats: 25,
      busType: 'luxury',
      comfortLevel: 4,
      rating: 4.5,
      amenities: ['Wi-Fi', 'AC', 'Charging Ports', 'Reclining Seats', 'Blanket', 'Reading Light'],
      boardingPoints: ['Central Station', 'Airport', 'University Campus'],
      droppingPoints: ['Downtown', 'Shopping Mall', 'Terminal'],
      realTimeTracking: true,
      routeInfo: {
        stops: 8,
        distance: 245,
        avgSpeed: 55
      }
    },
    {
      id: 2,
      operator: 'City Traveler',
      departure: '09:15 AM',
      arrival: '02:45 PM',
      departureTime: 9.25,
      arrivalTime: 14.75,
      duration: '5h 30m',
      durationHours: 5.5,
      price: 32,
      basePrice: 35,
      discount: 9,
      seats: 40,
      availableSeats: 18,
      busType: 'standard',
      comfortLevel: 3,
      rating: 4.2,
      amenities: ['AC', 'Restroom', 'Water Bottle', 'Cushions'],
      boardingPoints: ['Main Terminal', 'City Center', 'Railway Station'],
      droppingPoints: ['Suburban Area', 'Industrial Zone', 'Market'],
      realTimeTracking: false,
      routeInfo: {
        stops: 12,
        distance: 280,
        avgSpeed: 50
      }
    },
    {
      id: 3,
      operator: 'Express Voyager',
      departure: '10:30 AM',
      arrival: '02:00 PM',
      departureTime: 10.5,
      arrivalTime: 14,
      duration: '3h 30m',
      durationHours: 3.5,
      price: 55,
      basePrice: 60,
      discount: 8,
      seats: 28,
      availableSeats: 12,
      busType: 'premium',
      comfortLevel: 5,
      rating: 4.8,
      amenities: ['Wi-Fi', 'AC', 'Charging Ports', 'Reclining Seats', 'Entertainment', 'Snacks', 'Newspapers', 'Foot Rest'],
      boardingPoints: ['VIP Terminal', 'Premium Lounge', 'Express Gate'],
      droppingPoints: ['Premium Zone', 'Business District', 'Executive Hub'],
      realTimeTracking: true,
      routeInfo: {
        stops: 5,
        distance: 220,
        avgSpeed: 60
      }
    },
    {
      id: 4,
      operator: 'Metro Link',
      departure: '07:00 AM',
      arrival: '11:30 AM',
      departureTime: 7,
      arrivalTime: 11.5,
      duration: '4h 30m',
      durationHours: 4.5,
      price: 38,
      basePrice: 42,
      discount: 10,
      seats: 36,
      availableSeats: 30,
      busType: 'semi-deluxe',
      comfortLevel: 3,
      rating: 4.3,
      amenities: ['AC', 'Charging Ports', 'Reclining Seats', 'Cushions'],
      boardingPoints: ['Metro Station', 'Transit Hub', 'Central Square'],
      droppingPoints: ['Business Park', 'Tech Zone', 'Convention Center'],
      realTimeTracking: true,
      routeInfo: {
        stops: 10,
        distance: 260,
        avgSpeed: 55
      }
    },
    {
      id: 5,
      operator: 'Royal Coach',
      departure: '06:00 PM',
      arrival: '11:00 PM',
      departureTime: 18,
      arrivalTime: 23,
      duration: '5h',
      durationHours: 5,
      price: 65,
      basePrice: 70,
      discount: 7,
      seats: 24,
      availableSeats: 8,
      busType: 'ac-sleeper',
      comfortLevel: 5,
      rating: 4.7,
      amenities: ['AC', 'Sleeper Berths', 'Charging Ports', 'Blankets', 'Pillows', 'Reading Lights', 'Snacks'],
      boardingPoints: ['Grand Terminal', 'Executive Plaza', 'Luxury Gateway'],
      droppingPoints: ['Elite Quarter', 'VIP Zone', 'Premium Terminal'],
      realTimeTracking: true,
      routeInfo: {
        stops: 6,
        distance: 280,
        avgSpeed: 55
      }
    }
  ];

  // Sample passenger details
  const initialPassengerDetails = [{
    id: 1,
    title: 'Mr.',
    firstName: '',
    lastName: '',
    age: '',
    gender: 'male',
    seatNumber: ''
  }];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'adults' || name === 'children') {
      const total = parseInt(value) + (name === 'adults' ? 0 : formData.adults) + (name === 'children' ? 0 : formData.children);
      if (total <= 10) { // Max 10 passengers
        setFormData({
          ...formData,
          [name]: parseInt(value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(busData);
      setFilteredResults(busData);
      setBookingStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setBoardingPoints(trip.boardingPoints);
    setDroppingPoints(trip.droppingPoints);
    setBookingStep(3);
  };

  const handleSelectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      if (selectedSeats.length < formData.adults + formData.children) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleAddPassenger = () => {
    if (bookingDetails.length < 10) {
      setBookingDetails([...bookingDetails, {
        id: bookingDetails.length + 1,
        title: 'Mr.',
        firstName: '',
        lastName: '',
        age: '',
        gender: 'male',
        seatNumber: selectedSeats[bookingDetails.length] || ''
      }]);
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...bookingDetails];
    updatedPassengers[index][field] = value;
    setBookingDetails(updatedPassengers);
  };

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Booking confirmed for ${selectedTrip.operator}!`);
    setBookingStep(4);
  };

  // Filter and sort results
  useEffect(() => {
    let filtered = [...searchResults];
    
    // Apply filters
    if (filters.comfortLevel !== 'all') {
      filtered = filtered.filter(bus => bus.comfortLevel === parseInt(filters.comfortLevel));
    }
    
    filtered = filtered.filter(bus => 
      bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );
    
    filtered = filtered.filter(bus => 
      bus.departureTime >= filters.departureTime[0] && bus.departureTime <= filters.departureTime[1]
    );
    
    filtered = filtered.filter(bus => 
      bus.durationHours >= filters.duration[0] && bus.durationHours <= filters.duration[1]
    );
    
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(bus => 
        filters.amenities.every(amenity => bus.amenities.includes(amenity))
      );
    }
    
    if (filters.operators.length > 0) {
      filtered = filtered.filter(bus => 
        filters.operators.includes(bus.operator)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.durationHours - b.durationHours;
        case 'departure':
          return a.departureTime - b.departureTime;
        case 'rating':
          return b.rating - a.rating;
        case 'comfort':
          return b.comfortLevel - a.comfortLevel;
        default:
          return a.price - b.price;
      }
    });
    
    setFilteredResults(filtered);
  }, [searchResults, filters, sortBy]);

  return (
    <div className="bus-booking-container">
      <div className="booking-header">
        <h1>Bus Booking</h1>
        <p>Find and book bus tickets for your next journey</p>
      </div>

      <div className="booking-progress">
        <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Search</p>
        </div>
        <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Select Bus</p>
        </div>
        <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Book</p>
        </div>
        <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>
          <span>4</span>
          <p>Confirmation</p>
        </div>
      </div>

      {bookingStep === 1 && (
        <div className="search-section">
          <form onSubmit={handleSearch} className="bus-search-form">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="origin">From</label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="City or station"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="destination">To</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="City or station"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="departureDate">Departure</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="returnDate">Return (Optional)</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="passenger-selector">
                <div className="input-group">
                  <label>Passengers</label>
                  <div className="passenger-controls">
                    <div className="passenger-control">
                      <span>Adults</span>
                      <div className="counter">
                        <button type="button" onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}>-</button>
                        <span>{formData.adults}</span>
                        <button type="button" onClick={() => setFormData({...formData, adults: Math.min(10 - formData.children, formData.adults + 1)})}>+</button>
                      </div>
                    </div>
                    <div className="passenger-control">
                      <span>Children</span>
                      <div className="counter">
                        <button type="button" onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}>-</button>
                        <span>{formData.children}</span>
                        <button type="button" onClick={() => setFormData({...formData, children: Math.min(10 - formData.adults, formData.children + 1)})}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="busType">Bus Type</label>
                <select
                  id="busType"
                  name="busType"
                  value={formData.busType}
                  onChange={handleInputChange}
                >
                  <option value="all">All Types</option>
                  <option value="standard">Standard</option>
                  <option value="luxury">Luxury</option>
                  <option value="premium">Premium</option>
                  <option value="semi-deluxe">Semi-Deluxe</option>
                  <option value="ac-sleeper">AC Sleeper</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label>Comfort Level</label>
                <select
                  name="comfortLevel"
                  value={formData.comfortLevel}
                  onChange={handleInputChange}
                >
                  <option value="all">Any Comfort</option>
                  <option value="3">Standard (3 stars)</option>
                  <option value="4">Premium (4 stars)</option>
                  <option value="5">Luxury (5 stars)</option>
                </select>
              </div>
              
              <div className="input-group">
                <label>Price Range</label>
                <div className="price-range">
                  <span>${formData.priceRange[0]}</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={formData.priceRange[1]} 
                    onChange={(e) => setFormData({...formData, priceRange: [0, parseInt(e.target.value)]})}
                  />
                  <span>${formData.priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search Buses'}
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Available Buses</h2>
            <div className="results-summary">
              <span>{formData.origin} to {formData.destination}</span>
              <span>| {formData.departureDate}</span>
              <span>| {formData.adults + formData.children} {formData.adults + formData.children === 1 ? 'Passenger' : 'Passengers'}</span>
            </div>
          </div>
          
          <div className="sort-filter">
            <div className="sort-by">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
                <option value="rating">Rating</option>
                <option value="comfort">Comfort Level</option>
              </select>
            </div>
            
            <div className="filters">
              <label>Filters:</label>
              <div className="filter-options">
                <div className="filter-dropdown">
                  <button className="filter-btn">Amenities</button>
                  <div className="filter-dropdown-content">
                    {['Wi-Fi', 'AC', 'Charging Ports', 'Reclining Seats', 'Entertainment', 'Snacks', 'Restroom', 'Blanket', 'Reading Light'].map(amenity => (
                      <label key={amenity}>
                        <input 
                          type="checkbox" 
                          value={amenity}
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, amenities: [...filters.amenities, amenity]});
                            } else {
                              setFilters({...filters, amenities: filters.amenities.filter(a => a !== amenity)});
                            }
                          }}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-btn">Operators</button>
                  <div className="filter-dropdown-content">
                    {['GreenLine Express', 'City Traveler', 'Express Voyager', 'Metro Link', 'Royal Coach'].map(operator => (
                      <label key={operator}>
                        <input 
                          type="checkbox" 
                          value={operator}
                          checked={filters.operators.includes(operator)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, operators: [...filters.operators, operator]});
                            } else {
                              setFilters({...filters, operators: filters.operators.filter(a => a !== operator)});
                            }
                          }}
                        />
                        {operator}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-btn">Departure Time</button>
                  <div className="filter-dropdown-content">
                    <label>
                      <input 
                        type="radio" 
                        name="departureTime" 
                        value="0,12" 
                        checked={filters.departureTime[0] === 0 && filters.departureTime[1] === 12}
                        onChange={(e) => setFilters({...filters, departureTime: [0, 12]})}
                      />
                      Morning (00:00 - 12:00)
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="departureTime" 
                        value="12,24" 
                        checked={filters.departureTime[0] === 12 && filters.departureTime[1] === 24}
                        onChange={(e) => setFilters({...filters, departureTime: [12, 24]})}
                      />
                      Evening (12:00 - 24:00)
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="departureTime" 
                        value="0,24" 
                        checked={filters.departureTime[0] === 0 && filters.departureTime[1] === 24}
                        onChange={(e) => setFilters({...filters, departureTime: [0, 24]})}
                      />
                      Any Time
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bus-list">
            {filteredResults.map(bus => (
              <div key={bus.id} className="bus-card">
                <div className="bus-info">
                  <div className="bus-header">
                    <div className="operator-rating">
                      <h3>{bus.operator}</h3>
                      <div className="bus-rating">
                        <span className="rating-value">{bus.rating}</span>
                        <span className="rating-icon">★</span>
                        <span className="comfort-level">{bus.comfortLevel}★</span>
                      </div>
                    </div>
                    <div className="real-time-tracking">
                      {bus.realTimeTracking ? '✓ Real-time Tracking' : 'Tracking Not Available'}
                    </div>
                  </div>
                  
                  <div className="schedule">
                    <div className="time-block">
                      <span className="time">{bus.departure}</span>
                      <span className="location">{formData.origin}</span>
                    </div>
                    <div className="duration">
                      <span>{bus.duration}</span>
                      <div className="timeline">
                        <div className="line"></div>
                        <div className="dot start"></div>
                        <div className="dot end"></div>
                      </div>
                      <div className="route-info">
                        {bus.routeInfo.stops} stops • {bus.routeInfo.distance} km
                      </div>
                    </div>
                    <div className="time-block">
                      <span className="time">{bus.arrival}</span>
                      <span className="location">{formData.destination}</span>
                    </div>
                  </div>
                  
                  <div className="amenities">
                    {bus.amenities.slice(0, 4).map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                    {bus.amenities.length > 4 && (
                      <span className="amenity more">+{bus.amenities.length - 4} more</span>
                    )}
                  </div>
                  
                  <div className="bus-features">
                    <span className="feature">{bus.busType}</span>
                    <span className="feature">{bus.availableSeats} seats available</span>
                    <span className="feature">{bus.discount}% OFF</span>
                  </div>
                </div>
                
                <div className="bus-price">
                  <div className="price-details">
                    <div className="original-price">${bus.basePrice}</div>
                    <div className="discounted-price">${bus.price}</div>
                    <div className="discount-badge">{bus.discount}% OFF</div>
                  </div>
                  <div className="seats-available">{bus.availableSeats} seats available</div>
                  <button 
                    onClick={() => handleSelectTrip(bus)}
                    className="select-btn"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingStep === 3 && selectedTrip && (
        <div className="booking-section">
          <h2>Complete Your Booking</h2>
          
          <div className="booking-content">
            <div className="trip-summary">
              <h3>Trip Summary</h3>
              <div className="summary-card">
                <div className="route">
                  <span>{formData.origin} to {formData.destination}</span>
                  <span>{formData.departureDate}</span>
                </div>
                <div className="bus-details">
                  <h4>{selectedTrip.operator}</h4>
                  <p>{selectedTrip.departure} - {selectedTrip.arrival} • {selectedTrip.duration}</p>
                </div>
                <div className="price-details">
                  <div className="passengers">
                    <span>Passengers: {formData.adults + formData.children}</span>
                    <span>${selectedTrip.price} x {formData.adults + formData.children}</span>
                  </div>
                  <div className="total">
                    <span>Total</span>
                    <span>${selectedTrip.price * (formData.adults + formData.children)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="seat-selection">
              <h3>Select Seats</h3>
              <div className="bus-layout">
                <div className="driver-area">DRIVER</div>
                <div className="seats-grid">
                  {Array.from({ length: selectedTrip.seats }, (_, i) => {
                    const seatNumber = i + 1;
                    const isBooked = selectedTrip.seats - selectedTrip.availableSeats > i;
                    const isSelected = selectedSeats.includes(seatNumber);
                    
                    return (
                      <div 
                        key={seatNumber}
                        className={`seat ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}`}
                        onClick={() => !isBooked && handleSelectSeats(seatNumber)}
                      >
                        {seatNumber}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="selected-seats-summary">
                <h4>Selected Seats: {selectedSeats.join(', ') || 'None'}</h4>
                <div className="seats-total">Total: ${selectedTrip.price * selectedSeats.length}</div>
              </div>
            </div>
            
            <div className="passenger-details">
              <h3>Passenger Information</h3>
              
              {Array.from({ length: formData.adults + formData.children }).map((_, index) => (
                <div key={index} className="passenger-form">
                  <div className="passenger-header">
                    <h4>Passenger {index + 1}</h4>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Title</label>
                      <select 
                        value={bookingDetails[index]?.title || 'Mr.'}
                        onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>
                    
                    <div className="input-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        value={bookingDetails[index]?.firstName || ''}
                        onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                        placeholder="Enter first name"
                        required 
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        value={bookingDetails[index]?.lastName || ''}
                        onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                        placeholder="Enter last name"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Age</label>
                      <input 
                        type="number" 
                        value={bookingDetails[index]?.age || ''}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        placeholder="Enter age"
                        required 
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Gender</label>
                      <select 
                        value={bookingDetails[index]?.gender || 'male'}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="input-group">
                      <label>Seat Number</label>
                      <select 
                        value={bookingDetails[index]?.seatNumber || selectedSeats[index] || ''}
                        onChange={(e) => handlePassengerChange(index, 'seatNumber', e.target.value)}
                      >
                        <option value="">Select Seat</option>
                        {selectedSeats.map(seat => (
                          <option key={seat} value={seat}>Seat {seat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              
              <button type="button" className="add-passenger-btn" onClick={handleAddPassenger}>
                + Add Passenger
              </button>
              
              <div className="contact-details">
                <h3>Contact Details</h3>
                <div className="form-row">
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required />
                  </div>
                  
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" required />
                  </div>
                </div>
              </div>
              
              <div className="payment-section">
                <h3>Payment Details</h3>
                
                <div className="payment-methods">
                  <div className="payment-method active">
                    <label>
                      <input type="radio" name="payment" defaultChecked /> Credit Card
                    </label>
                  </div>
                  <div className="payment-method">
                    <label>
                      <input type="radio" name="payment" /> Debit Card
                    </label>
                  </div>
                  <div className="payment-method">
                    <label>
                      <input type="radio" name="payment" /> UPI
                    </label>
                  </div>
                  <div className="payment-method">
                    <label>
                      <input type="radio" name="payment" /> Net Banking
                    </label>
                  </div>
                </div>
                
                <div className="payment-form">
                  <div className="input-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" required />
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required />
                    </div>
                    
                    <div className="input-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" required />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                </div>
              </div>
              
              <button onClick={handleBooking} className="book-now-btn">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingStep === 4 && (
        <div className="confirmation-section">
          <div className="confirmation-card">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your bus ticket has been successfully booked.</p>
            <div className="booking-reference">
              <span>Reference ID: BUS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <button 
              onClick={() => setBookingStep(1)}
              className="new-search-btn"
            >
              Book Another Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusBooking;