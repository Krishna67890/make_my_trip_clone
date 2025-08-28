import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import './RatingFilter.css';

const RatingFilter = ({ selectedRating, onRatingChange }) => {
  const ratings = [
    { value: 4, label: '4+ Stars', count: 1245 },
    { value: 3, label: '3+ Stars', count: 876 },
    { value: 2, label: '2+ Stars', count: 543 },
    { value: 1, label: '1+ Star', count: 321 }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key={fullStars} size={16} fill="currentColor" />);
    }

    return stars;
  };

  return (
    <div className="rating-filter">
      <h4>Guest Rating</h4>
      
      {ratings.map((rating) => (
        <label key={rating.value} className="rating-option">
          <input
            type="checkbox"
            checked={selectedRating === rating.value}
            onChange={() => onRatingChange(
              selectedRating === rating.value ? null : rating.value
            )}
          />
          <div className="rating-stars">
            {renderStars(rating.value)}
          </div>
          <span className="rating-label">{rating.label}</span>
          <span className="rating-count">({rating.count})</span>
        </label>
      ))}
    </div>
  );
};

export default RatingFilter;