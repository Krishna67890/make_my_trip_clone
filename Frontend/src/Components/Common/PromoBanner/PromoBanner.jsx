import React, { useState, useEffect } from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(10); // Countdown timer for promo

  // Slides data
  const slides = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% OFF",
      description: "Enjoy massive discounts on our premium collection",
      buttonText: "Shop Now",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "New Collection",
      subtitle: "Just Released",
      description: "Discover our latest products with exclusive launch prices",
      buttonText: "Explore",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Free Shipping",
      subtitle: "On Orders Over $50",
      description: "Limited time offer - free worldwide shipping",
      buttonText: "Learn More",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="promo-banner">
      <div className="promo-close" onClick={closeBanner}>×</div>
      
      <div className="promo-container">
        <div className="promo-content">
          <div className="promo-text">
            <h2>{slides[currentSlide].title}</h2>
            <h3>{slides[currentSlide].subtitle}</h3>
            <p>{slides[currentSlide].description}</p>
            <button className="promo-btn">{slides[currentSlide].buttonText}</button>
            
            <div className="countdown-timer">
              <span>Offer ends in: </span>
              <span className="countdown">{countdown}</span>
              <span> seconds</span>
            </div>
          </div>
          
          <div className="promo-image">
            <div 
              className="image-container"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            ></div>
          </div>
        </div>
        
        <div className="promo-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;