import React, { useState } from 'react';
import './BusBooking.css';

const BusBooking = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    busType: 'all'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);

  // Sample bus data
  const busData = [
    {
      id: 1,
      operator: 'GreenLine Express',
      departure: '08:00 AM',
      arrival: '12:30 PM',
      duration: '4h 30m',
      price: 45,
      seats: 32,
      busType: 'luxury',
      amenities: ['Wi-Fi', 'AC', 'Charging Ports', 'Reclining Seats']
    },
    {
      id: 2,
      operator: 'City Traveler',
      departure: '09:15 AM',
      arrival: '02:45 PM',
      duration: '5h 30m',
      price: 32,
      seats: 40,
      busType: 'standard',
      amenities: ['AC', 'Restroom']
    },
    {
      id: 3,
      operator: 'Express Voyager',
      departure: '10:30 AM',
      arrival: '02:00 PM',
      duration: '3h 30m',
      price: 55,
      seats: 28,
      busType: 'premium',
      amenities: ['Wi-Fi', 'AC', 'Charging Ports', 'Reclining Seats', 'Entertainment', 'Snacks']
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
    setSearchResults(busData);
    setBookingStep(2);
  };

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setBookingStep(3);
  };

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Booking confirmed for ${selectedTrip.operator}!`);
    setBookingStep(4);
  };

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
              <div className="input-group">
                <label htmlFor="passengers">Passengers</label>
                <select
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
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
                </select>
              </div>
            </div>
            
            <button type="submit" className="search-btn">
              Search Buses
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="results-section">
          <h2>Available Buses</h2>
          <div className="bus-list">
            {searchResults.map(bus => (
              <div key={bus.id} className="bus-card">
                <div className="bus-info">
                  <h3>{bus.operator}</h3>
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
                    </div>
                    <div className="time-block">
                      <span className="time">{bus.arrival}</span>
                      <span className="location">{formData.destination}</span>
                    </div>
                  </div>
                  <div className="amenities">
                    {bus.amenities.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
                <div className="bus-price">
                  <div className="price">${bus.price}</div>
                  <div className="seats">{bus.seats} seats left</div>
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
          <div className="booking-details">
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
                    <span>Passengers: {formData.passengers}</span>
                    <span>${selectedTrip.price} x {formData.passengers}</span>
                  </div>
                  <div className="total">
                    <span>Total</span>
                    <span>${selectedTrip.price * formData.passengers}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="passenger-form">
              <h3>Passenger Details</h3>
              {Array.from({ length: formData.passengers }).map((_, index) => (
                <div key={index} className="passenger-card">
                  <h4>Passenger {index + 1}</h4>
                  <div className="form-row">
                    <input type="text" placeholder="Full Name" />
                    <input type="number" placeholder="Age" />
                  </div>
                  <div className="form-row">
                    <select>
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <input type="text" placeholder="Phone Number" />
                  </div>
                </div>
              ))}
              
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