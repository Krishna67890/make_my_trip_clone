// TrainSearch.jsx
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { trainsData } from '../../data/mockData/trainsData';
import TrainCard from './TrainCard';
import TrainFilters from './TrainFilters';
import './TrainSearch.css';

const TrainSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    class: 'All',
    quota: 'General'
  });

  const [filters, setFilters] = useState({
    departureTime: [],
    arrivalTime: [],
    trainType: [],
    availability: 'All'
  });

  const [sortBy, setSortBy] = useState('departure');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTrains = trainsData
    .filter(train => {
      const matchesFrom = searchParams.from ? 
        train.from.toLowerCase().includes(searchParams.from.toLowerCase()) : true;
      const matchesTo = searchParams.to ? 
        train.to.toLowerCase().includes(searchParams.to.toLowerCase()) : true;
      
      return matchesFrom && matchesTo;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'departure': return a.departureTime.localeCompare(b.departureTime);
        case 'arrival': return a.arrivalTime.localeCompare(b.arrivalTime);
        case 'duration': return a.duration - b.duration;
        case 'price': return a.fare - b.fare;
        default: return a.departureTime.localeCompare(b.departureTime);
      }
    });

  return (
    <div className="train-search">
      <div className="search-header">
        <div className="search-form">
          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="From Station"
              value={searchParams.from}
              onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
            />
          </div>

          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="To Station"
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
            <select
              value={searchParams.class}
              onChange={(e) => setSearchParams({...searchParams, class: e.target.value})}
            >
              <option value="All">All Classes</option>
              <option value="1A">First AC</option>
              <option value="2A">Second AC</option>
              <option value="3A">Third AC</option>
              <option value="SL">Sleeper</option>
            </select>
          </div>

          <button className="search-btn">
            <Search size={20} />
            Search Trains
          </button>
        </div>
      </div>

      <div className="results-container">
        <div className={`filters-sidebar ${showFilters ? 'mobile-visible' : ''}`}>
          <TrainFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="results-main">
          <div className="results-header">
            <h3>{filteredTrains.length} Trains Found</h3>
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
                </select>
              </div>
            </div>
          </div>

          <div className="trains-list">
            {filteredTrains.map(train => (
              <TrainCard key={train.id} train={train} classType={searchParams.class} />
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
          <TrainFilters filters={filters} onFiltersChange={setFilters} />
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

export default TrainSearch;