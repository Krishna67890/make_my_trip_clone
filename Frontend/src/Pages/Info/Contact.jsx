import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hello@alexjohnson.dev',
      link: 'mailto:hello@alexjohnson.dev'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'San Francisco, CA',
      link: 'https://maps.google.com/?q=San+Francisco,CA'
    },
    {
      icon: '💼',
      title: 'Freelance',
      value: 'Available',
      status: 'available'
    }
  ];

  const socialLinks = [
    { platform: 'github', url: 'https://github.com/alexjohnson', icon: '🐱' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/alexjohnson', icon: '💼' },
    { platform: 'twitter', url: 'https://twitter.com/alexjohnson', icon: '🐦' },
    { platform: 'dribbble', url: 'https://dribbble.com/alexjohnson', icon: '🎨' }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Have a project in mind or just want to say hello? I'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="contact-info-card">
            <h2>Contact Information</h2>
            <p>Fill out the form or contact me through any of these channels:</p>
            
            <div className="contact-details">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-detail">
                  <span className="contact-icon">{item.icon}</span>
                  <div className="contact-text">
                    <h4>{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} className="contact-link">
                        {item.value}
                      </a>
                    ) : (
                      <p className={item.status}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h3>Follow Me</h3>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${social.platform}`}
                  >
                    <span className="social-emoji">{social.icon}</span>
                    <span className="social-tooltip">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="availability-status">
            <div className="status-indicator"></div>
            <span>Currently available for new projects</span>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-animation">
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                  <span className="input-highlight"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                  <span className="input-highlight"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                  <span className="input-highlight"></span>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                  <span className="input-highlight"></span>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="map-section">
        <div className="map-placeholder">
          <div className="map-pin">
            <div className="pin"></div>
            <div className="pulse"></div>
          </div>
          <h3>Based in San Francisco, CA</h3>
          <p>Working with clients worldwide</p>
        </div>
      </div>

      <div className="contact-cta">
        <h2>Ready to Start Your Project?</h2>
        <p>Let's discuss how we can work together to bring your ideas to life</p>
        <div className="cta-buttons">
          <a href="mailto:hello@alexjohnson.dev" className="cta-btn primary">
            Send me an email
          </a>
          <a href="https://calendly.com/alexjohnson" target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
            Schedule a call
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;