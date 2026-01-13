import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/Destinations/Attractions.css';

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 0
  });
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - in a real app, this would come from an API
  const cities = ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Jaipur', 'Goa'];
  
  const categories = [
    'Historical', 'Adventure', 'Nature', 'Religious', 'Cultural', 'Entertainment'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAttractions = [
        {
          id: 1,
          name: 'Red Fort',
          image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description: 'A historical fort in the city of Delhi in India that served as the main residence of the Mughal Emperors.',
          price: 50,
          rating: 4.7,
          category: 'Historical',
          duration: '2-3 hours',
          city: 'New Delhi'
        },
        {
          id: 2,
          name: 'India Gate',
          image: 'https://images.unsplash.com/photo-1584467735871-8b9a9c535c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWElMjBnYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          description: 'A war memorial located astride the Rajpath in New Delhi, dedicated to the 82,000 soldiers of the Indian Army who died in the period 1914–21.',
          price: 0,
          rating: 4.5,
          category: 'Historical',
          duration: '1-2 hours',
          city: 'New Delhi'
        },
        {
          id: 3,
          name: 'Adventure Island',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGFtdXNlbWVudCUyMHBhcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          description: 'Amusement park with roller coasters, water rides, and family attractions.',
          price: 1200,
          rating: 4.3,
          category: 'Adventure',
          duration: 'Full day',
          city: 'New Delhi'
        },
        {
          id: 4,
          name: 'Lotus Temple',
          image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG90dXMlMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          description: 'Notable for its flowerlike shape, it serves as the Mother Temple of the Indian subcontinent.',
          price: 0,
          rating: 4.6,
          category: 'Religious',
          duration: '1-2 hours',
          city: 'New Delhi'
        },
        {
          id: 5,
          name: 'Qutub Minar',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description: 'A minaret and victory tower that forms part of the Qutb complex, a UNESCO World Heritage Site.',
          price: 40,
          rating: 4.8,
          category: 'Historical',
          duration: '2 hours',
          city: 'New Delhi'
        },
        {
          id: 6,
          name: 'Akshardham Temple',
          image: 'https://images.unsplash.com/photo-1631538109916-e20550a553e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWtzaGFyZGhhbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description: 'A Hindu temple complex that showcases traditional Hindu and Indian culture, spirituality, and architecture.',
          price: 170,
          rating: 4.9,
          category: 'Religious',
          duration: '3-4 hours',
          city: 'New Delhi'
        },
        {
          id: 7,
          name: 'Garden of Five Senses',
          image: 'https://images.unsplash.com/photo-1581833973750-21c6c0f83c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhcmRlbiUyMG9mJTIwZml2ZSUyMHNlbnNlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description: 'A park spread over 20 acres that appeals to all the five senses through its beautiful landscapes.',
          price: 35,
          rating: 4.2,
          category: 'Nature',
          duration: '2-3 hours',
          city: 'New Delhi'
        },
        {
          id: 8,
          name: 'National Museum',
          image: 'https://images.unsplash.com/photo-1598890777032-9e9818f1b035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0aW9uYWwlMjBtdXNldW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          description: 'One of the largest museums in India with a collection of prehistoric to modern works of art.',
          price: 20,
          rating: 4.4,
          category: 'Cultural',
          duration: '3-4 hours',
          city: 'New Delhi'
        }
      ];
      setAttractions(mockAttractions);
      setFilteredAttractions(mockAttractions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAttractions();
  }, [filters, searchTerm, selectedCity, attractions]);

  const filterAttractions = () => {
    let result = attractions.filter(attraction => 
      attraction.city === selectedCity
    );

    if (searchTerm) {
      result = result.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      result = result.filter(attraction => attraction.category === filters.category);
    }

    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'free':
          result = result.filter(attraction => attraction.price === 0);
          break;
        case 'low':
          result = result.filter(attraction => attraction.price > 0 && attraction.price <= 100);
          break;
        case 'medium':
          result = result.filter(attraction => attraction.price > 100 && attraction.price <= 500);
          break;
        case 'high':
          result = result.filter(attraction => attraction.price > 500);
          break;
        default:
          break;
      }
    }

    if (filters.rating > 0) {
      result = result.filter(attraction => attraction.rating >= filters.rating);
    }

    setFilteredAttractions(result);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="attractions-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading attractions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="attractions-container">
      <div className="attractions-header">
        <h1>Top Attractions in {selectedCity}</h1>
        <p>Discover amazing places to visit in {selectedCity}</p>
      </div>

      <div className="city-selector">
        <div className="city-tabs">
          {cities.map(city => (
            <button
              key={city}
              className={`city-tab ${selectedCity === city ? 'active' : ''}`}
              onClick={() => handleCityChange(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="fas fa-filter"></i> Filters
          {Object.values(filters).some(filter => filter !== 'all' && filter !== 0) && (
            <span className="filter-indicator"></span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">Any Price</option>
              <option value="free">Free</option>
              <option value="low">Low (₹0 - ₹100)</option>
              <option value="medium">Medium (₹100 - ₹500)</option>
              <option value="high">High (₹500+)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Rating</label>
            <div className="rating-filter">
              {[4.5, 4, 3, 2, 0].map(rating => (
                <button
                  key={rating}
                  className={`rating-option ${filters.rating === rating ? 'active' : ''}`}
                  onClick={() => handleFilterChange('rating', rating)}
                >
                  {rating === 0 ? 'Any' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="results-count">
        <p>{filteredAttractions.length} attractions found</p>
      </div>

      <div className="attractions-grid">
        {filteredAttractions.length > 0 ? (
          filteredAttractions.map(attraction => (
            <div key={attraction.id} className="attraction-card">
              <div className="card-image">
                <img src={attraction.image} alt={attraction.name} />
                <div className="card-badge">{attraction.category}</div>
                <button className="wishlist-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>
              <div className="card-content">
                <h3>{attraction.name}</h3>
                <div className="rating">
                  {renderStars(attraction.rating)}
                  <span className="rating-value">{attraction.rating}</span>
                </div>
                <p className="description">{attraction.description}</p>
                <div className="card-details">
                  <span className="duration">
                    <i className="far fa-clock"></i> {attraction.duration}
                  </span>
                  <span className="price">
                    {attraction.price === 0 ? 'Free' : `₹${attraction.price}`}
                  </span>
                </div>
                <div className="card-actions">
                  <button className="details-btn">View Details</button>
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No attractions found</h3>
            <p>Try changing your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attractions;