import React, { useState } from 'react';
import './TourBooking.css';

const TourBooking = () => {
  const [bookingData, setBookingData] = useState({
    tourPackage: '',
    date: '',
    numberOfPeople: 1,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tourPackages = [
    { id: 'mountain-adventure', name: 'Mountain Adventure', price: 199 },
    { id: 'beach-paradise', name: 'Beach Paradise', price: 299 },
    { id: 'city-explorer', name: 'City Explorer', price: 149 },
    { id: 'wildlife-safari', name: 'Wildlife Safari', price: 399 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Booking submitted:', bookingData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setBookingData({
        tourPackage: '',
        date: '',
        numberOfPeople: 1,
        fullName: '',
        email: '',
        phone: '',
        specialRequests: ''
      });
    }, 3000);
  };

  const selectedPackage = tourPackages.find(pkg => pkg.id === bookingData.tourPackage);
  const totalPrice = selectedPackage ? selectedPackage.price * bookingData.numberOfPeople : 0;

  return (
    <div className="tour-booking-container">
      <div className="booking-header">
        <h1>Book Your Tour</h1>
        <p>Fill out the form below to reserve your adventure</p>
      </div>

      <div className="booking-content">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <h3>Tour Details</h3>
            
            <div className="form-group">
              <label htmlFor="tourPackage">Select Tour Package *</label>
              <select
                id="tourPackage"
                name="tourPackage"
                value={bookingData.tourPackage}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a package</option>
                {tourPackages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ${pkg.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Tour Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numberOfPeople">Number of People *</label>
                <input
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  value={bookingData.numberOfPeople}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={bookingData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={bookingData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any special requirements or preferences..."
              />
            </div>
          </div>

          {selectedPackage && (
            <div className="price-summary">
              <h4>Price Summary</h4>
              <div className="price-details">
                <span>{selectedPackage.name} x {bookingData.numberOfPeople}</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Book Now'}
          </button>

          {submitSuccess && (
            <div className="success-message">
              ✅ Booking successful! We'll contact you shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TourBooking;