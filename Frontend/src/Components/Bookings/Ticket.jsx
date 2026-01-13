// booking/Ticket.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const { id } = useParams();
  
  // Sample ticket data
  const ticket = {
    bookingReference: id,
    tour: "Majestic Swiss Alps Adventure",
    date: "September 15, 2023",
    time: "08:30 AM",
    meetingPoint: "Zurich Central Station, Main Entrance",
    guide: "Michael Schneider",
    guidePhone: "+41 79 123 45 67",
    passengers: [
      { name: "John Doe" },
      { name: "Jane Doe" }
    ],
    total: 2647.96,
    includes: ["Accommodation", "Professional guide", "Meals as indicated", "Transportation", "Entrance fees"],
    terms: "Please arrive 15 minutes before departure. Bring comfortable walking shoes, weather-appropriate clothing, and a water bottle."
  };

  return (
    <div className="ticket">
      <div className="container">
        <div className="ticket-card">
          <div className="ticket-header">
            <h1>Your E-Ticket</h1>
            <div className="booking-reference">Booking #: {ticket.bookingReference}</div>
          </div>
          
          <div className="ticket-body">
            <div className="ticket-section">
              <h2>Tour Details</h2>
              <div className="detail-row">
                <span className="label">Tour:</span>
                <span className="value">{ticket.tour}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">{ticket.date}</span>
              </div>
              <div className="detail-row">
                <span className="label">Time:</span>
                <span className="value">{ticket.time}</span>
              </div>
              <div className="detail-row">
                <span className="label">Meeting Point:</span>
                <span className="value">{ticket.meetingPoint}</span>
              </div>
            </div>
            
            <div className="ticket-section">
              <h2>Guide Information</h2>
              <div className="detail-row">
                <span className="label">Guide:</span>
                <span className="value">{ticket.guide}</span>
              </div>
              <div className="detail-row">
                <span className="label">Contact:</span>
                <span className="value">{ticket.guidePhone}</span>
              </div>
            </div>
            
            <div className="ticket-section">
              <h2>Passengers</h2>
              {ticket.passengers.map((passenger, index) => (
                <div key={index} className="detail-row">
                  <span className="label">Passenger {index + 1}:</span>
                  <span className="value">{passenger.name}</span>
                </div>
              ))}
            </div>
            
            <div className="ticket-section">
              <h2>Includes</h2>
              <ul className="includes-list">
                {ticket.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="ticket-section">
              <h2>Important Information</h2>
              <p>{ticket.terms}</p>
            </div>
            
            <div className="ticket-footer">
              <div className="qr-code">
                {/* In a real app, this would be a generated QR code */}
                <div className="qr-placeholder">
                  <span>QR Code</span>
                </div>
              </div>
              <div className="total-amount">
                Total: ${ticket.total}
              </div>
            </div>
          </div>
        </div>
        
        <div className="ticket-actions">
          <button className="btn btn-primary" onClick={() => window.print()}>
            Print Ticket
          </button>
          <button className="btn btn-secondary">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;