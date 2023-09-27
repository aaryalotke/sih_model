// App.js

import React, { useState } from 'react';
import ChartOne from './Pages/Chart_one';
import Sidebar from './Pages/sidebar';
import Header from './Pages/header';


function App() {
 
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-200">
      
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-lg">This is the dashboard content.</p>
          </div>
        )}
        {activeTab === 'projects' && (
          <div>
            <h1 className="text-3xl font-semibold">Projects</h1>
            <p className="text-lg">This is the projects content.</p>
          </div>
        )}
        {activeTab === 'messages' && (
          <div>
            <h1 className="text-3xl font-semibold">Messages</h1>
            <p className="text-lg">This is the messages content.</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-lg">This is the settings content.</p>
          </div>
        )}
        {activeTab === 'commodityPrediction' && <ChartOne/>}
      </div>
    </div>
  );
}

export default App;
