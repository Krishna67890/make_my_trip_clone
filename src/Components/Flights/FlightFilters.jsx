import React from 'react';
import { IndianRupee, Clock, Plane } from 'lucide-react';
import './FlightFilters.css';

const FlightFilters = ({ filters, onFiltersChange }) => {
  const airlines = ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'Go First'];
  const stopOptions = ['any', 'non-stop', '1', '2+'];
  const timeSlots = [
    { label: 'Early Morning (12AM-6AM)', value: 'early-morning' },
    { label: 'Morning (6AM-12PM)', value: 'morning' },
    { label: 'Afternoon (12PM-6PM)', value: 'afternoon' },
    { label: 'Evening (6PM-12AM)', value: 'evening' }
  ];

  const handlePriceChange = (range) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const handleAirlineChange = (airline) => {
    const updatedAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    onFiltersChange({ ...filters, airlines: updatedAirlines });
  };

  const handleStopChange = (stop) => {
    onFiltersChange({ ...filters, stops: stop });
  };

  return (
    <div className="flight-filters">
      <h3>Filters</h3>

      {/* Price Filter */}
      <div className="filter-section">
        <h4>
          <IndianRupee size={16} />
          Price
        </h4>
        <div className="price-slider">
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange([parseInt(e.target.value), filters.priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange([filters.priceRange[0], parseInt(e.target.value)])}
          />
          <div className="price-values">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="filter-section">
        <h4>
          <Plane size={16} />
          Airlines
        </h4>
        {airlines.map(airline => (
          <label key={airline} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.airlines.includes(airline)}
              onChange={() => handleAirlineChange(airline)}
            />
            <span>{airline}</span>
          </label>
        ))}
      </div>

      {/* Stops Filter */}
      <div className="filter-section">
        <h4>Number of Stops</h4>
        {stopOptions.map(stop => (
          <label key={stop} className="filter-radio">
            <input
              type="radio"
              name="stops"
              value={stop}
              checked={filters.stops === stop}
              onChange={() => handleStopChange(stop)}
            />
            <span>
              {stop === 'any' ? 'Any' : 
               stop === 'non-stop' ? 'Non-stop' : 
               stop === '1' ? '1 Stop' : '2+ Stops'}
            </span>
          </label>
        ))}
      </div>

      {/* Departure Time Filter */}
      <div className="filter-section">
        <h4>
          <Clock size={16} />
          Departure Time
        </h4>
        {timeSlots.map(slot => (
          <label key={slot.value} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.departureTime.includes(slot.value)}
              onChange={() => {
                const updatedTimes = filters.departureTime.includes(slot.value)
                  ? filters.departureTime.filter(t => t !== slot.value)
                  : [...filters.departureTime, slot.value];
                onFiltersChange({ ...filters, departureTime: updatedTimes });
              }}
            />
            <span>{slot.label}</span>
          </label>
        ))}
      </div>

      {/* Reset Filters */}
      <button 
        className="reset-filters"
        onClick={() => onFiltersChange({
          priceRange: [0, 50000],
          airlines: [],
          stops: 'any',
          departureTime: [],
          arrivalTime: []
        })}
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default FlightFilters;