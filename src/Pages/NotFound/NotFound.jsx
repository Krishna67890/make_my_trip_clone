
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-animation">
          <div className="not-found-404">404</div>
          <div className="not-found-compass">
            <div className="compass">
              <div className="compass-circle">
                <div className="compass-needle"></div>
                <div className="compass-center"></div>
                <div className="compass-n">N</div>
                <div className="compass-e">E</div>
                <div className="compass-s">S</div>
                <div className="compass-w">W</div>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="not-found-title">Oops! Page Not Found</h1>
        
        <p className="not-found-message">
          It seems you've wandered off the beaten path. The page you're looking for 
          doesn't exist or has been moved.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn primary">
            <span className="icon">🏠</span>
            Go Home
          </Link>
          
          <Link to="/search" className="not-found-btn secondary">
            <span className="icon">✈️</span>
            Explore Destinations
          </Link>
          
          <button 
            className="not-found-btn tertiary" 
            onClick={() => window.history.back()}
          >
            <span className="icon">↩️</span>
            Go Back
          </button>
        </div>
        
        <div className="not-found-search">
          <p>Or try searching for what you need:</p>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search for flights, hotels, destinations..."
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;