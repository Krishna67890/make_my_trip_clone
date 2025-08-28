import React from 'react';
import './Loader.css';

const Loader = ({ type = 'spinner', size = 'medium', text = 'Loading...' }) => {
  if (type === 'spinner') {
    return (
      <div className="loader-container">
        <div className={`spinner spinner-${size}`}></div>
        {text && <p className="loader-text">{text}</p>}
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className="skeleton-loader">
        <div className="skeleton-header"></div>
        <div className="skeleton-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;