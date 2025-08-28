// src/pages/TravelTips/TravelTips.jsx
import React, { useState } from 'react';
import './TravelTips.css';

const TravelTips = () => {
  const [activeCategory, setActiveCategory] = useState('cultural');

  const travelTips = {
    cultural: [
      {
        title: "Namaste Culture",
        description: "The traditional Indian greeting involves folding hands and saying 'Namaste'. It shows respect and is appreciated by locals.",
        icon: "🙏",
        importance: "high"
      },
      {
        title: "Temple Etiquette",
        description: "Remove shoes before entering temples, cover your head in Gurudwaras, and dress modestly in religious places.",
        icon: "🛕",
        importance: "high"
      },
      {
        title: "Festival Participation",
        description: "Indians love sharing their festivals. Participate in local celebrations but be respectful of traditions.",
        icon: "🎉",
        importance: "medium"
      }
    ],
    transportation: [
      {
        title: "Auto-Rickshaw Bargaining",
        description: "Always negotiate the fare before boarding an auto-rickshaw. Use meter or agree on price upfront.",
        icon: "🛺",
        importance: "high"
      },
      {
        title: "Train Travel Tips",
        description: "Book AC classes for long journeys, arrive early at stations, and keep your belongings secure.",
        icon: "🚆",
        importance: "high"
      },
      {
        title: "Domestic Flights",
        description: "Book domestic flights in advance for better prices. Check baggage allowances carefully.",
        icon: "✈️",
        importance: "medium"
      }
    ],
    food: [
      {
        title: "Street Food Safety",
        description: "Eat at busy stalls, avoid raw salads, and drink only bottled or purified water.",
        icon: "🍛",
        importance: "high"
      },
      {
        title: "Spice Levels",
        description: "Specify 'less spicy' if you're not accustomed to Indian spices. Start mild and gradually increase.",
        icon: "🌶️",
        importance: "medium"
      },
      {
        title: "Regional Specialties",
        description: "Each region has unique cuisine. Don't miss local specialties wherever you travel.",
        icon: "🍽️",
        importance: "medium"
      }
    ],
    safety: [
      {
        title: "Personal Belongings",
        description: "Keep valuables in hotel safes, use money belts, and be cautious in crowded areas.",
        icon: "💰",
        importance: "high"
      },
      {
        title: "Emergency Numbers",
        description: "Save these numbers: Police - 100, Ambulance - 102, Tourist Helpline - 1363.",
        icon: "📞",
        importance: "high"
      },
      {
        title: "Women Travelers",
        description: "Dress modestly, avoid isolated areas at night, and use registered taxis.",
        icon: "👩",
        importance: "high"
      }
    ],
    shopping: [
      {
        title: "Bargaining Tips",
        description: "Start at 30-40% of asking price. Be polite but firm. Markets expect bargaining.",
        icon: "🛍️",
        importance: "medium"
      },
      {
        title: "Authentic Souvenirs",
        description: "Look for handicrafts specific to regions: Kashmir for pashmina, Rajasthan for textiles, Goa for cashews.",
        icon: "🎁",
        importance: "medium"
      },
      {
        title: "Tax Refunds",
        description: "Keep receipts for expensive items. Some shops offer tax refunds for tourists.",
        icon: "🧾",
        importance: "low"
      }
    ],
    health: [
      {
        title: "Vaccinations",
        description: "Consult your doctor for recommended vaccinations before traveling to India.",
        icon: "💉",
        importance: "high"
      },
      {
        title: "Water Safety",
        description: "Drink only bottled or purified water. Avoid ice in drinks unless from purified water.",
        icon: "💧",
        importance: "high"
      },
      {
        title: "Medical Kit",
        description: "Carry basic medicines for diarrhea, allergies, and common ailments.",
        icon: "💊",
        importance: "medium"
      }
    ]
  };

  const categories = [
    { id: 'cultural', name: 'Cultural Etiquette', icon: '🎭' },
    { id: 'transportation', name: 'Transportation', icon: '🚗' },
    { id: 'food', name: 'Food & Dining', icon: '🍴' },
    { id: 'safety', name: 'Safety Tips', icon: '🛡️' },
    { id: 'shopping', name: 'Shopping', icon: '🛒' },
    { id: 'health', name: 'Health', icon: '🏥' }
  ];

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return '#e53e3e';
      case 'medium': return '#d69e2e';
      case 'low': return '#38a169';
      default: return '#718096';
    }
  };

  return (
    <div className="travel-tips-container">
      {/* Header Section */}
      <div className="tips-hero">
        <div className="hero-content">
          <h1>India Travel Tips</h1>
          <p>Essential advice for a smooth and memorable journey through incredible India</p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-1"></div>
          <div className="pattern-2"></div>
          <div className="pattern-3"></div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        <div className="nav-scroll">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">🌡️</div>
          <div className="stat-info">
            <h3>Weather Alert</h3>
            <p>Check seasonal weather patterns before travel</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🕰️</div>
          <div className="stat-info">
            <h3>Time Zone</h3>
            <p>IST (UTC+5:30) - No Daylight Saving</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💱</div>
          <div className="stat-info">
            <h3>Currency</h3>
            <p>Indian Rupee (₹) - Exchange at authorized dealers</p>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="tips-content">
        <div className="tips-header">
          <h2>{categories.find(cat => cat.id === activeCategory)?.name} Tips</h2>
          <p>Essential advice for your Indian adventure</p>
        </div>

        <div className="tips-grid">
          {travelTips[activeCategory].map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-header">
                <div className="tip-icon">{tip.icon}</div>
                <div className="tip-importance" style={{ backgroundColor: getImportanceColor(tip.importance) }}>
                  {tip.importance}
                </div>
              </div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
              <div className="tip-footer">
                <span className="importance-label">
                  Importance: <strong>{tip.importance}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Section */}
      <div className="emergency-section">
        <div className="emergency-content">
          <h2>Emergency Information</h2>
          <div className="emergency-cards">
            <div className="emergency-card critical">
              <div className="emergency-icon">🚨</div>
              <h3>Police</h3>
              <p className="emergency-number">100</p>
              <p>For any emergency assistance</p>
            </div>
            <div className="emergency-card critical">
              <div className="emergency-icon">🚑</div>
              <h3>Ambulance</h3>
              <p className="emergency-number">102</p>
              <p>Medical emergencies</p>
            </div>
            <div className="emergency-card important">
              <div className="emergency-icon">📞</div>
              <h3>Tourist Helpline</h3>
              <p className="emergency-number">1363</p>
              <p>24/7 tourist assistance</p>
            </div>
            <div className="emergency-card important">
              <div className="emergency-icon">🏢</div>
              <h3>Tourism Office</h3>
              <p className="emergency-number">+91-11-23366542</p>
              <p>General tourism queries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="download-section">
        <div className="download-content">
          <h2>Travel Prepared</h2>
          <p>Download our comprehensive India travel guide with all essential tips and emergency information</p>
          <div className="download-buttons">
            <button className="download-btn primary">
              📄 Download PDF Guide
            </button>
            <button className="download-btn secondary">
              📱 Save to Phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTips;