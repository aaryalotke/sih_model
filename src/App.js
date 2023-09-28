// App.js

import React, { useState } from 'react';
import ChartOne from './Pages/Chart_one';
import PricePredictionForm from './Pages/PricePredictionForm';
import IngredientPriceInput from './Pages/IngredientPriceInput';
import RestaurantManagerPage from './Pages/RestaurantManagerPage';
import Contactus from './Pages/Contactus';
import Sidebar from './Pages/sidebar';
import Header from './Pages/header';
import Callsidebar from './Pages/Callsidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
 
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
      <Callsidebar/>
  );
}

export default App;


