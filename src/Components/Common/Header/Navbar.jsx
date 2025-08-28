import React, { useState } from 'react';
import { Menu, X, Plane, Hotel, Train, Bus, Map, User, Heart, Bell } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('flights');

  const navItems = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'tours', label: 'Tours', icon: Map }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <img src="/logo.png" alt="TravelHub" className="navbar-logo" />
          <span className="navbar-title">TravelHub</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <div className="nav-tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="action-btn">
            <Heart size={20} />
          </button>
          <button className="action-btn">
            <Bell size={20} />
          </button>
          <button className="action-btn user-btn">
            <User size={20} />
            <span>Login</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="navbar-mobile">
          <div className="mobile-nav-tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`mobile-nav-tab ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;