// HotelFilters.jsx
import React from 'react';
import { amenities, hotelChains } from '../../data/constants/amenities';
import './HotelFilters.css';

const HotelFilters = ({ filters, onFiltersChange }) => {
  const handlePriceChange = (min, max) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({ ...filters, rating });
  };

  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    onFiltersChange({ ...filters, amenities: updatedAmenities });
  };

  const priceRanges = [
    { label: '₹0 - ₹2000', min: 0, max: 2000 },
    { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
    { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
    { label: '₹10000+', min: 10000, max: 50000 }
  ];

  return (
    <div className="hotel-filters">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4>Price Per Night</h4>
        <div className="price-filters">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className={`price-filter-btn ${
                filters.priceRange[0] === range.min && filters.priceRange[1] === range.max ? 'active' : ''
              }`}
              onClick={() => handlePriceChange(range.min, range.max)}
            >
              {range.label}
            </button>
          ))}
        </div>
        <div className="price-slider">
          <span>₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="filter-section">
        <h4>Star Rating</h4>
        <div className="rating-filters">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="rating-filter">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <span className="rating-stars">
                {Array(rating).fill().map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
                <span className="rating-text">& Up</span>
              </span>
            </label>
          ))}
          <label className="rating-filter">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === 0}
              onChange={() => handleRatingChange(0)}
            />
            <span>Any Rating</span>
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h4>Amenities</h4>
        <div className="amenities-filters">
          {amenities.slice(0, 10).map(amenity => (
            <label key={amenity} className="amenity-filter">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Hotel Chains</h4>
        <div className="chain-filters">
          {hotelChains.map(chain => (
            <label key={chain} className="chain-filter">
              <input
                type="checkbox"
                checked={filters.hotelChains.includes(chain)}
                onChange={() => {
                  const updatedChains = filters.hotelChains.includes(chain)
                    ? filters.hotelChains.filter(c => c !== chain)
                    : [...filters.hotelChains, chain];
                  onFiltersChange({ ...filters, hotelChains: updatedChains });
                }}
              />
              <span>{chain}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;