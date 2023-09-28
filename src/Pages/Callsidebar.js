import React, { useState } from 'react';
import Sidebar from './sidebar';
import ChartOne from './Chart_one';
import PricePredictionForm from './PricePredictionForm';
import RestaurantManagerPage from './RestaurantManagerPage';
import Profile from './Profile';
import Updateprice from './Updateprice';
import Dashboard from './dashboard';
import NotificationsPage from './notifications';
import InventoryManagement from './inventory';

function Callsidebar() {
       const [activeTab, setActiveTab] = useState('dashboard');
   return (
    <div className="flex min-h-screen min-w-screen bg-gray-200">
      
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'dashboard' && <Dashboard/>}
        {activeTab === 'DailyPricePrediction' && 
          <PricePredictionForm/>}
        
        {activeTab === 'messages' && <NotificationsPage/>}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-lg">This is the settings content.</p>
          </div>
        )}
        {activeTab === 'commodityPrediction' && <ChartOne/>}
       
        {activeTab === 'adddish' && <RestaurantManagerPage/>}
        {activeTab === 'Inventory' && <InventoryManagement/>}
        {activeTab === 'profile' && <Profile/>}
        {activeTab === 'updateprice' && <Updateprice/>}
      </div>
    </div>
  );
}

export default Callsidebar
