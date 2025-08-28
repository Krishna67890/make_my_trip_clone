import React from 'react';
import { Plane, Hotel, Train, Bus, Shield, Headphones, Award } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Products',
      links: [
        'Flights', 'Hotels', 'Trains', 'Buses', 
        'Tours', 'Holidays', 'Cabs', 'Villas'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us', 'Careers', 'Press', 'Blog',
        'Investor Relations', 'Advertise with Us'
      ]
    },
    {
      title: 'Support',
      links: [
        'Help Center', 'Contact Us', 'COVID-19 Advisory',
        'Cancellation Policy', 'Privacy Policy', 'Terms of Use'
      ]
    },
    {
      title: 'Top Destinations',
      links: [
        'Goa', 'Manali', 'Shimla', 'Darjeeling',
        'Kerala', 'Rajasthan', 'Varanasi', 'Andaman'
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Plane size={32} />
              <span>TravelHub</span>
            </div>
            <p className="footer-description">
              India's leading travel platform for flights, hotels, trains, and buses. 
              Book with confidence and travel with joy.
            </p>
            <div className="footer-features">
              <div className="feature">
                <Shield size={20} />
                <span>Secure Payments</span>
              </div>
              <div className="feature">
                <Headphones size={20} />
                <span>24/7 Support</span>
              </div>
              <div className="feature">
                <Award size={20} />
                <span>Best Prices</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 TravelHub. All rights reserved.</p>
          <div className="footer-social">
            <span>Follow us:</span>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;