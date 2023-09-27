// Sidebar.js

import React from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'DailyPricePrediction', label: 'Daily Prices' },
    { id: 'commodityPrediction', label: 'Commodity Prediction' },
    { id: 'messages', label: 'Messages' },
    { id: 'settings', label: 'Settings' },

  ];

  return (
    <div className="w-1/5 bg-gray-800 h-screen py-8">
      <ul className="space-y-2 h-20">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-700 text-gray-400'
              } w-full h-12 py-2 px-4 rounded-lg transition duration-300 hover:bg-indigo-500 hover:text-white`}
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
