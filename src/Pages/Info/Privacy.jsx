import React, { useState, useRef, useEffect } from 'react';
import './Privacy.css';

const Privacy = ({ policyData, variant = 'default', showToc = true, showAccept = false }) => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [accepted, setAccepted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef({});
  const containerRef = useRef();

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleAccept = () => {
    setAccepted(true);
    // You can add callback here for acceptance handling
    if (policyData.onAccept) {
      policyData.onAccept();
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <p key={index} className="privacy-paragraph">
          {item}
        </p>
      ));
    }
    return <p className="privacy-paragraph">{content}</p>;
  };

  return (
    <div className={`privacy-container ${variant}`}>
      {/* Header */}
      <header className="privacy-header">
        <div className="privacy-header-content">
          <h1 className="privacy-title">
            <span className="privacy-title-icon">🔒</span>
            Privacy Policy
          </h1>
          <p className="privacy-subtitle">
            Last updated: {policyData.lastUpdated || 'January 1, 2024'}
          </p>
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="privacy-progress-container">
          <div 
            className="privacy-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      <div className="privacy-content-wrapper">
        {/* Table of Contents */}
        {showToc && (
          <nav className="privacy-toc">
            <div className="privacy-toc-sticky">
              <h3 className="privacy-toc-title">Contents</h3>
              <ul className="privacy-toc-list">
                {policyData.sections.map((section) => (
                  <li key={section.id} className="privacy-toc-item">
                    <button
                      className={`privacy-toc-link ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => scrollToSection(section.id)}
                      onKeyPress={(e) => e.key === 'Enter' && scrollToSection(section.id)}
                    >
                      <span className="privacy-toc-number">
                        {String(section.id.split('-')[1] || '').padStart(2, '0')}
                      </span>
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Quick Actions */}
              <div className="privacy-actions">
                <button className="privacy-action-btn privacy-action-print">
                  📄 Print
                </button>
                <button className="privacy-action-btn privacy-action-download">
                  ⬇️ Download
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main 
          ref={containerRef}
          className="privacy-main-content"
        >
          {policyData.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionsRef.current[section.id] = el)}
              className="privacy-section"
            >
              <div className="privacy-section-header">
                <span className="privacy-section-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="privacy-section-title">
                  {section.title}
                </h2>
              </div>
              
              <div className="privacy-section-content">
                {renderContent(section.content)}
                
                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="privacy-subsection">
                    <h3 className="privacy-subsection-title">
                      {subsection.title}
                    </h3>
                    {renderContent(subsection.content)}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Acceptance Footer */}
          {showAccept && !accepted && (
            <div className="privacy-acceptance">
              <div className="privacy-acceptance-content">
                <h3>Privacy Policy Acceptance</h3>
                <p>By clicking "Accept", you acknowledge that you have read and agree to our Privacy Policy.</p>
                <button 
                  className="privacy-accept-btn"
                  onClick={handleAccept}
                >
                  ✅ Accept Privacy Policy
                </button>
              </div>
            </div>
          )}

          {accepted && (
            <div className="privacy-accepted">
              <span className="privacy-accepted-icon">✅</span>
              Privacy Policy accepted on {new Date().toLocaleDateString()}
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <button 
        className="privacy-fab"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

// Default policy data structure
Privacy.defaultProps = {
  policyData: {
    lastUpdated: 'January 1, 2024',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: [
          'Welcome to our Privacy Policy. This policy describes how we collect, use, and share your personal information.',
          'We are committed to protecting your privacy and ensuring transparency about our data practices.'
        ]
      },
      {
        id: 'data-collection',
        title: 'Data We Collect',
        content: 'We collect information you provide directly to us, as well as automatically through your use of our services.',
        subsections: [
          {
            title: 'Personal Information',
            content: 'This includes name, email address, phone number, and other identifying information.'
          },
          {
            title: 'Usage Data',
            content: 'We collect information about how you interact with our services, including IP address, browser type, and pages visited.'
          }
        ]
      }
    ]
  }
};

export default Privacy;