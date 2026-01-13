import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/Booking/TourBooking.css';

const TourBooking = () => {
  const [step, setStep] = useState(1); // 1: Tour Selection, 2: Itinerary Review, 3: Personal Info, 4: Confirmation
  const [bookingData, setBookingData] = useState({
    tourPackage: '',
    date: '',
    numberOfPeople: 1,
    groupSize: 'small', // small, medium, large
    activities: [],
    guidePreference: '',
    specialRequests: '',
    fullName: '',
    email: '',
    phone: '',
    discountCode: ''
  });
  
  const [tourDetails, setTourDetails] = useState(null);
  const [groupDiscount, setGroupDiscount] = useState(0); // percentage discount
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const tourPackages = [
    {
      id: 'mountain-adventure',
      name: 'Mountain Adventure',
      price: 199,
      duration: '5 days',
      difficulty: 'Moderate',
      groupSize: '12 people',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Experience breathtaking mountain views and challenging trails.',
      itinerary: [
        { day: 1, title: 'Arrival & Orientation', description: 'Check-in and welcome briefing.' },
        { day: 2, title: 'Trail Hiking', description: 'Beginner-friendly trails with scenic views.' },
        { day: 3, title: 'Advanced Trails', description: 'Challenging hikes with panoramic views.' },
        { day: 4, title: 'Mountain Peak', description: 'Summit attempt and celebration.' },
        { day: 5, title: 'Departure', description: 'Checkout and departure.' }
      ],
      activities: ['Hiking', 'Photography', 'Campfire', 'Nature Walk'],
      guides: [
        { id: 'guide-1', name: 'John Mountain Expert', rating: 4.9, languages: ['English', 'Spanish'] },
        { id: 'guide-2', name: 'Sarah Trail Guide', rating: 4.7, languages: ['English', 'French'] }
      ]
    },
    {
      id: 'beach-paradise',
      name: 'Beach Paradise',
      price: 299,
      duration: '7 days',
      difficulty: 'Easy',
      groupSize: '15 people',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Relaxing beach vacation with water sports and luxury amenities.',
      itinerary: [
        { day: 1, title: 'Arrival & Resort Check-in', description: 'Welcome drinks and resort orientation.' },
        { day: 2, title: 'Snorkeling & Beach Games', description: 'Morning snorkeling session and afternoon games.' },
        { day: 3, title: 'Water Sports Day', description: 'Kayaking, paddleboarding, and jet skiing.' },
        { day: 4, title: 'Spa & Relaxation', description: 'Luxury spa treatments and beach relaxation.' },
        { day: 5, title: 'Sunset Cruise', description: 'Romantic sunset cruise with dinner.' },
        { day: 6, title: 'Local Culture Tour', description: 'Visit local markets and cultural sites.' },
        { day: 7, title: 'Departure', description: 'Checkout and farewell.' }
      ],
      activities: ['Snorkeling', 'Water Sports', 'Spa', 'Cultural Tour'],
      guides: [
        { id: 'guide-3', name: 'Maria Beach Specialist', rating: 4.8, languages: ['English', 'Portuguese'] },
        { id: 'guide-4', name: 'David Water Sports Pro', rating: 4.6, languages: ['English', 'German'] }
      ]
    },
    {
      id: 'city-explorer',
      name: 'City Explorer',
      price: 149,
      duration: '3 days',
      difficulty: 'Easy',
      groupSize: '20 people',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Urban exploration with sightseeing and local experiences.',
      itinerary: [
        { day: 1, title: 'Historic District Tour', description: 'Guided walking tour of historic sites.' },
        { day: 2, title: 'Museums & Galleries', description: 'Visit famous museums and art galleries.' },
        { day: 3, title: 'Local Food Tour', description: 'Taste local cuisine and specialties.' }
      ],
      activities: ['Walking Tour', 'Museum Visit', 'Food Tasting', 'Shopping'],
      guides: [
        { id: 'guide-5', name: 'Alex City Historian', rating: 4.7, languages: ['English', 'Italian'] },
        { id: 'guide-6', name: 'Emma Cultural Guide', rating: 4.8, languages: ['English', 'French', 'Spanish'] }
      ]
    },
    {
      id: 'wildlife-safari',
      name: 'Wildlife Safari',
      price: 399,
      duration: '6 days',
      difficulty: 'Moderate',
      groupSize: '8 people',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Exciting wildlife adventure with animal sightings and nature photography.',
      itinerary: [
        { day: 1, title: 'Arrival & Briefing', description: 'Welcome and safari safety briefing.' },
        { day: 2, title: 'Morning Game Drive', description: 'Early morning wildlife spotting.' },
        { day: 3, title: 'Bush Walk & Photography', description: 'Guided nature walk and photography session.' },
        { day: 4, title: 'River Safari', description: 'Boat ride for aquatic wildlife viewing.' },
        { day: 5, title: 'Night Safari', description: 'Spot nocturnal animals and stargazing.' },
        { day: 6, title: 'Departure', description: 'Final game drive and departure.' }
      ],
      activities: ['Game Drives', 'Bush Walk', 'Photography', 'Night Safari'],
      guides: [
        { id: 'guide-7', name: 'Robert Wildlife Expert', rating: 5.0, languages: ['English', 'Swahili'] },
        { id: 'guide-8', name: 'Lisa Nature Photographer', rating: 4.9, languages: ['English', 'French'] }
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => {
      if (prev.includes(activity)) {
        return prev.filter(a => a !== activity);
      } else {
        return [...prev, activity];
      }
    });
  };

  const handleGuideSelect = (guideId) => {
    setBookingData(prev => ({
      ...prev,
      guidePreference: guideId
    }));
  };

  const handleGroupSizeChange = (size) => {
    setBookingData(prev => ({
      ...prev,
      groupSize: size
    }));
  };

  const calculateDiscount = (size, peopleCount) => {
    if (peopleCount >= 10) return 15; // 15% discount for 10+ people
    if (peopleCount >= 6) return 10; // 10% discount for 6+ people
    if (peopleCount >= 4) return 5;  // 5% discount for 4+ people
    return 0;
  };

  const calculatePrice = () => {
    const selectedPackage = tourPackages.find(pkg => pkg.id === bookingData.tourPackage);
    if (!selectedPackage) return 0;
    
    let basePrice = selectedPackage.price * bookingData.numberOfPeople;
    const discount = calculateDiscount(bookingData.groupSize, bookingData.numberOfPeople);
    const discountedPrice = basePrice * (1 - discount / 100);
    
    // Add extra for premium activities
    const activitySurcharge = selectedActivities.length * 25 * bookingData.numberOfPeople;
    
    return Math.round(discountedPrice + activitySurcharge);
  };

  useEffect(() => {
    const selectedPackage = tourPackages.find(pkg => pkg.id === bookingData.tourPackage);
    setTourDetails(selectedPackage || null);
    
    const discount = calculateDiscount(bookingData.groupSize, bookingData.numberOfPeople);
    setGroupDiscount(discount);
    
    setCalculatedPrice(calculatePrice());
  }, [bookingData.tourPackage, bookingData.numberOfPeople, bookingData.groupSize, selectedActivities]);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare final booking data
    const finalBookingData = {
      ...bookingData,
      selectedActivities,
      calculatedPrice,
      groupDiscount
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Booking submitted:', finalBookingData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setStep(1);
      setBookingData({
        tourPackage: '',
        date: '',
        numberOfPeople: 1,
        groupSize: 'small',
        activities: [],
        guidePreference: '',
        specialRequests: '',
        fullName: '',
        email: '',
        phone: '',
        discountCode: ''
      });
      setSelectedActivities([]);
    }, 3000);
  };



  return (
    <div className="tour-booking-container">
      <div className="booking-header">
        <h1>Book Your Tour Adventure</h1>
        <p>Customize your perfect travel experience</p>
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          {[1, 2, 3, 4].map(num => (
            <div 
              key={num} 
              className={`progress-step ${step === num ? 'active' : num < step ? 'completed' : ''}`}
            >
              <span className="step-number">{num}</span>
              <span className="step-label">
                {num === 1 && 'Tour Selection'}
                {num === 2 && 'Itinerary Review'}
                {num === 3 && 'Personal Info'}
                {num === 4 && 'Confirmation'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="booking-content">
        {step === 1 && (
          <div className="step-content">
            <h2>Select Your Tour Package</h2>
            
            <div className="tour-packages-grid">
              {tourPackages.map(pkg => (
                <div 
                  key={pkg.id} 
                  className={`tour-package-card ${bookingData.tourPackage === pkg.id ? 'selected' : ''}`}
                  onClick={() => setBookingData(prev => ({ ...prev, tourPackage: pkg.id }))}
                >
                  <div className="package-image">
                    <img src={pkg.image} alt={pkg.name} />
                    <div className="package-badge">★ {pkg.rating}</div>
                  </div>
                  <div className="package-info">
                    <h3>{pkg.name}</h3>
                    <p className="package-description">{pkg.description}</p>
                    <div className="package-meta">
                      <span>{pkg.duration}</span>
                      <span>{pkg.difficulty}</span>
                      <span>{pkg.groupSize}</span>
                    </div>
                    <div className="package-price">
                      <span className="price">${pkg.price}</span>
                      <span className="per-person">per person</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {tourDetails && (
              <div className="tour-details-section">
                <h3>Tour Details</h3>
                <div className="tour-itinerary">
                  <h4>Sample Itinerary</h4>
                  <div className="itinerary-preview">
                    {tourDetails.itinerary.slice(0, 3).map((day, index) => (
                      <div key={index} className="itinerary-day">
                        <div className="day-number">Day {day.day}</div>
                        <div className="day-details">
                          <h5>{day.title}</h5>
                          <p>{day.description}</p>
                        </div>
                      </div>
                    ))}
                    {tourDetails.itinerary.length > 3 && (
                      <div className="more-days">...and {tourDetails.itinerary.length - 3} more days</div>
                    )}
                  </div>
                </div>
                
                <div className="tour-activities">
                  <h4>Available Activities</h4>
                  <div className="activities-grid">
                    {tourDetails.activities.map((activity, index) => (
                      <div 
                        key={index} 
                        className={`activity-item ${selectedActivities.includes(activity) ? 'selected' : ''}`}
                        onClick={() => handleActivityToggle(activity)}
                      >
                        <span className="activity-name">{activity}</span>
                        <span className="activity-price">+$25</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Tour Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numberOfPeople">Number of People *</label>
                <div className="passenger-controls">
                  <button 
                    type="button" 
                    onClick={() => bookingData.numberOfPeople > 1 && setBookingData(prev => ({
                      ...prev, 
                      numberOfPeople: prev.numberOfPeople - 1
                    }))}
                    disabled={bookingData.numberOfPeople <= 1}
                  >
                    -
                  </button>
                  <span className="passenger-count">{bookingData.numberOfPeople}</span>
                  <button 
                    type="button" 
                    onClick={() => bookingData.numberOfPeople < 20 && setBookingData(prev => ({
                      ...prev, 
                      numberOfPeople: prev.numberOfPeople + 1
                    }))}
                    disabled={bookingData.numberOfPeople >= 20}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="group-size-selection">
              <h4>Group Size Preference</h4>
              <div className="group-size-options">
                <button 
                  className={bookingData.groupSize === 'small' ? 'active' : ''}
                  onClick={() => handleGroupSizeChange('small')}
                >
                  Small (1-4 people)
                </button>
                <button 
                  className={bookingData.groupSize === 'medium' ? 'active' : ''}
                  onClick={() => handleGroupSizeChange('medium')}
                >
                  Medium (5-8 people)
                </button>
                <button 
                  className={bookingData.groupSize === 'large' ? 'active' : ''}
                  onClick={() => handleGroupSizeChange('large')}
                >
                  Large (9+ people)
                </button>
              </div>
            </div>
            
            <button 
              className="nav-button next" 
              onClick={nextStep}
              disabled={!bookingData.tourPackage || !bookingData.date}
            >
              Continue to Itinerary Review
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="step-content">
            <h2>Review Itinerary & Customize</h2>
            
            {tourDetails && (
              <>
                <div className="itinerary-full">
                  <h3>Detailed Itinerary for {tourDetails.name}</h3>
                  <div className="itinerary-timeline">
                    {tourDetails.itinerary.map((day, index) => (
                      <div key={index} className="itinerary-day-full">
                        <div className="day-marker">Day {day.day}</div>
                        <div className="day-content">
                          <h4>{day.title}</h4>
                          <p>{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="guide-selection">
                  <h3>Select Your Guide</h3>
                  <div className="guides-grid">
                    {tourDetails.guides.map(guide => (
                      <div 
                        key={guide.id} 
                        className={`guide-card ${bookingData.guidePreference === guide.id ? 'selected' : ''}`}
                        onClick={() => handleGuideSelect(guide.id)}
                      >
                        <div className="guide-info">
                          <h4>{guide.name}</h4>
                          <div className="guide-rating">
                            ★ {guide.rating}
                            <span className="languages">{guide.languages.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="discount-section">
                  <h3>Discounts & Promotions</h3>
                  <div className="discount-code">
                    <input
                      type="text"
                      placeholder="Enter discount code"
                      value={bookingData.discountCode}
                      onChange={(e) => setBookingData(prev => ({ ...prev, discountCode: e.target.value }))}
                    />
                    <button type="button">Apply</button>
                  </div>
                  
                  {groupDiscount > 0 && (
                    <div className="group-discount-applied">
                      Group Discount Applied: {groupDiscount}% off (${Math.round(tourDetails.price * bookingData.numberOfPeople * groupDiscount / 100)})
                    </div>
                  )}
                </div>
              </>
            )}
            
            <div className="navigation-buttons">
              <button className="nav-button prev" onClick={prevStep}>Back</button>
              <button className="nav-button next" onClick={nextStep}>Continue to Personal Info</button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="step-content">
            <h2>Personal Information</h2>
            
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>
              </div>
              
              <div className="price-summary">
                <h3>Price Summary</h3>
                <div className="price-breakdown">
                  <div className="breakdown-item">
                    <span>Tour Package ({tourDetails?.name || 'Selected Tour'}) x {bookingData.numberOfPeople}</span>
                    <span>${tourDetails ? tourDetails.price * bookingData.numberOfPeople : 0}</span>
                  </div>
                  
                  {selectedActivities.length > 0 && (
                    <div className="breakdown-item">
                      <span>Activities ({selectedActivities.length}): {selectedActivities.join(', ')}</span>
                      <span>+${selectedActivities.length * 25 * bookingData.numberOfPeople}</span>
                    </div>
                  )}
                  
                  {groupDiscount > 0 && (
                    <div className="breakdown-item discount">
                      <span>Group Discount ({groupDiscount}%)</span>
                      <span>-${Math.round((tourDetails?.price * bookingData.numberOfPeople) * groupDiscount / 100)}</span>
                    </div>
                  )}
                  
                  {bookingData.discountCode && (
                    <div className="breakdown-item discount">
                      <span>Promo Code Discount</span>
                      <span>-$20</span>
                    </div>
                  )}
                </div>
                
                <div className="total-price">
                  <span>Total Price</span>
                  <span className="final-price">${calculatedPrice}</span>
                </div>
              </div>
              
              <div className="navigation-buttons">
                <button type="button" className="nav-button prev" onClick={prevStep}>Back</button>
                <button type="submit" className={`nav-button next ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {step === 4 && (
          <div className="step-content confirmation">
            <div className="confirmation-icon">✅</div>
            <h2>Booking Confirmed!</h2>
            <p>Your tour adventure has been successfully booked.</p>
            
            <div className="booking-details-summary">
              <h3>Booking Details</h3>
              <p><strong>Tour:</strong> {tourDetails?.name}</p>
              <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
              <p><strong>Participants:</strong> {bookingData.numberOfPeople}</p>
              <p><strong>Total Paid:</strong> ${calculatedPrice}</p>
              <p><strong>Reference:</strong> TOUR-{Date.now().toString().slice(-6)}</p>
            </div>
            
            <button className="nav-button" onClick={() => {
              setStep(1);
              setBookingData({
                tourPackage: '',
                date: '',
                numberOfPeople: 1,
                groupSize: 'small',
                activities: [],
                guidePreference: '',
                specialRequests: '',
                fullName: '',
                email: '',
                phone: '',
                discountCode: ''
              });
              setSelectedActivities([]);
            }}>
              Book Another Tour
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBooking;