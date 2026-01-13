// src/pages/Destinations/LocalExperiences.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { citiesData } from '../../data/mockData/citiesData';
import { EXPERIENCES_DATA } from "../../data/mockData/experiencesData";
import Loader from '../../Components/common/UI/Loader';
import Modal from '../../Components/common/UI/Modal';
import '../../Styles/Pages/Destinations/LocalExperiences.css';

const LocalExperiences = () => {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState(1);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Experiences', icon: '🌍' },
    { id: 'food', name: 'Food & Drink', icon: '🍕' },
    { id: 'culture', name: 'Cultural', icon: '🎭' },
    { id: 'adventure', name: 'Adventure', icon: '🧗' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'art', name: 'Art & Craft', icon: '🎨' },
    { id: 'history', name: 'Historical', icon: '🏛️' },
    { id: 'nightlife', name: 'Nightlife', icon: '🍹' }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Find city data
        const cityData = citiesData.find(c => c.id === parseInt(cityId));
        setCity(cityData);
        
        // Find experiences for this city
        // Map cityId to actual city names
        const cityNameMap = {
          1: 'Paris',
          2: 'Bali',
          3: 'Kyoto',
          4: 'Rome',
          5: 'New York',
          6: 'Manuel Antonio',
          7: 'Queenstown',
          8: 'Cape Town',
          9: 'Santorini',
          10: 'Aguas Calientes'
        };
        const targetCityName = cityNameMap[parseInt(cityId)];
        
        const cityExperiences = targetCityName 
          ? EXPERIENCES_DATA.filter(e => e.location.city === targetCityName)
          : [];
        setExperiences(cityExperiences);
        setFilteredExperiences(cityExperiences);
      } catch (error) {
        console.error('Error fetching experiences data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityId]);

  useEffect(() => {
    // Filter experiences by category
    if (activeCategory === 'all') {
      setFilteredExperiences(experiences);
    } else {
      const filtered = experiences.filter(exp => 
        exp.categories.includes(activeCategory)
      );
      setFilteredExperiences(filtered);
    }
  }, [activeCategory, experiences]);

  useEffect(() => {
    // Sort experiences
    const sortedExperiences = [...filteredExperiences];
    
    switch(sortBy) {
      case 'popularity':
        sortedExperiences.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        sortedExperiences.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedExperiences.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        sortedExperiences.sort((a, b) => a.duration - b.duration);
        break;
      case 'name':
        sortedExperiences.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredExperiences(sortedExperiences);
  }, [sortBy, experiences, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const openExperienceModal = (experience) => {
    setSelectedExperience(experience);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExperience(null);
  };

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Booking confirmed for ${participants} participants on ${date}`);
    closeModal();
  };

  if (loading) {
    return <Loader />;
  }

  if (!city) {
    return (
      <div className="local-experiences-container">
        <div className="not-found">
          <h2>City not found</h2>
          <p>We couldn't find local experiences for this city.</p>
          <Link to="/destinations" className="btn-primary">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="local-experiences-container">
      {/* Hero Section */}
      <section className="experiences-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${city.experiencesImage || city.imageUrl})` }}>
        <div className="hero-content">
          <h1 className="hero-title">Local Experiences in {city.name}</h1>
          <p className="hero-subtitle">Discover authentic activities hosted by locals</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{experiences.length}+</span>
              <span className="stat-label">Experiences</span>
            </div>
            <div className="stat">
              <span className="stat-number">{Math.max(...experiences.map(e => e.rating))}</span>
              <span className="stat-label">Avg. Rating</span>
            </div>
            <div className="stat">
              <span className="stat-number">{new Set(experiences.map(e => e.hostId)).size}</span>
              <span className="stat-label">Local Hosts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="categories-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-scroller">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="experiences-section">
        <div className="section-header">
          <h2 className="section-title">
            {activeCategory === 'all' ? 'All Experiences' : 
              `${categories.find(c => c.id === activeCategory)?.name} in ${city.name}`}
            <span className="results-count"> ({filteredExperiences.length})</span>
          </h2>
          <div className="sort-controls">
            <label htmlFor="sort-experiences">Sort by:</label>
            <select 
              id="sort-experiences" 
              value={sortBy} 
              onChange={handleSortChange}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {filteredExperiences.length > 0 ? (
          <div className="experiences-grid">
            {filteredExperiences.map(experience => (
              <div key={experience.id} className="experience-card">
                <div className="experience-image">
                  <img src={experience.imageUrl} alt={experience.name} />
                  <div className="experience-badges">
                    <span className="badge rating">
                      <i className="icon-star"></i>
                      {experience.rating}
                    </span>
                    {experience.isPopular && (
                      <span className="badge popular">Popular</span>
                    )}
                    {experience.isNew && (
                      <span className="badge new">New</span>
                    )}
                  </div>
                  <button 
                    className="quick-view-btn"
                    onClick={() => openExperienceModal(experience)}
                  >
                    Quick View
                  </button>
                </div>
                <div className="experience-content">
                  <h3 className="experience-title">{experience.name}</h3>
                  <p className="experience-description">{experience.shortDescription}</p>
                  
                  <div className="experience-meta">
                    <div className="meta-item">
                      <i className="icon-clock"></i>
                      {experience.duration} hours
                    </div>
                    <div className="meta-item">
                      <i className="icon-group"></i>
                      Up to {experience.maxParticipants}
                    </div>
                    <div className="meta-item">
                      <i className="icon-location"></i>
                      {experience.locationType}
                    </div>
                  </div>
                  
                  <div className="experience-footer">
                    <div className="price">
                      <span className="price-amount">${experience.price}</span>
                      <span className="price-per">per person</span>
                    </div>
                    <button 
                      className="btn-book"
                      onClick={() => openExperienceModal(experience)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <i className="icon-search"></i>
              <h3>No experiences found</h3>
              <p>Try selecting a different category or check back later for new experiences.</p>
              <button 
                className="btn-primary"
                onClick={() => setActiveCategory('all')}
              >
                View All Experiences
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Host Section */}
      <section className="hosts-section">
        <div className="hosts-content">
          <div className="hosts-text">
            <h2>Hosted by Locals</h2>
            <p>All our experiences are hosted by passionate locals who can't wait to share their city's hidden gems with you. Get insider knowledge and personalized attention that you won't find anywhere else.</p>
            <ul className="host-benefits">
              <li><i className="icon-check"></i> Authentic local experiences</li>
              <li><i className="icon-check"></i> Small group sizes</li>
              <li><i className="icon-check"></i> Personalized attention</li>
              <li><i className="icon-check"></i> Unique access to hidden spots</li>
            </ul>
          </div>
          <div className="hosts-visual">
            <div className="host-cards">
              <div className="host-card host-card-1">
                <div className="host-avatar"></div>
                <div className="host-info">
                  <h4>Maria L.</h4>
                  <p>Food Tour Host</p>
                </div>
              </div>
              <div className="host-card host-card-2">
                <div className="host-avatar"></div>
                <div className="host-info">
                  <h4>James T.</h4>
                  <p>History Guide</p>
                </div>
              </div>
              <div className="host-card host-card-3">
                <div className="host-avatar"></div>
                <div className="host-info">
                  <h4>Sophie M.</h4>
                  <p>Art Workshop Host</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Detail Modal */}
      <Modal isOpen={showModal} onClose={closeModal} title={selectedExperience?.name}>
        {selectedExperience && (
          <div className="experience-modal">
            <div className="modal-hero">
              <img src={selectedExperience.imageUrl} alt={selectedExperience.name} />
              <div className="modal-badges">
                <span className="badge rating">
                  <i className="icon-star"></i>
                  {selectedExperience.rating} ({selectedExperience.reviewCount} reviews)
                </span>
                {selectedExperience.isPopular && (
                  <span className="badge popular">Popular</span>
                )}
              </div>
            </div>
            
            <div className="modal-content">
              <p className="experience-full-description">
                {selectedExperience.fullDescription}
              </p>
              
              <div className="experience-details">
                <div className="detail-item">
                  <h4><i className="icon-clock"></i> Duration</h4>
                  <p>{selectedExperience.duration} hours</p>
                </div>
                <div className="detail-item">
                  <h4><i className="icon-group"></i> Group Size</h4>
                  <p>Up to {selectedExperience.maxParticipants} people</p>
                </div>
                <div className="detail-item">
                  <h4><i className="icon-location"></i> Meeting Point</h4>
                  <p>{selectedExperience.meetingPoint}</p>
                </div>
                <div className="detail-item">
                  <h4><i className="icon-language"></i> Language</h4>
                  <p>{selectedExperience.languages.join(', ')}</p>
                </div>
              </div>
              
              <div className="booking-form">
                <h3>Book this Experience</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience-date">Date</label>
                    <input
                      type="date"
                      id="experience-date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="participants">Participants</label>
                    <select
                      id="participants"
                      value={participants}
                      onChange={(e) => setParticipants(parseInt(e.target.value))}
                    >
                      {[...Array(selectedExperience.maxParticipants)].map((_, i) => (
                        <option key={i+1} value={i+1}>
                          {i+1} {i+1 === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="price-summary">
                  <div className="price-line">
                    <span>${selectedExperience.price} × {participants} {participants === 1 ? 'person' : 'people'}</span>
                    <span>${selectedExperience.price * participants}</span>
                  </div>
                  <div className="price-total">
                    <span>Total</span>
                    <span>${selectedExperience.price * participants}</span>
                  </div>
                </div>
                
                <button 
                  className="btn-book-large"
                  onClick={handleBooking}
                  disabled={!date}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LocalExperiences;