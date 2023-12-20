// Sidebar.js

import React from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'adddish', label: 'Add Dish' },
    { id: 'DailySales', label: 'DailySales' },
    { id: 'topDish', label: 'Top Dish' },
    { id: 'updateprice', label: 'Today\'s Market Price' },
    { id: 'DailyPricePrediction', label: 'Real Time Analysis' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'commodityPrediction', label: 'Commodity Prediction' },
    { id: 'Inventory', label: 'Inventory' },
    { id: 'messages', label: 'Alerts' },
    { id: 'Collaborate', label: 'Collaborate' },
  ];

  return (
    <div className="w-1/5 bg-[#000000] rounded-lg h-100 py-8 px-4 min-w-1/5" style={{position: "sticky", top: "0", left: "0"}}>
      <ul className="space-y-2 h-20">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`${
                activeTab === tab.id
                  ? 'bg-[#b1e5f2] text-[#272635]'
                  : 'bg-[#272635] text-[#fff]'
              } w-full h-12 py-2 px-4 rounded-lg transition duration-300 hover:bg-[#b1e5f2] hover:text-[#272635]`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;



