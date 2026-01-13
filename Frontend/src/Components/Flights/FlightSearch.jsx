import React, { useState } from 'react';
import { Search, Plane, Calendar, Users, ChevronDown, MapPin } from 'lucide-react';
import { flightsData } from '../../data/mockData/flightsData';
import FlightCard from './FlightCard';
import FlightFilters from './FlightFilters';
import './FlightSearch.css';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    class: 'economy',
    tripType: 'one-way'
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    airlines: [],
    stops: 'any',
    departureTime: [],
    arrivalTime: []
  });

  const [sortBy, setSortBy] = useState('price');

  const handleSearch = () => {
    console.log('Searching flights with:', searchParams);
  };

  const filteredFlights = flightsData
    .filter(flight => {
      const matchesPrice = flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1];
      const matchesAirlines = filters.airlines.length === 0 || filters.airlines.includes(flight.airline);
      const matchesStops = filters.stops === 'any' || flight.stops === (filters.stops === 'non-stop' ? 0 : parseInt(filters.stops));
      return matchesPrice && matchesAirlines && matchesStops;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'duration': return a.duration.localeCompare(b.duration);
        case 'departure': return new Date(a.departure) - new Date(b.departure);
        default: return 0;
      }
    });

  return (
    <div className="flight-search">
      {/* Search Header */}
      <div className="search-header">
        <div className="trip-type">
          <button 
            className={searchParams.tripType === 'one-way' ? 'active' : ''}
            onClick={() => setSearchParams({...searchParams, tripType: 'one-way'})}
          >
            One Way
          </button>
          <button 
            className={searchParams.tripType === 'round-trip' ? 'active' : ''}
            onClick={() => setSearchParams({...searchParams, tripType: 'round-trip'})}
          >
            Round Trip
          </button>
          <button 
            className={searchParams.tripType === 'multi-city' ? 'active' : ''}
            onClick={() => setSearchParams({...searchParams, tripType: 'multi-city'})}
          >
            Multi City
          </button>
        </div>

        <div className="search-form">
          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="From City or Airport"
              value={searchParams.from}
              onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
            />
          </div>

          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="To City or Airport"
              value={searchParams.to}
              onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
            />
          </div>

          <div className="form-group">
            <Calendar size={18} />
            <input
              type="date"
              value={searchParams.departure}
              onChange={(e) => setSearchParams({...searchParams, departure: e.target.value})}
            />
          </div>

          {searchParams.tripType === 'round-trip' && (
            <div className="form-group">
              <Calendar size={18} />
              <input
                type="date"
                placeholder="Return Date"
                value={searchParams.return}
                onChange={(e) => setSearchParams({...searchParams, return: e.target.value})}
              />
            </div>
          )}

          <div className="form-group passengers">
            <Users size={18} />
            <span>{searchParams.passengers} Passenger{searchParams.passengers !== 1 ? 's' : ''}</span>
            <ChevronDown size={16} />
          </div>

          <div className="form-group class">
            <span>{searchParams.class}</span>
            <ChevronDown size={16} />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            <Search size={20} />
            Search Flights
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-container">
        <div className="filters-sidebar">
          <FlightFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="results-main">
          <div className="results-header">
            <h3>{filteredFlights.length} Flights Found</h3>
            <div className="sort-options">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>

          <div className="flights-list">
            {filteredFlights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;