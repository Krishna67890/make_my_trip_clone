// booking/PaymentOptions.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentOptions = ({ bookingData, setBookingData }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (field, value) => {
    setCardDetails({ ...cardDetails, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would process payment here
    const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingData({ 
      ...bookingData, 
      paymentMethod,
      cardDetails,
      bookingReference 
    });
    navigate('/confirmation');
  };

  return (
    <div className="payment-options">
      <div className="container">
        <h1>Payment</h1>
        
        <div className="payment-content">
          <div className="payment-form">
            <div className="payment-methods card">
              <h2>Select Payment Method</h2>
              <div className="method-options">
                <label className={`method-option ${paymentMethod === 'credit-card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                  />
                  <div className="method-content">
                    <span className="method-icon">💳</span>
                    <span className="method-name">Credit Card</span>
                  </div>
                </label>
                
                <label className={`method-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <div className="method-content">
                    <span className="method-icon">📱</span>
                    <span className="method-name">PayPal</span>
                  </div>
                </label>
                
                <label className={`method-option ${paymentMethod === 'bank-transfer' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={() => setPaymentMethod('bank-transfer')}
                  />
                  <div className="method-content">
                    <span className="method-icon">🏦</span>
                    <span className="method-name">Bank Transfer</span>
                  </div>
                </label>
              </div>
            </div>

            {paymentMethod === 'credit-card' && (
              <div className="card-form card">
                <h2>Credit Card Details</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardHolder">Card Holder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        maxLength="3"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="paypal-info card">
                <h2>PayPal</h2>
                <p>You will be redirected to PayPal to complete your payment securely.</p>
              </div>
            )}

            {paymentMethod === 'bank-transfer' && (
              <div className="bank-transfer-info card">
                <h2>Bank Transfer</h2>
                <p>Please use the following details for your bank transfer:</p>
                <div className="bank-details">
                  <p><strong>Account Name:</strong> TravelTours Inc.</p>
                  <p><strong>Account Number:</strong> 1234 5678 9012 3456</p>
                  <p><strong>BSB:</strong> 123-456</p>
                  <p><strong>Reference:</strong> Your booking ID</p>
                </div>
                <p className="note">Your booking will be confirmed once the payment is received.</p>
              </div>
            )}
          </div>

          <div className="payment-summary">
            <div className="summary-card card">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Tour Price</span>
                <span>${bookingData.tour?.price * (bookingData.passengers?.length || 1)}</span>
              </div>
              <div className="summary-item">
                <span>Taxes & Fees</span>
                <span>$49.96</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>${(bookingData.tour?.price * (bookingData.passengers?.length || 1)) + 49.96}</span>
              </div>
              
              <button 
                className="btn btn-primary full-width" 
                onClick={handleSubmit}
              >
                Complete Payment
              </button>
              
              <p className="security-note">
                🔒 Your payment is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;