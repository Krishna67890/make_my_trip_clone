import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/Booking/TrainBooking.css';

const TrainBooking = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBerths, setSelectedBerths] = useState({});
  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
    foodPreference: 'veg',
    mealOption: 'normal',
    quota: 'general',
    concession: 'none',
    seniorCitizen: false,
    divyang: false,
    student: false
  });
  
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    adults: 1,
    children: 0,
    class: 'sleeper',
    quota: 'general'
  });
  
  const [trainResults, setTrainResults] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [coachSelection, setCoachSelection] = useState({
    coachType: 'sleeper',
    coachNumber: null
  });
  const [waitingList, setWaitingList] = useState([]);
  const [routeMap, setRouteMap] = useState([]);
  const [foodOptions, setFoodOptions] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false
  });
  const [loading, setLoading] = useState(false);

  const trainData = [
    {
      id: 1,
      name: "Rajdhani Express",
      number: "12345",
      from: "New Delhi",
      to: "Mumbai Central",
      departure: "08:30 PM",
      arrival: "07:45 AM",
      duration: "23h 15m",
      price: 2500,
      basePrice: 2700,
      discount: 7,
      seatsAvailable: 45,
      coaches: [
        { id: 1, type: 'sleeper', availableSeats: 25, price: 1200 },
        { id: 2, type: '3ac', availableSeats: 15, price: 2500 },
        { id: 3, type: '2ac', availableSeats: 8, price: 3200 },
        { id: 4, type: '1ac', availableSeats: 5, price: 4500 }
      ],
      route: [
        { station: "New Delhi", arrival: "08:30 PM", departure: "08:30 PM", distance: 0 },
        { station: "Kanpur Central", arrival: "11:45 PM", departure: "11:50 PM", distance: 456 },
        { station: "Allahabad Junction", arrival: "02:30 AM", departure: "02:35 AM", distance: 654 },
        { station: "Varanasi Junction", arrival: "05:15 AM", departure: "05:20 AM", distance: 789 },
        { station: "Pt. DD Upadhyaya Junction", arrival: "07:30 AM", departure: "07:32 AM", distance: 987 },
        { station: "Mumbai Central", arrival: "07:45 AM", departure: "--", distance: 1400 }
      ],
      amenities: ['Food', 'Charging Points', 'Reading Light', 'AC', 'CCTV', 'Pantry Car'],
      rating: 4.7,
      onTimePercentage: 92
    },
    {
      id: 2,
      name: "Shatabdi Express",
      number: "12011",
      from: "New Delhi",
      to: "Amritsar",
      departure: "06:00 AM",
      arrival: "12:45 PM",
      duration: "6h 45m",
      price: 1800,
      basePrice: 1900,
      discount: 5,
      seatsAvailable: 32,
      coaches: [
        { id: 1, type: 'chaircar', availableSeats: 20, price: 1800 },
        { id: 2, type: 'executive', availableSeats: 12, price: 2800 }
      ],
      route: [
        { station: "New Delhi", arrival: "06:00 AM", departure: "06:00 AM", distance: 0 },
        { station: "Ambala Cantonment", arrival: "07:45 AM", departure: "07:47 AM", distance: 245 },
        { station: "Ludhiana", arrival: "09:30 AM", departure: "09:32 AM", distance: 389 },
        { station: "Jalandhar Cantt", arrival: "10:45 AM", departure: "10:47 AM", distance: 478 },
        { station: "Amritsar", arrival: "12:45 PM", departure: "--", distance: 546 }
      ],
      amenities: ['Food', 'Charging Points', 'Reading Light', 'AC', 'Magazines', 'Newspapers'],
      rating: 4.5,
      onTimePercentage: 95
    },
    {
      id: 3,
      name: "Duronto Express",
      number: "12263",
      from: "Mumbai Central",
      to: "New Delhi",
      departure: "08:00 PM",
      arrival: "06:35 AM",
      duration: "22h 35m",
      price: 2200,
      basePrice: 2400,
      discount: 8,
      seatsAvailable: 38,
      coaches: [
        { id: 1, type: 'sleeper', availableSeats: 22, price: 1000 },
        { id: 2, type: '3ac', availableSeats: 12, price: 2200 },
        { id: 3, type: '2ac', availableSeats: 8, price: 3000 },
        { id: 4, type: '1ac', availableSeats: 4, price: 4200 }
      ],
      route: [
        { station: "Mumbai Central", arrival: "08:00 PM", departure: "08:00 PM", distance: 0 },
        { station: "Surat", arrival: "09:45 PM", departure: "09:50 PM", distance: 189 },
        { station: "Vadodara Junction", arrival: "11:30 PM", departure: "11:35 PM", distance: 389 },
        { station: "Ahmedabad Junction", arrival: "01:15 AM", departure: "01:25 AM", distance: 498 },
        { station: "Kota Junction", arrival: "05:30 AM", departure: "05:35 AM", distance: 1089 },
        { station: "Hazrat Nizamuddin", arrival: "06:35 AM", departure: "--", distance: 1389 }
      ],
      amenities: ['Food', 'Charging Points', 'Reading Light', 'AC', 'CCTV', 'Pantry Car'],
      rating: 4.6,
      onTimePercentage: 89
    }
  ];

  // Detailed seat layout for different coach types
  const getSeatLayout = (coachType) => {
    if (coachType === 'sleeper') {
      return [
        { id: '1A', type: 'lower', available: true },
        { id: '1B', type: 'middle', available: true },
        { id: '1C', type: 'upper', available: true },
        { id: '1D', type: 'side-lower', available: true },
        { id: '1E', type: 'side-upper', available: false },
        { id: '2A', type: 'lower', available: true },
        { id: '2B', type: 'middle', available: true },
        { id: '2C', type: 'upper', available: true },
        { id: '2D', type: 'side-lower', available: true },
        { id: '2E', type: 'side-upper', available: true },
        { id: '3A', type: 'lower', available: true },
        { id: '3B', type: 'middle', available: false },
        { id: '3C', type: 'upper', available: true },
        { id: '3D', type: 'side-lower', available: true },
        { id: '3E', type: 'side-upper', available: true },
        { id: '4A', type: 'lower', available: true },
        { id: '4B', type: 'middle', available: true },
        { id: '4C', type: 'upper', available: true },
        { id: '4D', type: 'side-lower', available: true },
        { id: '4E', type: 'side-upper', available: true }
      ];
    } else if (coachType === '3ac') {
      return [
        { id: '1A', type: 'lower', available: true },
        { id: '1B', type: 'upper', available: true },
        { id: '2A', type: 'lower', available: true },
        { id: '2B', type: 'upper', available: true },
        { id: '3A', type: 'lower', available: true },
        { id: '3B', type: 'upper', available: true },
        { id: '4A', type: 'lower', available: true },
        { id: '4B', type: 'upper', available: true }
      ];
    } else {
      // For chair car and executive
      return [
        { id: '1A', type: 'window', available: true },
        { id: '1B', type: 'aisle', available: true },
        { id: '1C', type: 'aisle', available: true },
        { id: '1D', type: 'window', available: false },
        { id: '2A', type: 'window', available: true },
        { id: '2B', type: 'aisle', available: false },
        { id: '2C', type: 'aisle', available: true },
        { id: '2D', type: 'window', available: true },
        { id: '3A', type: 'window', available: true },
        { id: '3B', type: 'aisle', available: true },
        { id: '3C', type: 'aisle', available: true },
        { id: '3D', type: 'window', available: false },
        { id: '4A', type: 'window', available: true },
        { id: '4B', type: 'aisle', available: true },
        { id: '4C', type: 'aisle', available: false },
        { id: '4D', type: 'window', available: true }
      ];
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'adults' || name === 'children') {
      const total = parseInt(value) + (name === 'adults' ? 0 : searchData.adults) + (name === 'children' ? 0 : searchData.children);
      if (total <= 6) { // Max 6 passengers
        setSearchData({
          ...searchData,
          [name]: parseInt(value)
        });
      }
    } else {
      setPassengerData({
        ...passengerData,
        [name]: value
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setTrainResults(trainData);
      setBookingStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    setRouteMap(train.route);
    setBookingStep(3);
  };

  const handleCoachSelection = (coachType) => {
    setCoachSelection({ ...coachSelection, coachType });
  };

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < searchData.adults + searchData.children) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleBerthSelection = (seatId, berthType) => {
    setSelectedBerths({
      ...selectedBerths,
      [seatId]: berthType
    });
  };

  const handleFoodOptionChange = (option) => {
    setFoodOptions({
      ...foodOptions,
      [option]: !foodOptions[option]
    });
  };

  const handleNextStep = () => {
    if (bookingStep === 1 && !searchData.from) {
      alert('Please enter a departure station');
      return;
    }
    if (bookingStep === 3 && selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    if (bookingStep === 4) {
      // Validate passenger data
      if (!passengerData.name || !passengerData.email || !passengerData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setBookingStep(bookingStep + 1);
  };

  const handlePreviousStep = () => {
    setBookingStep(bookingStep - 1);
  };

  const handleBooking = () => {
    alert(`Booking confirmed! Seats: ${selectedSeats.join(', ')}. Check your email for confirmation.`);
    // Reset form
    setSelectedSeats([]);
    setSelectedBerths({});
    setPassengerData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: 'male',
      foodPreference: 'veg',
      mealOption: 'normal',
      quota: 'general',
      concession: 'none',
      seniorCitizen: false,
      divyang: false,
      student: false
    });
    setBookingStep(1);
  };

  const calculateTotalPrice = () => {
    if (!selectedTrain) return 0;
    
    let basePrice = 0;
    if (coachSelection.coachType === 'sleeper') basePrice = 1200;
    else if (coachSelection.coachType === '3ac') basePrice = 2500;
    else if (coachSelection.coachType === '2ac') basePrice = 3200;
    else if (coachSelection.coachType === '1ac') basePrice = 4500;
    else basePrice = 1800; // chair car
    
    let totalPrice = basePrice * selectedSeats.length;
    
    // Add food charges if selected
    if (foodOptions.breakfast) totalPrice += 100 * selectedSeats.length;
    if (foodOptions.lunch) totalPrice += 150 * selectedSeats.length;
    if (foodOptions.dinner) totalPrice += 150 * selectedSeats.length;
    if (foodOptions.snacks) totalPrice += 50 * selectedSeats.length;
    
    // Add service tax
    const tax = totalPrice * 0.05; // 5% service tax
    return totalPrice + tax;
  };

  return (
    <div className="train-booking">
      <div className="booking-header">
        <h1>Train Ticket Booking</h1>
        <div className="progress-bar">
          <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Search Trains</p>
          </div>
          <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Select Train</p>
          </div>
          <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Select Coach & Seats</p>
          </div>
          <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>
            <span>4</span>
            <p>Passenger Details</p>
          </div>
          <div className={`progress-step ${bookingStep >= 5 ? 'active' : ''}`}>
            <span>5</span>
            <p>Confirmation</p>
          </div>
        </div>
      </div>

      <div className="booking-content">
        {bookingStep === 1 && (
          <div className="search-section">
            <h2>Search Trains</h2>
            <form onSubmit={handleSearch} className="train-search-form">
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="from">From</label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={searchData.from}
                    onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    placeholder="Departure station"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="to">To</label>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={searchData.to}
                    onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    placeholder="Arrival station"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="departureDate">Departure Date</label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={searchData.departureDate}
                    onChange={(e) => setSearchData({...searchData, departureDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="returnDate">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label>Passengers</label>
                  <div className="passenger-controls">
                    <div className="passenger-control">
                      <span>Adults</span>
                      <div className="counter">
                        <button type="button" onClick={() => setSearchData({...searchData, adults: Math.max(1, searchData.adults - 1)})}>-</button>
                        <span>{searchData.adults}</span>
                        <button type="button" onClick={() => setSearchData({...searchData, adults: Math.min(6 - searchData.children, searchData.adults + 1)})}>+</button>
                      </div>
                    </div>
                    <div className="passenger-control">
                      <span>Children</span>
                      <div className="counter">
                        <button type="button" onClick={() => setSearchData({...searchData, children: Math.max(0, searchData.children - 1)})}>-</button>
                        <span>{searchData.children}</span>
                        <button type="button" onClick={() => setSearchData({...searchData, children: Math.min(6 - searchData.adults, searchData.children + 1)})}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="class">Class</label>
                  <select
                    id="class"
                    name="class"
                    value={searchData.class}
                    onChange={(e) => setSearchData({...searchData, class: e.target.value})}
                  >
                    <option value="sleeper">Sleeper (SL)</option>
                    <option value="3ac">AC 3 Tier (3A)</option>
                    <option value="2ac">AC 2 Tier (2A)</option>
                    <option value="1ac">AC 1 Tier (1A)</option>
                    <option value="cc">AC Chair Car (CC)</option>
                    <option value="2s">Second Sitting (2S)</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label htmlFor="quota">Quota</label>
                  <select
                    id="quota"
                    name="quota"
                    value={searchData.quota}
                    onChange={(e) => setSearchData({...searchData, quota: e.target.value})}
                  >
                    <option value="general">General</option>
                    <option value="tatkal">Tatkal</option>
                    <option value="ladies">Ladies</option>
                    <option value="lowerberth">Lower Berth</option>
                    <option value="personwithdisability">Person with Disability</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="search-btn" disabled={loading}>
                {loading ? 'Searching...' : 'Search Trains'}
              </button>
            </form>
          </div>
        )}
        
        {bookingStep === 2 && trainResults.length > 0 && (
          <div className="results-section">
            <h2>Available Trains</h2>
            <div className="train-list">
              {trainResults.map(train => (
                <div key={train.id} className="train-card">
                  <div className="train-info">
                    <div className="train-header">
                      <h3>{train.name}</h3>
                      <div className="train-rating">
                        <span className="rating-value">{train.rating}</span>
                        <span className="rating-icon">★</span>
                        <span className="on-time">{train.onTimePercentage}% on-time</span>
                      </div>
                    </div>
                    
                    <div className="train-schedule">
                      <div className="time-block">
                        <span className="time">{train.departure}</span>
                        <span className="station">{train.from}</span>
                      </div>
                      
                      <div className="duration">
                        <span>{train.duration}</span>
                        <div className="route-path">
                          <div className="path-line"></div>
                          <div className="stops">
                            {train.route.length - 2} stops
                          </div>
                        </div>
                      </div>
                      
                      <div className="time-block">
                        <span className="time">{train.arrival}</span>
                        <span className="station">{train.to}</span>
                      </div>
                    </div>
                    
                    <div className="train-features">
                      {train.amenities.map((amenity, index) => (
                        <span key={index} className="feature">{amenity}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="train-price">
                    <div className="price-details">
                      <div className="original-price">₹{train.basePrice}</div>
                      <div className="discounted-price">₹{train.price}</div>
                      <div className="discount-badge">{train.discount}% OFF</div>
                    </div>
                    <div className="seats-available">{train.seatsAvailable} seats available</div>
                    <button 
                      onClick={() => handleSelectTrain(train)}
                      className="select-btn"
                    >
                      Select Train
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {bookingStep === 3 && selectedTrain && (
          <div className="coach-seat-selection">
            <h2>Select Coach & Seats</h2>
            
            <div className="train-summary">
              <h3>{selectedTrain.name} ({selectedTrain.number})</h3>
              <div className="route">
                <span>{selectedTrain.from} → {selectedTrain.to}</span>
                <span>{selectedTrain.departure} - {selectedTrain.arrival}</span>
              </div>
            </div>
            
            <div className="coach-selection">
              <h3>Select Coach Type</h3>
              <div className="coach-types">
                {selectedTrain.coaches.map(coach => (
                  <div 
                    key={coach.id} 
                    className={`coach-type ${coachSelection.coachType === coach.type ? 'selected' : ''}`}
                    onClick={() => handleCoachSelection(coach.type)}
                  >
                    <h4>{coach.type.toUpperCase()}</h4>
                    <p>₹{coach.price} | {coach.availableSeats} seats available</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="seat-layout">
              <h3>Coach Layout - {coachSelection.coachType.toUpperCase()}</h3>
              <div className="seats-container">
                {getSeatLayout(coachSelection.coachType).map(seat => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const isAvailable = seat.available;
                  
                  return (
                    <div
                      key={seat.id}
                      className={`seat ${seat.type} ${!isAvailable ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => isAvailable && handleSeatSelection(seat.id)}
                    >
                      <div className="seat-id">{seat.id}</div>
                      <div className="seat-type">{seat.type}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="seat-legend">
                <div className="legend-item">
                  <div className="seat-sample available"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="seat-sample selected"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="seat-sample occupied"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </div>
            
            <div className="selection-summary">
              <h3>Selected Seats: {selectedSeats.join(', ') || 'None'}</h3>
              <p>Total: ₹{calculateTotalPrice()}</p>
            </div>
            
            <div className="food-options">
              <h3>Food Preferences</h3>
              <div className="food-checkboxes">
                <label>
                  <input 
                    type="checkbox" 
                    checked={foodOptions.breakfast}
                    onChange={() => handleFoodOptionChange('breakfast')}
                  />
                  Breakfast (₹100)
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={foodOptions.lunch}
                    onChange={() => handleFoodOptionChange('lunch')}
                  />
                  Lunch (₹150)
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={foodOptions.dinner}
                    onChange={() => handleFoodOptionChange('dinner')}
                  />
                  Dinner (₹150)
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={foodOptions.snacks}
                    onChange={() => handleFoodOptionChange('snacks')}
                  />
                  Snacks (₹50)
                </label>
              </div>
            </div>
          </div>
        )}
        
        {bookingStep === 4 && (
          <div className="passenger-details">
            <h2>Passenger Information</h2>
            <div className="form-section">
              <div className="form-row">
                <div className="input-group">
                  <label>Title</label>
                  <select
                    name="title"
                    value={passengerData.title || 'Mr.'}
                    onChange={handleInputChange}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Master">Master</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={passengerData.firstName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={passengerData.lastName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={passengerData.age}
                    onChange={handleInputChange}
                    min="1"
                    max="120"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={passengerData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Food Preference</label>
                  <select
                    name="foodPreference"
                    value={passengerData.foodPreference}
                    onChange={handleInputChange}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                    <option value="jain">Jain Food</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={passengerData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={passengerData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="preferences">
                <h3>Additional Preferences</h3>
                <div className="preference-options">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={passengerData.seniorCitizen}
                      onChange={(e) => setPassengerData({...passengerData, seniorCitizen: e.target.checked})}
                    />
                    Senior Citizen (60+ years)
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={passengerData.divyang}
                      onChange={(e) => setPassengerData({...passengerData, divyang: e.target.checked})}
                    />
                    Divyang (Person with Disability)
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={passengerData.student}
                      onChange={(e) => setPassengerData({...passengerData, student: e.target.checked})}
                    />
                    Student (With valid ID)
                  </label>
                </div>
              </div>
              
              <div className="concession">
                <h3>Concession Type</h3>
                <div className="concession-options">
                  <label>
                    <input 
                      type="radio" 
                      name="concession" 
                      value="none"
                      checked={passengerData.concession === 'none'}
                      onChange={handleInputChange}
                    />
                    None
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="concession" 
                      value="senior"
                      checked={passengerData.concession === 'senior'}
                      onChange={handleInputChange}
                    />
                    Senior Citizen
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="concession" 
                      value="student"
                      checked={passengerData.concession === 'student'}
                      onChange={handleInputChange}
                    />
                    Student
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="concession" 
                      value="divyang"
                      checked={passengerData.concession === 'divyang'}
                      onChange={handleInputChange}
                    />
                    Divyang
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {bookingStep === 5 && (
          <div className="booking-summary">
            <h2>Booking Summary</h2>
            <div className="summary-card">
              <div className="summary-section">
                <h3>Journey Details</h3>
                <p><strong>Train:</strong> {selectedTrain?.name} ({selectedTrain?.number})</p>
                <p><strong>Route:</strong> {selectedTrain?.from} to {selectedTrain?.to}</p>
                <p><strong>Departure:</strong> {selectedTrain?.departure} on {searchData.departureDate}</p>
                <p><strong>Arrival:</strong> {selectedTrain?.arrival} on {searchData.returnDate}</p>
                <p><strong>Coach Type:</strong> {coachSelection.coachType.toUpperCase()}</p>
              </div>
              
              <div className="summary-section">
                <h3>Passenger Details</h3>
                <p><strong>Name:</strong> {passengerData.title} {passengerData.firstName} {passengerData.lastName}</p>
                <p><strong>Email:</strong> {passengerData.email}</p>
                <p><strong>Phone:</strong> {passengerData.phone}</p>
                <p><strong>Age:</strong> {passengerData.age}</p>
                <p><strong>Gender:</strong> {passengerData.gender}</p>
                <p><strong>Food Preference:</strong> {passengerData.foodPreference}</p>
              </div>
              
              <div className="summary-section">
                <h3>Seat Information</h3>
                <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
                <p><strong>Total Seats:</strong> {selectedSeats.length}</p>
                <p><strong>Food Options:</strong> {Object.keys(foodOptions).filter(option => foodOptions[option]).join(', ') || 'None'}</p>
                <p><strong>Total Amount:</strong> ₹{calculateTotalPrice()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="booking-actions">
          {bookingStep > 1 && (
            <button className="btn-secondary" onClick={handlePreviousStep}>
              Previous
            </button>
          )}
          {bookingStep < 5 ? (
            <button className="btn-primary" onClick={handleNextStep}>
              Next
            </button>
          ) : (
            <button className="btn-confirm" onClick={handleBooking}>
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainBooking;