import React, { useState } from 'react';
import { Star, MapPin, Heart, Users, Wifi, Car, Utensils } from 'lucide-react';
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi size={16} />;
      case 'parking': return <Car size={16} />;
      case 'restaurant': return <Utensils size={16} />;
      default: return <Star size={16} />;
    }
  };

  return (
    <div className="hotel-card">
      {/* Image Section */}
      <div className="hotel-image">
        {imageError ? (
          <div className="image-placeholder">
            <img src="/hotel-placeholder.jpg" alt="Hotel" />
          </div>
        ) : (
          <img
            src={hotel.image}
            alt={hotel.name}
            onError={() => setImageError(true)}
          />
        )}
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div className="image-badge">
          <span>⭐ {hotel.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="hotel-content">
        <div className="hotel-header">
          <h3 className="hotel-name">{hotel.name}</h3>
          <div className="hotel-rating">
            {renderStars(hotel.rating)}
            <span>({hotel.reviews} reviews)</span>
          </div>
        </div>

        <div className="hotel-location">
          <MapPin size={14} />
          <span>{hotel.location}</span>
          <span className="distance">• {hotel.distance} km from center</span>
        </div>

        <div className="hotel-amenities">
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {getAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="amenity-more">+{hotel.amenities.length - 4} more</span>
          )}
        </div>

        <div className="hotel-features">
          <div className="feature">
            <Users size={14} />
            <span>Free cancellation</span>
          </div>
          <div className="feature">
            <Star size={14} />
            <span>Breakfast included</span>
          </div>
        </div>
      </div>

      {/* Price & Action Section */}
      <div className="hotel-action">
        <div className="price-section">
          <div className="original-price">₹{hotel.originalPrice?.toLocaleString()}</div>
          <div className="current-price">₹{hotel.price.toLocaleString()}</div>
          <div className="price-note">per night</div>
          <div className="discount">
            {hotel.originalPrice && (
              <span>{Math.round((1 - hotel.price / hotel.originalPrice) * 100)}% OFF</span>
            )}
          </div>
        </div>

        <div className="action-buttons">
          <button className="view-details-btn">View Details</button>
          <button className="book-now-btn">Book Now</button>
        </div>

        <div className="availability">
          <span className="available">Only {hotel.rooms} rooms left!</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;