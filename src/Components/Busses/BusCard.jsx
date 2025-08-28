// BusCard.jsx
import React from 'react';
import { Clock, MapPin, Star, Wifi, Snowflake, Monitor } from 'lucide-react';
import './BusCard.css';

const BusCard = ({ bus }) => {
  const {
    operator,
    type,
    from,
    to,
    departureTime,
    arrivalTime,
    duration,
    rating,
    reviewCount,
    fare,
    amenities,
    availableSeats
  } = bus;

  const formatTime = (time) => {
    return time;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'WiFi': return <Wifi size={16} />;
      case 'AC': return <Snowflake size={16} />;
      case 'Charging': return <Monitor size={16} />;
      default: return null;
    }
  };

  return (
    <div className="bus-card">
      <div className="bus-header">
        <div className="bus-operator">
          <h3>{operator}</h3>
          <span className="bus-type">{type}</span>
        </div>
        
        <div className="bus-rating">
          <div className="rating-badge">
            <Star size={14} fill="currentColor" />
            <span>{rating}</span>
          </div>
          <span className="reviews">({reviewCount} reviews)</span>
        </div>
      </div>

      <div className="bus-journey">
        <div className="timings">
          <div className="timing">
            <span className="time">{formatTime(departureTime)}</span>
            <span className="city">{from}</span>
          </div>
          
          <div className="journey-duration">
            <Clock size={14} />
            <span>{formatDuration(duration)}</span>
          </div>
          
          <div className="timing">
            <span className="time">{formatTime(arrivalTime)}</span>
            <span className="city">{to}</span>
          </div>
        </div>
      </div>

      <div className="bus-amenities">
        <div className="amenities-list">
          {amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {renderAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="bus-pricing">
        <div className="price-container">
          <span className="price">₹{fare}</span>
          <span className="seats-available">{availableSeats} seats left</span>
        </div>
        <button className="view-seats-btn">View Seats</button>
      </div>
    </div>
  );
};

export default BusCard;