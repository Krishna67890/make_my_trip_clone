// BusSeatLayout.jsx
import React, { useState } from 'react';
import './BusSeatLayout.css';

const BusSeatLayout = ({ bus, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Mock bus layout (2x2 with 5 rows)
  const seatLayout = [
    [
      { number: '1', type: 'window', available: true, gender: 'any' },
      { number: '2', type: 'aisle', available: false, gender: 'any' },
      null,
      { number: '3', type: 'aisle', available: true, gender: 'any' },
      { number: '4', type: 'window', available: true, gender: 'any' }
    ],
    [
      { number: '5', type: 'window', available: true, gender: 'any' },
      { number: '6', type: 'aisle', available: true, gender: 'any' },
      null,
      { number: '7', type: 'aisle', available: true, gender: 'any' },
      { number: '8', type: 'window', available: true, gender: 'any' }
    ],
    [
      { number: '9', type: 'window', available: true, gender: 'any' },
      { number: '10', type: 'aisle', available: true, gender: 'any' },
      null,
      { number: '11', type: 'aisle', available: true, gender: 'any' },
      { number: '12', type: 'window', available: true, gender: 'any' }
    ],
    [
      { number: '13', type: 'window', available: true, gender: 'any' },
      { number: '14', type: 'aisle', available: true, gender: 'any' },
      null,
      { number: '15', type: 'aisle', available: true, gender: 'any' },
      { number: '16', type: 'window', available: true, gender: 'any' }
    ],
    [
      { number: '17', type: 'window', available: true, gender: 'any' },
      { number: '18', type: 'aisle', available: true, gender: 'any' },
      null,
      { number: '19', type: 'aisle', available: true, gender: 'any' },
      { number: '20', type: 'window', available: true, gender: 'any' }
    ]
  ];

  const handleSeatClick = (seat) => {
    if (!seat.available) return;
    
    if (selectedSeats.includes(seat.number)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.number));
      if (onSeatSelect) onSeatSelect(selectedSeats.filter(s => s !== seat.number));
    } else {
      const newSelectedSeats = [...selectedSeats, seat.number];
      setSelectedSeats(newSelectedSeats);
      if (onSeatSelect) onSeatSelect(newSelectedSeats);
    }
  };

  const getSeatClass = (seat) => {
    if (!seat.available) return 'booked';
    if (selectedSeats.includes(seat.number)) return 'selected';
    if (seat.gender === 'female') return 'ladies';
    return 'available';
  };

  return (
    <div className="bus-seat-layout">
      <div className="layout-header">
        <h3>Select Seats</h3>
        <div className="seats-summary">
          <span>{selectedSeats.length} seat(s) selected</span>
        </div>
      </div>

      <div className="bus-layout">
        <div className="driver-section">
          <div className="steering-wheel">🚗</div>
          <span>Driver</span>
        </div>
        
        <div className="seats-grid">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => (
                seat ? (
                  <button
                    key={seat.number}
                    className={`seat ${getSeatClass(seat)} ${seat.type}`}
                    onClick={() => handleSeatClick(seat)}
                    disabled={!seat.available}
                  >
                    {seat.number}
                  </button>
                ) : (
                  <div key={seatIndex} className="aisle"></div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="color-box available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="color-box selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="color-box booked"></div>
          <span>Booked</span>
        </div>
        <div className="legend-item">
          <div className="color-box ladies"></div>
          <span>Ladies</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="selection-summary">
          <h4>Selected Seats: {selectedSeats.join(', ')}</h4>
          <p>Total Fare: ₹{bus.fare * selectedSeats.length}</p>
        </div>
      )}
    </div>
  );
};

export default BusSeatLayout;