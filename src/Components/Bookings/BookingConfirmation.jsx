// booking/BookingConfirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfirmation = ({ bookingData }) => {
  return (
    <div className="booking-confirmation">
      <div className="container">
        <div className="confirmation-card card">
          <div className="confirmation-header">
            <div className="success-icon">✅</div>
            <h1>Booking Confirmed!</h1>
            <p>Thank you for your booking. Your tour has been confirmed.</p>
          </div>
          
          <div className="confirmation-details">
            <h2>Booking Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Booking Reference:</span>
                <span className="value">{bookingData.bookingReference}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Tour:</span>
                <span className="value">{bookingData.tour?.title}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">September 15, 2023</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Travelers:</span>
                <span className="value">{bookingData.passengers?.length}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Total Amount:</span>
                <span className="value">${(bookingData.tour?.price * (bookingData.passengers?.length || 1)) + 49.96}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Payment Method:</span>
                <span className="value">{bookingData.paymentMethod}</span>
              </div>
            </div>
          </div>
          
          <div className="next-steps">
            <h2>What's Next?</h2>
            <ol>
              <li>You will receive a confirmation email with all the details</li>
              <li>Our guide will contact you 7 days before the tour</li>
              <li>Please arrive at the meeting point 15 minutes before departure</li>
              <li>Don't forget to bring your ID and any necessary equipment</li>
            </ol>
          </div>
          
          <div className="confirmation-actions">
            <Link to={`/ticket/${bookingData.bookingReference}`} className="btn btn-primary">
              View Your Ticket
            </Link>
            <button className="btn btn-secondary">
              Download Invoice
            </button>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;