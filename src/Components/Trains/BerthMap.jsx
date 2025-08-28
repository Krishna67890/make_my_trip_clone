// BerthMap.jsx
import React from 'react';
import './BerthMap.css';

const BerthMap = ({ selectedBerths = [], onBerthSelect }) => {
  // Mock berth layout for Indian trains
  const berthLayout = [
    // Lower Berth
    [
      { number: '1', type: 'LB', available: true },
      { number: '2', type: 'LB', available: false },
      { number: '3', type: 'LB', available: true },
      { number: '4', type: 'LB', available: true },
      { number: '5', type: 'LB', available: true },
      { number: '6', type: 'LB', available: true }
    ],
    // Middle Berth
    [
      { number: '7', type: 'MB', available: true },
      { number: '8', type: 'MB', available: true },
      { number: '9', type: 'MB', available: true },
      { number: '10', type: 'MB', available: false },
      { number: '11', type: 'MB', available: true },
      { number: '12', type: 'MB', available: true }
    ],
    // Upper Berth
    [
      { number: '13', type: 'UB', available: true },
      { number: '14', type: 'UB', available: true },
      { number: '15', type: 'UB', available: true },
      { number: '16', type: 'UB', available: true },
      { number: '17', type: 'UB', available: false },
      { number: '18', type: 'UB', available: true }
    ],
    // Side Lower
    [
      { number: '19', type: 'SL', available: true },
      { number: '20', type: 'SL', available: true },
      { number: '21', type: 'SL', available: true }
    ],
    // Side Upper
    [
      { number: '22', type: 'SU', available: true },
      { number: '23', type: 'SU', available: false },
      { number: '24', type: 'SU', available: true }
    ]
  ];

  const berthTypes = {
    'LB': { name: 'Lower Berth', class: 'lower' },
    'MB': { name: 'Middle Berth', class: 'middle' },
    'UB': { name: 'Upper Berth', class: 'upper' },
    'SL': { name: 'Side Lower', class: 'side-lower' },
    'SU': { name: 'Side Upper', class: 'side-upper' }
  };

  const handleBerthClick = (berth) => {
    if (berth.available && onBerthSelect) {
      onBerthSelect(berth);
    }
  };

  return (
    <div className="berth-map">
      <h3>Berth Map</h3>
      
      <div className="berth-layout">
        {berthLayout.map((tier, tierIndex) => (
          <div key={tierIndex} className={`berth-tier ${tier[0].type.toLowerCase().substring(0, 2)}`}>
            <div className="tier-label">
              {berthTypes[tier[0].type].name}
            </div>
            <div className="berths-row">
              {tier.map(berth => (
                <div
                  key={berth.number}
                  className={`berth ${berthTypes[berth.type].class} ${
                    !berth.available ? 'booked' : selectedBerths.includes(berth.number) ? 'selected' : 'available'
                  }`}
                  onClick={() => handleBerthClick(berth)}
                >
                  <span className="berth-number">{berth.number}</span>
                  <span className="berth-type">{berth.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="berth-legend">
        <h4>Berth Types</h4>
        <div className="legend-items">
          {Object.entries(berthTypes).map(([key, value]) => (
            <div key={key} className="legend-item">
              <div className={`color-box ${value.class}`}></div>
              <span>{value.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BerthMap;