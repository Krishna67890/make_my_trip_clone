// tours/Itinerary.jsx
import React, { useState } from 'react';

const Itinerary = ({ itinerary }) => {
  const [expandedDay, setExpandedDay] = useState(0);

  return (
    <div className="itinerary">
      <h2>Tour Itinerary</h2>
      <div className="itinerary-timeline">
        {itinerary.map((day, index) => (
          <div 
            key={index} 
            className={`timeline-item ${expandedDay === index ? 'expanded' : ''}`}
            onClick={() => setExpandedDay(index)}
          >
            <div className="timeline-marker">
              <div className="day-number">Day {day.day}</div>
            </div>
            <div className="timeline-content">
              <h3>{day.title}</h3>
              {expandedDay === index && <p>{day.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;