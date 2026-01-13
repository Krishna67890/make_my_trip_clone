// BusOperator.jsx
import React from 'react';
import { Star, Clock, Users, Shield } from 'lucide-react';
import './BusOperator.css';

const BusOperator = ({ operator }) => {
  const {
    name,
    rating,
    reviewCount,
    fleetSize,
    yearsExperience,
    safetyRating,
    amenities,
    cancellationPolicy,
    contactInfo
  } = operator;

  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="bus-operator">
      <div className="operator-header">
        <div className="operator-info">
          <h2>{name}</h2>
          <div className="operator-rating">
            <div className="rating-badge">
              <Star size={16} fill="currentColor" />
              <span>{rating}</span>
            </div>
            <span className="reviews">({reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="operator-stats">
          <div className="stat">
            <Users size={18} />
            <span>{fleetSize}+ buses</span>
          </div>
          <div className="stat">
            <Clock size={18} />
            <span>{yearsExperience} years</span>
          </div>
          <div className="stat">
            <Shield size={18} />
            <span>{safetyRating}/5 safety</span>
          </div>
        </div>
      </div>

      <div className="operator-details">
        <div className="detail-section">
          <h3>Amenities</h3>
          <div className="amenities-grid">
            {amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-check">✓</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Cancellation Policy</h3>
          <div className="policy-details">
            {cancellationPolicy.map((policy, index) => (
              <div key={index} className="policy-item">
                <span className="policy-time">{policy.timeBeforeDeparture}</span>
                <span className="policy-charge">{policy.charge}% charge</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Contact Information</h3>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Phone:</strong> {contactInfo.phone}
            </div>
            <div className="contact-item">
              <strong>Email:</strong> {contactInfo.email}
            </div>
            <div className="contact-item">
              <strong>Address:</strong> {contactInfo.address}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Customer Reviews</h3>
          <div className="review-highlights">
            <div className="highlight">
              <span className="highlight-label">Service</span>
              <div className="highlight-rating">
                {renderStars(4.2)}
                <span>4.2/5</span>
              </div>
            </div>
            <div className="highlight">
              <span className="highlight-label">Punctuality</span>
              <div className="highlight-rating">
                {renderStars(4.0)}
                <span>4.0/5</span>
              </div>
            </div>
            <div className="highlight">
              <span className="highlight-label">Cleanliness</span>
              <div className="highlight-rating">
                {renderStars(4.5)}
                <span>4.5/5</span>
              </div>
            </div>
            <div className="highlight">
              <span className="highlight-label">Staff</span>
              <div className="highlight-rating">
                {renderStars(4.3)}
                <span>4.3/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusOperator;