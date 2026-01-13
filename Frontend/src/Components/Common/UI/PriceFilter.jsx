import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';
import './PriceFilter.css';

const PriceFilter = ({ min = 0, max = 10000, onChange }) => {
  const [priceRange, setPriceRange] = useState([min, max]);

  const handlePriceChange = (values) => {
    setPriceRange(values);
    onChange(values);
  };

  const priceSteps = [
    { label: '₹0 - ₹2000', value: [0, 2000] },
    { label: '₹2000 - ₹5000', value: [2000, 5000] },
    { label: '₹5000 - ₹10000', value: [5000, 10000] },
    { label: '₹10000+', value: [10000, max] }
  ];

  return (
    <div className="price-filter">
      <h4>Price Range</h4>
      
      <div className="price-slider">
        <input
          type="range"
          min={min}
          max={max}
          value={priceRange[0]}
          onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
          className="slider min-slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={priceRange[1]}
          onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
          className="slider max-slider"
        />
        
        <div className="slider-track">
          <div 
            className="slider-range"
            style={{
              left: `${(priceRange[0] / max) * 100}%`,
              width: `${((priceRange[1] - priceRange[0]) / max) * 100}%`
            }}
          ></div>
        </div>
      </div>

      <div className="price-values">
        <span className="price-min">
          <IndianRupee size={12} />
          {priceRange[0]}
        </span>
        <span className="price-max">
          <IndianRupee size={12} />
          {priceRange[1]}
        </span>
      </div>

      <div className="price-presets">
        {priceSteps.map((step, index) => (
          <button
            key={index}
            className="price-preset"
            onClick={() => handlePriceChange(step.value)}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceFilter;