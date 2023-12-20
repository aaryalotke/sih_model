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
import Comparison from './Comparison';
import DailySales from './DailySales';
import Collaborate from './Collaborate';
import TopDish from './Top Dish/TopDish';


function Callsidebar() {
       const [activeTab, setActiveTab] = useState('profile');
   return (
    <div className="flex min-h-screen min-w-screen bg-gray-200">
      
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-10" style={{overflowY: "auto", height: "100%"}}>
        {activeTab === 'DailyPricePrediction' && <PricePredictionForm/>}
        
        {activeTab === 'messages' && <NotificationsPage/>}
        {activeTab === 'DailySales' && <DailySales/>}
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
        {activeTab === 'comparison' && <Comparison/>}
        {activeTab === 'updateprice' && <Updateprice/>}
        {activeTab === 'Collaborate' && <Collaborate/>}
        {activeTab === 'topDish' && <TopDish/>}
      </div>
    </div>
  );
}

export default Callsidebar
