// src/pages/Destinations/PlaceDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { indianDestinations } from '../../data/mockData/indianDestinations';
import { attractionsData } from '../../data/mockData/attractionsData';
import Loader from '../../components/common/UI/Loader';
import Modal from '../../components/common/UI/Modal';
import './PlaceDetails.css';

const PlaceDetails = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Find place data
        const placeData = indianDestinations.find(p => p.id === parseInt(placeId));
        if (!placeData) {
          navigate('/destinations', { replace: true });
          return;
        }
        setPlace(placeData);
        
        // Find attractions for this place
        const placeAttractions = attractionsData.filter(a => a.destinationId === parseInt(placeId));
        setAttractions(placeAttractions);
      } catch (error) {
        console.error('Error fetching place data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [placeId, navigate]);

  const openGallery = (index = 0) => {
    setSelectedImage(index);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % place.images.length);
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + place.images.length) % place.images.length);
  };

  const handleBookTour = () => {
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    // In a real app, this would process the booking
    alert(`Tour booked for ${travelers} travelers on ${bookingDate}`);
    setShowBookingModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!place) {
    return null; // Already handled by navigation
  }

  return (
    <div className="place-details-container">
      {/* Hero Section */}
      <section className="place-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${place.heroImage})` }}>
        <div className="hero-content">
          <div className="breadcrumb">
            <Link to="/destinations">Destinations</Link> 
            <span className="breadcrumb-separator">/</span> 
            <Link to={`/destinations?region=${place.region.toLowerCase()}`}>{place.region}</Link>
            <span className="breadcrumb-separator">/</span> 
            <span>{place.name}</span>
          </div>
          <h1 className="place-title">{place.name}</h1>
          <p className="place-tagline">{place.tagline}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={handleBookTour}>
              Book a Tour
            </button>
            <button className="btn-secondary" onClick={() => openGallery(0)}>
              View Photos
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{place.rating}</span>
            <span className="stat-label">Rating</span>
          </div>
          <div className="stat">
            <span className="stat-value">{place.bestTime.join(', ')}</span>
            <span className="stat-label">Best Time to Visit</span>
          </div>
          <div className="stat">
            <span className="stat-value">{place.idealDuration}</span>
            <span className="stat-label">Ideal Duration</span>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="detail-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'attractions' ? 'active' : ''}
          onClick={() => setActiveTab('attractions')}
        >
          Attractions ({attractions.length})
        </button>
        <button 
          className={activeTab === 'itinerary' ? 'active' : ''}
          onClick={() => setActiveTab('itinerary')}
        >
          Itinerary
        </button>
        <button 
          className={activeTab === 'travel-info' ? 'active' : ''}
          onClick={() => setActiveTab('travel-info')}
        >
          Travel Info
        </button>
        <button 
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-pane overview-pane">
            <div className="overview-content">
              <div className="overview-text">
                <h2>About {place.name}</h2>
                <p>{place.description}</p>
                
                <div className="highlight-box">
                  <h3>Why Visit {place.name}?</h3>
                  <ul>
                    {place.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="cultural-info">
                  <h3>Cultural Significance</h3>
                  <p>{place.culturalInfo}</p>
                </div>
              </div>
              
              <div className="overview-sidebar">
                <div className="quick-facts">
                  <h3>Quick Facts</h3>
                  <div className="fact-item">
                    <span className="fact-label">State:</span>
                    <span className="fact-value">{place.state}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Language:</span>
                    <span className="fact-value">{place.language.join(', ')}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Best Time:</span>
                    <span className="fact-value">{place.bestTime.join(', ')}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Ideal Duration:</span>
                    <span className="fact-value">{place.idealDuration}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Famous For:</span>
                    <span className="fact-value">{place.famousFor.join(', ')}</span>
                  </div>
                </div>
                
                <div className="weather-widget">
                  <h3>Weather</h3>
                  <div className="weather-info">
                    <div className="weather-icon">🌤️</div>
                    <div className="weather-details">
                      <span className="weather-temp">{place.weather.temperature}</span>
                      <span className="weather-desc">{place.weather.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attractions Tab */}
        {activeTab === 'attractions' && (
          <div className="tab-pane attractions-pane">
            <h2>Top Attractions in {place.name}</h2>
            <div className="attractions-grid">
              {attractions.map(attraction => (
                <div key={attraction.id} className="attraction-card">
                  <div className="attraction-image">
                    <img src={attraction.imageUrl} alt={attraction.name} />
                    <div className="attraction-overlay">
                      <span className="attraction-type">{attraction.type}</span>
                      <span className="attraction-rating">
                        <i className="icon-star"></i>
                        {attraction.rating}
                      </span>
                    </div>
                  </div>
                  <div className="attraction-content">
                    <h3>{attraction.name}</h3>
                    <p>{attraction.description}</p>
                    <div className="attraction-meta">
                      <span>
                        <i className="icon-clock"></i>
                        {attraction.duration}
                      </span>
                      <span>
                        <i className="icon-location"></i>
                        {attraction.distance} from center
                      </span>
                    </div>
                    <button className="btn-secondary">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="tab-pane itinerary-pane">
            <h2>Suggested Itinerary for {place.name}</h2>
            <div className="itinerary-container">
              {place.itinerary.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <div className="day-header">
                    <h3>Day {index + 1}</h3>
                    <span className="day-theme">{day.theme}</span>
                  </div>
                  <div className="day-content">
                    <div className="day-activities">
                      <h4>Activities</h4>
                      <ul>
                        {day.activities.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="day-tips">
                      <h4>Tips</h4>
                      <p>{day.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="itinerary-actions">
              <button className="btn-primary" onClick={handleBookTour}>
                Customize This Itinerary
              </button>
            </div>
          </div>
        )}

        {/* Travel Info Tab */}
        {activeTab === 'travel-info' && (
          <div className="tab-pane travel-info-pane">
            <h2>Travel Information for {place.name}</h2>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">✈️</div>
                <h3>How to Reach</h3>
                <div className="transport-options">
                  {place.howToReach.map((option, index) => (
                    <div key={index} className="transport-option">
                      <h4>{option.mode}</h4>
                      <p>{option.details}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🏨</div>
                <h3>Where to Stay</h3>
                <div className="accommodation-options">
                  {place.accommodation.map((option, index) => (
                    <div key={index} className="accommodation-option">
                      <h4>{option.type}</h4>
                      <p>{option.areas.join(', ')}</p>
                      <span className="price-range">₹{option.priceRange}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🍽️</div>
                <h3>Food & Dining</h3>
                <div className="food-options">
                  <h4>Must-Try Local Dishes</h4>
                  <ul>
                    {place.localCuisine.map((dish, index) => (
                      <li key={index}>{dish}</li>
                    ))}
                  </ul>
                  
                  <h4>Best Dining Areas</h4>
                  <p>{place.diningAreas.join(', ')}</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">💰</div>
                <h3>Budget Planning</h3>
                <div className="budget-breakdown">
                  {place.budget.map((item, index) => (
                    <div key={index} className="budget-item">
                      <span className="budget-category">{item.category}</span>
                      <span className="budget-amount">₹{item.amount}</span>
                    </div>
                  ))}
                  <div className="budget-total">
                    <span>Estimated Daily Cost</span>
                    <span>₹{place.budget.reduce((sum, item) => sum + item.amount, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="tab-pane gallery-pane">
            <h2>{place.name} Gallery</h2>
            <div className="gallery-grid">
              {place.images.map((image, index) => (
                <div 
                  key={index} 
                  className="gallery-item"
                  onClick={() => openGallery(index)}
                >
                  <img src={image} alt={`${place.name} view ${index + 1}`} />
                  <div className="gallery-overlay">
                    <i className="icon-expand"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Gallery Modal */}
      <Modal isOpen={showGallery} onClose={closeGallery} size="fullscreen">
        <div className="gallery-modal">
          <div className="gallery-main">
            <button className="gallery-nav prev" onClick={prevImage}>
              <i className="icon-arrow-left"></i>
            </button>
            <img 
              src={place.images[selectedImage]} 
              alt={`${place.name} view ${selectedImage + 1}`} 
            />
            <button className="gallery-nav next" onClick={nextImage}>
              <i className="icon-arrow-right"></i>
            </button>
          </div>
          <div className="gallery-thumbnails">
            {place.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Booking Modal */}
      <Modal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} title={`Book a Tour to ${place.name}`}>
        <div className="booking-modal">
          <div className="booking-summary">
            <img src={place.images[0]} alt={place.name} />
            <div className="booking-details">
              <h3>{place.name} Tour</h3>
              <p>Explore the beauty and culture of {place.name}</p>
              <div className="tour-highlights">
                {place.highlights.slice(0, 3).map((highlight, index) => (
                  <span key={index} className="tour-highlight">✓ {highlight}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="booking-form">
            <div className="form-group">
              <label htmlFor="booking-date">Travel Date</label>
              <input
                type="date"
                id="booking-date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="travelers">Number of Travelers</label>
              <select
                id="travelers"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>
                    {i+1} {i+1 === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="price-breakdown">
              <div className="price-line">
                <span>₹{place.budget.reduce((sum, item) => sum + item.amount, 0)} × {travelers} travelers</span>
                <span>₹{place.budget.reduce((sum, item) => sum + item.amount, 0) * travelers}</span>
              </div>
              <div className="price-total">
                <span>Total Amount</span>
                <span>₹{place.budget.reduce((sum, item) => sum + item.amount, 0) * travelers}</span>
              </div>
            </div>
            
            <button 
              className="btn-book-now"
              onClick={confirmBooking}
              disabled={!bookingDate}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlaceDetails;