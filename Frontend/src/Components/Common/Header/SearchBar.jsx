import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ activeTab = 'flights' }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    class: 'economy'
  });

  const renderFlightsForm = () => (
    <div className="search-form">
      <div className="search-field">
        <MapPin size={18} />
        <input
          type="text"
          placeholder="From City or Airport"
          value={searchData.from}
          onChange={(e) => setSearchData({...searchData, from: e.target.value})}
        />
      </div>
      
      <div className="search-field">
        <MapPin size={18} />
        <input
          type="text"
          placeholder="To City or Airport"
          value={searchData.to}
          onChange={(e) => setSearchData({...searchData, to: e.target.value})}
        />
      </div>

      <div className="search-field">
        <Calendar size={18} />
        <input
          type="date"
          value={searchData.departure}
          onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
        />
      </div>

      <div className="search-field">
        <Calendar size={18} />
        <input
          type="date"
          placeholder="Return Date"
          value={searchData.return}
          onChange={(e) => setSearchData({...searchData, return: e.target.value})}
        />
      </div>

      <div className="search-field passengers-field">
        <Users size={18} />
        <span>{searchData.passengers} Passenger{searchData.passengers !== 1 ? 's' : ''}</span>
        <ChevronDown size={16} />
      </div>

      <button className="search-btn">
        <Search size={20} />
        Search Flights
      </button>
    </div>
  );

  const renderHotelsForm = () => (
    <div className="search-form">
      <div className="search-field">
        <MapPin size={18} />
        <input type="text" placeholder="City, Hotel, or Area" />
      </div>
      
      <div className="search-field">
        <Calendar size={18} />
        <input type="date" placeholder="Check-in" />
      </div>

      <div className="search-field">
        <Calendar size={18} />
        <input type="date" placeholder="Check-out" />
      </div>

      <div className="search-field">
        <Users size={18} />
        <span>1 Room, 2 Guests</span>
        <ChevronDown size={16} />
      </div>

      <button className="search-btn">
        <Search size={20} />
        Search Hotels
      </button>
    </div>
  );

  return (
    <div className="search-bar">
      <div className="search-container">
        {activeTab === 'flights' && renderFlightsForm()}
        {activeTab === 'hotels' && renderHotelsForm()}
        {/* Add similar forms for trains, buses, tours */}
      </div>
    </div>
  );
};

export default SearchBar;