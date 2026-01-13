import React from 'react';
import { Plane } from 'lucide-react';
import './Layout.css';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-header">
            <div className="auth-logo">
              <Plane size={32} />
              <span>TravelHub</span>
            </div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          
          <div className="auth-content">
            {children}
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-hero">
            <img 
              src="/auth-hero.jpg" 
              alt="Travel" 
              className="auth-hero-image"
            />
            <div className="auth-hero-content">
              <h2>Explore India Like Never Before</h2>
              <p>Book flights, hotels, trains, and buses with best prices guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;