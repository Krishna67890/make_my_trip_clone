import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Menu, X, User, Bell, Heart, Search, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Flights', path: '/', icon: <Plane size={18} /> },
    { name: 'Hotels', path: '/hotels', icon: null },
    { name: 'Trains', path: '/trains', icon: null },
    { name: 'Buses', path: '/buses', icon: null },
    { name: 'Tours', path: '/tours', icon: null },
  ];

  return (
    <header className={`main-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-wrapper">
        {/* Logo Section */}
        <Link to="/" className="logo-wrapper">
          <div className="logo-icon-bg">
            <Plane size={24} className="logo-icon-main" />
          </div>
          <span className="logo-text-main">Travel<span className="text-gradient">Ease</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav-main">
          <ul className="nav-list-main">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`nav-link-main ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div layoutId="nav-underline" className="nav-underline" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Right Actions */}
        <div className="header-right">
          <div className="header-tools hide-mobile">
            <button className="tool-btn">
              <Globe size={18} />
              <span>EN</span>
              <ChevronDown size={14} />
            </button>
            <div className="tool-divider"></div>
          </div>

          <div className="action-icons">
            <button className="icon-btn-main">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <button className="icon-btn-main hide-mobile">
              <Heart size={20} />
            </button>
          </div>

          <button className="profile-trigger">
            <div className="avatar-mini">
              <User size={18} />
            </div>
            <span className="hide-mobile">Login</span>
          </button>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu-overlay"
          >
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="mobile-nav-divider"></li>
              <li>
                <Link to="/login" className="mobile-nav-link profile-link" onClick={() => setIsMenuOpen(false)}>
                  <User size={20} /> My Account
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;