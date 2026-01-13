// HotelResults.jsx
import React, { useState, useEffect } from 'react';
import './HotelResults.css';

const HotelResults = ({ searchParams }) => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    starRating: [],
    amenities: [],
    propertyTypes: [],
    neighborhood: [],
    guestRating: [0, 10],
    distance: 10
  });
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [expandedHotel, setExpandedHotel] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Mock data fetch
  useEffect(() => {
    const mockHotels = [
      {
        id: 1,
        name: 'Grand Plaza Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        reviewCount: 1247,
        price: 189,
        originalPrice: 225,
        discount: 16,
        location: 'Downtown',
        distance: 0.8,
        stars: 4,
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Bar'],
        description: 'Luxury hotel in the heart of downtown with stunning city views and exceptional service.',
        roomTypes: ['Standard King', 'Deluxe Queen', 'Executive Suite', 'Presidential Suite'],
        propertyType: 'Luxury Hotel',
        tags: ['Free Cancellation', 'Breakfast Included', 'Pay at Hotel'],
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: 2,
        name: 'Seaside Resort & Spa',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviewCount: 892,
        price: 279,
        originalPrice: 350,
        discount: 20,
        location: 'Beachfront',
        distance: 2.5,
        stars: 5,
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Beach Access', 'Restaurant', 'Bar', 'Room Service'],
        description: 'Beachfront luxury resort with private beach access, world-class spa, and panoramic ocean views.',
        roomTypes: ['Ocean View Room', 'Beachfront Suite', 'Villa', 'Penthouse'],
        propertyType: 'Resort',
        tags: ['Free Cancellation', 'Breakfast Included', 'All-Inclusive Option'],
        coordinates: { lat: 40.7081, lng: -74.0120 }
      },
      {
        id: 3,
        name: 'Urban Boutique Hotel',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.3,
        reviewCount: 567,
        price: 129,
        originalPrice: 149,
        discount: 13,
        location: 'Arts District',
        distance: 1.2,
        stars: 3,
        amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Pet Friendly', 'Bike Rental'],
        description: 'Trendy boutique hotel in the vibrant arts district featuring local artwork and designer rooms.',
        roomTypes: ['Cozy Queen', 'Loft Style', 'Artist Suite'],
        propertyType: 'Boutique Hotel',
        tags: ['Free Cancellation', 'Pet Friendly', 'Arts District'],
        coordinates: { lat: 40.7200, lng: -74.0050 }
      },
      {
        id: 4,
        name: 'Business Class Inn',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.1,
        reviewCount: 432,
        price: 99,
        originalPrice: 119,
        discount: 17,
        location: 'Financial District',
        distance: 0.5,
        stars: 3,
        amenities: ['Free WiFi', 'Business Center', 'Fitness Center', 'Restaurant', 'Meeting Rooms'],
        description: 'Modern hotel designed for business travelers with fully equipped workspaces and convenient downtown location.',
        roomTypes: ['Standard Room', 'Executive Room', 'Conference Suite'],
        propertyType: 'Business Hotel',
        tags: ['Free Cancellation', 'Business Center', 'Airport Shuttle'],
        coordinates: { lat: 40.7090, lng: -74.0105 }
      },
      {
        id: 5,
        name: 'Garden View Bed & Breakfast',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        reviewCount: 378,
        price: 145,
        originalPrice: 165,
        discount: 12,
        location: 'Historic District',
        distance: 1.8,
        stars: 4,
        amenities: ['Free WiFi', 'Free Breakfast', 'Garden', 'Terrace', 'Free Parking'],
        description: 'Charming B&B in a historic building with beautiful gardens and personalized service.',
        roomTypes: ['Garden View Room', 'Historic Suite', 'Cottage'],
        propertyType: 'Bed & Breakfast',
        tags: ['Free Breakfast', 'Free Parking', 'Historic Building'],
        coordinates: { lat: 40.7150, lng: -74.0150 }
      },
      {
        id: 6,
        name: 'Budget Stay Inn',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 3.9,
        reviewCount: 1256,
        price: 69,
        originalPrice: 79,
        discount: 13,
        location: 'Airport Area',
        distance: 8.5,
        stars: 2,
        amenities: ['Free WiFi', 'Free Parking', '24-hour Front Desk', 'Shuttle Service'],
        description: 'Affordable accommodation near the airport with free shuttle service and comfortable rooms.',
        roomTypes: ['Standard Room', 'Double Room', 'Family Room'],
        propertyType: 'Budget Hotel',
        tags: ['Free Cancellation', 'Airport Shuttle', 'Free Parking'],
        coordinates: { lat: 40.6400, lng: -74.0850 }
      }
    ];

    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
    setLoading(false);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...hotels];
    
    // Apply price filter
    result = result.filter(hotel => 
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );
    
    // Apply star rating filter
    if (filters.starRating.length > 0) {
      result = result.filter(hotel => filters.starRating.includes(hotel.stars));
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(hotel => 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    // Apply property type filter
    if (filters.propertyTypes.length > 0) {
      result = result.filter(hotel => filters.propertyTypes.includes(hotel.propertyType));
    }
    
    // Apply neighborhood filter
    if (filters.neighborhood.length > 0) {
      result = result.filter(hotel => filters.neighborhood.includes(hotel.location));
    }
    
    // Apply guest rating filter
    result = result.filter(hotel => 
      hotel.rating >= filters.guestRating[0] && hotel.rating <= filters.guestRating[1]
    );
    
    // Apply distance filter
    result = result.filter(hotel => hotel.distance <= filters.distance);
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'recommended') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'stars') return b.stars - a.stars;
      return 0;
    });
    
    setFilteredHotels(result);
  }, [filters, sortBy, hotels]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (['starRating', 'amenities', 'propertyTypes', 'neighborhood'].includes(filterType)) {
        const items = [...prev[filterType]];
        const index = items.indexOf(value);
        
        if (index >= 0) {
          items.splice(index, 1);
        } else {
          items.push(value);
        }
        
        return { ...prev, [filterType]: items };
      }
      
      return { ...prev, [filterType]: value };
    });
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
  };

  const handleGuestRatingChange = (min, max) => {
    setFilters(prev => ({ ...prev, guestRating: [min, max] }));
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleExpandHotel = (hotelId) => {
    setExpandedHotel(expandedHotel === hotelId ? null : hotelId);
  };

  const handleBookHotel = (hotel) => {
    alert(`Booking hotel: ${hotel.name}`);
    // In a real app, this would navigate to the booking page
  };

  const renderStars = (rating, type = 'rating') => {
    const stars = [];
    const fullStars = type === 'rating' ? Math.floor(rating) : rating;
    const hasHalfStar = type === 'rating' && rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = type === 'rating' ? 5 - stars.length : 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  const formatDistance = (distance) => {
    return distance < 1 
      ? `${Math.round(distance * 1000)}m from center` 
      : `${distance}km from center`;
  };

  if (loading) {
    return <div className="loading">Searching for hotels...</div>;
  }

  return (
    <div className="hotel-results">
      <div className="results-header">
        <h2>Hotels in {searchParams.destination}</h2>
        <div className="results-summary">
          {filteredHotels.length} hotels found · {searchParams.checkIn} - {searchParams.checkOut} · {searchParams.guests} guest(s) · {searchParams.rooms} room(s)
        </div>
        
        <div className="view-toggle">
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button 
            className={viewMode === 'map' ? 'active' : ''}
            onClick={() => setViewMode('map')}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="results-container">
        <div className="filters-sidebar">
          <div className="filter-group">
            <h3>Sort by</h3>
            <div className="sort-options">
              <button 
                className={sortBy === 'recommended' ? 'active' : ''} 
                onClick={() => handleSortChange('recommended')}
              >
                Recommended
              </button>
              <button 
                className={sortBy === 'price' ? 'active' : ''} 
                onClick={() => handleSortChange('price')}
              >
                Price (Lowest)
              </button>
              <button 
                className={sortBy === 'rating' ? 'active' : ''} 
                onClick={() => handleSortChange('rating')}
              >
                Guest Rating
              </button>
              <button 
                className={sortBy === 'stars' ? 'active' : ''} 
                onClick={() => handleSortChange('stars')}
              >
                Star Rating
              </button>
              <button 
                className={sortBy === 'distance' ? 'active' : ''} 
                onClick={() => handleSortChange('distance')}
              >
                Distance
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Price per night (USD)</h3>
            <div className="price-range">
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={filters.priceRange[1]} 
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
              />
              <div className="price-labels">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>Star Rating</h3>
            <div className="star-options">
              {[5, 4, 3, 2, 1].map(stars => (
                <label key={stars}>
                  <input 
                    type="checkbox" 
                    checked={filters.starRating.includes(stars)} 
                    onChange={() => handleFilterChange('starRating', stars)} 
                  />
                  <span className="star-rating">{renderStars(stars, 'stars')}</span>
                  <span className="rating-text">{stars} stars</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Guest Rating</h3>
            <div className="guest-rating">
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.5"
                value={filters.guestRating[1]} 
                onChange={(e) => handleGuestRatingChange(filters.guestRating[0], parseFloat(e.target.value))}
              />
              <div className="rating-labels">
                <span>0</span>
                <span>{filters.guestRating[1]}</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>Distance from center</h3>
            <div className="distance-range">
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.5"
                value={filters.distance} 
                onChange={(e) => setFilters(prev => ({ ...prev, distance: parseFloat(e.target.value) }))}
              />
              <div className="distance-labels">
                <span>0km</span>
                <span>{filters.distance}km</span>
                <span>10km</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>Property Type</h3>
            <div className="property-options">
              {[...new Set(hotels.map(hotel => hotel.propertyType))].map(type => (
                <label key={type}>
                  <input 
                    type="checkbox" 
                    checked={filters.propertyTypes.includes(type)} 
                    onChange={() => handleFilterChange('propertyTypes', type)} 
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Neighborhood</h3>
            <div className="neighborhood-options">
              {[...new Set(hotels.map(hotel => hotel.location))].map(neighborhood => (
                <label key={neighborhood}>
                  <input 
                    type="checkbox" 
                    checked={filters.neighborhood.includes(neighborhood)} 
                    onChange={() => handleFilterChange('neighborhood', neighborhood)} 
                  />
                  {neighborhood}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Amenities</h3>
            <div className="amenity-options">
              {['Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Bar', 'Free Parking', 'Airport Shuttle'].map(amenity => (
                <label key={amenity}>
                  <input 
                    type="checkbox" 
                    checked={filters.amenities.includes(amenity)} 
                    onChange={() => handleFilterChange('amenities', amenity)} 
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="results-list">
          {filteredHotels.length === 0 ? (
            <div className="no-results">
              <h3>No hotels match your filters</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          ) : (
            filteredHotels.map(hotel => (
              <div key={hotel.id} className={`hotel-card ${selectedHotel?.id === hotel.id ? 'selected' : ''}`}>
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <button className="wishlist-btn">❤️</button>
                  {hotel.discount > 0 && (
                    <div className="discount-badge">-{hotel.discount}%</div>
                  )}
                </div>

                <div className="hotel-info">
                  <div className="hotel-main">
                    <div className="hotel-details">
                      <h3 className="hotel-name">{hotel.name}</h3>
                      <div className="hotel-location">
                        <span className="location">{hotel.location}</span> · 
                        <span className="distance">{formatDistance(hotel.distance)}</span>
                      </div>
                      <div className="hotel-stars">{renderStars(hotel.stars, 'stars')}</div>
                      
                      <div className="hotel-tags">
                        {hotel.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="hotel-description">{hotel.description}</div>
                    </div>

                    <div className="hotel-rating">
                      <div className="rating-score">
                        <span className="score">{hotel.rating}</span>
                        <span className="max">/10</span>
                      </div>
                      <div className="rating-text">Excellent</div>
                      <div className="review-count">{hotel.reviewCount} reviews</div>
                    </div>
                  </div>

                  <div className="hotel-amenities">
                    <div className="amenities-list">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="amenity">{amenity}</span>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="amenity-more">+{hotel.amenities.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="hotel-actions">
                    <div className="price-info">
                      <div className="price-container">
                        <div className="original-price">${hotel.originalPrice}</div>
                        <div className="final-price">${hotel.price}</div>
                        <div className="price-note">per night</div>
                      </div>
                      <div className="taxes">Includes taxes and fees</div>
                    </div>
                    
                    <div className="action-buttons">
                      <button 
                        className="view-details-btn"
                        onClick={() => handleExpandHotel(hotel.id)}
                      >
                        {expandedHotel === hotel.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button 
                        className="select-btn"
                        onClick={() => handleSelectHotel(hotel)}
                      >
                        {selectedHotel?.id === hotel.id ? 'Selected' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedHotel === hotel.id && (
                  <div className="hotel-details-expanded">
                    <div className="room-types">
                      <h4>Available Room Types</h4>
                      <div className="rooms-list">
                        {hotel.roomTypes.map((room, index) => (
                          <div key={index} className="room-card">
                            <div className="room-info">
                              <h5>{room}</h5>
                              <div className="room-features">Free cancellation · Breakfast included</div>
                            </div>
                            <div className="room-price">
                              <div className="price">${hotel.price + index * 20}</div>
                              <button className="book-room-btn">Select</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="amenities-full">
                      <h4>Amenities</h4>
                      <div className="amenities-grid">
                        {hotel.amenities.map((amenity, index) => (
                          <div key={index} className="amenity-item">{amenity}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedHotel && (
        <div className="selected-hotel-footer">
          <div className="selected-details">
            <div className="selected-summary">
              {selectedHotel.name} · ${selectedHotel.price} per night · {selectedHotel.location}
            </div>
            <button 
              className="book-btn"
              onClick={() => handleBookHotel(selectedHotel)}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelResults;