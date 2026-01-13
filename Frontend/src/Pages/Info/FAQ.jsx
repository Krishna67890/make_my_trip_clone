import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const FAQ = ({ faqData, variant = 'default', allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const itemsRef = useRef([]);

  const filteredData = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      newOpenItems.clear();
      if (!openItems.has(index)) {
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, faqData.length);
  }, [faqData]);

  return (
    <div className={`faq-container ${variant}`}>
      <div className="faq-header">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="faq-search-input"
          />
          <span className="faq-search-icon">🔍</span>
        </div>
      </div>

      <div className="faq-list">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => {
            const originalIndex = faqData.findIndex(f => f === item);
            const isOpen = openItems.has(originalIndex);
            
            return (
              <div
                key={originalIndex}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                ref={el => itemsRef.current[originalIndex] = el}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleItem(originalIndex)}
                  onKeyPress={(e) => handleKeyPress(originalIndex, e)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${originalIndex}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon">
                    <span className="faq-icon-line faq-icon-line-horizontal"></span>
                    <span className="faq-icon-line faq-icon-line-vertical"></span>
                  </span>
                </div>
                <div
                  id={`faq-answer-${originalIndex}`}
                  className="faq-answer"
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-content">
                    {typeof item.answer === 'string' ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="faq-no-results">
            <p>No results found for "{searchTerm}"</p>
          </div>
        )}
      </div>

      {filteredData.length > 0 && (
        <div className="faq-footer">
          <div className="faq-stats">
            Showing {filteredData.length} of {faqData.length} questions
          </div>
        </div>
      )}
    </div>
  );
};

// Default FAQ data structure
FAQ.defaultProps = {
  faqData: [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items with original packaging."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery."
    }
  ]
};

export default FAQ;