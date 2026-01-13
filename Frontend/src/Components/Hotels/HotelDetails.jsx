// HotelDetails.jsx
import React, { useState } from 'react';
import { Star, MapPin, Heart, Share, Navigation, Wifi, Car, Utensils } from 'lucide-react';
import RoomSelection from './RoomSelection';
import Amenities from './Amenities';
import './HotelDetails.css';

const HotelDetails = ({ hotel }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    name,
    location,
    rating,
    price,
    images,
    amenities,
    reviewCount,
    description,
    policies
  } = hotel;

  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="hotel-details">
      <div className="hotel-header">
        <div className="hotel-title">
          <h1>{name}</h1>
          <div className="hotel-location">
            <MapPin size={16} />
            <span>{location}</span>
            <button className="view-map-btn">
              <Navigation size={14} />
              View on Map
            </button>
          </div>
        </div>
        
        <div className="hotel-actions">
          <button className="action-btn">
            <Share size={18} />
            Share
          </button>
          <button className="action-btn">
            <Heart size={18} />
            Save
          </button>
        </div>
      </div>

      <div className="hotel-gallery">
        <div className="main-image">
          <img src={images[selectedImage]} alt={name} />
        </div>
        <div className="thumbnail-grid">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${name} ${index + 1}`} />
            </div>
          ))}
          {images.length > 4 && (
            <div className="thumbnail more-images">
              +{images.length - 4} more
            </div>
          )}
        </div>
      </div>

      <div className="hotel-content">
        <div className="content-main">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'rooms' ? 'active' : ''}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
            <button 
              className={`tab ${activeTab === 'amenities' ? 'active' : ''}`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
            <button 
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviewCount})
            </button>
            <button 
              className={`tab ${activeTab === 'policies' ? 'active' : ''}`}
              onClick={() => setActiveTab('policies')}
            >
              Policies
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview">
                <div className="rating-section">
                  <div className="rating-badge large">
                    <span>{rating}</span>
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div className="rating-details">
                    <h3>Excellent</h3>
                    <p>Based on {reviewCount} reviews</p>
                  </div>
                </div>
                <p className="description">{description}</p>
                <Amenities amenities={amenities} />
              </div>
            )}
            
            {activeTab === 'rooms' && (
              <RoomSelection hotel={hotel} />
            )}
            
            {activeTab === 'amenities' && (
              <Amenities amenities={amenities} detailed />
            )}
            
            {activeTab === 'reviews' && (
              <div className="reviews-section">
                <h3>Guest Reviews</h3>
                {/* Reviews content would go here */}
              </div>
            )}
            
            {activeTab === 'policies' && (
              <div className="policies-section">
                <h3>Hotel Policies</h3>
                <div dangerouslySetInnerHTML={{ __html: policies }} />
              </div>
            )}
          </div>
        </div>

        <div className="content-sidebar">
          <div className="price-widget">
            <h3>Price Summary</h3>
            <div className="price-details">
              <div className="price-item">
                <span>₹{price.toLocaleString()} x 1 night</span>
                <span>₹{price.toLocaleString()}</span>
              </div>
              <div className="price-item">
                <span>Taxes & Fees</span>
                <span>₹{(price * 0.18).toLocaleString()}</span>
              </div>
              <div className="price-total">
                <span>Total</span>
                <span>₹{(price * 1.18).toLocaleString()}</span>
              </div>
            </div>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;