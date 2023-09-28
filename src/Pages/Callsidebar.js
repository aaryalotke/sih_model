import React, { useState } from 'react';
import Sidebar from './sidebar';
import ChartOne from './Chart_one';
import PricePredictionForm from './PricePredictionForm';
import RestaurantManagerPage from './RestaurantManagerPage';
import Profile from './Profile';
import Updateprice from './Updateprice';

function Callsidebar() {
       const [activeTab, setActiveTab] = useState('dashboard');
   return (
    <div className="flex min-h-screen bg-gray-200">
      
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
        {activeTab === 'DailyPricePrediction' && 
          <PricePredictionForm/>}
        
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
       
        {activeTab === 'adddish' && <RestaurantManagerPage/>}
        {activeTab === 'profile' && <Profile/>}
        {activeTab === 'updateprice' && <Updateprice/>}
      </div>
    </div>
  );
}

export default Callsidebar
