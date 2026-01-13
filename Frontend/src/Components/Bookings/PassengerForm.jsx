// booking/PassengerForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PassengerForm = ({ bookingData, setBookingData }) => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([
    { 
      firstName: '', 
      lastName: '', 
      email: '', 
      phone: '', 
      dateOfBirth: '', 
      gender: '', 
      specialRequirements: '' 
    }
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { 
      firstName: '', 
      lastName: '', 
      email: '', 
      phone: '', 
      dateOfBirth: '', 
      gender: '', 
      specialRequirements: '' 
    }]);
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData({ ...bookingData, passengers });
    navigate('/payment');
  };

  return (
    <div className="passenger-form">
      <div className="container">
        <h1>Passenger Details</h1>
        
        <form onSubmit={handleSubmit}>
          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-card card">
              <div className="passenger-header">
                <h2>Passenger {index + 1}</h2>
                {passengers.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => removePassenger(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`firstName-${index}`}>First Name *</label>
                  <input
                    type="text"
                    id={`firstName-${index}`}
                    value={passenger.firstName}
                    onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`lastName-${index}`}>Last Name *</label>
                  <input
                    type="text"
                    id={`lastName-${index}`}
                    value={passenger.lastName}
                    onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`email-${index}`}>Email *</label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    value={passenger.email}
                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`phone-${index}`}>Phone Number *</label>
                  <input
                    type="tel"
                    id={`phone-${index}`}
                    value={passenger.phone}
                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`dob-${index}`}>Date of Birth *</label>
                  <input
                    type="date"
                    id={`dob-${index}`}
                    value={passenger.dateOfBirth}
                    onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`gender-${index}`}>Gender</label>
                  <select
                    id={`gender-${index}`}
                    value={passenger.gender}
                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor={`requirements-${index}`}>Special Requirements</label>
                <textarea
                  id={`requirements-${index}`}
                  value={passenger.specialRequirements}
                  onChange={(e) => handleInputChange(index, 'specialRequirements', e.target.value)}
                  rows="3"
                  placeholder="Dietary restrictions, mobility needs, allergies, etc."
                />
              </div>
            </div>
          ))}
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={addPassenger}>
              Add Another Passenger
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassengerForm;