import React, { useState } from 'react';
import { Chair, X, Check } from 'lucide-react';
import './FlightSeatMap.css';

const FlightSeatMap = ({ aircraftType = 'A320', onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock seat configuration for A320
  const seatLayout = {
    rows: 30,
    columns: 6,
    businessClass: {
      start: 1,
      end: 5,
      configuration: [2, 2] // 2 seats on each side of aisle
    },
    economyClass: {
      start: 6,
      end: 30,
      configuration: [3, 3] // 3 seats on each side of aisle
    }
  };

  const getSeatType = (row, column) => {
    if (row <= seatLayout.businessClass.end) return 'business';
    return 'economy';
  };

  const getSeatPrice = (seatType) => {
    return seatType === 'business' ? 2000 : 500;
  };

  const isSeatAvailable = (row, column) => {
    // Mock availability - 80% chance available
    return Math.random() > 0.2;
  };

  const isEmergencyExit = (row, column) => {
    return row === 12 || row === 13;
  };

  const handleSeatClick = (row, column, seatType) => {
    const seatNumber = `${row}${String.fromCharCode(64 + column)}`;
    const seatPrice = getSeatPrice(seatType);
    
    if (isSeatAvailable(row, column)) {
      setSelectedSeat(seatNumber);
      onSeatSelect?.({
        number: seatNumber,
        type: seatType,
        price: seatPrice,
        row,
        column
      });
    }
  };

  const renderSeat = (row, column) => {
    const seatType = getSeatType(row, column);
    const available = isSeatAvailable(row, column);
    const emergencyExit = isEmergencyExit(row, column);
    const seatNumber = `${row}${String.fromCharCode(64 + column)}`;
    const isSelected = selectedSeat === seatNumber;

    return (
      <button
        key={`${row}-${column}`}
        className={`seat ${seatType} ${available ? 'available' : 'occupied'} ${isSelected ? 'selected' : ''} ${emergencyExit ? 'emergency-exit' : ''}`}
        onClick={() => handleSeatClick(row, column, seatType)}
        disabled={!available}
        title={available ? `Seat ${seatNumber} - ₹${getSeatPrice(seatType)}` : 'Occupied'}
      >
        {available && isSelected && <Check size={12} />}
        {!available && <X size={12} />}
        {available && !isSelected && (
          <>
            <Chair size={16} />
            <span className="seat-number">{String.fromCharCode(64 + column)}</span>
          </>
        )}
      </button>
    );
  };

  const renderAisle = (key) => (
    <div key={key} className="aisle">
      <span>Aisle</span>
    </div>
  );

  return (
    <div className="flight-seatmap">
      <div className="seatmap-header">
        <h3>Select Your Seats</h3>
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat occupied"></div>
            <span>Occupied</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat emergency-exit"></div>
            <span>Emergency Exit</span>
          </div>
        </div>
      </div>

      <div className="aircraft-layout">
        <div className="cockpit">Cockpit</div>
        
        <div className="cabin">
          {/* Business Class */}
          <div className="cabin-section business-class">
            <h4>Business Class</h4>
            <div className="seats-grid">
              {Array.from({ length: seatLayout.businessClass.end - seatLayout.businessClass.start + 1 }, (_, rowIndex) => {
                const row = rowIndex + seatLayout.businessClass.start;
                return (
                  <div key={row} className="seat-row">
                    <span className="row-number">{row}</span>
                    {renderSeat(row, 1)}
                    {renderSeat(row, 2)}
                    {renderAisle(`aisle-${row}`)}
                    {renderSeat(row, 3)}
                    {renderSeat(row, 4)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Economy Class */}
          <div className="cabin-section economy-class">
            <h4>Economy Class</h4>
            <div className="seats-grid">
              {Array.from({ length: seatLayout.economyClass.end - seatLayout.economyClass.start + 1 }, (_, rowIndex) => {
                const row = rowIndex + seatLayout.economyClass.start;
                return (
                  <div key={row} className="seat-row">
                    <span className="row-number">{row}</span>
                    {renderSeat(row, 1)}
                    {renderSeat(row, 2)}
                    {renderSeat(row, 3)}
                    {renderAisle(`aisle-${row}`)}
                    {renderSeat(row, 4)}
                    {renderSeat(row, 5)}
                    {renderSeat(row, 6)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rear">Rear</div>
      </div>

      {selectedSeat && (
        <div className="selection-summary">
          <h4>Selected Seat: {selectedSeat}</h4>
          <p>Extra: ₹{getSeatPrice(getSeatType(selectedSeat.match(/\d+/)[0], selectedSeat.charCodeAt(selectedSeat.length-1) - 64))}</p>
        </div>
      )}
    </div>
  );
};

export default FlightSeatMap;