// BusFilters.jsx
import React from 'react';
import { busOperators } from '../../data/constants/busOperators';
import { amenities } from '../../data/constants/amenities';
import './BusFilters.css';

const BusFilters = ({ filters, onFiltersChange }) => {
  const handleTimeFilterChange = (timeRange, filterType) => {
    const updatedTimes = filters[filterType].includes(timeRange)
      ? filters[filterType].filter(t => t !== timeRange)
      : [...filters[filterType], timeRange];
    
    onFiltersChange({ ...filters, [filterType]: updatedTimes });
  };

  const handleBusTypeChange = (busType) => {
    const updatedTypes = filters.busType.includes(busType)
      ? filters.busType.filter(t => t !== busType)
      : [...filters.busType, busType];
    
    onFiltersChange({ ...filters, busType: updatedTypes });
  };

  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    onFiltersChange({ ...filters, amenities: updatedAmenities });
  };

  const handleOperatorToggle = (operator) => {
    const updatedOperators = filters.operator.includes(operator)
      ? filters.operator.filter(o => o !== operator)
      : [...filters.operator, operator];
    
    onFiltersChange({ ...filters, operator: updatedOperators });
  };

  const timeRanges = [
    { label: 'Before 6 AM', value: 'before-6am' },
    { label: '6 AM - 12 PM', value: '6am-12pm' },
    { label: '12 PM - 6 PM', value: '12pm-6pm' },
    { label: 'After 6 PM', value: 'after-6pm' }
  ];

  const busTypes = ['AC', 'Non-AC', 'Sleeper', 'Seater', 'Semi-Sleeper'];

  return (
    <div className="bus-filters">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4>Departure Time</h4>
        <div className="time-filters">
          {timeRanges.map(range => (
            <label key={range.value} className="time-filter">
              <input
                type="checkbox"
                checked={filters.departureTime.includes(range.value)}
                onChange={() => handleTimeFilterChange(range.value, 'departureTime')}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Arrival Time</h4>
        <div className="time-filters">
          {timeRanges.map(range => (
            <label key={range.value} className="time-filter">
              <input
                type="checkbox"
                checked={filters.arrivalTime.includes(range.value)}
                onChange={() => handleTimeFilterChange(range.value, 'arrivalTime')}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Bus Type</h4>
        <div className="bus-type-filters">
          {busTypes.map(type => (
            <label key={type} className="bus-type-filter">
              <input
                type="checkbox"
                checked={filters.busType.includes(type)}
                onChange={() => handleBusTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Amenities</h4>
        <div className="amenities-filters">
          {amenities.slice(0, 5).map(amenity => (
            <label key={amenity} className="amenity-filter">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Operators</h4>
        <div className="operator-filters">
          {busOperators.slice(0, 5).map(operator => (
            <label key={operator} className="operator-filter">
              <input
                type="checkbox"
                checked={filters.operator.includes(operator)}
                onChange={() => handleOperatorToggle(operator)}
              />
              <span>{operator}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusFilters;