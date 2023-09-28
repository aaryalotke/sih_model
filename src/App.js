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
import Login from './Pages/Login';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Routes from './Routes';
import Landing from './Pages/landing';



function App() {
 
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
      
<Landing/>
      
  );
}

export default App;


