import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-modern">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-area">
            <div className="footer-logo">
              <div className="logo-icon-bg">
                <Plane size={24} />
              </div>
              <span className="logo-text">Travel<span className="text-gradient">Ease</span></span>
            </div>
            <p className="footer-desc">
              Making your travel dreams come true with seamless bookings and unforgettable experiences since 2010.
            </p>
            <div className="social-links">
              <a href="#" className="social-pill"><Facebook size={18} /></a>
              <a href="#" className="social-pill"><Twitter size={18} /></a>
              <a href="#" className="social-pill"><Instagram size={18} /></a>
              <a href="#" className="social-pill"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="links-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/blog">Travel Blog</a></li>
                <li><a href="/press">Press Center</a></li>
              </ul>
            </div>
            <div className="links-col">
              <h4>Support</h4>
              <ul>
                <li><a href="/faq">FAQs</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
            <div className="links-col newsletter-col">
              <h4>Newsletter</h4>
              <p>Subscribe to get special offers and travel inspiration.</p>
              <div className="newsletter-box">
                <input type="email" placeholder="Your email address" />
                <button className="btn-subscribe">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 TravelEase. All rights reserved. Designed for Incredible India.</p>
          <div className="payment-icons">
            <span className="payment-tag">Secure Payments:</span>
            <div className="visa-card">VISA</div>
            <div className="master-card">MasterCard</div>
            <div className="upi-card">UPI</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;