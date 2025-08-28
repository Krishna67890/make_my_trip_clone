// CoachSelection.jsx
import React, { useState } from 'react';
import { User, Chair } from 'lucide-react';
import './CoachSelection.css';

const CoachSelection = ({ train, classType, onSeatSelect }) => {
  const [selectedCoach, setSelectedCoach] = useState(null);
  
  // Mock coach data
  const coaches = [
    {
      id: 'A1',
      type: classType,
      availableSeats: 24,
      totalSeats: 72,
      layout: [
        ['1', '2', null, '3', '4'],
        ['5', '6', null, '7', '8'],
        ['9', '10', null, '11', '12'],
        ['13', '14', null, '15', '16'],
        ['17', '18', null, '19', '20'],
        ['21', '22', null, '23', '24']
      ]
    },
    {
      id: 'A2',
      type: classType,
      availableSeats: 18,
      totalSeats: 72,
      layout: [
        ['25', '26', null, '27', '28'],
        ['29', '30', null, '31', '32'],
        ['33', '34', null, '35', '36'],
        ['37', '38', null, '39', '40'],
        ['41', '42', null, '43', '44'],
        ['45', '46', null, '47', '48']
      ]
    }
  ];

  const seatStatus = {
    available: 'available',
    selected: 'selected',
    booked: 'booked',
    ladies: 'ladies'
  };

  const getSeatStatus = (seatNumber) => {
    // Mock logic for seat status
    if (seatNumber === '5' || seatNumber === '6' || seatNumber === '15') return seatStatus.booked;
    if (seatNumber === '10' || seatNumber === '11') return seatStatus.ladies;
    return seatStatus.available;
  };

  return (
    <div className="coach-selection">
      <h3>Select Coach and Seats</h3>
      
      <div className="coaches-list">
        {coaches.map(coach => (
          <div 
            key={coach.id} 
            className={`coach-card ${selectedCoach === coach.id ? 'selected' : ''}`}
            onClick={() => setSelectedCoach(coach.id)}
          >
            <div className="coach-header">
              <h4>Coach {coach.id}</h4>
              <span className="seats-available">
                {coach.availableSeats} seats available
              </span>
            </div>
            <div className="coach-info">
              <span className="coach-type">{coach.type}</span>
              <div className="coach-layout-preview">
                <Chair size={16} />
                <span>2x3 layout</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCoach && (
        <div className="seat-selection">
          <h4>Coach {selectedCoach} - Select Seats</h4>
          <div className="seat-map">
            <div className="coach-layout">
              {coaches.find(c => c.id === selectedCoach).layout.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {row.map((seat, seatIndex) => (
                    seat ? (
                      <button
                        key={seat}
                        className={`seat ${getSeatStatus(seat)}`}
                        onClick={() => onSeatSelect(seat)}
                        disabled={getSeatStatus(seat) === seatStatus.booked}
                      >
                        {seat}
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
        </div>
      )}
    </div>
  );
};

export default CoachSelection;