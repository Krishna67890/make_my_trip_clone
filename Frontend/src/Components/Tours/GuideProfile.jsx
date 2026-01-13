// tours/GuideProfile.jsx
import React from 'react';

const GuideProfile = ({ guide }) => {
  return (
    <div className="guide-profile">
      <h2>Your Tour Guide</h2>
      <div className="guide-card card">
        <div className="guide-header">
          <div className="guide-image">
            <img src={guide.image} alt={guide.name} />
          </div>
          <div className="guide-info">
            <h3>{guide.name}</h3>
            <div className="guide-rating">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(guide.rating) ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <span className="rating-value">{guide.rating}</span>
              <span className="review-count">({guide.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="guide-details">
          <h4>About Me</h4>
          <p>{guide.bio}</p>
          
          <div className="languages">
            <h4>Languages</h4>
            <div className="language-tags">
              {guide.languages.map((language, index) => (
                <span key={index} className="language-tag">{language}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;