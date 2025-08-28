// src/components/common/SearchWidget/SearchWidget.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchWidget.css';

// Import components
import DatePicker from '../UI/DatePicker';
import PriceFilter from '../UI/PriceFilter';
import RatingFilter from '../UI/RatingFilter';

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [searchData, setSearchData] = useState({
    flights: {
      origin: '',
      destination: '',
      departureDate: null,
      returnDate: null,
      travelers: { adults: 1, children: 0, infants: 0 },
      class: 'economy'
    },
    hotels: {
      location: '',
      checkIn: null,
      checkOut: null,
      guests: { adults: 2, children: 0, rooms: 1 },
      priceRange: [0, 1000],
      rating: 0
    },
    trains: {
      origin: '',
      destination: '',
      departureDate: null,
      travelers: { adults: 1, children: 0 },
      class: 'second'
    },
    buses: {
      origin: '',
      destination: '',
      departureDate: null,
      travelers: 1,
      operator: ''
    },
    tours: {
      destination: '',
      startDate: null,
      duration: '',
      travelers: 1,
      category: ''
    }
  });
  const [advancedOptions, setAdvancedOptions] = useState({
    flights: false,
    hotels: false,
    trains: false,
    buses: false,
    tours: false
  });

  const navigate = useNavigate();

  // Sample data for autocomplete
  const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Dubai', 'Rome', 'Barcelona'];
  const tourCategories = ['Adventure', 'Cultural', 'Food', 'Nature', 'Luxury', 'Family'];

  const handleInputChange = (tab, field, value) => {
    setSearchData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (tab, category, field, value) => {
    setSearchData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [category]: {
          ...prev[tab][category],
          [field]: value
        }
      }
    }));
  };

  const toggleAdvancedOptions = (tab) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  const handleSearch = () => {
    // Construct search query based on active tab
    const queryParams = new URLSearchParams();
    
    switch(activeTab) {
      case 'flights':
        queryParams.append('type', 'flights');
        queryParams.append('origin', searchData.flights.origin);
        queryParams.append('destination', searchData.flights.destination);
        if (searchData.flights.departureDate) {
          queryParams.append('departure', searchData.flights.departureDate.toISOString().split('T')[0]);
        }
        if (searchData.flights.returnDate) {
          queryParams.append('return', searchData.flights.returnDate.toISOString().split('T')[0]);
        }
        break;
      
      case 'hotels':
        queryParams.append('type', 'hotels');
        queryParams.append('location', searchData.hotels.location);
        if (searchData.hotels.checkIn) {
          queryParams.append('checkin', searchData.hotels.checkIn.toISOString().split('T')[0]);
        }
        if (searchData.hotels.checkOut) {
          queryParams.append('checkout', searchData.hotels.checkOut.toISOString().split('T')[0]);
        }
        break;
      
      // Add cases for other types...
      default:
        break;
    }

    // Navigate to search results page
    navigate(`/search?${queryParams.toString()}`);
  };

  const swapLocations = () => {
    const { origin, destination } = searchData.flights;
    setSearchData(prev => ({
      ...prev,
      flights: {
        ...prev.flights,
        origin: destination,
        destination: origin
      }
    }));
  };

  const renderFlightsTab = () => (
    <div className="search-tab-content">
      <div className="input-group">
        <div className="input-field">
          <label>From</label>
          <input
            type="text"
            placeholder="City or airport"
            value={searchData.flights.origin}
            onChange={(e) => handleInputChange('flights', 'origin', e.target.value)}
            list="cities"
          />
        </div>
        
        <button className="swap-button" onClick={swapLocations} aria-label="Swap locations">
          ↔
        </button>
        
        <div className="input-field">
          <label>To</label>
          <input
            type="text"
            placeholder="City or airport"
            value={searchData.flights.destination}
            onChange={(e) => handleInputChange('flights', 'destination', e.target.value)}
            list="cities"
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-field">
          <label>Departure</label>
          <DatePicker
            selected={searchData.flights.departureDate}
            onChange={(date) => handleInputChange('flights', 'departureDate', date)}
            placeholderText="Select date"
            minDate={new Date()}
          />
        </div>
        
        <div className="input-field">
          <label>Return</label>
          <DatePicker
            selected={searchData.flights.returnDate}
            onChange={(date) => handleInputChange('flights', 'returnDate', date)}
            placeholderText="Select date"
            minDate={searchData.flights.departureDate || new Date()}
            disabled={!searchData.flights.departureDate}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-field">
          <label>Travelers & Class</label>
          <select
            value={searchData.flights.class}
            onChange={(e) => handleInputChange('flights', 'class', e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
        
        <div className="input-field">
          <label>Passengers</label>
          <div className="passenger-selector">
            <button 
              onClick={() => handleNestedInputChange('flights', 'travelers', 'adults', 
                Math.max(1, searchData.flights.travelers.adults - 1))}
            >−</button>
            <span>{searchData.flights.travelers.adults} Adult{searchData.flights.travelers.adults !== 1 ? 's' : ''}</span>
            <button 
              onClick={() => handleNestedInputChange('flights', 'travelers', 'adults', 
                searchData.flights.travelers.adults + 1)}
            >+</button>
          </div>
        </div>
      </div>

      <button 
        className="advanced-options-btn"
        onClick={() => toggleAdvancedOptions('flights')}
      >
        {advancedOptions.flights ? 'Hide' : 'Show'} Advanced Options
      </button>

      {advancedOptions.flights && (
        <div className="advanced-options">
          <div className="input-group">
            <div className="input-field">
              <label>Max Stops</label>
              <select>
                <option value="any">Any</option>
                <option value="0">Non-stop</option>
                <option value="1">Max 1 stop</option>
                <option value="2">Max 2 stops</option>
              </select>
            </div>
            
            <div className="input-field">
              <label>Airlines</label>
              <select>
                <option value="any">Any airline</option>
                <option value="delta">Delta</option>
                <option value="united">United</option>
                <option value="american">American Airlines</option>
              </select>
            </div>
          </div>
          
          <PriceFilter
            min={0}
            max={2000}
            onChange={(range) => console.log('Price range:', range)}
          />
        </div>
      )}
    </div>
  );

  const renderHotelsTab = () => (
    <div className="search-tab-content">
      <div className="input-group">
        <div className="input-field full-width">
          <label>Destination</label>
          <input
            type="text"
            placeholder="City, hotel, or region"
            value={searchData.hotels.location}
            onChange={(e) => handleInputChange('hotels', 'location', e.target.value)}
            list="cities"
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-field">
          <label>Check-in</label>
          <DatePicker
            selected={searchData.hotels.checkIn}
            onChange={(date) => handleInputChange('hotels', 'checkIn', date)}
            placeholderText="Select date"
            minDate={new Date()}
          />
        </div>
        
        <div className="input-field">
          <label>Check-out</label>
          <DatePicker
            selected={searchData.hotels.checkOut}
            onChange={(date) => handleInputChange('hotels', 'checkOut', date)}
            placeholderText="Select date"
            minDate={searchData.hotels.checkIn || new Date()}
            disabled={!searchData.hotels.checkIn}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-field">
          <label>Rooms & Guests</label>
          <div className="guest-selector">
            <div className="selector-row">
              <span>Rooms:</span>
              <div className="counter">
                <button onClick={() => handleNestedInputChange('hotels', 'guests', 'rooms', 
                  Math.max(1, searchData.hotels.guests.rooms - 1))}>−</button>
                <span>{searchData.hotels.guests.rooms}</span>
                <button onClick={() => handleNestedInputChange('hotels', 'guests', 'rooms', 
                  searchData.hotels.guests.rooms + 1)}>+</button>
              </div>
            </div>
            <div className="selector-row">
              <span>Adults:</span>
              <div className="counter">
                <button onClick={() => handleNestedInputChange('hotels', 'guests', 'adults', 
                  Math.max(1, searchData.hotels.guests.adults - 1))}>−</button>
                <span>{searchData.hotels.guests.adults}</span>
                <button onClick={() => handleNestedInputChange('hotels', 'guests', 'adults', 
                  searchData.hotels.guests.adults + 1)}>+</button>
              </div>
            </div>
            <div className="selector-row">
              <span>Children:</span>
              <div className="counter">
                <button onClick={() => handleNestedInputChange('hotels', 'guests', 'children', 
                  Math.max(0, searchData.hotels.guests.children - 1))}>−</button>
                <span>{searchData.hotels.guests.children}</span>
                <button onClick={() => handleNestedInputChange('hotels', 'guests', 'children', 
                  searchData.hotels.guests.children + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="advanced-options-btn"
        onClick={() => toggleAdvancedOptions('hotels')}
      >
        {advancedOptions.hotels ? 'Hide' : 'Show'} Advanced Options
      </button>

      {advancedOptions.hotels && (
        <div className="advanced-options">
          <div className="input-group">
            <div className="input-field">
              <label>Price Range</label>
              <PriceFilter
                min={0}
                max={1000}
                value={searchData.hotels.priceRange}
                onChange={(range) => handleInputChange('hotels', 'priceRange', range)}
              />
            </div>
            
            <div className="input-field">
              <label>Star Rating</label>
              <RatingFilter
                value={searchData.hotels.rating}
                onChange={(rating) => handleInputChange('hotels', 'rating', rating)}
              />
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-field">
              <label>Hotel Chain</label>
              <select>
                <option value="any">Any</option>
                <option value="marriott">Marriott</option>
                <option value="hilton">Hilton</option>
                <option value="hyatt">Hyatt</option>
              </select>
            </div>
            
            <div className="input-field">
              <label>Amenities</label>
              <select multiple className="multi-select">
                <option value="wifi">Free WiFi</option>
                <option value="pool">Swimming Pool</option>
                <option value="gym">Fitness Center</option>
                <option value="spa">Spa</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'flights': return renderFlightsTab();
      case 'hotels': return renderHotelsTab();
      case 'trains': return <div className="search-tab-content">Train search coming soon...</div>;
      case 'buses': return <div className="search-tab-content">Bus search coming soon...</div>;
      case 'tours': return <div className="search-tab-content">Tour search coming soon...</div>;
      default: return renderFlightsTab();
    }
  };

  return (
    <div className="search-widget">
      <div className="search-tabs">
        <button 
          className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
          onClick={() => setActiveTab('flights')}
        >
          ✈️ Flights
        </button>
        <button 
          className={`tab ${activeTab === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
        >
          🏨 Hotels
        </button>
        <button 
          className={`tab ${activeTab === 'trains' ? 'active' : ''}`}
          onClick={() => setActiveTab('trains')}
        >
          🚆 Trains
        </button>
        <button 
          className={`tab ${activeTab === 'buses' ? 'active' : ''}`}
          onClick={() => setActiveTab('buses')}
        >
          🚌 Buses
        </button>
        <button 
          className={`tab ${activeTab === 'tours' ? 'active' : ''}`}
          onClick={() => setActiveTab('tours')}
        >
          🗺️ Tours
        </button>
      </div>

      <div className="search-content">
        {renderTabContent()}
        
        <button className="search-button" onClick={handleSearch}>
          Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
      </div>

      <datalist id="cities">
        {cities.map(city => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </div>
  );
};

export default SearchWidget;