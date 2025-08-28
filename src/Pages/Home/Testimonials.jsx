// pages/Home/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The Italian tour was absolutely incredible! Our guide was knowledgeable and the accommodations were top-notch. I'll definitely be booking with Wanderlust again.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      tour: "Italian Dream Tour"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "The Japanese cultural experience exceeded all expectations. The attention to detail and personalized service made this trip unforgettable.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      tour: "Japanese Cultural Journey"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "London, UK",
      rating: 4,
      text: "The safari adventure was a once-in-a-lifetime experience. Seeing the wildlife up close was breathtaking. The guides were professional and safety-conscious.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      tour: "African Safari Adventure"
    },
    {
      id: 4,
      name: "James Wilson",
      location: "Sydney, Australia",
      rating: 5,
      text: "The Southeast Asia tour was perfectly paced with the right mix of culture, adventure, and relaxation. The local experiences were authentic and memorable.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      tour: "Southeast Asia Explorer"
    },
    {
      id: 5,
      name: "Lisa Taylor",
      location: "Vancouver, Canada",
      rating: 5,
      text: "The Scandinavian tour was magical, especially seeing the Northern Lights. The accommodations were cozy and the food was exceptional throughout the journey.",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      tour: "Scandinavian Wonders"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2>What Our Travelers Say</h2>
          <p>Authentic experiences from people who explored the world with us</p>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonials-carousel">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial-card ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'prev' : ''} ${index > activeIndex ? 'next' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < testimonial.rating ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                    <div className="author-details">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-location">{testimonial.location}</p>
                      <p className="tour-name">{testimonial.tour}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonials-controls">
            <button className="control-btn prev-btn" onClick={handlePrev}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></button>
              ))}
            </div>
            
            <button className="control-btn next-btn" onClick={handleNext}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;