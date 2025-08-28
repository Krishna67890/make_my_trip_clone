import React, { useState } from 'react';
import { Plane, Clock, MapPin, ChevronDown, Info, Star } from 'lucide-react';
import './FlightCard.css';

const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (duration) => {
    return duration;
  };

  return (
    <div className="flight-card">
      <div className="flight-main" onClick={() => setExpanded(!expanded)}>
        {/* Airline Info */}
        <div className="airline-info">
          <div className="airline-logo">
            <Plane size={24} />
          </div>
          <div className="airline-details">
            <h4>{flight.airline}</h4>
            <p>{flight.flightNo}</p>
            <div className="rating">
              <Star size={12} fill="currentColor" />
              <span>4.5</span>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="flight-schedule">
          <div className="time-section">
            <span className="time">{formatTime(flight.departure)}</span>
            <span className="city">{flight.from}</span>
          </div>

          <div className="duration-section">
            <div className="duration-line">
              <div className="line"></div>
              <Clock size={12} />
              <span>{formatDuration(flight.duration)}</span>
            </div>
            <div className="stops">
              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </div>
          </div>

          <div className="time-section">
            <span className="time">{formatTime(flight.arrival)}</span>
            <span className="city">{flight.to}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flight-price">
          <div className="price">₹{flight.price.toLocaleString()}</div>
          <p>per person</p>
          <button className="select-btn">Select</button>
        </div>

        <ChevronDown 
          className={`expand-icon ${expanded ? 'expanded' : ''}`} 
          size={20} 
        />
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="flight-details">
          <div className="details-section">
            <h5>Flight Details</h5>
            <div className="detail-row">
              <span>Aircraft:</span>
              <span>{flight.aircraft}</span>
            </div>
            <div className="detail-row">
              <span>Seats Available:</span>
              <span>{flight.seats.economy + flight.seats.business}</span>
            </div>
          </div>

          <div className="details-section">
            <h5>Fare Summary</h5>
            <div className="fare-breakdown">
              <div className="fare-item">
                <span>Base Fare</span>
                <span>₹{(flight.price * 0.7).toLocaleString()}</span>
              </div>
              <div className="fare-item">
                <span>Taxes & Fees</span>
                <span>₹{(flight.price * 0.3).toLocaleString()}</span>
              </div>
              <div className="fare-item total">
                <span>Total</span>
                <span>₹{flight.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="details-actions">
            <button className="details-btn">
              <Info size={16} />
              View Fare Rules
            </button>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;