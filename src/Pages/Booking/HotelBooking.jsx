import React, { useState } from 'react';
import './HotelBooking.css';

const HotelBooking = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Sample hotel data
  const hotelData = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York City',
      rating: 4.5,
      price: 245,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center'],
      description: 'Luxury hotel in the heart of Manhattan with stunning city views and premium amenities.'
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Miami Beach',
      rating: 4.7,
      price: 320,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Bar', 'Spa'],
      description: 'Beautiful beachfront resort with private beach access and tropical gardens.'
    },
    {
      id: 3,
      name: 'Mountain Retreat',
      location: 'Aspen, Colorado',
      rating: 4.8,
      price: 395,
      image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Ski Access', 'Fireplace', 'Hot Tub', 'Free WiFi', 'Restaurant'],
      description: 'Luxury mountain resort with direct ski access and breathtaking mountain views.'
    },
    {
      id: 4,
      name: 'Urban Loft Hotel',
      location: 'San Francisco',
      rating: 4.3,
      price: 189,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Free WiFi', 'Rooftop Bar', 'Fitness Center', 'Restaurant'],
      description: 'Modern hotel in downtown with stylish rooms and convenient access to attractions.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    setSearchResults(hotelData);
    setBookingStep(2);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setBookingStep(3);
  };

  const handleBookingDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  const calculateNights = () => {
    if (!searchData.checkIn || !searchData.checkOut) return 0;
    const checkIn = new Date(searchData.checkIn);
    const checkOut = new Date(searchData.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Booking confirmed for ${selectedHotel.name}!`);
    setBookingStep(4);
  };

  return (
    <div className="hotel-booking-container">
      <div className="booking-header">
        <h1>Hotel Booking</h1>
        <p>Find the perfect accommodation for your next trip</p>
      </div>

      <div className="booking-progress">
        <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Search</p>
        </div>
        <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Select Hotel</p>
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
          <form onSubmit={handleSearch} className="hotel-search-form">
            <div className="input-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={searchData.destination}
                onChange={handleInputChange}
                placeholder="City, region, or hotel name"
                required
              />
            </div>
            
            <div className="date-fields">
              <div className="input-group">
                <label htmlFor="checkIn">Check-in</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={searchData.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="checkOut">Check-out</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={searchData.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="guest-fields">
              <div className="input-group">
                <label htmlFor="guests">Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              
              <div className="input-group">
                <label htmlFor="rooms">Rooms</label>
                <select
                  id="rooms"
                  name="rooms"
                  value={searchData.rooms}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button type="submit" className="search-btn">
              Search Hotels
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Available Hotels</h2>
            <div className="results-summary">
              <span>{searchData.destination || 'Any destination'}</span>
              <span>| {searchData.checkIn} to {searchData.checkOut}</span>
              <span>| {searchData.guests} {searchData.guests === 1 ? 'Guest' : 'Guests'}</span>
              <span>| {searchData.rooms} {searchData.rooms === 1 ? 'Room' : 'Rooms'}</span>
            </div>
          </div>
          
          <div className="sort-filter">
            <div className="sort-by">
              <label>Sort by:</label>
              <select>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="filters">
              <label>Filters:</label>
              <div className="filter-options">
                <button className="filter-btn">Free Cancellation</button>
                <button className="filter-btn">Breakfast Included</button>
                <button className="filter-btn">Swimming Pool</button>
              </div>
            </div>
          </div>
          
          <div className="hotel-list">
            {searchResults.map(hotel => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                </div>
                
                <div className="hotel-info">
                  <div className="hotel-header">
                    <h3>{hotel.name}</h3>
                    <div className="hotel-rating">
                      <span className="rating-value">{hotel.rating}</span>
                      <span className="rating-icon">★</span>
                    </div>
                  </div>
                  
                  <p className="hotel-location">{hotel.location}</p>
                  
                  <div className="hotel-amenities">
                    {hotel.amenities.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                  
                  <p className="hotel-description">{hotel.description}</p>
                </div>
                
                <div className="hotel-price">
                  <div className="price-details">
                    <div className="price">${hotel.price}/night</div>
                    <div className="total-price">${hotel.price * calculateNights()} total</div>
                    <div className="taxes">Includes taxes & fees</div>
                  </div>
                  <button 
                    onClick={() => handleSelectHotel(hotel)}
                    className="select-btn"
                  >
                    Select Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingStep === 3 && selectedHotel && (
        <div className="booking-section">
          <h2>Complete Your Booking</h2>
          
          <div className="booking-content">
            <div className="hotel-summary">
              <h3>Hotel Summary</h3>
              <div className="summary-card">
                <div className="hotel-image">
                  <img src={selectedHotel.image} alt={selectedHotel.name} />
                </div>
                
                <div className="hotel-details">
                  <h4>{selectedHotel.name}</h4>
                  <p className="location">{selectedHotel.location}</p>
                  <div className="hotel-rating">
                    <span className="rating-value">{selectedHotel.rating}</span>
                    <span className="rating-icon">★</span>
                  </div>
                  
                  <div className="stay-details">
                    <div className="detail-item">
                      <span>Check-in</span>
                      <span>{searchData.checkIn}</span>
                    </div>
                    <div className="detail-item">
                      <span>Check-out</span>
                      <span>{searchData.checkOut}</span>
                    </div>
                    <div className="detail-item">
                      <span>Duration</span>
                      <span>{calculateNights()} nights</span>
                    </div>
                    <div className="detail-item">
                      <span>Guests</span>
                      <span>{searchData.guests} {searchData.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="detail-item">
                      <span>Rooms</span>
                      <span>{searchData.rooms} {searchData.rooms === 1 ? 'Room' : 'Rooms'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="price-summary">
                  <div className="price-detail">
                    <span>${selectedHotel.price} x {calculateNights()} nights</span>
                    <span>${selectedHotel.price * calculateNights()}</span>
                  </div>
                  <div className="price-detail">
                    <span>Taxes & fees</span>
                    <span>${Math.round(selectedHotel.price * calculateNights() * 0.12)}</span>
                  </div>
                  <div className="total-price">
                    <span>Total</span>
                    <span>${Math.round(selectedHotel.price * calculateNights() * 1.12)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="guest-details">
              <h3>Guest Information</h3>
              
              <div className="guest-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={bookingDetails.firstName}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={bookingDetails.lastName}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={bookingDetails.email}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={bookingDetails.phone}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Special Requests (Optional)</label>
                  <textarea 
                    name="specialRequests"
                    value={bookingDetails.specialRequests}
                    onChange={handleBookingDetailsChange}
                    rows="3"
                    placeholder="Any special requests or preferences..."
                  ></textarea>
                </div>
              </div>
              
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

      {bookingStep === 4 && selectedHotel && (
        <div className="confirmation-section">
          <div className="confirmation-card">
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            
            <h2>Booking Confirmed!</h2>
            <p>Your hotel reservation has been successfully booked.</p>
            
            <div className="booking-details">
              <div className="detail-item">
                <span>Booking Reference</span>
                <span>HTL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              
              <div className="detail-item">
                <span>Hotel</span>
                <span>{selectedHotel.name}</span>
              </div>
              
              <div className="detail-item">
                <span>Location</span>
                <span>{selectedHotel.location}</span>
              </div>
              
              <div className="detail-item">
                <span>Check-in</span>
                <span>{searchData.checkIn}</span>
              </div>
              
              <div className="detail-item">
                <span>Check-out</span>
                <span>{searchData.checkOut}</span>
              </div>
              
              <div className="detail-item">
                <span>Guests</span>
                <span>{searchData.guests}</span>
              </div>
              
              <div className="detail-item total">
                <span>Total Paid</span>
                <span>${Math.round(selectedHotel.price * calculateNights() * 1.12)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setBookingStep(1)}
              className="new-search-btn"
            >
              Book Another Hotel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;