import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/Booking/FlightBooking.css';

const FlightBooking = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    adults: 1,
    children: 0,
    infants: 0,
    class: 'economy'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [selectedBaggage, setSelectedBaggage] = useState({
    checked: 0,
    carryOn: 1
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    stops: 'any',
    airlines: [],
    priceRange: [0, 2000],
    departureTime: [0, 24]
  });
  const [loading, setLoading] = useState(false);

  // Advanced sample flight data with more options
  const flightData = [
    {
      id: 1,
      airline: 'Delta Airlines',
      airlineCode: 'DL',
      flightNumber: 'DL 2456',
      departure: '08:00 AM',
      arrival: '11:30 AM',
      duration: '3h 30m',
      price: 345,
      basePrice: 299,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Boeing 737',
      amenities: ['Wi-Fi', 'Entertainment', 'USB Ports', 'Meal'],
      baggageAllowance: { checked: 1, carryOn: 1 },
      departureTime: 8,
      arrivalTime: 11.5,
      durationMinutes: 210,
      rating: 4.5,
      ecoFriendly: true
    },
    {
      id: 2,
      airline: 'United Airlines',
      airlineCode: 'UA',
      flightNumber: 'UA 1892',
      departure: '10:15 AM',
      arrival: '02:45 PM',
      duration: '5h 30m',
      price: 289,
      basePrice: 249,
      stops: 1,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Airbus A320',
      amenities: ['Wi-Fi', 'USB Ports'],
      baggageAllowance: { checked: 1, carryOn: 1 },
      departureTime: 10.25,
      arrivalTime: 14.75,
      durationMinutes: 330,
      rating: 4.2,
      ecoFriendly: false
    },
    {
      id: 3,
      airline: 'American Airlines',
      airlineCode: 'AA',
      flightNumber: 'AA 3217',
      departure: '12:30 PM',
      arrival: '03:00 PM',
      duration: '4h 30m',
      price: 395,
      basePrice: 349,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Boeing 787',
      amenities: ['Wi-Fi', 'Entertainment', 'USB Ports', 'Meal', 'Extra Legroom'],
      baggageAllowance: { checked: 2, carryOn: 1 },
      departureTime: 12.5,
      arrivalTime: 15,
      durationMinutes: 270,
      rating: 4.7,
      ecoFriendly: true
    },
    {
      id: 4,
      airline: 'Southwest Airlines',
      airlineCode: 'WN',
      flightNumber: 'WN 1234',
      departure: '06:45 AM',
      arrival: '09:15 AM',
      duration: '5h 30m',
      price: 265,
      basePrice: 229,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Boeing 737 MAX',
      amenities: ['Wi-Fi', 'Snacks'],
      baggageAllowance: { checked: 0, carryOn: 2 },
      departureTime: 6.75,
      arrivalTime: 9.25,
      durationMinutes: 330,
      rating: 4.0,
      ecoFriendly: false
    },
    {
      id: 5,
      airline: 'JetBlue Airways',
      airlineCode: 'B6',
      flightNumber: 'B6 5678',
      departure: '03:20 PM',
      arrival: '06:50 PM',
      duration: '6h 30m',
      price: 315,
      basePrice: 279,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Airbus A321',
      amenities: ['Wi-Fi', 'Entertainment', 'Live TV', 'Snacks'],
      baggageAllowance: { checked: 1, carryOn: 1 },
      departureTime: 15.33,
      arrivalTime: 18.83,
      durationMinutes: 390,
      rating: 4.4,
      ecoFriendly: false
    },
    {
      id: 6,
      airline: 'Alaska Airlines',
      airlineCode: 'AS',
      flightNumber: 'AS 9012',
      departure: '09:45 PM',
      arrival: '12:15 AM',
      duration: '5h 30m',
      price: 375,
      basePrice: 329,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Boeing 737-900',
      amenities: ['Wi-Fi', 'Entertainment', 'Meal'],
      baggageAllowance: { checked: 1, carryOn: 1 },
      departureTime: 21.75,
      arrivalTime: 0.25,
      durationMinutes: 330,
      rating: 4.3,
      ecoFriendly: true
    }
  ];

  // State for passenger details
  const [passengerDetails, setPassengerDetails] = useState([
    { id: 1, title: 'Mr.', firstName: '', lastName: '', dob: '', gender: 'male', nationality: 'US', passport: '', ffpNumber: '' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'adults' || name === 'children' || name === 'infants') {
      const total = parseInt(value) + formData.children + formData.infants;
      if (total <= 9) {
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

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][field] = value;
    setPassengerDetails(updatedPassengers);
  };

  const addPassenger = () => {
    if (passengerDetails.length < 9) {
      setPassengerDetails([...passengerDetails, {
        id: passengerDetails.length + 1,
        title: 'Mr.',
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'male',
        nationality: 'US',
        passport: '',
        ffpNumber: ''
      }]);
    }
  };

  const removePassenger = (index) => {
    if (passengerDetails.length > 1) {
      const updatedPassengers = passengerDetails.filter((_, i) => i !== index);
      setPassengerDetails(updatedPassengers);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(flightData);
      setFilteredResults(flightData);
      setBookingStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    if (tripType === 'round-trip') {
      setBookingStep(2.5); // New step for return flight selection
    } else {
      setBookingStep(3);
    }
  };

  const handleSelectReturnFlight = (flight) => {
    setSelectedReturnFlight(flight);
    setBookingStep(3);
  };

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Booking confirmed for ${selectedFlight.airline} flight ${selectedFlight.flightNumber}!`);
    setBookingStep(4);
  };

  const swapLocations = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from
    });
  };

  // Filter and sort results
  useEffect(() => {
    let filtered = [...searchResults];
    
    // Apply filters
    if (filters.stops !== 'any') {
      if (filters.stops === 'nonstop') {
        filtered = filtered.filter(flight => flight.stops === 0);
      } else if (filters.stops === 'onesteop') {
        filtered = filtered.filter(flight => flight.stops === 1);
      }
    }
    
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight => filters.airlines.includes(flight.airline));
    }
    
    filtered = filtered.filter(flight => 
      flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1]
    );
    
    filtered = filtered.filter(flight => 
      flight.departureTime >= filters.departureTime[0] && flight.departureTime <= filters.departureTime[1]
    );
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.durationMinutes - b.durationMinutes;
        case 'departure':
          return a.departureTime - b.departureTime;
        case 'arrival':
          return a.arrivalTime - b.arrivalTime;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.price - b.price;
      }
    });
    
    setFilteredResults(filtered);
  }, [searchResults, filters, sortBy]);

  // Calculate total price with baggage
  const calculateTotalPrice = () => {
    let totalPrice = selectedFlight ? selectedFlight.price : 0;
    if (selectedReturnFlight && tripType === 'round-trip') {
      totalPrice += selectedReturnFlight.price;
    }
    
    // Add baggage costs
    const baggageCost = selectedBaggage.checked * 30; // $30 per checked bag
    return totalPrice + baggageCost;
  };

  return (
    <div className="flight-booking-container">
      <div className="booking-header">
        <h1>Flight Booking</h1>
        <p>Find the best flights for your next journey</p>
      </div>

      <div className="booking-progress">
        <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Search</p>
        </div>
        <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Select Outbound</p>
        </div>
        {tripType === 'round-trip' && (
          <div className={`progress-step ${bookingStep >= 2.5 ? 'active' : ''}`}>
            <span>2.5</span>
            <p>Select Return</p>
          </div>
        )}
        <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Passenger Details</p>
        </div>
        <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>
          <span>4</span>
          <p>Confirmation</p>
        </div>
      </div>

      {bookingStep === 1 && (
        <div className="search-section">
          <div className="trip-type-selector">
            <button 
              className={`trip-type ${tripType === 'one-way' ? 'active' : ''}`}
              onClick={() => setTripType('one-way')}
            >
              One Way
            </button>
            <button 
              className={`trip-type ${tripType === 'round-trip' ? 'active' : ''}`}
              onClick={() => setTripType('round-trip')}
            >
              Round Trip
            </button>
            <button 
              className={`trip-type ${tripType === 'multi-city' ? 'active' : ''}`}
              onClick={() => setTripType('multi-city')}
            >
              Multi City
            </button>
          </div>

          <form onSubmit={handleSearch} className="flight-search-form">
            <div className="location-fields">
              <div className="input-group">
                <label htmlFor="from">From</label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="City or airport"
                  required
                />
              </div>
              
              <button type="button" className="swap-btn" onClick={swapLocations}>
                ⇄
              </button>
              
              <div className="input-group">
                <label htmlFor="to">To</label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="City or airport"
                  required
                />
              </div>
            </div>
            
            <div className="date-fields">
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
                <div className="flexible-dates">
                  <label>
                    <input
                      type="checkbox"
                      checked={flexibleDates}
                      onChange={(e) => setFlexibleDates(e.target.checked)}
                    />
                    Flexible ±3 days
                  </label>
                </div>
              </div>
              
              {tripType === 'round-trip' && (
                <div className="input-group">
                  <label htmlFor="returnDate">Return</label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
            </div>
            
            <div className="passenger-class-fields">
              <div className="passenger-selector">
                <div className="input-group">
                  <label>Passengers</label>
                  <div className="passenger-controls">
                    <div className="passenger-control">
                      <span>Adults</span>
                      <div className="counter">
                        <button type="button" onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}>-</button>
                        <span>{formData.adults}</span>
                        <button type="button" onClick={() => setFormData({...formData, adults: Math.min(9, formData.adults + 1)})}>+</button>
                      </div>
                    </div>
                    <div className="passenger-control">
                      <span>Children</span>
                      <div className="counter">
                        <button type="button" onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}>-</button>
                        <span>{formData.children}</span>
                        <button type="button" onClick={() => setFormData({...formData, children: Math.min(8, formData.children + 1)})}>+</button>
                      </div>
                    </div>
                    <div className="passenger-control">
                      <span>Infants</span>
                      <div className="counter">
                        <button type="button" onClick={() => setFormData({...formData, infants: Math.max(0, formData.infants - 1)})}>-</button>
                        <span>{formData.infants}</span>
                        <button type="button" onClick={() => setFormData({...formData, infants: Math.min(formData.adults, formData.infants + 1)})}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="class">Class</label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search Flights'}
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Available Outbound Flights</h2>
            <div className="results-summary">
              <span>{formData.from} → {formData.to}</span>
              <span>| {formData.departureDate}</span>
              <span>| {formData.adults + formData.children + formData.infants} {formData.adults + formData.children + formData.infants === 1 ? 'Passenger' : 'Passengers'}</span>
            </div>
          </div>
          
          <div className="sort-filter">
            <div className="sort-by">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
                <option value="arrival">Arrival Time</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="filters">
              <label>Filters:</label>
              <div className="filter-options">
                <div className="filter-dropdown">
                  <button className="filter-btn">Stops</button>
                  <div className="filter-dropdown-content">
                    <label>
                      <input 
                        type="radio" 
                        name="stops" 
                        value="any" 
                        checked={filters.stops === 'any'}
                        onChange={(e) => setFilters({...filters, stops: e.target.value})}
                      />
                      Any stops
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="stops" 
                        value="nonstop" 
                        checked={filters.stops === 'nonstop'}
                        onChange={(e) => setFilters({...filters, stops: e.target.value})}
                      />
                      Non-stop
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="stops" 
                        value="onesteop" 
                        checked={filters.stops === 'onesteop'}
                        onChange={(e) => setFilters({...filters, stops: e.target.value})}
                      />
                      1 Stop
                    </label>
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-btn">Price Range</button>
                  <div className="filter-dropdown-content">
                    <div className="price-range-slider">
                      <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        value={filters.priceRange[1]} 
                        onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                      />
                      <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-btn">Airlines</button>
                  <div className="filter-dropdown-content">
                    {['Delta Airlines', 'United Airlines', 'American Airlines', 'Southwest Airlines', 'JetBlue Airways', 'Alaska Airlines'].map(airline => (
                      <label key={airline}>
                        <input 
                          type="checkbox" 
                          value={airline}
                          checked={filters.airlines.includes(airline)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, airlines: [...filters.airlines, airline]});
                            } else {
                              setFilters({...filters, airlines: filters.airlines.filter(a => a !== airline)});
                            }
                          }}
                        />
                        {airline}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flight-list">
            {filteredResults.map(flight => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="airline">
                    <div className="airline-logo"></div>
                    <div className="airline-details">
                      <span className="airline-name">{flight.airline}</span>
                      <span className="flight-number">{flight.flightNumber}</span>
                      <div className="airline-rating">
                        {'★'.repeat(Math.floor(flight.rating))}{flight.rating % 1 !== 0 ? '½' : ''}
                        <span className="rating-value">{flight.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flight-schedule">
                    <div className="time-block">
                      <span className="time">{flight.departure}</span>
                      <span className="airport">{flight.from}</span>
                    </div>
                    
                    <div className="flight-duration">
                      <span className="duration">{flight.duration}</span>
                      <div className="flight-path">
                        <div className="path-line"></div>
                        <div className="stops">
                          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="time-block">
                      <span className="time">{flight.arrival}</span>
                      <span className="airport">{flight.to}</span>
                    </div>
                  </div>
                  
                  <div className="flight-details">
                    <span>{flight.aircraft}</span>
                    <span>•</span>
                    <span>{flight.basePrice > 0 && `$${flight.basePrice}`}</span>
                    <span>•</span>
                    <span className={`eco-friendly ${flight.ecoFriendly ? 'yes' : 'no'}`}>
                      {flight.ecoFriendly ? 'Eco-Friendly' : 'Regular'}
                    </span>
                  </div>
                  
                  <div className="amenities">
                    {flight.amenities.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flight-price">
                  <div className="price">${flight.price}</div>
                  <div className="baggage-info">
                    Baggage: {flight.baggageAllowance.checked} checked, {flight.baggageAllowance.carryOn} carry-on
                  </div>
                  <button 
                    onClick={() => handleSelectFlight(flight)}
                    className="select-btn"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {bookingStep === 2.5 && selectedFlight && (
        <div className="results-section">
          <div className="results-header">
            <h2>Available Return Flights</h2>
            <div className="results-summary">
              <span>{formData.to} → {formData.from}</span>
              <span>| {formData.returnDate}</span>
              <span>| {formData.adults + formData.children + formData.infants} {formData.adults + formData.children + formData.infants === 1 ? 'Passenger' : 'Passengers'}</span>
            </div>
          </div>
          
          <div className="selected-outbound">
            <h3>Selected Outbound Flight</h3>
            <div className="selected-flight-card">
              <div className="flight-info">
                <div className="airline">
                  <div className="airline-logo"></div>
                  <div className="airline-details">
                    <span className="airline-name">{selectedFlight.airline}</span>
                    <span className="flight-number">{selectedFlight.flightNumber}</span>
                  </div>
                </div>
                <div className="flight-schedule">
                  <div className="time-block">
                    <span className="time">{selectedFlight.departure}</span>
                    <span className="airport">{selectedFlight.from}</span>
                  </div>
                  
                  <div className="flight-duration">
                    <span className="duration">{selectedFlight.duration}</span>
                    <div className="flight-path">
                      <div className="path-line"></div>
                      <div className="stops">
                        {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} stop${selectedFlight.stops > 1 ? 's' : ''}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="time-block">
                    <span className="time">{selectedFlight.arrival}</span>
                    <span className="airport">{selectedFlight.to}</span>
                  </div>
                </div>
                
                <div className="flight-details">
                  <span>{selectedFlight.aircraft}</span>
                  <span>•</span>
                  <span>${selectedFlight.price}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sort-filter">
            <div className="sort-by">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
                <option value="arrival">Arrival Time</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="filters">
              <label>Filters:</label>
              <div className="filter-options">
                <div className="filter-dropdown">
                  <button className="filter-btn">Stops</button>
                  <div className="filter-dropdown-content">
                    <label>
                      <input 
                        type="radio" 
                        name="stops" 
                        value="any" 
                        checked={filters.stops === 'any'}
                        onChange={(e) => setFilters({...filters, stops: e.target.value})}
                      />
                      Any stops
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="stops" 
                        value="nonstop" 
                        checked={filters.stops === 'nonstop'}
                        onChange={(e) => setFilters({...filters, stops: e.target.value})}
                      />
                      Non-stop
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="stops" 
                        value="onesteop" 
                        checked={filters.stops === 'onesteop'}
                        onChange={(e) => setFilters({...filters, stops: e.target.value})}
                      />
                      1 Stop
                    </label>
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-btn">Price Range</button>
                  <div className="filter-dropdown-content">
                    <div className="price-range-slider">
                      <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        value={filters.priceRange[1]} 
                        onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                      />
                      <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="filter-dropdown">
                  <button className="filter-btn">Airlines</button>
                  <div className="filter-dropdown-content">
                    {['Delta Airlines', 'United Airlines', 'American Airlines', 'Southwest Airlines', 'JetBlue Airways', 'Alaska Airlines'].map(airline => (
                      <label key={airline}>
                        <input 
                          type="checkbox" 
                          value={airline}
                          checked={filters.airlines.includes(airline)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, airlines: [...filters.airlines, airline]});
                            } else {
                              setFilters({...filters, airlines: filters.airlines.filter(a => a !== airline)});
                            }
                          }}
                        />
                        {airline}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flight-list">
            {filteredResults.map(flight => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="airline">
                    <div className="airline-logo"></div>
                    <div className="airline-details">
                      <span className="airline-name">{flight.airline}</span>
                      <span className="flight-number">{flight.flightNumber}</span>
                      <div className="airline-rating">
                        {'★'.repeat(Math.floor(flight.rating))}{flight.rating % 1 !== 0 ? '½' : ''}
                        <span className="rating-value">{flight.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flight-schedule">
                    <div className="time-block">
                      <span className="time">{flight.departure}</span>
                      <span className="airport">{flight.from}</span>
                    </div>
                    
                    <div className="flight-duration">
                      <span className="duration">{flight.duration}</span>
                      <div className="flight-path">
                        <div className="path-line"></div>
                        <div className="stops">
                          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="time-block">
                      <span className="time">{flight.arrival}</span>
                      <span className="airport">{flight.to}</span>
                    </div>
                  </div>
                  
                  <div className="flight-details">
                    <span>{flight.aircraft}</span>
                    <span>•</span>
                    <span>{flight.basePrice > 0 && `$${flight.basePrice}`}</span>
                    <span>•</span>
                    <span className={`eco-friendly ${flight.ecoFriendly ? 'yes' : 'no'}`}>
                      {flight.ecoFriendly ? 'Eco-Friendly' : 'Regular'}
                    </span>
                  </div>
                  
                  <div className="amenities">
                    {flight.amenities.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flight-price">
                  <div className="price">${flight.price}</div>
                  <div className="baggage-info">
                    Baggage: {flight.baggageAllowance.checked} checked, {flight.baggageAllowance.carryOn} carry-on
                  </div>
                  <button 
                    onClick={() => handleSelectReturnFlight(flight)}
                    className="select-btn"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingStep === 3 && selectedFlight && (
        <div className="booking-section">
          <h2>Complete Your Booking</h2>
          
          <div className="booking-content">
            <div className="flight-summary">
              <h3>Flight Summary</h3>
              <div className="summary-card">
                <div className="route-date">
                  <span>{formData.from} to {formData.to}</span>
                  <span>{formData.departureDate}</span>
                </div>
                
                <div className="flight-details-summary">
                  <div className="airline-summary">
                    <h4>{selectedFlight.airline}</h4>
                    <p>Flight {selectedFlight.flightNumber} • {selectedFlight.aircraft}</p>
                  </div>
                  
                  <div className="timeline-summary">
                    <div className="time-summary">
                      <span className="time">{selectedFlight.departure}</span>
                      <span className="airport">{selectedFlight.from}</span>
                    </div>
                    
                    <div className="duration-summary">
                      <span>{selectedFlight.duration}</span>
                      <div className="path-summary">
                        <div className="path-line-summary"></div>
                      </div>
                    </div>
                    
                    <div className="time-summary">
                      <span className="time">{selectedFlight.arrival}</span>
                      <span className="airport">{selectedFlight.to}</span>
                    </div>
                  </div>
                </div>
                
                {tripType === 'round-trip' && selectedReturnFlight && (
                  <div className="flight-details-summary">
                    <div className="airline-summary">
                      <h4>Return: {selectedReturnFlight.airline}</h4>
                      <p>Flight {selectedReturnFlight.flightNumber} • {selectedReturnFlight.aircraft}</p>
                    </div>
                    
                    <div className="timeline-summary">
                      <div className="time-summary">
                        <span className="time">{selectedReturnFlight.departure}</span>
                        <span className="airport">{selectedReturnFlight.from}</span>
                      </div>
                      
                      <div className="duration-summary">
                        <span>{selectedReturnFlight.duration}</span>
                        <div className="path-summary">
                          <div className="path-line-summary"></div>
                        </div>
                      </div>
                      
                      <div className="time-summary">
                        <span className="time">{selectedReturnFlight.arrival}</span>
                        <span className="airport">{selectedReturnFlight.to}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="baggage-options">
                  <h4>Baggage Options</h4>
                  <div className="baggage-controls">
                    <div className="baggage-option">
                      <label>Checked Bags</label>
                      <div className="counter">
                        <button type="button" onClick={() => setSelectedBaggage({...selectedBaggage, checked: Math.max(0, selectedBaggage.checked - 1)})}>-</button>
                        <span>{selectedBaggage.checked}</span>
                        <button type="button" onClick={() => setSelectedBaggage({...selectedBaggage, checked: Math.min(5, selectedBaggage.checked + 1)})}>+</button>
                      </div>
                      <span className="baggage-price">$30/bag</span>
                    </div>
                    <div className="baggage-option">
                      <label>Carry-on Bags</label>
                      <div className="counter">
                        <button type="button" onClick={() => setSelectedBaggage({...selectedBaggage, carryOn: Math.max(1, selectedBaggage.carryOn - 1)})}>-</button>
                        <span>{selectedBaggage.carryOn}</span>
                        <button type="button" onClick={() => setSelectedBaggage({...selectedBaggage, carryOn: Math.min(2, selectedBaggage.carryOn + 1)})}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="price-summary">
                  <div className="price-breakdown">
                    <div className="price-item">
                      <span>Base Fare</span>
                      <span>${selectedFlight.price}</span>
                    </div>
                    {tripType === 'round-trip' && selectedReturnFlight && (
                      <div className="price-item">
                        <span>Return Flight</span>
                        <span>${selectedReturnFlight.price}</span>
                      </div>
                    )}
                    {selectedBaggage.checked > 0 && (
                      <div className="price-item">
                        <span>Checked Bags ({selectedBaggage.checked})</span>
                        <span>${selectedBaggage.checked * 30}</span>
                      </div>
                    )}
                    <div className="price-item tax">
                      <span>Taxes & Fees</span>
                      <span>${Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                    <div className="total-price">
                      <span>Total</span>
                      <span>${Math.round(calculateTotalPrice() * 1.1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="passenger-details">
              <h3>Passenger Information</h3>
              
              {passengerDetails.map((passenger, index) => (
                <div key={passenger.id} className="passenger-form">
                  <div className="passenger-header">
                    <h4>Passenger {index + 1}</h4>
                    {passengerDetails.length > 1 && (
                      <button type="button" className="remove-passenger" onClick={() => removePassenger(index)}>Remove</button>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Title</label>
                      <select 
                        value={passenger.title} 
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
                        value={passenger.firstName}
                        onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        value={passenger.lastName}
                        onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Date of Birth</label>
                      <input 
                        type="date" 
                        value={passenger.dob}
                        onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Gender</label>
                      <select 
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Nationality</label>
                      <select 
                        value={passenger.nationality}
                        onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="IN">India</option>
                      </select>
                    </div>
                    
                    <div className="input-group">
                      <label>Passport Number</label>
                      <input 
                        type="text" 
                        value={passenger.passport}
                        onChange={(e) => handlePassengerChange(index, 'passport', e.target.value)}
                        placeholder="If international travel"
                      />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label>Frequent Flyer Program</label>
                    <input 
                      type="text" 
                      value={passenger.ffpNumber}
                      onChange={(e) => handlePassengerChange(index, 'ffpNumber', e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              ))}
              
              <button type="button" className="add-passenger-btn" onClick={addPassenger}>
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
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            
            <h2>Booking Confirmed!</h2>
            <p>Your flight has been successfully booked.</p>
            
            <div className="booking-details">
              <div className="detail-item">
                <span>Booking Reference</span>
                <span>FLT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              
              <div className="detail-item">
                <span>Flight</span>
                <span>{selectedFlight.airline} {selectedFlight.flightNumber}</span>
              </div>
              
              <div className="detail-item">
                <span>Route</span>
                <span>{formData.from} → {formData.to}</span>
              </div>
              
              <div className="detail-item">
                <span>Departure</span>
                <span>{formData.departureDate} at {selectedFlight.departure}</span>
              </div>
              
              <div className="detail-item">
                <span>Passengers</span>
                <span>{formData.passengers}</span>
              </div>
              
              <div className="detail-item total">
                <span>Total Paid</span>
                <span>${selectedFlight.price * formData.passengers}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setBookingStep(1)}
              className="new-search-btn"
            >
              Book Another Flight
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;