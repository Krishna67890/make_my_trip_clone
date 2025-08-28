// TrainFilters.jsx
import React from 'react';
import { trainTypes } from '../../data/constants/trainTypes';
import './TrainFilters.css';

const TrainFilters = ({ filters, onFiltersChange }) => {
  const handleTimeFilterChange = (timeRange, filterType) => {
    const updatedTimes = filters[filterType].includes(timeRange)
      ? filters[filterType].filter(t => t !== timeRange)
      : [...filters[filterType], timeRange];
    
    onFiltersChange({ ...filters, [filterType]: updatedTimes });
  };

  const handleTrainTypeChange = (trainType) => {
    const updatedTypes = filters.trainType.includes(trainType)
      ? filters.trainType.filter(t => t !== trainType)
      : [...filters.trainType, trainType];
    
    onFiltersChange({ ...filters, trainType: updatedTypes });
  };

  const timeRanges = [
    { label: 'Before 6 AM', value: 'before-6am' },
    { label: '6 AM - 12 PM', value: '6am-12pm' },
    { label: '12 PM - 6 PM', value: '12pm-6pm' },
    { label: 'After 6 PM', value: 'after-6pm' }
  ];

  return (
    <div className="train-filters">
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
        <h4>Train Type</h4>
        <div className="train-type-filters">
          {trainTypes.map(type => (
            <label key={type} className="train-type-filter">
              <input
                type="checkbox"
                checked={filters.trainType.includes(type)}
                onChange={() => handleTrainTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Availability</h4>
        <div className="availability-filters">
          <label className="availability-filter">
            <input
              type="radio"
              name="availability"
              value="All"
              checked={filters.availability === 'All'}
              onChange={(e) => onFiltersChange({...filters, availability: e.target.value})}
            />
            <span>Show All</span>
          </label>
          <label className="availability-filter">
            <input
              type="radio"
              name="availability"
              value="Available"
              checked={filters.availability === 'Available'}
              onChange={(e) => onFiltersChange({...filters, availability: e.target.value})}
            />
            <span>Available Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrainFilters;