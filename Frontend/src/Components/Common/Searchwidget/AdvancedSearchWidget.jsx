import React, { useState } from 'react';
import { Plane, Building, Train, Bus, Map, Calendar, Users, Settings, Search } from 'lucide-react';
import './AdvancedSearchWidget.css';

const AdvancedSearchWidget = ({ type = 'flights', onSearch }) => {
  const [activeTab, setActiveTab] = useState(type);
  const [formData, setFormData] = useState({
    // Common fields
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    cabinClass: 'economy',
    
    // Advanced options
    directOnly: false,
    flexibleDates: false,
    priceAlert: false,
    
    // Hotel specific
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    starRating: 0,
    
    // Train specific
    trainNumber: '',
    berthType: 'any',
    
    // Bus specific
    operator: '',
    boardingPoint: '',
    droppingPoint: '',
    
    // Tour specific
    duration: '',
    theme: '',
    groupSize: 'any'
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'tours', label: 'Tours', icon: Map }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ ...formData, type: activeTab });
    }
  };

  const renderFlightForm = () => (
    <div className="search-form">
      <div className="search-field">
        <label className="search-label">From</label>
        <input
          type="text"
          className="search-input"
          placeholder="City or airport"
          value={formData.from}
          onChange={(e) => handleInputChange('from', e.target.value)}
        />
      </div>
      
      <div className="search-field">
        <label className="search-label">To</label>
        <input
          type="text"
          className="search-input"
          placeholder="City or airport"
          value={formData.to}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
      </div>
      
      <div className="date-range-picker">
        <div className="search-field date-input">
          <label className="search-label">Departure</label>
          <input
            type="date"
            className="search-input flat"
            value={formData.departure}
            onChange={(e) => handleInputChange('departure', e.target.value)}
          />
        </div>
        
        <div className="search-field date-input">
          <label className="search-label">Return</label>
          <input
            type="date"
            className="search-input flat"
            value={formData.return}
            onChange={(e) => handleInputChange('return', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <label className="search-label">Passengers & Class</label>
        <div className="passenger-selector" onClick={() => {}}>
          <Users size={18} />
          <div className="passenger-info">
            <span>{formData.passengers} Guest{formData.passengers !== 1 ? 's' : ''}</span>
            <small>{formData.cabinClass}</small>
          </div>
        </div>
      </div>
      
      <button className="search-button" onClick={handleSearch}>
        <Search size={18} />
        Search Flights
      </button>
    </div>
  );

  const renderHotelForm = () => (
    <div className="search-form">
      <div className="search-field">
        <label className="search-label">Destination</label>
        <input
          type="text"
          className="search-input"
          placeholder="City, hotel, or area"
          value={formData.to}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
      </div>
      
      <div className="date-range-picker">
        <div className="search-field date-input">
          <label className="search-label">Check-in</label>
          <input
            type="date"
            className="search-input flat"
            value={formData.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
          />
        </div>
        
        <div className="search-field date-input">
          <label className="search-label">Check-out</label>
          <input
            type="date"
            className="search-input flat"
            value={formData.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <label className="search-label">Guests & Rooms</label>
        <div className="passenger-selector" onClick={() => {}}>
          <Users size={18} />
          <div className="passenger-info">
            <span>{formData.guests} Guest{formData.guests !== 1 ? 's' : ''}</span>
            <small>{formData.rooms} Room{formData.rooms !== 1 ? 's' : ''}</small>
          </div>
        </div>
      </div>
      
      <button className="search-button" onClick={handleSearch}>
        <Search size={18} />
        Search Hotels
      </button>
    </div>
  );

  const renderTrainForm = () => (
    <div className="search-form">
      <div className="search-field">
        <label className="search-label">From</label>
        <input
          type="text"
          className="search-input"
          placeholder="Station name"
          value={formData.from}
          onChange={(e) => handleInputChange('from', e.target.value)}
        />
      </div>
      
      <div className="search-field">
        <label className="search-label">To</label>
        <input
          type="text"
          className="search-input"
          placeholder="Station name"
          value={formData.to}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
      </div>
      
      <div className="search-field date-input">
        <label className="search-label">Journey Date</label>
        <input
          type="date"
          className="search-input flat"
          value={formData.departure}
          onChange={(e) => handleInputChange('departure', e.target.value)}
        />
      </div>
      
      <div className="search-field">
        <label className="search-label">Train Number</label>
        <input
          type="text"
          className="search-input"
          placeholder="Optional"
          value={formData.trainNumber}
          onChange={(e) => handleInputChange('trainNumber', e.target.value)}
        />
      </div>
      
      <button className="search-button" onClick={handleSearch}>
        <Search size={18} />
        Search Trains
      </button>
    </div>
  );

  const renderBusForm = () => (
    <div className="search-form">
      <div className="search-field">
        <label className="search-label">From</label>
        <input
          type="text"
          className="search-input"
          placeholder="Boarding point"
          value={formData.from}
          onChange={(e) => handleInputChange('from', e.target.value)}
        />
      </div>
      
      <div className="search-field">
        <label className="search-label">To</label>
        <input
          type="text"
          className="search-input"
          placeholder="Dropping point"
          value={formData.to}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
      </div>
      
      <div className="search-field date-input">
        <label className="search-label">Journey Date</label>
        <input
          type="date"
          className="search-input flat"
          value={formData.departure}
          onChange={(e) => handleInputChange('departure', e.target.value)}
        />
      </div>
      
      <div className="search-field">
        <label className="search-label">Bus Operator</label>
        <input
          type="text"
          className="search-input"
          placeholder="Optional"
          value={formData.operator}
          onChange={(e) => handleInputChange('operator', e.target.value)}
        />
      </div>
      
      <button className="search-button" onClick={handleSearch}>
        <Search size={18} />
        Search Buses
      </button>
    </div>
  );

  const renderTourForm = () => (
    <div className="search-form">
      <div className="search-field">
        <label className="search-label">Destination</label>
        <input
          type="text"
          className="search-input"
          placeholder="Where do you want to go?"
          value={formData.to}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
      </div>
      
      <div className="search-field">
        <label className="search-label">Duration</label>
        <select
          className="search-input"
          value={formData.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
        >
          <option value="">Any duration</option>
          <option value="1-3">1-3 days</option>
          <option value="4-7">4-7 days</option>
          <option value="8-14">8-14 days</option>
          <option value="15+">15+ days</option>
        </select>
      </div>
      
      <div className="search-field">
        <label className="search-label">Theme</label>
        <select
          className="search-input"
          value={formData.theme}
          onChange={(e) => handleInputChange('theme', e.target.value)}
        >
          <option value="">Any theme</option>
          <option value="adventure">Adventure</option>
          <option value="cultural">Cultural</option>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="heritage">Heritage</option>
        </select>
      </div>
      
      <div className="search-field">
        <label className="search-label">Group Size</label>
        <select
          className="search-input"
          value={formData.groupSize}
          onChange={(e) => handleInputChange('groupSize', e.target.value)}
        >
          <option value="any">Any size</option>
          <option value="small">Small (2-4)</option>
          <option value="medium">Medium (5-8)</option>
          <option value="large">Large (9+)</option>
        </select>
      </div>
      
      <button className="search-button" onClick={handleSearch}>
        <Search size={18} />
        Search Tours
      </button>
    </div>
  );

  const renderAdvancedOptions = () => (
    <div className="advanced-options-panel">
      <div className="option-group">
        <h4 className="option-title">Preferences</h4>
        <div className="option-grid">
          <div className="option-checkbox">
            <input
              type="checkbox"
              id="directOnly"
              checked={formData.directOnly}
              onChange={(e) => handleInputChange('directOnly', e.target.checked)}
            />
            <label htmlFor="directOnly">Direct only</label>
          </div>
          <div className="option-checkbox">
            <input
              type="checkbox"
              id="flexibleDates"
              checked={formData.flexibleDates}
              onChange={(e) => handleInputChange('flexibleDates', e.target.checked)}
            />
            <label htmlFor="flexibleDates">Flexible dates</label>
          </div>
          <div className="option-checkbox">
            <input
              type="checkbox"
              id="priceAlert"
              checked={formData.priceAlert}
              onChange={(e) => handleInputChange('priceAlert', e.target.checked)}
            />
            <label htmlFor="priceAlert">Price alerts</label>
          </div>
        </div>
      </div>
      
      {activeTab === 'hotels' && (
        <div className="option-group">
          <h4 className="option-title">Star Rating</h4>
          <div className="option-grid">
            {[0, 1, 2, 3, 4, 5].map(rating => (
              <div key={rating} className="option-checkbox">
                <input
                  type="radio"
                  id={`stars-${rating}`}
                  name="starRating"
                  checked={formData.starRating === rating}
                  onChange={() => handleInputChange('starRating', rating)}
                />
                <label htmlFor={`stars-${rating}`}>
                  {rating === 0 ? 'Any' : `${rating} Star${rating > 1 ? 's' : ''}`}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="advanced-search-container">
      <div className="search-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>
      
      {activeTab === 'flights' && renderFlightForm()}
      {activeTab === 'hotels' && renderHotelForm()}
      {activeTab === 'trains' && renderTrainForm()}
      {activeTab === 'buses' && renderBusForm()}
      {activeTab === 'tours' && renderTourForm()}
      
      <button
        className="advanced-options-toggle"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
      >
        <Settings size={18} />
        Advanced Options
        <span style={{ marginLeft: 'auto' }}>
          {showAdvancedOptions ? '▲' : '▼'}
        </span>
      </button>
      
      {showAdvancedOptions && renderAdvancedOptions()}
    </div>
  );
};

export default AdvancedSearchWidget;