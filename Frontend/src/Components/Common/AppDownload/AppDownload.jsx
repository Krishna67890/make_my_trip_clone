import React from 'react';
import './AppDownload.css';

const AppDownload = () => {
  const handleDownload = (platform) => {
    console.log(`Downloading for ${platform}`);
    // Add your actual download logic here
  };

  return (
    <section className="app-download">
      <div className="app-download-container">
        <div className="app-download-content">
          <h2 className="app-download-title">
            Download Our App Today!
          </h2>
          <p className="app-download-description">
            Get the best experience on your mobile device. 
            Available on both iOS and Android platforms.
          </p>
          
          <div className="download-buttons">
            <button 
              className="download-btn ios-btn"
              onClick={() => handleDownload('iOS')}
            >
              <span className="btn-icon">🍎</span>
              <span className="btn-text">
                <span className="btn-subtext">Download on the</span>
                <span className="btn-maintext">App Store</span>
              </span>
            </button>
            
            <button 
              className="download-btn android-btn"
              onClick={() => handleDownload('Android')}
            >
              <span className="btn-icon">🤖</span>
              <span className="btn-text">
                <span className="btn-subtext">GET IT ON</span>
                <span className="btn-maintext">Google Play</span>
              </span>
            </button>
          </div>
        </div>
        
        <div className="app-preview">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-screenshot">
                <div className="app-content">
                  <div className="app-header">My App</div>
                  <div className="app-body">
                    <div className="feature-item"></div>
                    <div className="feature-item"></div>
                    <div className="feature-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;