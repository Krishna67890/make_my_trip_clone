// HotelSearch.jsx
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, Filter } from 'lucide-react';
import { hotelsData } from '../../data/mockData/hotelsData';
import HotelCard from './HotelCard';
import HotelFilters from './HotelFilters';
import './HotelSearch.css';

const HotelSearch = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const [filters, setFilters] = useState({
    priceRange: [500, 20000],
    rating: 0,
    amenities: [],
    hotelChains: []
  });

  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const filteredHotels = hotelsData
    .filter(hotel => {
      const matchesLocation = searchParams.location ? 
        hotel.location.toLowerCase().includes(searchParams.location.toLowerCase()) : true;
      const matchesPrice = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
      const matchesRating = hotel.rating >= filters.rating;
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity));
      
      return matchesLocation && matchesPrice && matchesRating && matchesAmenities;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'recommended':
        default: return b.rating - a.rating;
      }
    });

  return (
    <div className="hotel-search">
      <div className="search-header">
        <div className="search-form">
          <div className="form-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="City, Hotel, or Area"
              value={searchParams.location}
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
            />
          </div>

          <div className="form-group">
            <Calendar size={18} />
            <input
              type="date"
              placeholder="Check-in"
              value={searchParams.checkIn}
              onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
            />
          </div>

          <div className="form-group">
            <Calendar size={18} />
            <input
              type="date"
              placeholder="Check-out"
              value={searchParams.checkOut}
              onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
            />
          </div>

          <div className="form-group guests">
            <Users size={18} />
            <span>{searchParams.guests} Guests, {searchParams.rooms} Room</span>
          </div>

          <button className="search-btn">
            <Search size={20} />
            Search
          </button>
        </div>
      </div>

      <div className="results-container">
        <div className={`filters-sidebar ${showFilters ? 'mobile-visible' : ''}`}>
          <HotelFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="results-main">
          <div className="results-header">
            <h3>{filteredHotels.length} Hotels Found</h3>
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
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className="hotels-list">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
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
          <HotelFilters filters={filters} onFiltersChange={setFilters} />
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

export default HotelSearch;