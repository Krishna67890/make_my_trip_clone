import React, { useState } from 'react';
import './QuickBook.css';

const QuickBook = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    travelers: 1,
    class: 'economy'
  });

  const popularIndianCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for ${activeTab} from ${formData.from} to ${formData.to}`);
    // Here you would typically handle the form submission
  };

  const swapCities = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from
    });
  };

  return (
    <div className="quickbook-container">
      <div className="quickbook-header">
        <h2>QuickBook India</h2>
        <p>Plan your journey across incredible India with ease</p>
      </div>

      <div className="booking-tabs">
        <button 
          className={activeTab === 'flights' ? 'tab-active' : ''}
          onClick={() => setActiveTab('flights')}
        >
          ✈️ Flights
        </button>
        <button 
          className={activeTab === 'trains' ? 'tab-active' : ''}
          onClick={() => setActiveTab('trains')}
        >
          🚆 Trains
        </button>
        <button 
          className={activeTab === 'hotels' ? 'tab-active' : ''}
          onClick={() => setActiveTab('hotels')}
        >
          🏨 Hotels
        </button>
        <button 
          className={activeTab === 'buses' ? 'tab-active' : ''}
          onClick={() => setActiveTab('buses')}
        >
          🚌 Buses
        </button>
      </div>

      <div className="booking-form-container">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label>From</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="Departure city"
                list="indianCities"
                required
              />
            </div>

            <button type="button" className="swap-button" onClick={swapCities}>
              ⇄
            </button>

            <div className="input-group">
              <label>To</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="Destination city"
                list="indianCities"
                required
              />
            </div>

            <datalist id="indianCities">
              {popularIndianCities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Departure</label>
              <input
                type="date"
                name="departure"
                value={formData.departure}
                onChange={handleInputChange}
                required
              />
            </div>

            {activeTab === 'flights' && (
              <div className="input-group">
                <label>Return (Optional)</label>
                <input
                  type="date"
                  name="return"
                  value={formData.return}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="input-group">
              <label>
                {activeTab === 'hotels' ? 'Guests & Rooms' : 
                 activeTab === 'buses' ? 'Passengers' : 'Travelers'}
              </label>
              <select
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === 'flights' && (
              <div className="input-group">
                <label>Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="search-button">
              Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>
        </form>
      </div>

      <div className="quick-features">
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h4>Secure Booking</h4>
          <p>Your data is protected with advanced encryption</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h4>Easy Cancellation</h4>
          <p>Free cancellation on most bookings</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🏆</div>
          <h4>Best Prices</h4>
          <p>Guanteed best prices across India</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h4>TravelSafe</h4>
          <p>COVID-safe travel options available</p>
        </div>
      </div>

      <div className="popular-destinations">
        <h3>Popular Destinations in India</h3>
        <div className="destinations-grid">
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
              <span className="destination-name">Goa</span>
            </div>
            <div className="destination-info">
              <p>Beaches • Nightlife • Portuguese Heritage</p>
              <span className="price">From ₹4,999</span>
            </div>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1574879948818-1cf35d5d95d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
              <span className="destination-name">Kerala</span>
            </div>
            <div className="destination-info">
              <p>Backwaters • Tea Gardens • Ayurveda</p>
              <span className="price">From ₹5,499</span>
            </div>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1588416499018-d8c621b1b3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
              <span className="destination-name">Rajasthan</span>
            </div>
            <div className="destination-info">
              <p>Palaces • Deserts • Cultural Heritage</p>
              <span className="price">From ₹3,999</span>
            </div>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1580739824572-f54c2763b979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
              <span className="destination-name">Himachal</span>
            </div>
            <div className="destination-info">
              <p>Mountains • Adventure • Spirituality</p>
              <span className="price">From ₹6,299</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBook;