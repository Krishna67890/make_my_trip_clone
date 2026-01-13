import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Map, Compass, AlertCircle, Phone, 
  HelpCircle, Download, BookOpen, Globe,
  Camera, Sun, Wallet, Info, Heart
} from 'lucide-react';
import '../../Styles/Pages/Destinations/TravelTips.css';

const TravelTips = () => {
  const [activeTab, setActiveTab] = useState('how');

  const content = {
    how: {
      title: "How to Travel",
      subtitle: "The logistics of navigating the Indian subcontinent",
      sections: [
        {
          title: "Public Transportation",
          icon: <Map className="text-primary" />,
          tips: [
            { id: 1, title: "Train Travel", desc: "India has one of the largest rail networks. Book AC classes (1AC, 2AC, 3AC) for comfort on long journeys." },
            { id: 2, title: "Metro Systems", desc: "Major cities like Delhi, Mumbai, and Bangalore have excellent metro networks. Use 'Metro Cards' to save time." },
            { id: 3, title: "Rickshaws", desc: "Best for short distances. Always agree on a fare before boarding or ask for the meter." }
          ]
        },
        {
          title: "Domestic Flights",
          icon: <Globe className="text-secondary" />,
          tips: [
            { id: 4, title: "Budget Carriers", desc: "IndiGo, Air India Express, and Akasa Air offer great connectivity between secondary cities." },
            { id: 5, title: "Web Check-in", desc: "Highly recommended to avoid long queues at airport terminals." }
          ]
        }
      ]
    },
    when: {
      title: "When to Travel",
      subtitle: "Choosing the perfect season for your destination",
      sections: [
        {
          title: "The Golden Window",
          icon: <Sun className="text-accent" />,
          tips: [
            { id: 6, title: "Winter (Oct - Mar)", desc: "The best time to visit Rajasthan, South India, and the plains. Pleasant weather and clear skies." },
            { id: 7, title: "Summer (Apr - Jun)", desc: "Ideal for the Himalayas, Ladakh, and hill stations like Shimla or Munnar." },
            { id: 8, title: "Monsoon (Jul - Sep)", desc: "Perfect for Kerala (Ayurveda) and the lush green Western Ghats." }
          ]
        }
      ]
    },
    allAbout: {
      title: "All About Travel",
      subtitle: "Essential knowledge for the conscious traveler",
      sections: [
        {
          title: "Cultural Etiquette",
          icon: <Heart className="text-danger" />,
          tips: [
            { id: 9, title: "Namaste", desc: "The traditional greeting. Fold your hands and bow slightly to show respect." },
            { id: 10, title: "Modest Dressing", desc: "Dress conservatively when visiting religious sites. Always remove shoes before entering temples." }
          ]
        },
        {
          title: "Health & Safety",
          icon: <Shield className="text-success" />,
          tips: [
            { id: 11, title: "Water Safety", desc: "Only drink bottled or purified water. Avoid ice in local beverages." },
            { id: 12, title: "Street Food", desc: "Look for stalls with high turnover—the food is fresher and safer." }
          ]
        }
      ]
    }
  };

  const tabs = [
    { id: 'how', label: 'How to Travel', icon: <Compass size={18} /> },
    { id: 'when', label: 'When to Travel', icon: <Calendar size={18} /> },
    { id: 'allAbout', label: 'All About India', icon: <Info size={18} /> },
  ];

  return (
    <div className="tips-page-modern">
      {/* Hero Section */}
      <section className="tips-hero-modern">
        <div className="decor-glow"></div>
        <div className="container">
          <motion.div 
            className="hero-text-area"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="premium-badge">Expert Travel Guide</span>
            <h1>The Ultimate <span className="text-gradient">India Travel</span> Manual</h1>
            <p>Everything you need to know about navigating, timing, and experiencing the heart of Asia.</p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="tabs-section">
        <div className="container">
          <div className="tips-nav-glass">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                className={`tip-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-active" className="active-glow" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="tips-content-modern">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="tips-grid-wrapper"
            >
              <div className="grid-header">
                <h2>{content[activeTab].title}</h2>
                <p>{content[activeTab].subtitle}</p>
              </div>

              <div className="sections-container">
                {content[activeTab].sections.map((section, idx) => (
                  <div key={idx} className="tips-section-card">
                    <div className="section-head">
                      <div className="icon-wrap">{section.icon}</div>
                      <h3>{section.title}</h3>
                    </div>
                    <div className="tips-list">
                      {section.tips.map((tip) => (
                        <div key={tip.id} className="tip-item-modern">
                          <div className="tip-bullet"><CheckCircle size={14} /></div>
                          <div className="tip-body">
                            <h4>{tip.title}</h4>
                            <p>{tip.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Emergency & Support */}
      <section className="support-section">
        <div className="container">
          <div className="support-card-glass">
            <div className="support-info">
              <AlertCircle size={40} className="text-secondary" />
              <div>
                <h3>Need Assistance?</h3>
                <p>Our 24/7 tourist helpline is available for all travelers in India.</p>
              </div>
            </div>
            <div className="support-actions">
              <button className="btn-call"><Phone size={18} /> Dial 1363</button>
              <button className="btn-chat">Live Support</button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="resources-section">
        <div className="container">
          <div className="resources-grid">
            <div className="res-card">
              <BookOpen size={32} />
              <h4>Travel Guide PDF</h4>
              <p>Download our complete 50-page guide for offline reading.</p>
              <button className="btn-res">Download <Download size={16} /></button>
            </div>
            <div className="res-card">
              <Camera size={32} />
              <h4>Photography Guide</h4>
              <p>Tips for capturing the best of India's colors and heritage.</p>
              <button className="btn-res">Read More <ArrowRight size={16} /></button>
            </div>
            <div className="res-card">
              <Wallet size={32} />
              <h4>Budget Planner</h4>
              <p>How to travel across India on various budget levels.</p>
              <button className="btn-res">Open Planner <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple Calendar icon since Lucide import failed for it in this scope
const Calendar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const ArrowRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const CheckCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default TravelTips;