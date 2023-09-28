import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Contactus from './Pages/Contactus';
import Aboutus from './Pages/Aboutus';
import reportWebVitals from './reportWebVitals';
import Header from './Pages/header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Callsidebar from './Pages/Callsidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
<Header/>

      <Routes>
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/home" element={<Callsidebar />} />
      </Routes>
  
    <App />

  </Router>
  // <React.StrictMode>
  //    <Header/>
  //   <App />
  // </React.StrictMode>
);

reportWebVitals();
