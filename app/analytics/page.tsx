import React from 'react';

const Infographic = () => (
  <div className='flex w-1/2 justify-center items-center mt-24'>
    <svg viewBox="0 0 800 600" className="w-full h-auto bg-white">
    {/* Background */}
    <rect x="0" y="0" width="800" height="600" fill="#f0f0f0" />
    
    {/* Title */}
    <text x="400" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">NALS Apartment Homes: Q1 2024 Performance Overview</text>
    
    {/* NALS Performance Metrics */}
    <rect x="50" y="80" width="300" height="200" fill="#4a90e2" />
    <text x="200" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">NALS Metrics</text>
    
    <text x="70" y="150" fontSize="16" fill="white">Debt Coverage Ratio:</text>
    <text x="280" y="150" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">4.47x</text>
    
    <text x="70" y="190" fontSize="16" fill="white">YoY Rent Growth:</text>
    <text x="280" y="190" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">1.5%</text>
    
    <text x="70" y="230" fontSize="16" fill="white">Distribution Yield:</text>
    <text x="280" y="230" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">3.6%</text>
    
    <text x="70" y="270" fontSize="16" fill="white">Properties Distributing:</text>
    <text x="280" y="270" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">46/47</text>

    {/* Market Conditions */}
    <rect x="450" y="80" width="300" height="200" fill="#ff7f0e" />
    <text x="600" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">Market Conditions</text>
    
    <text x="470" y="150" fontSize="16" fill="white">Multifamily Deliveries:</text>
    <text x="730" y="150" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">+29%</text>
    
    <text x="470" y="190" fontSize="16" fill="white">Transaction Volume:</text>
    <text x="730" y="190" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">-59%</text>
    
    <text x="470" y="230" fontSize="16" fill="white">Job Growth (Quarterly):</text>
    <text x="730" y="230" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">732k</text>
    
    <text x="470" y="270" fontSize="16" fill="white">Gain-to-Lease:</text>
    <text x="730" y="270" textAnchor="end" fontSize="16" fontWeight="bold" fill="white">0.7%</text>

    {/* Historical Context */}
    <line x1="50" y1="330" x2="750" y2="330" stroke="#333" strokeWidth="2" />
    <text x="400" y="360" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#333">Historical Context</text>
    
    <circle cx="150" cy="460" r="70" fill="#2ca02c" />
    <text x="150" y="445" textAnchor="middle" fontSize="16" fill="white">Market Rents</text>
    <text x="150" y="475" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">+30%</text>
    <text x="150" y="500" textAnchor="middle" fontSize="14" fill="white">vs Pre-pandemic</text>
    
    <circle cx="400" cy="460" r="70" fill="#d62728" />
    <text x="400" y="445" textAnchor="middle" fontSize="16" fill="white">Market Rents</text>
    <text x="400" y="475" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">-4.5%</text>
    <text x="400" y="500" textAnchor="middle" fontSize="14" fill="white">vs Peak (Aug 22)</text>
    
    <circle cx="650" cy="460" r="70" fill="#9467bd" />
    <text x="650" y="445" textAnchor="middle" fontSize="16" fill="white">Multifamily</text>
    <text x="650" y="475" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">+102%</text>
    <text x="650" y="500" textAnchor="middle" fontSize="14" fill="white">vs Pre-pandemic</text>

    {/* Strategy Focus */}
    <rect x="50" y="540" width="700" height="50" fill="#8c564b" />
    <text x="400" y="570" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">Strategic Focus: Capital Improvement Projects</text>
  </svg>
  </div>
);

export default Infographic;