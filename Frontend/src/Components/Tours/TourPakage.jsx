// tours/TourPackage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TourCard from './TourCard';
import Itinerary from './Itinerary';
import GuideProfile from './GuideProfile';
import './TourPackage.css';

const TourPackage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call
    const fetchTour = async () => {
      try {
        // In a real app, this would be an API call
        const tourData = {
          id: id,
          title: "Majestic Swiss Alps Adventure",
          description: "Experience the breathtaking beauty of the Swiss Alps with our 7-day guided tour. Explore picturesque villages, hike through stunning landscapes, and enjoy authentic Swiss cuisine.",
          price: 1299,
          duration: "7 days",
          groupSize: "12 people",
          difficulty: "Moderate",
          images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          ],
          includes: ["Accommodation", "Professional guide", "Meals as indicated", "Transportation", "Entrance fees"],
          excludes: ["Flights", "Travel insurance", "Personal expenses", "Optional activities"],
          itinerary: [
            { day: 1, title: "Arrival in Zurich", description: "Meet your guide and transfer to your hotel. Welcome dinner and orientation." },
            { day: 2, title: "Zurich to Lucerne", description: "Scenic train ride to Lucerne. City tour and visit to the Lion Monument." },
            { day: 3, title: "Mount Pilatus", description: "Cable car ascent to Mount Pilatus. Hiking and breathtaking views of the Alps." },
            { day: 4, title: "Interlaken and Jungfrau Region", description: "Travel to Interlaken. Explore the beautiful Jungfrau region." },
            { day: 5, title: "Grindelwald First", description: "Adventure activities at Grindelwald First. Optional paragliding or hiking." },
            { day: 6, title: "Bernese Oberland", description: "Explore traditional Swiss villages and enjoy cheese tasting." },
            { day: 7, title: "Return to Zurich and Departure", description: "Travel back to Zurich with a stop at Rhine Falls. Departure." }
          ],
          guide: {
            name: "Michael Schneider",
            bio: "Michael has been guiding tours in the Swiss Alps for over 10 years. He is a certified mountain guide and passionate about sharing his love for the mountains with visitors from around the world.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            languages: ["English", "German", "French"],
            rating: 4.9,
            reviews: 127
          },
          reviews: [
            { user: "Sarah J.", rating: 5, comment: "This tour exceeded all my expectations. The scenery was breathtaking and our guide Michael was incredibly knowledgeable." },
            { user: "Robert K.", rating: 5, comment: "The perfect balance of adventure and relaxation. The Swiss Alps are even more beautiful in person!" },
            { user: "Emily L.", rating: 4, comment: "Great experience overall. The accommodations were comfortable and the itinerary was well-planned." }
          ]
        };
        setTour(tourData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading tour details...</div>;
  }

  if (!tour) {
    return <div className="error">Tour not found</div>;
  }

  return (
    <div className="tour-package">
      <div className="tour-hero" style={{ backgroundImage: `url(${tour.images[0]})` }}>
        <div className="hero-overlay">
          <div className="container">
            <h1>{tour.title}</h1>
            <div className="tour-meta">
              <span>{tour.duration}</span>
              <span>{tour.groupSize}</span>
              <span>{tour.difficulty}</span>
            </div>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tour-content">
          <div className="tour-main">
            <div className="tab-navigation">
              <button 
                className={activeTab === 'overview' ? 'active' : ''} 
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={activeTab === 'itinerary' ? 'active' : ''} 
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button 
                className={activeTab === 'guide' ? 'active' : ''} 
                onClick={() => setActiveTab('guide')}
              >
                Guide
              </button>
              <button 
                className={activeTab === 'reviews' ? 'active' : ''} 
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview">
                  <h2>Tour Description</h2>
                  <p>{tour.description}</p>
                  
                  <div className="inclusions-exclusions">
                    <div className="inclusions">
                      <h3>What's Included</h3>
                      <ul>
                        {tour.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="exclusions">
                      <h3>What's Not Included</h3>
                      <ul>
                        {tour.excludes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && <Itinerary itinerary={tour.itinerary} />}
              {activeTab === 'guide' && <GuideProfile guide={tour.guide} />}
              
              {activeTab === 'reviews' && (
                <div className="reviews">
                  <h2>Customer Reviews</h2>
                  <div className="review-list">
                    {tour.reviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <h4>{review.user}</h4>
                          <div className="rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < review.rating ? 'star filled' : 'star'}>★</span>
                            ))}
                          </div>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="tour-sidebar">
            <div className="booking-card card">
              <h3>Tour Details</h3>
              <div className="price">${tour.price} <span>per person</span></div>
              
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">{tour.duration}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Group Size:</span>
                <span className="value">{tour.groupSize}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">Difficulty:</span>
                <span className="value">{tour.difficulty}</span>
              </div>
              
              <button className="btn btn-primary full-width">Book Now</button>
              <button className="btn btn-secondary full-width">Add to Wishlist</button>
            </div>

            <div className="image-gallery">
              {tour.images.slice(1, 4).map((image, index) => (
                <div key={index} className="gallery-item">
                  <img src={image} alt={`${tour.title} ${index + 2}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackage;