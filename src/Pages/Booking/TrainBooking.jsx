import React, { useState } from 'react';
import './TrainBooking.css';

const TrainBooking = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male'
  });

  const trains = [
    {
      id: 1,
      name: "Express 202",
      from: "New York",
      to: "Boston",
      departure: "08:30 AM",
      arrival: "12:45 PM",
      duration: "4h 15m",
      price: 79,
      seatsAvailable: 24
    },
    {
      id: 2,
      name: "Metroliner",
      from: "New York",
      to: "Washington DC",
      departure: "09:15 AM",
      arrival: "01:30 PM",
      duration: "4h 15m",
      price: 89,
      seatsAvailable: 12
    },
    {
      id: 3,
      name: "Pacific Coast",
      from: "Los Angeles",
      to: "San Francisco",
      departure: "07:00 AM",
      arrival: "11:45 AM",
      duration: "4h 45m",
      price: 69,
      seatsAvailable: 36
    }
  ];

  const seatLayout = [
    { id: '1A', type: 'window', available: true },
    { id: '1B', type: 'aisle', available: true },
    { id: '1C', type: 'aisle', available: true },
    { id: '1D', type: 'window', available: false },
    { id: '2A', type: 'window', available: true },
    { id: '2B', type: 'aisle', available: false },
    { id: '2C', type: 'aisle', available: true },
    { id: '2D', type: 'window', available: true },
    { id: '3A', type: 'window', available: true },
    { id: '3B', type: 'aisle', available: true },
    { id: '3C', type: 'aisle', available: true },
    { id: '3D', type: 'window', available: false },
    { id: '4A', type: 'window', available: true },
    { id: '4B', type: 'aisle', available: true },
    { id: '4C', type: 'aisle', available: false },
    { id: '4D', type: 'window', available: true }
  ];

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < 4) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert('Maximum 4 seats can be selected at a time');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerData({
      ...passengerData,
      [name]: value
    });
  };

  const handleNextStep = () => {
    if (bookingStep === 1 && selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    if (bookingStep === 2) {
      // Validate passenger data
      if (!passengerData.name || !passengerData.email || !passengerData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setBookingStep(bookingStep + 1);
  };

  const handlePreviousStep = () => {
    setBookingStep(bookingStep - 1);
  };

  const handleBooking = () => {
    alert(`Booking confirmed! Seats: ${selectedSeats.join(', ')}. Check your email for confirmation.`);
    // Reset form
    setSelectedSeats([]);
    setPassengerData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: 'male'
    });
    setBookingStep(1);
  };

  const totalPrice = selectedSeats.length * trains[0].price;

  return (
    <div className="train-booking">
      <div className="booking-header">
        <h1>Train Ticket Booking</h1>
        <div className="progress-bar">
          <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Select Seats</p>
          </div>
          <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Passenger Details</p>
          </div>
          <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Confirmation</p>
          </div>
        </div>
      </div>

      <div className="booking-content">
        {bookingStep === 1 && (
          <div className="seat-selection">
            <h2>Select Your Seats</h2>
            <div className="train-info">
              <h3>{trains[0].name}</h3>
              <div className="route">
                <span>{trains[0].from} → {trains[0].to}</span>
                <span>{trains[0].departure} - {trains[0].arrival}</span>
              </div>
            </div>

            <div className="seat-map">
              <div className="train-layout">
                <div className="train-front">Engine</div>
                <div className="seats-container">
                  {seatLayout.map(seat => (
                    <div
                      key={seat.id}
                      className={`seat ${seat.type} ${!seat.available ? 'occupied' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                      onClick={() => seat.available && handleSeatSelection(seat.id)}
                    >
                      {seat.id}
                    </div>
                  ))}
                </div>
                <div className="train-rear">End</div>
              </div>
            </div>

            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat-sample available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat-sample selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="seat-sample occupied"></div>
                <span>Occupied</span>
              </div>
            </div>

            <div className="selection-summary">
              <h3>Selected Seats: {selectedSeats.join(', ') || 'None'}</h3>
              <p>Total: ${totalPrice}</p>
            </div>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="passenger-details">
            <h2>Passenger Information</h2>
            <form>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={passengerData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={passengerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={passengerData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={passengerData.age}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={passengerData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="booking-summary">
            <h2>Booking Summary</h2>
            <div className="summary-card">
              <div className="summary-section">
                <h3>Journey Details</h3>
                <p><strong>Train:</strong> {trains[0].name}</p>
                <p><strong>Route:</strong> {trains[0].from} to {trains[0].to}</p>
                <p><strong>Departure:</strong> {trains[0].departure}</p>
                <p><strong>Arrival:</strong> {trains[0].arrival}</p>
              </div>
              
              <div className="summary-section">
                <h3>Passenger Details</h3>
                <p><strong>Name:</strong> {passengerData.name}</p>
                <p><strong>Email:</strong> {passengerData.email}</p>
                <p><strong>Phone:</strong> {passengerData.phone}</p>
                {passengerData.age && <p><strong>Age:</strong> {passengerData.age}</p>}
                <p><strong>Gender:</strong> {passengerData.gender}</p>
              </div>
              
              <div className="summary-section">
                <h3>Seat Information</h3>
                <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
                <p><strong>Total Seats:</strong> {selectedSeats.length}</p>
                <p><strong>Total Amount:</strong> ${totalPrice}</p>
              </div>
            </div>
          </div>
        )}

        <div className="booking-actions">
          {bookingStep > 1 && (
            <button className="btn-secondary" onClick={handlePreviousStep}>
              Previous
            </button>
          )}
          {bookingStep < 3 ? (
            <button className="btn-primary" onClick={handleNextStep}>
              Next
            </button>
          ) : (
            <button className="btn-confirm" onClick={handleBooking}>
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainBooking;