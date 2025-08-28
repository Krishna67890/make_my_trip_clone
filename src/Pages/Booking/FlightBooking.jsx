import React, { useState } from 'react';
import './FlightBooking.css';

const FlightBooking = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);

  // Sample flight data
  const flightData = [
    {
      id: 1,
      airline: 'Delta Airlines',
      flightNumber: 'DL 2456',
      departure: '08:00 AM',
      arrival: '11:30 AM',
      duration: '3h 30m',
      price: 345,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Boeing 737',
      amenities: ['Wi-Fi', 'Entertainment', 'USB Ports', 'Meal']
    },
    {
      id: 2,
      airline: 'United Airlines',
      flightNumber: 'UA 1892',
      departure: '10:15 AM',
      arrival: '02:45 PM',
      duration: '5h 30m',
      price: 289,
      stops: 1,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Airbus A320',
      amenities: ['Wi-Fi', 'USB Ports']
    },
    {
      id: 3,
      airline: 'American Airlines',
      flightNumber: 'AA 3217',
      departure: '12:30 PM',
      arrival: '03:00 PM',
      duration: '4h 30m',
      price: 395,
      stops: 0,
      from: 'JFK',
      to: 'LAX',
      date: '2023-12-15',
      aircraft: 'Boeing 787',
      amenities: ['Wi-Fi', 'Entertainment', 'USB Ports', 'Meal', 'Extra Legroom']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    setSearchResults(flightData);
    setBookingStep(2);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
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
          <p>Select Flight</p>
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
              <div className="input-group">
                <label htmlFor="passengers">Passengers</label>
                <select
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
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
            
            <button type="submit" className="search-btn">
              Search Flights
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Available Flights</h2>
            <div className="results-summary">
              <span>{formData.from} → {formData.to}</span>
              <span>| {formData.departureDate}</span>
              {tripType === 'round-trip' && <span>| Return: {formData.returnDate}</span>}
              <span>| {formData.passengers} {formData.passengers === 1 ? 'Passenger' : 'Passengers'}</span>
            </div>
          </div>
          
          <div className="sort-filter">
            <div className="sort-by">
              <label>Sort by:</label>
              <select>
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
                <option value="arrival">Arrival Time</option>
              </select>
            </div>
            
            <div className="filters">
              <label>Filters:</label>
              <div className="filter-options">
                <button className="filter-btn">Non-stop</button>
                <button className="filter-btn">Wi-Fi</button>
                <button className="filter-btn">Meal</button>
              </div>
            </div>
          </div>
          
          <div className="flight-list">
            {searchResults.map(flight => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="airline">
                    <div className="airline-logo"></div>
                    <span>{flight.airline}</span>
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
                    <span>Flight {flight.flightNumber}</span>
                  </div>
                  
                  <div className="amenities">
                    {flight.amenities.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flight-price">
                  <div className="price">${flight.price}</div>
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
                
                <div className="price-summary">
                  <div className="passenger-count">
                    <span>Passengers: {formData.passengers}</span>
                    <span>${selectedFlight.price} x {formData.passengers}</span>
                  </div>
                  <div className="total-price">
                    <span>Total</span>
                    <span>${selectedFlight.price * formData.passengers}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="passenger-details">
              <h3>Passenger Information</h3>
              
              {Array.from({ length: formData.passengers }).map((_, index) => (
                <div key={index} className="passenger-form">
                  <h4>Passenger {index + 1}</h4>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>First Name</label>
                      <input type="text" required />
                    </div>
                    
                    <div className="input-group">
                      <label>Last Name</label>
                      <input type="text" required />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Date of Birth</label>
                      <input type="date" required />
                    </div>
                    
                    <div className="input-group">
                      <label>Gender</label>
                      <select>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Email</label>
                      <input type="email" required />
                    </div>
                    
                    <div className="input-group">
                      <label>Phone Number</label>
                      <input type="tel" required />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="payment-section">
                <h3>Payment Details</h3>
                
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