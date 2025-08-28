// Amenities.jsx
import React from 'react';
import { Wifi, Car, Coffee, Dumbbell, Waves, Tv, Coffee, Shower } from 'lucide-react';
import './Amenities.css';

const Amenities = ({ amenities, detailed = false }) => {
  const amenityIcons = {
    'Free WiFi': <Wifi size={18} />,
    'Parking': <Car size={18} />,
    'Swimming Pool': <Waves size={18} />,
    'Gym': <Dumbbell size={18} />,
    'TV': <Tv size={18} />,
    'Breakfast': <Coffee size={18} />,
    'Hot Shower': <Shower size={18} />
  };

  if (detailed) {
    return (
      <div className="amenities-detailed">
        <h3>Amenities</h3>
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <div className="amenity-icon">
                {amenityIcons[amenity] || <Coffee size={18} />}
              </div>
              <span className="amenity-name">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="amenities-preview">
      <h4>Popular Amenities</h4>
      <div className="amenities-list">
        {amenities.slice(0, 5).map((amenity, index) => (
          <div key={index} className="amenity-tag">
            {amenityIcons[amenity] || <Coffee size={14} />}
            <span>{amenity}</span>
          </div>
        ))}
        {amenities.length > 5 && (
          <div className="amenity-more">
            +{amenities.length - 5} more
          </div>
        )}
      </div>
    </div>
  );
};

export default Amenities;