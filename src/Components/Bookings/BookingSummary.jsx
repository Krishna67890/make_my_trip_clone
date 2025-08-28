// booking/BookingSummary.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({ bookingData, setBookingData }) => {
  const navigate = useNavigate();
  
  // Sample tour data
  const tour = {
    id: 1,
    title: "Majestic Swiss Alps Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2023-09-15",
    duration: "7 days",
    price: 1299,
    travelers: 2
  };

  const handleContinue = () => {
    setBookingData({ ...bookingData, tour });
    navigate('/passenger-details');
  };

  return (
    <div className="booking-summary">
      <div className="container">
        <h1>Booking Summary</h1>
        
        <div className="booking-content">
          <div className="booking-details">
            <div className="tour-card card">
              <div className="tour-image">
                <img src={tour.image} alt={tour.title} />
              </div>
              <div className="tour-info">
                <h2>{tour.title}</h2>
                <div className="tour-meta">
                  <span><strong>Date:</strong> {tour.date}</span>
                  <span><strong>Duration:</strong> {tour.duration}</span>
                  <span><strong>Travelers:</strong> {tour.travelers}</span>
                </div>
              </div>
            </div>

            <div className="price-details card">
              <h3>Price Details</h3>
              <div className="price-item">
                <span>Tour Price (x{tour.travelers})</span>
                <span>${tour.price * tour.travelers}</span>
              </div>
              <div className="price-item">
                <span>Taxes & Fees</span>
                <span>$49.96</span>
              </div>
              <div className="price-item total">
                <span>Total</span>
                <span>${(tour.price * tour.travelers) + 49.96}</span>
              </div>
            </div>

            <div className="cancellation-policy card">
              <h3>Cancellation Policy</h3>
              <p>Free cancellation up to 30 days before the tour. 50% refund between 30-15 days before. No refund within 15 days of the tour.</p>
            </div>
          </div>

          <div className="booking-actions">
            <div className="action-card card">
              <h3>Next Steps</h3>
              <p>Continue to provide passenger details and complete your booking.</p>
              <button className="btn btn-primary full-width" onClick={handleContinue}>
                Continue to Passenger Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;