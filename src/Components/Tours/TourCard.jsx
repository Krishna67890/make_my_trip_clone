// tours/TourCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card card">
      <div className="tour-image">
        <img src={tour.image} alt={tour.title} />
        <div className="tour-badge">{tour.category}</div>
        <button className="wishlist-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
      </div>
      <div className="tour-content">
        <div className="tour-meta">
          <span>{tour.duration}</span>
          <span>{tour.groupSize}</span>
          <span>{tour.difficulty}</span>
        </div>
        <h3 className="tour-title">{tour.title}</h3>
        <p className="tour-description">{tour.description}</p>
        <div className="tour-footer">
          <div className="tour-price">
            <span className="price">${tour.price}</span>
            <span className="per-person">per person</span>
          </div>
          <div className="tour-rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < tour.rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
            <span className="review-count">({tour.reviews})</span>
          </div>
        </div>
        <Link to={`/tour/${tour.id}`} className="btn btn-primary full-width">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;