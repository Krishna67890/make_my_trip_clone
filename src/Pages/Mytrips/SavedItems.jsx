import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import './SavedItems.css';

// Mock data for saved items
const mockSavedItems = [
  {
    id: 1,
    type: 'hotel',
    name: 'Luxury Beach Resort',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    price: 245,
    rating: 4.8,
    description: '5-star beachfront resort with infinity pool and spa services',
    savedDate: '2023-08-15',
    features: ['Free WiFi', 'Swimming Pool', 'Spa', 'Beachfront'],
    isAvailable: true
  },
  {
    id: 2,
    type: 'activity',
    name: 'Sunset Cruise Tour',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1508919801845-fc2b1a2110c4',
    price: 89,
    rating: 4.9,
    description: '2-hour luxury catamaran cruise with dinner and drinks',
    savedDate: '2023-09-22',
    features: ['Dinner Included', 'Open Bar', 'Small Group'],
    isAvailable: true
  },
  {
    id: 3,
    type: 'restaurant',
    name: 'Skyline Bistro',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    price: 120,
    rating: 4.7,
    description: 'Rooftop dining with panoramic city views',
    savedDate: '2023-07-10',
    features: ['Rooftop', 'Fine Dining', 'City Views'],
    isAvailable: true
  },
  {
    id: 4,
    type: 'hotel',
    name: 'Mountain Retreat Lodge',
    location: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f',
    price: 320,
    rating: 4.9,
    description: 'Luxury alpine lodge with spa and ski-in/ski-out access',
    savedDate: '2023-06-18',
    features: ['Ski Access', 'Spa', 'Fireplace', 'Mountain Views'],
    isAvailable: false
  },
  {
    id: 5,
    type: 'activity',
    name: 'Historical City Tour',
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197043a9e3',
    price: 65,
    rating: 4.6,
    description: 'Guided tour of ancient Roman landmarks with expert historian',
    savedDate: '2023-10-05',
    features: ['Expert Guide', 'Skip-the-Line', 'Small Group'],
    isAvailable: true
  },
  {
    id: 6,
    type: 'restaurant',
    name: 'Seafood Harbor',
    location: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    price: 95,
    rating: 4.5,
    description: 'Fresh seafood restaurant with harbor views',
    savedDate: '2023-08-30',
    features: ['Harbor Views', 'Fresh Seafood', 'Waterfront'],
    isAvailable: true
  }
];

// Custom hook for managing saved items
const useSavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchSavedItems = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSavedItems(mockSavedItems);
        setLoading(false);
      } catch (err) {
        setError('Failed to load saved items');
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, []);

  const removeItem = useCallback((id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setSavedItems([]);
  }, []);

  return { savedItems, loading, error, removeItem, clearAll };
};

// Category Filter Component
const CategoryFilter = React.memo(({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Items' },
    { key: 'hotel', label: 'Hotels' },
    { key: 'activity', label: 'Activities' },
    { key: 'restaurant', label: 'Restaurants' }
  ];

  return (
    <div className="category-filters">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});

// Sort Dropdown Component
const SortDropdown = React.memo(({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'date', label: 'Date Saved (Newest)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'rating', label: 'Rating (Highest)' }
  ];

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-options">Sort by:</label>
      <select 
        id="sort-options"
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

// Saved Item Card Component
const SavedItemCard = React.memo(({ item, onRemove, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  const getTypeIcon = () => {
    switch (item.type) {
      case 'hotel': return '🏨';
      case 'activity': return '🎯';
      case 'restaurant': return '🍴';
      default: return '❤️';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="saved-item-card"
    >
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        <div className="item-type">{getTypeIcon()} {item.type}</div>
        {!item.isAvailable && (
          <div className="unavailable-badge">Not Available</div>
        )}
        <button className="remove-btn" onClick={handleRemove}>
          ♡
        </button>
      </div>
      
      <div className="item-content">
        <div className="item-header">
          <h3>{item.name}</h3>
          <div className="item-rating">
            <span className="star">★</span>
            {item.rating}
          </div>
        </div>
        
        <p className="item-location">{item.location}</p>
        <p className="item-description">{item.description}</p>
        
        <div className="item-features">
          {item.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="feature-tag">{feature}</span>
          ))}
          {item.features.length > 3 && (
            <span className="feature-tag">+{item.features.length - 3} more</span>
          )}
        </div>
        
        <div className="item-footer">
          <div className="item-price">${item.price}{item.type === 'hotel' ? '/night' : ''}</div>
          <div className="saved-date">Saved on {formatDate(item.savedDate)}</div>
        </div>
        
        <div className="item-actions">
          <button className="action-btn primary" disabled={!item.isAvailable}>
            {item.isAvailable ? 'Book Now' : 'Notify Me'}
          </button>
          <button className="action-btn secondary">
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
});

// Empty State Component
const EmptyState = React.memo(({ activeFilter }) => {
  const getMessage = () => {
    if (activeFilter !== 'all') {
      return `You haven't saved any ${activeFilter}s yet`;
    }
    return "You haven't saved any items yet";
  };

  const getSubmessage = () => {
    if (activeFilter !== 'all') {
      return `Start exploring ${activeFilter}s to save them for later`;
    }
    return "Start exploring hotels, activities, and restaurants to save them for later";
  };

  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="empty-icon">❤️</div>
      <h2>{getMessage()}</h2>
      <p>{getSubmessage()}</p>
      <button className="explore-btn">Explore Now</button>
    </motion.div>
  );
});

// Main SavedItems Component
const SavedItems = () => {
  const { savedItems, loading, error, removeItem, clearAll } = useSavedItems();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...savedItems];
    
    // Filter by category
    if (activeFilter !== 'all') {
      result = result.filter(item => item.type === activeFilter);
    }
    
    // Sort items
    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return result;
  }, [savedItems, activeFilter, sortBy]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handleSortChange = useCallback((sortOption) => {
    setSortBy(sortOption);
  }, []);

  const handleRemoveItem = useCallback((id) => {
    removeItem(id);
  }, [removeItem]);

  if (loading) {
    return (
      <div className="saved-items-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-items-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="saved-items-container">
      <header className="saved-items-header">
        <div className="header-content">
          <h1>Saved Items</h1>
          <p>Your personalized collection of places and experiences</p>
        </div>
        {savedItems.length > 0 && (
          <button className="clear-all-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </header>
      
      {savedItems.length > 0 ? (
        <>
          <div className="controls-section">
            <CategoryFilter 
              activeFilter={activeFilter} 
              onFilterChange={handleFilterChange} 
            />
            <SortDropdown 
              sortBy={sortBy} 
              onSortChange={handleSortChange} 
            />
          </div>
          
          <div className="stats-bar">
            <span>
              {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'item' : 'items'}
              {activeFilter !== 'all' && ` in ${activeFilter}s`}
            </span>
          </div>
          
          <motion.div 
            className="saved-items-grid"
            layout
          >
            <AnimatePresence>
              {filteredAndSortedItems.map((item, index) => (
                <SavedItemCard 
                  key={item.id} 
                  item={item} 
                  onRemove={handleRemoveItem}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <EmptyState activeFilter={activeFilter} />
      )}
    </div>
  );
};

export default SavedItems;