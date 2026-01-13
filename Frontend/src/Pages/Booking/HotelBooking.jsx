import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/Booking/HotelBooking.css';

const HotelBooking = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    adults: 1,
    children: 0,
    rooms: 1,
    propertyType: 'all',
    priceRange: [0, 1000],
    starRating: [0, 5]
  });
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    amenities: [],
    propertyTypes: [],
    freeCancellation: false,
    breakfastIncluded: false,
    refundable: false
  });
  const [bookingDetails, setBookingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    loyaltyProgram: '',
    membershipNumber: ''
  });
  const [roomOptions, setRoomOptions] = useState({
    bedType: 'double',
    smokingPreference: 'non-smoking',
    floorPreference: 'any'
  });
  const [galleryView, setGalleryView] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Advanced sample hotel data with more options
  const hotelData = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York City',
      address: '123 Broadway, New York, NY 10001',
      rating: 4.5,
      reviewCount: 1245,
      price: 245,
      basePrice: 220,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Business Center', 'Parking'],
      description: 'Luxury hotel in the heart of Manhattan with stunning city views and premium amenities.',
      propertyType: 'hotel',
      starRating: 4,
      freeCancellation: true,
      breakfastIncluded: true,
      refundable: true,
      rooms: [
        { id: 1, type: 'Deluxe King Room', bedType: 'King', occupancy: 2, price: 245, amenities: ['WiFi', 'Balcony', 'Coffee Maker'] },
        { id: 2, type: 'Executive Suite', bedType: 'King', occupancy: 2, price: 395, amenities: ['WiFi', 'Living Area', 'Kitchenette', 'Balcony'] },
        { id: 3, type: 'Family Room', bedType: '2 Double', occupancy: 4, price: 320, amenities: ['WiFi', 'Kitchenette', 'Balcony'] }
      ]
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Miami Beach',
      address: '456 Ocean Drive, Miami Beach, FL 33139',
      rating: 4.7,
      reviewCount: 892,
      price: 320,
      basePrice: 300,
      discount: 7,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Bar', 'Spa', 'Kids Club', 'Water Sports'],
      description: 'Beautiful beachfront resort with private beach access and tropical gardens.',
      propertyType: 'resort',
      starRating: 5,
      freeCancellation: true,
      breakfastIncluded: true,
      refundable: true,
      rooms: [
        { id: 1, type: 'Oceanview King', bedType: 'King', occupancy: 2, price: 320, amenities: ['WiFi', 'Ocean View', 'Balcony', 'Coffee Maker'] },
        { id: 2, type: 'Presidential Suite', bedType: 'King', occupancy: 2, price: 595, amenities: ['WiFi', 'Ocean View', 'Private Pool', 'Butler Service'] },
        { id: 3, type: 'Family Villa', bedType: '2 Queen', occupancy: 4, price: 450, amenities: ['WiFi', 'Private Garden', 'Kitchen', 'Pool Access'] }
      ]
    },
    {
      id: 3,
      name: 'Mountain Retreat',
      location: 'Aspen, Colorado',
      address: '789 Mountain View Road, Aspen, CO 81611',
      rating: 4.8,
      reviewCount: 634,
      price: 395,
      basePrice: 375,
      discount: 5,
      image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Ski Access', 'Fireplace', 'Hot Tub', 'Free WiFi', 'Restaurant', 'Ski Storage', 'Shuttle Service'],
      description: 'Luxury mountain resort with direct ski access and breathtaking mountain views.',
      propertyType: 'resort',
      starRating: 5,
      freeCancellation: true,
      breakfastIncluded: true,
      refundable: true,
      rooms: [
        { id: 1, type: 'Ski-In Chalet', bedType: 'King', occupancy: 2, price: 395, amenities: ['WiFi', 'Fireplace', 'Balcony', 'Ski Access'] },
        { id: 2, type: 'Luxury Lodge', bedType: 'King', occupancy: 2, price: 545, amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'Mountain View'] },
        { id: 3, type: 'Family Cabin', bedType: '2 Queen', occupancy: 4, price: 480, amenities: ['WiFi', 'Fireplace', 'Kitchenette', 'Mountain View'] }
      ]
    },
    {
      id: 4,
      name: 'Urban Loft Hotel',
      location: 'San Francisco',
      address: '101 Downtown Street, San Francisco, CA 94102',
      rating: 4.3,
      reviewCount: 521,
      price: 189,
      basePrice: 175,
      discount: 8,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free WiFi', 'Rooftop Bar', 'Fitness Center', 'Restaurant', 'Concierge', 'Valet Parking'],
      description: 'Modern hotel in downtown with stylish rooms and convenient access to attractions.',
      propertyType: 'hotel',
      starRating: 4,
      freeCancellation: false,
      breakfastIncluded: false,
      refundable: true,
      rooms: [
        { id: 1, type: 'City View Studio', bedType: 'Queen', occupancy: 2, price: 189, amenities: ['WiFi', 'City View', 'Coffee Maker'] },
        { id: 2, type: 'Executive Loft', bedType: 'King', occupancy: 2, price: 295, amenities: ['WiFi', 'City View', 'Living Area', 'Rooftop Access'] },
        { id: 3, type: 'Penthouse Suite', bedType: 'King', occupancy: 2, price: 420, amenities: ['WiFi', 'City View', 'Rooftop Access', 'Butler Service'] }
      ]
    }
  ];

  // Sample reviews data
  const reviewData = [
    {
      id: 1,
      hotelId: 1,
      reviewerName: 'John Smith',
      rating: 5,
      date: '2023-10-15',
      comment: 'Amazing stay! The service was exceptional and the view was breathtaking.'
    },
    {
      id: 2,
      hotelId: 1,
      reviewerName: 'Sarah Johnson',
      rating: 4,
      date: '2023-10-10',
      comment: 'Great location and comfortable rooms. Would definitely come back.'
    },
    {
      id: 3,
      hotelId: 2,
      reviewerName: 'Michael Brown',
      rating: 5,
      date: '2023-10-05',
      comment: 'The beach access was perfect. Staff went above and beyond to make our stay memorable.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'adults' || name === 'children') {
      const total = parseInt(value) + (name === 'adults' ? 0 : searchData.adults) + (name === 'children' ? 0 : searchData.children);
      if (total <= 14) { // Max 14 guests
        setSearchData({
          ...searchData,
          [name]: parseInt(value)
        });
      }
    } else {
      setSearchData({
        ...searchData,
        [name]: value
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(hotelData);
      setFilteredResults(hotelData);
      setBookingStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setReviews(reviewData.filter(review => review.hotelId === hotel.id));
    setBookingStep(3);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setBookingStep(4);
  };

  const handleBookingDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  const handleRoomOptionsChange = (e) => {
    const { name, value } = e.target;
    setRoomOptions({
      ...roomOptions,
      [name]: value
    });
  };

  const calculateNights = () => {
    if (!searchData.checkIn || !searchData.checkOut) return 0;
    const checkIn = new Date(searchData.checkIn);
    const checkOut = new Date(searchData.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    const basePrice = selectedRoom.price * nights * searchData.rooms;
    const tax = basePrice * 0.12; // 12% tax
    return basePrice + tax;
  };

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Booking confirmed for ${selectedHotel.name}!`);
    setBookingStep(5);
  };

  // Filter and sort results
  useEffect(() => {
    let filtered = [...searchResults];
    
    // Apply filters
    if (searchData.propertyType !== 'all') {
      filtered = filtered.filter(hotel => hotel.propertyType === searchData.propertyType);
    }
    
    filtered = filtered.filter(hotel => 
      hotel.price >= searchData.priceRange[0] && hotel.price <= searchData.priceRange[1]
    );
    
    filtered = filtered.filter(hotel => 
      hotel.starRating >= searchData.starRating[0] && hotel.starRating <= searchData.starRating[1]
    );
    
    if (filters.freeCancellation) {
      filtered = filtered.filter(hotel => hotel.freeCancellation);
    }
    
    if (filters.breakfastIncluded) {
      filtered = filtered.filter(hotel => hotel.breakfastIncluded);
    }
    
    if (filters.refundable) {
      filtered = filtered.filter(hotel => hotel.refundable);
    }
    
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0; // recommended
      }
    });
    
    setFilteredResults(filtered);
  }, [searchResults, searchData, filters, sortBy]);

  return (
    <div className="hotel-booking-container">
      <div className="booking-header">
        <h1>Hotel Booking</h1>
        <p>Find the perfect accommodation for your next trip</p>
      </div>

      <div className="booking-progress">
        <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Search</p>
        </div>
        <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Select Hotel</p>
        </div>
        <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Select Room</p>
        </div>
        <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>
          <span>4</span>
          <p>Guest Details</p>
        </div>
        <div className={`progress-step ${bookingStep >= 5 ? 'active' : ''}`}>
          <span>5</span>
          <p>Confirmation</p>
        </div>
      </div>

      {bookingStep === 1 && (
        <div className="search-section">
          <form onSubmit={handleSearch} className="hotel-search-form">
            <div className="input-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={searchData.destination}
                onChange={handleInputChange}
                placeholder="City, region, or hotel name"
                required
              />
            </div>
            
            <div className="date-fields">
              <div className="input-group">
                <label htmlFor="checkIn">Check-in</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={searchData.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="checkOut">Check-out</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={searchData.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="guest-fields">
              <div className="guest-selector">
                <div className="input-group">
                  <label>Guests</label>
                  <div className="guest-controls">
                    <div className="guest-control">
                      <span>Adults</span>
                      <div className="counter">
                        <button type="button" onClick={() => setSearchData({...searchData, adults: Math.max(1, searchData.adults - 1)})}>-</button>
                        <span>{searchData.adults}</span>
                        <button type="button" onClick={() => setSearchData({...searchData, adults: Math.min(14 - searchData.children, searchData.adults + 1)})}>+</button>
                      </div>
                    </div>
                    <div className="guest-control">
                      <span>Children</span>
                      <div className="counter">
                        <button type="button" onClick={() => setSearchData({...searchData, children: Math.max(0, searchData.children - 1)})}>-</button>
                        <span>{searchData.children}</span>
                        <button type="button" onClick={() => setSearchData({...searchData, children: Math.min(14 - searchData.adults, searchData.children + 1)})}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="rooms">Rooms</label>
                <select
                  id="rooms"
                  name="rooms"
                  value={searchData.rooms}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="property-filters">
              <div className="input-group">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={searchData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="all">All Properties</option>
                  <option value="hotel">Hotels</option>
                  <option value="resort">Resorts</option>
                  <option value="apartment">Apartments</option>
                  <option value="villa">Villas</option>
                </select>
              </div>
              
              <div className="input-group">
                <label>Price Range</label>
                <div className="price-range">
                  <span>${searchData.priceRange[0]}</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    value={searchData.priceRange[1]} 
                    onChange={(e) => setSearchData({...searchData, priceRange: [0, parseInt(e.target.value)]})}
                  />
                  <span>${searchData.priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search Hotels'}
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Available Hotels</h2>
            <div className="results-summary">
              <span>{searchData.destination || 'Any destination'}</span>
              <span>| {searchData.checkIn} to {searchData.checkOut}</span>
              <span>| {searchData.adults + searchData.children} {searchData.adults + searchData.children === 1 ? 'Guest' : 'Guests'}</span>
              <span>| {searchData.rooms} {searchData.rooms === 1 ? 'Room' : 'Rooms'}</span>
            </div>
          </div>
          
          <div className="sort-filter">
            <div className="sort-by">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
                <option value="reviews">Reviews</option>
              </select>
            </div>
            
            <div className="filters">
              <label>Filters:</label>
              <div className="filter-options">
                <div className="filter-dropdown">
                  <button className="filter-btn">Amenities</button>
                  <div className="filter-dropdown-content">
                    {['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Parking', 'Business Center', 'Kids Club', 'Water Sports', 'Concierge', 'Valet Parking'].map(amenity => (
                      <label key={amenity}>
                        <input 
                          type="checkbox" 
                          value={amenity}
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, amenities: [...filters.amenities, amenity]});
                            } else {
                              setFilters({...filters, amenities: filters.amenities.filter(a => a !== amenity)});
                            }
                          }}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
                
                <button 
                  className={`filter-btn ${filters.freeCancellation ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, freeCancellation: !filters.freeCancellation})}
                >
                  Free Cancellation
                </button>
                
                <button 
                  className={`filter-btn ${filters.breakfastIncluded ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, breakfastIncluded: !filters.breakfastIncluded})}
                >
                  Breakfast Included
                </button>
                
                <button 
                  className={`filter-btn ${filters.refundable ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, refundable: !filters.refundable})}
                >
                  Refundable
                </button>
              </div>
            </div>
          </div>
          
          <div className="hotel-list">
            {filteredResults.map(hotel => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="image-count">{hotel.images.length} photos</div>
                </div>
                
                <div className="hotel-info">
                  <div className="hotel-header">
                    <h3>{hotel.name}</h3>
                    <div className="hotel-rating">
                      <span className="rating-value">{hotel.rating}</span>
                      <span className="rating-icon">★</span>
                      <span className="review-count">({hotel.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="hotel-location">{hotel.location}</p>
                  <p className="hotel-address">{hotel.address}</p>
                  
                  <div className="hotel-amenities">
                    {hotel.amenities.slice(0, 5).map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                    {hotel.amenities.length > 5 && (
                      <span className="amenity more">+{hotel.amenities.length - 5} more</span>
                    )}
                  </div>
                  
                  <p className="hotel-description">{hotel.description}</p>
                  
                  <div className="hotel-features">
                    <span className={`feature ${hotel.freeCancellation ? 'available' : 'unavailable'}`}>
                      {hotel.freeCancellation ? '✓' : '✗'} Free Cancellation
                    </span>
                    <span className={`feature ${hotel.breakfastIncluded ? 'available' : 'unavailable'}`}>
                      {hotel.breakfastIncluded ? '✓' : '✗'} Breakfast
                    </span>
                    <span className={`feature ${hotel.refundable ? 'available' : 'unavailable'}`}>
                      {hotel.refundable ? '✓' : '✗'} Refundable
                    </span>
                  </div>
                </div>
                
                <div className="hotel-price">
                  <div className="price-details">
                    <div className="original-price">${hotel.basePrice}/night</div>
                    <div className="discounted-price">${hotel.price}/night</div>
                    <div className="discount-badge">{hotel.discount}% OFF</div>
                    <div className="total-price">${hotel.price * calculateNights()} total</div>
                    <div className="taxes">Includes taxes & fees</div>
                  </div>
                  <button 
                    onClick={() => handleSelectHotel(hotel)}
                    className="select-btn"
                  >
                    View Rooms
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingStep === 3 && selectedHotel && (
        <div className="hotel-details-section">
          <div className="hotel-gallery">
            <div className="main-image">
              <img src={selectedHotel.images[galleryView]} alt={selectedHotel.name} />
              <div className="image-nav">
                <button onClick={() => setGalleryView(Math.max(0, galleryView - 1))}>‹</button>
                <button onClick={() => setGalleryView(Math.min(selectedHotel.images.length - 1, galleryView + 1))}>›</button>
              </div>
            </div>
            <div className="thumbnail-grid">
              {selectedHotel.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${galleryView === index ? 'active' : ''}`}
                  onClick={() => setGalleryView(index)}
                >
                  <img src={img} alt={`${selectedHotel.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="hotel-info-section">
            <div className="hotel-basic-info">
              <h2>{selectedHotel.name}</h2>
              <div className="hotel-rating">
                <span className="rating-value">{selectedHotel.rating}</span>
                <span className="rating-icon">★</span>
                <span className="review-count">{selectedHotel.reviewCount} reviews</span>
              </div>
              <p className="hotel-location">{selectedHotel.location}</p>
              <p className="hotel-address">{selectedHotel.address}</p>
              
              <div className="hotel-features">
                <span className={`feature ${selectedHotel.freeCancellation ? 'available' : 'unavailable'}`}>
                  {selectedHotel.freeCancellation ? '✓' : '✗'} Free Cancellation
                </span>
                <span className={`feature ${selectedHotel.breakfastIncluded ? 'available' : 'unavailable'}`}>
                  {selectedHotel.breakfastIncluded ? '✓' : '✗'} Breakfast Included
                </span>
                <span className={`feature ${selectedHotel.refundable ? 'available' : 'unavailable'}`}>
                  {selectedHotel.refundable ? '✓' : '✗'} Refundable
                </span>
              </div>
            </div>
            
            <div className="hotel-amenities">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {selectedHotel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-check">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hotel-description">
              <h3>About This Property</h3>
              <p>{selectedHotel.description}</p>
            </div>
            
            <div className="hotel-reviews">
              <h3>Recent Reviews</h3>
              <div className="reviews-list">
                {reviews.slice(0, 3).map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.reviewerName}</span>
                      <div className="review-rating">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <span className="review-date">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="room-selection">
            <h3>Available Rooms</h3>
            <div className="room-list">
              {selectedHotel.rooms.map(room => (
                <div key={room.id} className="room-card">
                  <div className="room-info">
                    <h4>{room.type}</h4>
                    <div className="room-amenities">
                      {room.amenities.map((amenity, index) => (
                        <span key={index} className="amenity">{amenity}</span>
                      ))}
                    </div>
                    <div className="room-occupancy">
                      <span>Up to {room.occupancy} guests</span>
                      <span>•</span>
                      <span>{room.bedType} bed</span>
                    </div>
                  </div>
                  <div className="room-price">
                    <div className="price">${room.price}/night</div>
                    <button 
                      onClick={() => handleSelectRoom(room)}
                      className="select-btn"
                    >
                      Select Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {bookingStep === 4 && selectedHotel && selectedRoom && (
        <div className="booking-section">
          <h2>Complete Your Booking</h2>
          
          <div className="booking-content">
            <div className="hotel-summary">
              <h3>Booking Summary</h3>
              <div className="summary-card">
                <div className="hotel-image">
                  <img src={selectedHotel.image} alt={selectedHotel.name} />
                </div>
                
                <div className="hotel-details">
                  <h4>{selectedHotel.name}</h4>
                  <p className="location">{selectedHotel.location}</p>
                  <div className="hotel-rating">
                    <span className="rating-value">{selectedHotel.rating}</span>
                    <span className="rating-icon">★</span>
                  </div>
                  
                  <div className="stay-details">
                    <div className="detail-item">
                      <span>Check-in</span>
                      <span>{searchData.checkIn}</span>
                    </div>
                    <div className="detail-item">
                      <span>Check-out</span>
                      <span>{searchData.checkOut}</span>
                    </div>
                    <div className="detail-item">
                      <span>Duration</span>
                      <span>{calculateNights()} nights</span>
                    </div>
                    <div className="detail-item">
                      <span>Guests</span>
                      <span>{searchData.adults + searchData.children} {searchData.adults + searchData.children === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="detail-item">
                      <span>Rooms</span>
                      <span>{searchData.rooms} {searchData.rooms === 1 ? 'Room' : 'Rooms'}</span>
                    </div>
                    <div className="detail-item">
                      <span>Room Type</span>
                      <span>{selectedRoom.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="price-summary">
                  <div className="price-breakdown">
                    <div className="price-item">
                      <span>Room Rate (${selectedRoom.price}/night x {calculateNights()} nights x {searchData.rooms} rooms)</span>
                      <span>${selectedRoom.price * calculateNights() * searchData.rooms}</span>
                    </div>
                    <div className="price-item tax">
                      <span>Taxes & Fees</span>
                      <span>${Math.round(selectedRoom.price * calculateNights() * searchData.rooms * 0.12)}</span>
                    </div>
                    <div className="total-price">
                      <span>Total</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="room-options">
              <h3>Room Preferences</h3>
              <div className="form-row">
                <div className="input-group">
                  <label>Bed Type</label>
                  <select 
                    name="bedType" 
                    value={roomOptions.bedType}
                    onChange={handleRoomOptionsChange}
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Smoking Preference</label>
                  <select 
                    name="smokingPreference" 
                    value={roomOptions.smokingPreference}
                    onChange={handleRoomOptionsChange}
                  >
                    <option value="any">No Preference</option>
                    <option value="smoking">Smoking</option>
                    <option value="non-smoking">Non-Smoking</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Floor Preference</label>
                  <select 
                    name="floorPreference" 
                    value={roomOptions.floorPreference}
                    onChange={handleRoomOptionsChange}
                  >
                    <option value="any">Any Floor</option>
                    <option value="low">Low Floor</option>
                    <option value="high">High Floor</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="guest-details">
              <h3>Guest Information</h3>
              
              <div className="loyalty-program">
                <h4>Loyalty Program (Optional)</h4>
                <div className="form-row">
                  <div className="input-group">
                    <label>Loyalty Program</label>
                    <select 
                      name="loyaltyProgram"
                      value={bookingDetails.loyaltyProgram}
                      onChange={handleBookingDetailsChange}
                    >
                      <option value="">Select Program</option>
                      <option value="marriott">Marriott Bonvoy</option>
                      <option value="hilton">Hilton Honors</option>
                      <option value="ihg">IHG Rewards Club</option>
                      <option value="accor">Accor Live Limitless</option>
                      <option value="hyatt">World of Hyatt</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <label>Membership Number</label>
                    <input 
                      type="text" 
                      name="membershipNumber"
                      value={bookingDetails.membershipNumber}
                      onChange={handleBookingDetailsChange}
                      placeholder="Enter membership number"
                    />
                  </div>
                </div>
              </div>
              
              <div className="guest-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={bookingDetails.firstName}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={bookingDetails.lastName}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="input-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={bookingDetails.email}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={bookingDetails.phone}
                      onChange={handleBookingDetailsChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Special Requests (Optional)</label>
                  <textarea 
                    name="specialRequests"
                    value={bookingDetails.specialRequests}
                    onChange={handleBookingDetailsChange}
                    rows="3"
                    placeholder="Any special requests or preferences..."
                  ></textarea>
                </div>
              </div>
              
              <div className="payment-section">
                <h3>Payment Details</h3>
                
                <div className="payment-methods">
                  <div className="payment-method active">
                    <label>
                      <input type="radio" name="payment" defaultChecked /> Credit Card
                    </label>
                  </div>
                  <div className="payment-method">
                    <label>
                      <input type="radio" name="payment" /> Debit Card
                    </label>
                  </div>
                  <div className="payment-method">
                    <label>
                      <input type="radio" name="payment" /> UPI
                    </label>
                  </div>
                  <div className="payment-method">
                    <label>
                      <input type="radio" name="payment" /> Net Banking
                    </label>
                  </div>
                </div>
                
                <div className="payment-form">
                  <div className="input-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" required />
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required />
                    </div>
                    
                    <div className="input-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" required />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                </div>
              </div>
              
              <button onClick={handleBooking} className="book-now-btn">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
      
      {bookingStep === 5 && selectedHotel && (
        <div className="confirmation-section">
          <div className="confirmation-card">
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            
            <h2>Booking Confirmed!</h2>
            <p>Your hotel reservation has been successfully booked.</p>
            
            <div className="booking-details">
              <div className="detail-item">
                <span>Booking Reference</span>
                <span>HTL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              
              <div className="detail-item">
                <span>Hotel</span>
                <span>{selectedHotel.name}</span>
              </div>
              
              <div className="detail-item">
                <span>Location</span>
                <span>{selectedHotel.location}</span>
              </div>
              
              <div className="detail-item">
                <span>Check-in</span>
                <span>{searchData.checkIn}</span>
              </div>
              
              <div className="detail-item">
                <span>Check-out</span>
                <span>{searchData.checkOut}</span>
              </div>
              
              <div className="detail-item">
                <span>Guests</span>
                <span>{searchData.adults + searchData.children}</span>
              </div>
              
              <div className="detail-item">
                <span>Rooms</span>
                <span>{searchData.rooms}</span>
              </div>
              
              <div className="detail-item">
                <span>Room Type</span>
                <span>{selectedRoom?.type || 'N/A'}</span>
              </div>
              
              <div className="detail-item total">
                <span>Total Paid</span>
                <span>${calculateTotalPrice()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setBookingStep(1)}
              className="new-search-btn"
            >
              Book Another Hotel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;