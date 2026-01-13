import React, { useState, useRef } from 'react';
import { User, Settings, LogOut, Heart, Clock, HelpCircle } from 'lucide-react';
import './UserMenu.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const user = {
    name: 'Guest User',
    email: 'guest@example.com',
    points: 1250
  };

  const menuItems = [
    { label: 'My Profile', icon: User, onClick: () => console.log('Profile') },
    { label: 'My Bookings', icon: Clock, onClick: () => console.log('Bookings') },
    { label: 'Wishlist', icon: Heart, onClick: () => console.log('Wishlist') },
    { label: 'Settings', icon: Settings, onClick: () => console.log('Settings') },
    { label: 'Help & Support', icon: HelpCircle, onClick: () => console.log('Help') },
    { label: 'Sign Out', icon: LogOut, onClick: () => console.log('Sign Out') }
  ];

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="user-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar">
          <User size={20} />
        </div>
        <span className="user-name">Guest</span>
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-avatar-large">
              <User size={24} />
            </div>
            <div className="user-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <div className="user-points">
                <span>🌟 {user.points} Points</span>
              </div>
            </div>
          </div>

          <div className="dropdown-divider" />

          <div className="menu-items">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="menu-item"
                  onClick={item.onClick}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;