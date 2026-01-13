// TrainCard.jsx
import React from 'react';
import { Clock, MapPin, Train } from 'lucide-react';
import './TrainCard.css';

const TrainCard = ({ train, classType }) => {
  const {
    name,
    number,
    from,
    to,
    departureTime,
    arrivalTime,
    duration,
    classes
  } = train;

  const selectedClass = classes.find(c => c.type === classType) || classes[0];

  const formatTime = (time) => {
    return time;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="train-card">
      <div className="train-header">
        <div className="train-info">
          <h3 className="train-name">{name}</h3>
          <span className="train-number">{number}</span>
        </div>
        <div className="train-timings">
          <div className="timing">
            <span className="time">{formatTime(departureTime)}</span>
            <span className="station">{from}</span>
          </div>
          
          <div className="journey-duration">
            <Clock size={14} />
            <span>{formatDuration(duration)}</span>
          </div>
          
          <div className="timing">
            <span className="time">{formatTime(arrivalTime)}</span>
            <span className="station">{to}</span>
          </div>
        </div>
      </div>

      <div className="train-classes">
        {classes.map(trainClass => (
          <div key={trainClass.type} className={`train-class ${classType === trainClass.type ? 'selected' : ''}`}>
            <span className="class-name">{trainClass.type}</span>
            <span className="class-availability">{trainClass.availability}</span>
            <span className="class-price">₹{trainClass.fare}</span>
            {trainClass.type === classType && (
              <button className="book-now-btn">Book Now</button>
            )}
          </div>
        ))}
      </div>

      <div className="train-actions">
        <button className="view-seats-btn">View Seats</button>
        <button className="train-route-btn">View Route</button>
      </div>
    </div>
  );
};

export default TrainCard;