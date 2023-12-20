import React, { useState, useEffect } from 'react';
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
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen min-w-screen bg-gray-200">
      {showWelcome && (
        <div
          id="welcome-tag"
          style={{
            position: 'absolute',
            zIndex: '1',
            width: '80%',
            left: '20%'
            
          }}
          className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
            Welcome to <span className="text-blue-500">Byte Bistro</span>!
          </h1>
          <p className="text-gray-700">
            Let's get started by setting up your restaurant profile. Fill in the details below:
          </p>
        </div>
      )}
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'dashboard' && <Dashboard/>}
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
