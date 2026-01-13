import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import '../../Styles/Pages/Home/Testimonials.css';

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
      rating: 5,
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
    }
  ];

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Safe access to current testimonial with validation
  const currentTestimonial = (testimonials && testimonials.length > 0) 
    ? (testimonials[activeIndex] || testimonials[0]) 
    : null;

  if (!currentTestimonial) {
    return null; // Don't render if no data
  }

  return (
    <section className="testimonials-modern">
      {/* Abstract Background Decor */}
      <div className="decor-circle circle-1"></div>
      <div className="decor-circle circle-2"></div>
      
      <div className="container">
        <div className="testimonials-header-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle-tag">Testimonials</span>
            <h2 className="section-title">Shared <span className="text-gradient">Experiences</span></h2>
            <p className="section-subtitle">Read why thousands of travelers trust us with their dream vacations.</p>
          </motion.div>
        </div>

        <div className="testimonials-main-wrapper">
          <button className="nav-arrow prev" onClick={handlePrev}><ChevronLeft /></button>
          <button className="nav-arrow next" onClick={handleNext}><ChevronRight /></button>

          <div className="testimonial-display">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.4 }}
                className="testimonial-card-premium"
              >
                <div className="quote-icon-box">
                  <MessageSquareQuote size={40} className="quote-icon" />
                </div>
                
                <div className="rating-row">
                  {currentTestimonial.rating && [...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--accent)" color="var(--accent)" />
                  ))}
                </div>

                <p className="testimonial-quote">
                  "{currentTestimonial.text}"
                </p>

                <div className="testimonial-user-box">
                  <div className="user-avatar-wrapper">
                    <img src={currentTestimonial.image} alt={currentTestimonial.name} />
                  </div>
                  <div className="user-info">
                    <h4 className="user-name">{currentTestimonial.name}</h4>
                    <p className="user-meta">{currentTestimonial.location} • {currentTestimonial.tour}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;