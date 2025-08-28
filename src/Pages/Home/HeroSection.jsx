// pages/Home/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1>Discover the World's Wonders</h1>
              <p>Embark on unforgettable journeys with expert guides and curated experiences</p>
              <div className="hero-search">
                <div className="search-tabs">
                  <button className="tab active">Tours</button>
                  <button className="tab">Destinations</button>
                  <button className="tab">Activities</button>
                </div>
                <div className="search-form">
                  <div className="search-field">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Where would you like to go?" />
                  </div>
                  <div className="search-field">
                    <span className="calendar-icon">📅</span>
                    <input type="text" placeholder="Select dates" />
                  </div>
                  <div className="search-field">
                    <span className="person-icon">👥</span>
                    <input type="text" placeholder="Travelers" />
                  </div>
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Happy Travelers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Destinations</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                      <span className="stat-label">Expert Guides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;