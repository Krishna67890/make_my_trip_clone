import React, { useState, useEffect } from 'react';
import '../../Styles/Pages/TravelTips/TravelTips.css';

const TravelTips = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedTips, setSavedTips] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedTip, setExpandedTip] = useState(null);
  
  const categories = [
    { id: 'flight', name: 'Flight Tips', icon: '✈️' },
    { id: 'hotel', name: 'Hotel Tips', icon: '🏨' },
    { id: 'transport', name: 'Transportation', icon: '🚗' },
    { id: 'dining', name: 'Dining', icon: '🍽️' },
    { id: 'culture', name: 'Cultural', icon: '🏛️' },
    { id: 'health', name: 'Health & Wellness', icon: '🏥' },
    { id: 'money', name: 'Money Saving', icon: '💰' },
    { id: 'tech', name: 'Technology', icon: '📱' },
  ];

  const travelTips = [
    // Flight Tips
    { 
      id: 1, 
      category: 'flight', 
      title: 'Best Time to Book', 
      content: [
        'Book flights 6-8 weeks in advance for domestic routes',
        'For international travel, aim for 12-16 weeks ahead',
        'Tuesday, Wednesday, and Saturday are typically cheapest days to fly',
        'Early morning and late-night flights often cost less',
        'Use incognito mode when searching to avoid price tracking'
      ],
      difficulty: 'beginner',
      cost: 'low',
      duration: 'planning',
      tags: ['saving', 'planning', 'timing']
    },
    { 
      id: 2, 
      category: 'flight', 
      title: 'Airport Security', 
      content: [
        'Wear slip-on shoes to speed up security checks',
        'Keep electronics easily accessible for separate screening',
        'Pack liquids in clear, quart-sized bags',
        'Arrive 2 hours before domestic flights, 3 hours for international',
        'Download airline apps for digital boarding passes and updates'
      ],
      difficulty: 'easy',
      cost: 'free',
      duration: 'quick',
      tags: ['security', 'efficiency', 'preparation']
    },
    
    // Hotel Tips
    { 
      id: 3, 
      category: 'hotel', 
      title: 'Room Selection', 
      content: [
        'Request rooms on higher floors for better views and less noise',
        'Ask for rooms away from elevators and ice machines',
        'Check for hidden resort fees and parking costs before booking',
        'Book directly with hotels to get loyalty points and better rates',
        'Verify cancellation policies before finalizing reservation'
      ],
      difficulty: 'intermediate',
      cost: 'free',
      duration: 'quick',
      tags: ['comfort', 'value', 'location']
    },
    
    // Transportation Tips
    { 
      id: 4, 
      category: 'transport', 
      title: 'Local Transit', 
      content: [
        'Research local transportation options before arrival',
        'Purchase transit cards or passes for unlimited rides',
        'Use ride-sharing apps in major cities for convenience',
        'Negotiate taxi fares before getting in in unfamiliar places',
        'Validate train tickets before boarding in European countries'
      ],
      difficulty: 'easy',
      cost: 'low',
      duration: 'quick',
      tags: ['efficiency', 'cost', 'local']
    },
    
    // Dining Tips
    { 
      id: 5, 
      category: 'dining', 
      title: 'Food & Drink', 
      content: [
        'Try local street food for authentic flavors and better prices',
        'Ask locals for restaurant recommendations over guidebooks',
        'Avoid tourist-heavy restaurant areas for better value',
        'Check for dress codes at upscale restaurants in advance',
        'Know local tipping customs and practices'
      ],
      difficulty: 'easy',
      cost: 'medium',
      duration: 'experience',
      tags: ['culture', 'authenticity', 'value']
    },
    
    // Cultural Tips
    { 
      id: 6, 
      category: 'culture', 
      title: 'Cultural Etiquette', 
      content: [
        'Research local customs and etiquette before traveling',
        'Dress appropriately when visiting religious sites',
        'Learn basic greetings in the local language',
        'Respect local traditions and social norms',
        'Ask permission before photographing people'
      ],
      difficulty: 'intermediate',
      cost: 'free',
      duration: 'ongoing',
      tags: ['respect', 'etiquette', 'integration']
    },
    
    // Health Tips
    { 
      id: 7, 
      category: 'health', 
      title: 'Health & Wellness', 
      content: [
        'Get necessary vaccinations before travel',
        'Pack a comprehensive first aid kit',
        'Stay hydrated, especially during flights',
        'Maintain regular exercise routine while traveling',
        'Know locations of medical facilities at your destination'
      ],
      difficulty: 'essential',
      cost: 'medium',
      duration: 'ongoing',
      tags: ['wellness', 'prevention', 'care']
    },
    
    // Money Tips
    { 
      id: 8, 
      category: 'money', 
      title: 'Budget Strategies', 
      content: [
        'Use travel rewards and credit card points strategically',
        'Travel during shoulder seasons for better deals',
        'Use public transportation instead of taxis',
        'Eat like a local instead of tourist-oriented restaurants',
        'Take advantage of free walking tours and attractions'
      ],
      difficulty: 'intermediate',
      cost: 'free',
      duration: 'ongoing',
      tags: ['budget', 'deals', 'strategies']
    },
    
    // Technology Tips
    { 
      id: 9, 
      category: 'tech', 
      title: 'Digital Travel', 
      content: [
        'Download offline maps before traveling',
        'Use VPN for public Wi-Fi connections',
        'Backup important documents to cloud storage',
        'Enable international roaming or buy local SIM card',
        'Use travel apps for translations and local information'
      ],
      difficulty: 'intermediate',
      cost: 'low',
      duration: 'setup',
      tags: ['technology', 'safety', 'convenience']
    }
  ];

  const advancedTips = [
    {
      id: 'tip1',
      category: 'flight',
      title: 'Hidden City Ticketing',
      description: 'Book a flight with a layover at your actual destination and skip the last leg',
      difficulty: 'advanced',
      savings: 'High',
      risk: 'Medium',
      requirements: ['Carry-on only', 'No checked bags', 'One-way trips'],
      warning: 'Airlines may cancel return flights if detected',
      icon: '📍'
    },
    {
      id: 'tip2',
      category: 'money',
      title: 'Credit Card Points Strategy',
      description: 'Use travel credit cards strategically to earn points for free flights',
      difficulty: 'intermediate',
      savings: 'Very High',
      risk: 'Low',
      requirements: ['Good credit score', 'Multiple cards', 'Regular spending'],
      warning: 'Avoid carrying balances to prevent interest charges',
      icon: '💳'
    },
    {
      id: 'tip3',
      category: 'tech',
      title: 'Global SIM Card Setup',
      description: 'Use eSIM services for instant connectivity in multiple countries',
      difficulty: 'intermediate',
      savings: 'Medium',
      risk: 'Low',
      requirements: ['Unlocked phone', 'ESim compatible device'],
      warning: 'Check network compatibility before travel',
      icon: '📶'
    }
  ];

  const filteredTips = travelTips.filter(tip => {
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tip.content.some(content => content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const saveTip = (tipId) => {
    setSavedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const toggleExpand = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'flight': '#3a86ff',
      'hotel': '#10b981',
      'transport': '#f59e0b',
      'dining': '#ef4444',
      'culture': '#8b5cf6',
      'health': '#06b6d4',
      'money': '#84cc16',
      'tech': '#f97316'
    };
    return colorMap[category] || '#6c757d';
  };

  const getDifficultyClass = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'difficulty-badge easy';
      case 'intermediate': return 'difficulty-badge intermediate';
      case 'advanced': return 'difficulty-badge advanced';
      case 'essential': return 'difficulty-badge intermediate';
      default: return 'difficulty-badge easy';
    }
  };

  const getCostClass = (cost) => {
    switch(cost) {
      case 'free': return 'cost-badge free';
      case 'low': return 'cost-badge low';
      case 'medium': return 'cost-badge medium';
      case 'high': return 'cost-badge high';
      default: return 'cost-badge free';
    }
  };

  return (
    <div className="travel-tips">
      <div className="container">
        {/* Hero Section */}
        <section className="tips-hero">
          <div className="hero-content">
            <h1 className="cosmic-text">Travel Tips & Advice</h1>
            <p className="cosmic-subtitle">Expert insights for smart travelers</p>
            <p className="section-subtitle">
              Unlock premium travel knowledge with interactive guides, personalized recommendations, and insider strategies.
              From budget hacks to luxury travel secrets, discover everything you need to know.
            </p>
            
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search tips, destinations, advice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-button">Search</button>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              <div className="stat">
                <span className="stat-number">{travelTips.length}</span>
                <span className="stat-label">Expert Tips</span>
              </div>
              <div className="stat">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">{savedTips.length}</span>
                <span className="stat-label">Saved Tips</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <div className="quick-nav">
          <div className="nav-scroll">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="nav-icon">{cat.icon}</span>
                <span className="nav-label">{cat.name}</span>
              </button>
            ))}
            <button
              className={`nav-item ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <span className="nav-icon">✨</span>
              <span className="nav-label">All Tips</span>
            </button>
          </div>
        </div>

        {/* View Controls */}
        <div className="view-controls">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>

        {/* Tips Grid */}
        <div className={`tips-grid ${viewMode}`}>
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="tip-card"
            >
              <div className="tip-header">
                <div className="tip-category" style={{ backgroundColor: getCategoryColor(tip.category) }}>
                  {categories.find(c => c.id === tip.category)?.icon}
                  <span>{tip.category}</span>
                </div>
                <button 
                  className={`save-btn ${savedTips.includes(tip.id) ? 'saved' : ''}`}
                  onClick={() => saveTip(tip.id)}
                >
                  {savedTips.includes(tip.id) ? '✓ Saved' : '☆ Save'}
                </button>
              </div>
              
              <div className="tip-content">
                <h3 className="tip-title">{tip.title}</h3>
                
                <div className="tip-meta">
                  <span className={getDifficultyClass(tip.difficulty)}>
                    {tip.difficulty}
                  </span>
                  <span className={getCostClass(tip.cost)}>
                    {tip.cost === 'free' ? 'Free' : tip.cost}
                  </span>
                </div>
                
                <div className={`tip-description ${expandedTip === tip.id ? 'expanded' : 'collapsed'}`}>
                  <ul>
                    {tip.content.map((item, index) => (
                      <li key={index} className="tip-list-item">
                        <span className="tip-bullet">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="tip-tags">
                  {tip.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
                
                <button 
                  className="expand-btn"
                  onClick={() => toggleExpand(tip.id)}
                >
                  {expandedTip === tip.id ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Tips Section */}
        <section className="advanced-tips-section" id="advanced">
          <div className="section-header">
            <h2 className="section-title">Advanced Travel Hacks</h2>
            <p className="section-subtitle">Pro-level strategies for experienced travelers</p>
          </div>
          
          <div className="advanced-tips-grid">
            {advancedTips.map((tip) => (
              <div
                key={tip.id}
                className="advanced-tip"
              >
                <div className="advanced-tip-header">
                  <div className="tip-icon-wrapper">
                    {tip.icon}
                  </div>
                  <div className="tip-level">
                    <span className={`level-badge ${tip.difficulty}`}>
                      {tip.difficulty}
                    </span>
                  </div>
                </div>
                
                <h3>{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
                
                <div className="tip-stats">
                  <div className="stat-item">
                    <span className="stat-label">Savings</span>
                    <span className={`stat-value savings-${tip.savings.toLowerCase()}`}>
                      {tip.savings}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Risk</span>
                    <span className={`stat-value risk-${tip.risk.toLowerCase()}`}>
                      {tip.risk}
                    </span>
                  </div>
                </div>
                
                <div className="requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {tip.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                {tip.warning && (
                  <div className="warning-note">
                    ⚠️ <span>{tip.warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Planning Tool */}
        <section className="planning-tool-section">
          <div className="section-header">
            <h2 className="section-title">Trip Planning Assistant</h2>
            <p className="section-subtitle">Get personalized travel advice based on your trip details</p>
          </div>
          
          <div className="planning-tool">
            <div className="tool-form">
              <div className="form-group">
                <label>Destination</label>
                <input type="text" placeholder="Where are you going?" className="cosmic-input" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Trip Duration</label>
                  <select className="cosmic-select">
                    <option>Weekend (2-3 days)</option>
                    <option>Week (7-10 days)</option>
                    <option>Extended (2+ weeks)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Travel Style</label>
                  <select className="cosmic-select">
                    <option>Budget Backpacker</option>
                    <option>Comfort Traveler</option>
                    <option>Luxury Explorer</option>
                    <option>Business Travel</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Special Requirements</label>
                <div className="checkbox-group">
                  <label className="checkbox">
                    <input type="checkbox" /> Dietary Restrictions
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" /> Mobility Needs
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" /> Family Travel
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" /> Solo Travel
                  </label>
                </div>
              </div>
              
              <button className="generate-plan-btn">
                Generate Personalized Tips
              </button>
            </div>
            
            <div className="tool-preview">
              <div className="preview-header">
                <h4>Your Custom Plan</h4>
                <button className="export-btn">
                  Export PDF
                </button>
              </div>
              <div className="preview-content">
                <p>Complete the form to see personalized travel recommendations tailored to your specific needs and preferences.</p>
                <div className="placeholder-items">
                  <div className="placeholder-item"></div>
                  <div className="placeholder-item"></div>
                  <div className="placeholder-item"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tip of the Day */}
        <div className="tip-of-day">
          <div className="tip-day-header">
            <div className="sparkle-icon">✨</div>
            <h3>Tip of the Day</h3>
          </div>
          <p className="day-tip">
            "Always take photos of your luggage contents and important documents before traveling. This can be invaluable for insurance claims if items are lost or stolen."
          </p>
          <div className="tip-source">
            📸 Pro Traveler Recommendation
          </div>
        </div>

        {/* Download Section */}
        <section className="download-section">
          <div className="download-content">
            <div className="download-info">
              <h3 className="cosmic-text">Travel Smart Kit</h3>
              <p>Download our complete travel preparation checklist, packing list, and emergency contact template.</p>
              <div className="download-buttons">
                <button className="download-btn primary">
                  Download PDF Pack
                </button>
                <button className="download-btn secondary">
                  Save to Cloud
                </button>
              </div>
            </div>
            <div className="download-preview">
              <div className="document-card">
                <h4>Ultimate Packing List</h4>
                <ul>
                  <li>✓ Travel Documents</li>
                  <li>✓ Medications</li>
                  <li>✓ Tech Essentials</li>
                  <li>✓ Clothing Guide</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TravelTips;