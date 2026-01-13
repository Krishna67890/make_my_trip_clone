// RoomSelection.jsx
import React, { useState } from 'react';
import { User, Wifi, Car, Coffee } from 'lucide-react';
import './RoomSelection.css';

const RoomSelection = ({ hotel }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomCount, setRoomCount] = useState(1);

  const roomTypes = [
    {
      id: 1,
      name: "Deluxe Room",
      description: "Spacious room with king bed and city view",
      price: 4500,
      capacity: 2,
      amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"
    },
    {
      id: 2,
      name: "Executive Suite",
      description: "Luxurious suite with separate living area",
      price: 7500,
      capacity: 3,
      amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Coffee Maker", "Jacuzzi"],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400"
    },
    {
      id: 3,
      name: "Family Room",
      description: "Perfect for families with extra space",
      price: 6500,
      capacity: 4,
      amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar", "Extra Bed"],
      image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400"
    }
  ];

  return (
    <div className="room-selection">
      <h3>Available Rooms</h3>
      
      <div className="rooms-list">
        {roomTypes.map(room => (
          <div key={room.id} className={`room-card ${selectedRoom === room.id ? 'selected' : ''}`}>
            <div className="room-image">
              <img src={room.image} alt={room.name} />
            </div>
            
            <div className="room-details">
              <h4>{room.name}</h4>
              <p className="room-description">{room.description}</p>
              
              <div className="room-capacity">
                <User size={14} />
                <span>Sleeps {room.capacity}</span>
              </div>
              
              <div className="room-amenities">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
                {room.amenities.length > 3 && (
                  <span className="amenity-more">+{room.amenities.length - 3} more</span>
                )}
              </div>
            </div>
            
            <div className="room-pricing">
              <div className="price-container">
                <span className="price">₹{room.price.toLocaleString()}</span>
                <span className="price-label">per night</span>
                <span className="taxes">+ taxes</span>
              </div>
              
              {selectedRoom === room.id ? (
                <div className="room-selection-controls">
                  <div className="room-count">
                    <span>Rooms:</span>
                    <select 
                      value={roomCount} 
                      onChange={(e) => setRoomCount(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <button className="select-room-btn selected">
                    Selected
                  </button>
                </div>
              ) : (
                <button 
                  className="select-room-btn"
                  onClick={() => setSelectedRoom(room.id)}
                >
                  Select Room
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedRoom && (
        <div className="booking-summary">
          <h4>Booking Summary</h4>
          <div className="summary-details">
            <div className="summary-item">
              <span>Room Price ({roomCount} rooms)</span>
              <span>₹{(roomTypes.find(r => r.id === selectedRoom).price * roomCount).toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Taxes & Fees</span>
              <span>₹{(roomTypes.find(r => r.id === selectedRoom).price * roomCount * 0.18).toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{(roomTypes.find(r => r.id === selectedRoom).price * roomCount * 1.18).toLocaleString()}</span>
            </div>
          </div>
          <button className="proceed-booking-btn">Proceed to Book</button>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;