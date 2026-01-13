import React, { useState, useRef, useEffect } from 'react';
import './Terms.css';

const Terms = ({ termsData, variant = 'default', showAcceptance = false, showToc = true }) => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [acceptedSections, setAcceptedSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const sectionsRef = useRef({});
  const containerRef = useRef();

  const filteredSections = termsData.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof section.content === 'string' ? section.content : section.content.join(' '))
      .toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.subsections?.some(subsection =>
      subsection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsection.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const toggleSectionAcceptance = (sectionId) => {
    const newAccepted = new Set(acceptedSections);
    if (newAccepted.has(sectionId)) {
      newAccepted.delete(sectionId);
    } else {
      newAccepted.add(sectionId);
    }
    setAcceptedSections(newAccepted);
  };

  const acceptAll = () => {
    const allSectionIds = new Set(termsData.sections.map(section => section.id));
    setAcceptedSections(allSectionIds);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = Object.values(sectionsRef.current);
      const containerRect = container.getBoundingClientRect();
      
      for (const section of sections) {
        if (section) {
          const sectionRect = section.getBoundingClientRect();
          if (sectionRect.top <= containerRect.top + 100 && sectionRect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
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
        <p key={index} className="terms-paragraph">
          {highlightSearchTerm(item, searchTerm)}
        </p>
      ));
    }
    return <p className="terms-paragraph">{highlightSearchTerm(content, searchTerm)}</p>;
  };

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} className="terms-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const allAccepted = acceptedSections.size === termsData.sections.length;

  return (
    <div className={`terms-container ${variant}`}>
      {/* Header */}
      <header className="terms-header">
        <div className="terms-header-content">
          <h1 className="terms-title">
            <span className="terms-title-icon">📄</span>
            Terms of Service
          </h1>
          <div className="terms-meta">
            <span className="terms-effective-date">
              Effective: {termsData.effectiveDate}
            </span>
            {termsData.version && (
              <span className="terms-version">
                Version: {termsData.version}
              </span>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="terms-search">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="terms-search-input"
          />
          <span className="terms-search-icon">🔍</span>
        </div>

        {/* Progress Bar */}
        <div className="terms-progress-container">
          <div 
            className="terms-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      <div className="terms-content-wrapper">
        {/* Table of Contents */}
        {showToc && (
          <nav className="terms-toc">
            <div className="terms-toc-sticky">
              <h3 className="terms-toc-title">Contents</h3>
              
              {/* Search Results Info */}
              {searchTerm && (
                <div className="terms-search-results">
                  Found {filteredSections.length} matching sections
                </div>
              )}

              <ul className="terms-toc-list">
                {termsData.sections.map((section) => {
                  const isVisible = !searchTerm || filteredSections.includes(section);
                  const isAccepted = acceptedSections.has(section.id);
                  
                  return (
                    <li 
                      key={section.id} 
                      className={`terms-toc-item ${isVisible ? '' : 'hidden'}`}
                    >
                      <button
                        className={`terms-toc-link ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <span className="terms-toc-number">
                          {String(section.id.split('-')[1] || '').padStart(2, '0')}
                        </span>
                        <span className="terms-toc-text">{section.title}</span>
                        {showAcceptance && (
                          <span className={`terms-accept-indicator ${isAccepted ? 'accepted' : ''}`}>
                            {isAccepted ? '✓' : '○'}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Actions */}
              <div className="terms-actions">
                <button className="terms-action-btn terms-action-print">
                  📄 Print
                </button>
                <button className="terms-action-btn terms-action-download">
                  ⬇️ PDF
                </button>
                {showAcceptance && (
                  <button 
                    className="terms-action-btn terms-action-accept-all"
                    onClick={acceptAll}
                    disabled={allAccepted}
                  >
                    ✅ Accept All
                  </button>
                )}
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main 
          ref={containerRef}
          className="terms-main-content"
        >
          {/* Introduction */}
          <div className="terms-introduction">
            <h2>Welcome</h2>
            <p>{termsData.introduction || 'Please read these Terms of Service carefully before using our service.'}</p>
          </div>

          {/* Sections */}
          {termsData.sections.map((section, index) => {
            const isVisible = !searchTerm || filteredSections.includes(section);
            const isAccepted = acceptedSections.has(section.id);
            
            return (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionsRef.current[section.id] = el)}
                className={`terms-section ${isVisible ? '' : 'hidden'}`}
              >
                <div className="terms-section-header">
                  <span className="terms-section-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="terms-section-title-container">
                    <h2 className="terms-section-title">
                      {section.title}
                    </h2>
                    {showAcceptance && (
                      <button
                        className={`terms-accept-btn ${isAccepted ? 'accepted' : ''}`}
                        onClick={() => toggleSectionAcceptance(section.id)}
                      >
                        {isAccepted ? 'Accepted ✓' : 'Mark as Read'}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="terms-section-content">
                  {renderContent(section.content)}
                  
                  {section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="terms-subsection">
                      <h3 className="terms-subsection-title">
                        {subsection.title}
                      </h3>
                      {renderContent(subsection.content)}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Acceptance Footer */}
          {showAcceptance && (
            <div className="terms-acceptance-footer">
              <div className="terms-acceptance-summary">
                <h3>Acceptance Summary</h3>
                <p>
                  {acceptedSections.size} of {termsData.sections.length} sections accepted
                </p>
                <progress 
                  value={acceptedSections.size} 
                  max={termsData.sections.length}
                  className="terms-acceptance-progress"
                />
              </div>
              
              <button 
                className="terms-final-accept-btn"
                disabled={!allAccepted}
                onClick={() => termsData.onAccept && termsData.onAccept()}
              >
                {allAccepted ? '✅ Accept Terms of Service' : 'Please read all sections'}
              </button>
            </div>
          )}

          {/* Footer */}
          <footer className="terms-footer">
            <p>Last updated: {termsData.lastUpdated}</p>
            {termsData.contactEmail && (
              <p>
                Questions? Contact:{" "}
                <a href={`mailto:${termsData.contactEmail}`} className="terms-contact-link">
                  {termsData.contactEmail}
                </a>
              </p>
            )}
          </footer>
        </main>
      </div>

      {/* Floating Action Button */}
      <button 
        className="terms-fab"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

// Default terms data structure
Terms.defaultProps = {
  termsData: {
    effectiveDate: 'January 1, 2024',
    lastUpdated: 'January 1, 2024',
    version: '1.0',
    introduction: 'By accessing or using our service, you agree to be bound by these Terms of Service.',
    contactEmail: 'legal@company.com',
    sections: [
      {
        id: 'agreement',
        title: 'Agreement to Terms',
        content: 'By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.'
      },
      {
        id: 'accounts',
        title: 'User Accounts',
        content: 'When you create an account with us, you must provide accurate and complete information.',
        subsections: [
          {
            title: 'Account Security',
            content: 'You are responsible for safeguarding your account password.'
          },
          {
            title: 'Account Termination',
            content: 'We reserve the right to terminate accounts that violate these terms.'
          }
        ]
      },
      {
        id: 'content',
        title: 'Intellectual Property',
        content: [
          'The Service and its original content, features, and functionality are owned by us.',
          'Our trademarks may not be used without prior written permission.'
        ]
      }
    ],
    onAccept: () => console.log('Terms accepted')
  }
};

export default Terms;