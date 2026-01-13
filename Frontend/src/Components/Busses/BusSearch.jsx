// BusSearch.jsx
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { busesData } from '../../data/mockData/busesData';
import BusCard from './BusCard';
import BusFilters from './BusFilters';
import './BusSearch.css';

const BusSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const [filters, setFilters] = useState({
    departureTime: [],
    arrivalTime: [],
    busType: [],
    amenities: [],
    operator: []
  });

  const [sortBy, setSortBy] = useState('departure');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBuses = busesData
    .filter(bus => {
      const matchesFrom = searchParams.from ? 
        bus.from.toLowerCase().includes(searchParams.from.toLowerCase()) : true;
      const matchesTo = searchParams.to ? 
        bus.to.toLowerCase().includes(searchParams.to.toLowerCase()) : true;
      
      return matchesFrom && matchesTo;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'departure': return a.departureTime.localeCompare(b.departureTime);
        case 'arrival': return a.arrivalTime.localeCompare(b.arrivalTime);
        case 'duration': return a.duration - b.duration;
        case 'price': return a.fare - b.fare;
        case 'rating': return b.rating - a.rating;
        default: return a.departureTime.localeCompare(b.departureTime);
      }
    });

  return (
    <div className="bus-search">
      <div className="search-header">
        <div className="search-form">
          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="From City"
              value={searchParams.from}
              onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
            />
          </div>

          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="To City"
              value={searchParams.to}
              onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
            />
          </div>

          <div className="form-group">
            <Calendar size={18} />
            <input
              type="date"
              value={searchParams.date}
              onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <Users size={18} />
            <select
              value={searchParams.passengers}
              onChange={(e) => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
          </div>

          <button className="search-btn">
            <Search size={20} />
            Search Buses
          </button>
        </div>
      </div>

      <div className="results-container">
        <div className={`filters-sidebar ${showFilters ? 'mobile-visible' : ''}`}>
          <BusFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="results-main">
          <div className="results-header">
            <h3>{filteredBuses.length} Buses Found</h3>
            <div className="results-controls">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filters
              </button>
              <div className="sort-options">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="departure">Departure Time</option>
                  <option value="arrival">Arrival Time</option>
                  <option value="duration">Journey Duration</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className="buses-list">
            {filteredBuses.map(bus => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mobile-filter-overlay">
          <div className="mobile-filter-header">
            <h3>Filters</h3>
            <button onClick={() => setShowFilters(false)}>×</button>
          </div>
          <BusFilters filters={filters} onFiltersChange={setFilters} />
          <button 
            className="apply-filters"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BusSearch;