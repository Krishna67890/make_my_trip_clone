// src/pages/Destinations/CityGuide.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { citiesData } from '../../data/mockData/citiesData';
import { attractionsData } from '../../data/mockData/attractionsData';
import Loader from '../../components/common/UI/Loader';
import './CityGuide.css';

const CityGuide = () => {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Find city data
        const cityData = citiesData.find(c => c.id === parseInt(cityId));
        setCity(cityData);
        
        // Find attractions for this city
        const cityAttractions = attractionsData.filter(a => a.cityId === parseInt(cityId));
        setAttractions(cityAttractions);
        setFilteredAttractions(cityAttractions);
      } catch (error) {
        console.error('Error fetching city data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityId]);

  useEffect(() => {
    // Filter attractions by category
    if (activeCategory === 'all') {
      setFilteredAttractions(attractions);
    } else {
      const filtered = attractions.filter(attr => 
        attr.categories.includes(activeCategory)
      );
      setFilteredAttractions(filtered);
    }
  }, [activeCategory, attractions]);

  useEffect(() => {
    // Sort attractions
    const sortedAttractions = [...filteredAttractions];
    
    switch(sortBy) {
      case 'popularity':
        sortedAttractions.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        sortedAttractions.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedAttractions.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedAttractions.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredAttractions(sortedAttractions);
  }, [sortBy, attractions, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  if (!city) {
    return (
      <div className="city-guide-container">
        <div className="not-found">
          <h2>City not found</h2>
          <p>The city you're looking for doesn't exist in our database.</p>
          <Link to="/destinations" className="btn-primary">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="city-guide-container">
      {/* Hero Section */}
      <section className="city-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${city.imageUrl})` }}>
        <div className="hero-content">
          <h1 className="city-title">{city.name}</h1>
          <p className="city-description">{city.description}</p>
          <div className="city-meta">
            <span className="meta-item">
              <i className="icon-location"></i>
              {city.country}
            </span>
            <span className="meta-item">
              <i className="icon-star"></i>
              {city.rating} / 5
            </span>
            <span className="meta-item">
              <i className="icon-attraction"></i>
              {attractions.length} Attractions
            </span>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="quick-facts">
        <h2>Quick Facts</h2>
        <div className="facts-grid">
          <div className="fact-card">
            <div className="fact-icon">
              <i className="icon-weather"></i>
            </div>
            <h3>Best Time to Visit</h3>
            <p>{city.bestTimeToVisit}</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">
              <i className="icon-language"></i>
            </div>
            <h3>Language</h3>
            <p>{city.language}</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">
              <i className="icon-currency"></i>
            </div>
            <h3>Currency</h3>
            <p>{city.currency}</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">
              <i className="icon-time"></i>
            </div>
            <h3>Time Zone</h3>
            <p>{city.timeZone}</p>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="attractions-section">
        <div className="section-header">
          <h2>Top Attractions in {city.name}</h2>
          <div className="controls">
            <div className="filter-buttons">
              <button 
                className={activeCategory === 'all' ? 'active' : ''}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </button>
              <button 
                className={activeCategory === 'historical' ? 'active' : ''}
                onClick={() => handleCategoryChange('historical')}
              >
                Historical
              </button>
              <button 
                className={activeCategory === 'cultural' ? 'active' : ''}
                onClick={() => handleCategoryChange('cultural')}
              >
                Cultural
              </button>
              <button 
                className={activeCategory === 'nature' ? 'active' : ''}
                onClick={() => handleCategoryChange('nature')}
              >
                Nature
              </button>
              <button 
                className={activeCategory === 'entertainment' ? 'active' : ''}
                onClick={() => handleCategoryChange('entertainment')}
              >
                Entertainment
              </button>
            </div>
            <div className="sort-dropdown">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" value={sortBy} onChange={handleSortChange}>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="attractions-grid">
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map(attraction => (
              <div key={attraction.id} className="attraction-card">
                <div className="attraction-image">
                  <img src={attraction.imageUrl} alt={attraction.name} />
                  <div className="attraction-overlay">
                    <span className="attraction-price">${attraction.price}</span>
                    <span className="attraction-rating">
                      <i className="icon-star"></i>
                      {attraction.rating}
                    </span>
                  </div>
                </div>
                <div className="attraction-content">
                  <h3>{attraction.name}</h3>
                  <p className="attraction-description">{attraction.description}</p>
                  <div className="attraction-meta">
                    <span className="meta-item">
                      <i className="icon-time"></i>
                      {attraction.duration}
                    </span>
                    <span className="meta-item">
                      <i className="icon-location"></i>
                      {attraction.distance} from center
                    </span>
                  </div>
                  <div className="attraction-actions">
                    <button className="btn-secondary">Quick View</button>
                    <button className="btn-primary">Add to Itinerary</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No attractions found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Travel Tips */}
      <section className="travel-tips">
        <h2>Travel Tips for {city.name}</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Getting Around</h3>
            <p>{city.transportTips}</p>
          </div>
          <div className="tip-card">
            <h3>Local Customs</h3>
            <p>{city.customTips}</p>
          </div>
          <div className="tip-card">
            <h3>Safety</h3>
            <p>{city.safetyTips}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityGuide;