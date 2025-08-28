// TourResults.jsx
import React, { useState, useEffect } from 'react';
import './TourResults.css';

const TourResults = ({ searchParams }) => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    duration: [0, 24],
    rating: [],
    categories: [],
    languages: [],
    groupSize: 'any',
    difficulty: [],
    departureTime: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const [expandedTour, setExpandedTour] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock data fetch
  useEffect(() => {
    const mockTours = [
      {
        id: 1,
        name: 'Historic City Walking Tour',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviewCount: 1247,
        price: 49,
        originalPrice: 65,
        discount: 25,
        duration: 3,
        category: 'Walking Tour',
        language: ['English', 'Spanish'],
        groupSize: 'Small',
        difficulty: 'Easy',
        departureTime: ['9:00 AM', '2:00 PM'],
        highlights: ['Historic landmarks', 'Local guide', 'Photo opportunities'],
        description: 'Explore the rich history of the city with our expert guides. Visit iconic landmarks and hidden gems.',
        included: ['Professional guide', 'Bottled water', 'Map'],
        meetingPoint: 'Central Square',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: 2,
        name: 'Mountain Adventure Expedition',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviewCount: 892,
        price: 129,
        originalPrice: 159,
        discount: 19,
        duration: 8,
        category: 'Adventure',
        language: ['English'],
        groupSize: 'Medium',
        difficulty: 'Challenging',
        departureTime: ['7:00 AM'],
        highlights: ['Breathtaking views', 'Wildlife spotting', 'Professional equipment'],
        description: 'Experience the thrill of mountain adventure with our expert guides. Suitable for experienced hikers.',
        included: ['Professional guide', 'Equipment', 'Lunch', 'Transportation'],
        meetingPoint: 'Adventure Base Camp',
        coordinates: { lat: 40.7081, lng: -74.0120 }
      },
      {
        id: 3,
        name: 'Food Tasting Experience',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviewCount: 1563,
        price: 75,
        originalPrice: 90,
        discount: 17,
        duration: 4,
        category: 'Food Tour',
        language: ['English', 'French', 'Italian'],
        groupSize: 'Small',
        difficulty: 'Easy',
        departureTime: ['11:00 AM', '5:00 PM'],
        highlights: ['Local cuisine', 'Market visit', 'Food samples'],
        description: 'Taste your way through the city with our food expert. Visit local markets and specialty food shops.',
        included: ['Food samples', 'Professional guide', 'Recipe card'],
        meetingPoint: 'Central Market',
        coordinates: { lat: 40.7200, lng: -74.0050 }
      },
      {
        id: 4,
        name: 'Sunset Boat Cruise',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        reviewCount: 987,
        price: 89,
        originalPrice: 110,
        discount: 19,
        duration: 2.5,
        category: 'Boat Tour',
        language: ['English', 'German'],
        groupSize: 'Large',
        difficulty: 'Easy',
        departureTime: ['6:00 PM'],
        highlights: ['Sunset views', 'Photo opportunities', 'Refreshments'],
        description: 'Enjoy a relaxing cruise during the golden hour. Perfect for couples and photography enthusiasts.',
        included: ['Boat ride', 'Refreshments', 'Blankets'],
        meetingPoint: 'Marina Dock 5',
        coordinates: { lat: 40.7090, lng: -74.0105 }
      },
      {
        id: 5,
        name: 'Art and Culture Tour',
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        reviewCount: 654,
        price: 55,
        originalPrice: 65,
        discount: 15,
        duration: 3.5,
        category: 'Cultural Tour',
        language: ['English', 'Spanish'],
        groupSize: 'Small',
        difficulty: 'Easy',
        departureTime: ['10:00 AM', '1:00 PM'],
        highlights: ['Museum access', 'Street art', 'Local artists'],
        description: 'Discover the vibrant art scene with our knowledgeable guides. Visit galleries and street art locations.',
        included: ['Museum tickets', 'Professional guide', 'Sketchbook'],
        meetingPoint: 'Art District Entrance',
        coordinates: { lat: 40.7150, lng: -74.0150 }
      },
      {
        id: 6,
        name: 'Wildlife Safari Adventure',
        image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviewCount: 1234,
        price: 149,
        originalPrice: 179,
        discount: 17,
        duration: 6,
        category: 'Wildlife Tour',
        language: ['English'],
        groupSize: 'Medium',
        difficulty: 'Moderate',
        departureTime: ['6:30 AM', '2:00 PM'],
        highlights: ['Wildlife spotting', 'Professional guide', 'Photo opportunities'],
        description: 'Experience wildlife in their natural habitat with our expert guides. Perfect for nature lovers.',
        included: ['Transportation', 'Binoculars', 'Guide', 'Snacks'],
        meetingPoint: 'Nature Reserve Entrance',
        coordinates: { lat: 40.6400, lng: -74.0850 }
      }
    ];

    setTours(mockTours);
    setFilteredTours(mockTours);
    setLoading(false);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tours];
    
    // Apply price filter
    result = result.filter(tour => 
      tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1]
    );
    
    // Apply duration filter
    result = result.filter(tour => 
      tour.duration >= filters.duration[0] && tour.duration <= filters.duration[1]
    );
    
    // Apply rating filter
    if (filters.rating.length > 0) {
      const minRating = Math.min(...filters.rating);
      result = result.filter(tour => tour.rating >= minRating);
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(tour => filters.categories.includes(tour.category));
    }
    
    // Apply language filter
    if (filters.languages.length > 0) {
      result = result.filter(tour => 
        filters.languages.some(lang => tour.language.includes(lang))
      );
    }
    
    // Apply group size filter
    if (filters.groupSize !== 'any') {
      result = result.filter(tour => tour.groupSize === filters.groupSize);
    }
    
    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter(tour => filters.difficulty.includes(tour.difficulty));
    }
    
    // Apply departure time filter
    if (filters.departureTime.length > 0) {
      result = result.filter(tour => 
        filters.departureTime.some(time => tour.departureTime.includes(time))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'recommended') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return a.duration - b.duration;
      return 0;
    });
    
    setFilteredTours(result);
  }, [filters, sortBy, tours]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (['rating', 'categories', 'languages', 'difficulty', 'departureTime'].includes(filterType)) {
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

  const handleDurationChange = (min, max) => {
    setFilters(prev => ({ ...prev, duration: [min, max] }));
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleSelectTour = (tour) => {
    setSelectedTour(tour);
  };

  const handleExpandTour = (tourId) => {
    setExpandedTour(expandedTour === tourId ? null : tourId);
  };

  const handleBookTour = (tour) => {
    alert(`Booking tour: ${tour.name}`);
    // In a real app, this would navigate to the booking page
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  const formatDuration = (hours) => {
    if (hours < 1) return `${Math.round(hours * 60)} mins`;
    if (hours === 1) return '1 hour';
    if (hours % 1 === 0) return `${hours} hours`;
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  if (loading) {
    return <div className="loading">Searching for tours...</div>;
  }

  return (
    <div className="tour-results">
      <div className="results-header">
        <h2>Tours in {searchParams.destination}</h2>
        <div className="results-summary">
          {filteredTours.length} tours found · {searchParams.date} · {searchParams.guests} guest(s)
        </div>
        
        <div className="controls">
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <span>Grid View</span>
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <span>List View</span>
            </button>
          </div>
          
          <div className="sort-by">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price">Price (Low to High)</option>
              <option value="rating">Rating</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-container">
        <div className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters">Clear all</button>
          </div>
          
          <div className="filter-group">
            <h4>Price Range (USD)</h4>
            <div className="range-slider">
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={filters.priceRange[1]} 
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                className="slider"
              />
              <div className="range-values">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Duration (hours)</h4>
            <div className="range-slider">
              <input 
                type="range" 
                min="0" 
                max="24" 
                step="0.5"
                value={filters.duration[1]} 
                onChange={(e) => handleDurationChange(filters.duration[0], parseFloat(e.target.value))}
                className="slider"
              />
              <div className="range-values">
                <span>{filters.duration[0]}h</span>
                <span>{filters.duration[1]}h</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Minimum Rating</h4>
            <div className="rating-options">
              {[4.5, 4.0, 3.5, 3.0].map(rating => (
                <label key={rating} className={filters.rating.includes(rating) ? 'selected' : ''}>
                  <input 
                    type="checkbox" 
                    checked={filters.rating.includes(rating)} 
                    onChange={() => handleFilterChange('rating', rating)} 
                  />
                  <span className="stars">{renderStars(rating)}</span>
                  <span className="rating-text">{rating}+</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Tour Category</h4>
            <div className="checkbox-options">
              {['Walking Tour', 'Adventure', 'Food Tour', 'Boat Tour', 'Cultural Tour', 'Wildlife Tour'].map(category => (
                <label key={category}>
                  <input 
                    type="checkbox" 
                    checked={filters.categories.includes(category)} 
                    onChange={() => handleFilterChange('categories', category)} 
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Language</h4>
            <div className="checkbox-options">
              {['English', 'Spanish', 'French', 'German', 'Italian'].map(language => (
                <label key={language}>
                  <input 
                    type="checkbox" 
                    checked={filters.languages.includes(language)} 
                    onChange={() => handleFilterChange('languages', language)} 
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Group Size</h4>
            <div className="radio-options">
              {['any', 'Small', 'Medium', 'Large'].map(size => (
                <label key={size}>
                  <input 
                    type="radio" 
                    name="groupSize" 
                    checked={filters.groupSize === size} 
                    onChange={() => setFilters(prev => ({ ...prev, groupSize: size }))} 
                  />
                  {size === 'any' ? 'Any size' : size}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Difficulty Level</h4>
            <div className="checkbox-options">
              {['Easy', 'Moderate', 'Challenging'].map(difficulty => (
                <label key={difficulty}>
                  <input 
                    type="checkbox" 
                    checked={filters.difficulty.includes(difficulty)} 
                    onChange={() => handleFilterChange('difficulty', difficulty)} 
                  />
                  {difficulty}
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Departure Time</h4>
            <div className="checkbox-options">
              {['6:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'].map(time => (
                <label key={time}>
                  <input 
                    type="checkbox" 
                    checked={filters.departureTime.includes(time)} 
                    onChange={() => handleFilterChange('departureTime', time)} 
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={`results-content ${viewMode}`}>
          {filteredTours.length === 0 ? (
            <div className="no-results">
              <h3>No tours match your filters</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          ) : (
            filteredTours.map(tour => (
              <div key={tour.id} className={`tour-card ${selectedTour?.id === tour.id ? 'selected' : ''}`}>
                <div className="tour-image">
                  <img src={tour.image} alt={tour.name} />
                  <button className="wishlist-btn">❤️</button>
                  {tour.discount > 0 && (
                    <div className="discount-badge">-{tour.discount}%</div>
                  )}
                </div>

                <div className="tour-info">
                  <div className="tour-header">
                    <h3 className="tour-name">{tour.name}</h3>
                    <div className="tour-meta">
                      <span className="tour-category">{tour.category}</span>
                      <span className="tour-duration">{formatDuration(tour.duration)}</span>
                    </div>
                  </div>
                  
                  <div className="tour-highlights">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <span key={index} className="highlight">{highlight}</span>
                    ))}
                  </div>
                  
                  <div className="tour-description">{tour.description}</div>
                  
                  <div className="tour-details">
                    <div className="detail-item">
                      <span className="label">Meeting point:</span>
                      <span className="value">{tour.meetingPoint}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Languages:</span>
                      <span className="value">{tour.language.join(', ')}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Group size:</span>
                      <span className="value">{tour.groupSize}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Difficulty:</span>
                      <span className="value">{tour.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="tour-footer">
                    <div className="tour-rating">
                      <div className="rating-stars">{renderStars(tour.rating)}</div>
                      <div className="rating-value">{tour.rating} ({tour.reviewCount} reviews)</div>
                    </div>
                    
                    <div className="tour-pricing">
                      {tour.originalPrice > tour.price && (
                        <div className="original-price">${tour.originalPrice}</div>
                      )}
                      <div className="final-price">${tour.price}</div>
                      <div className="price-note">per person</div>
                    </div>
                    
                    <div className="tour-actions">
                      <button 
                        className="view-details-btn"
                        onClick={() => handleExpandTour(tour.id)}
                      >
                        {expandedTour === tour.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button 
                        className="select-btn"
                        onClick={() => handleSelectTour(tour)}
                      >
                        {selectedTour?.id === tour.id ? 'Selected' : 'Select Tour'}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedTour === tour.id && (
                  <div className="tour-details-expanded">
                    <div className="expanded-section">
                      <h4>What's Included</h4>
                      <ul>
                        {tour.included.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="expanded-section">
                      <h4>Departure Times</h4>
                      <div className="departure-times">
                        {tour.departureTime.map((time, index) => (
                          <span key={index} className="time-slot">{time}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="expanded-section">
                      <h4>Additional Information</h4>
                      <p>Please arrive 15 minutes before departure. Comfortable walking shoes are recommended.</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedTour && (
        <div className="selected-tour-footer">
          <div className="selected-details">
            <div className="selected-info">
              <h4>{selectedTour.name}</h4>
              <div className="selected-meta">
                <span>{formatDuration(selectedTour.duration)}</span> • 
                <span>{selectedTour.groupSize} group</span> • 
                <span>${selectedTour.price} per person</span>
              </div>
            </div>
            <button 
              className="book-btn"
              onClick={() => handleBookTour(selectedTour)}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourResults;