import React, { useState } from 'react';
import { User, CreditCard, Shield, CheckCircle } from 'lucide-react';
import './FlightBooking.css';

const FlightBooking = ({ flight }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState([{
    type: 'adult',
    title: 'Mr',
    firstName: '',
    lastName: '',
    age: '',
    gender: 'male',
    passport: ''
  }]);

  const steps = [
    { number: 1, title: 'Passenger Details', icon: User },
    { number: 2, title: 'Seat Selection', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const addPassenger = () => {
    setPassengers([...passengers, {
      type: 'adult',
      title: 'Mr',
      firstName: '',
      lastName: '',
      age: '',
      gender: 'male',
      passport: ''
    }]);
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  return (
    <div className="flight-booking">
      {/* Booking Steps */}
      <div className="booking-steps">
        {steps.map(step => {
          const Icon = step.icon;
          return (
            <div key={step.number} className={`step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              <div className="step-icon">
                <Icon size={20} />
              </div>
              <span className="step-title">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Flight Summary */}
      <div className="booking-summary">
        <h3>Flight Summary</h3>
        <div className="summary-card">
          <div className="airline">{flight.airline} {flight.flightNo}</div>
          <div className="route">
            {flight.from} → {flight.to}
          </div>
          <div className="timing">
            {new Date(flight.departure).toLocaleDateString()} | {new Date(flight.departure).toLocaleTimeString()}
          </div>
          <div className="price">₹{flight.price.toLocaleString()}</div>
        </div>
      </div>

      {/* Passenger Details Form */}
      {currentStep === 1 && (
        <div className="passenger-details">
          <h3>Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-form">
              <h4>Passenger {index + 1}</h4>
              <div className="form-grid">
                <select 
                  value={passenger.title} 
                  onChange={(e) => updatePassenger(index, 'title', e.target.value)}
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                </select>

                <input
                  type="text"
                  placeholder="First Name"
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                />

                <select 
                  value={passenger.gender} 
                  onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="text"
                  placeholder="Passport Number"
                  value={passenger.passport}
                  onChange={(e) => updatePassenger(index, 'passport', e.target.value)}
                />
              </div>
            </div>
          ))}

          <button className="add-passenger" onClick={addPassenger}>
            + Add Passenger
          </button>

          <button className="next-btn" onClick={() => setCurrentStep(2)}>
            Continue to Seat Selection
          </button>
        </div>
      )}

      {/* Payment & Confirmation would go here */}

      {/* Security Badge */}
      <div className="security-badge">
        <Shield size={20} />
        <span>Secure Payment | SSL Encrypted</span>
      </div>
    </div>
  );
};

export default FlightBooking;