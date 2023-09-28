import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Contactus from './Pages/Contactus';
import Aboutus from './Pages/Aboutus';
import reportWebVitals from './reportWebVitals';
import Header from './Pages/header';
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from 'react-router-dom';
import Callsidebar from './Pages/Callsidebar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Pages/landing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />

    <Routes>
      <Route
        exact
        path="/"
        element={<Navigate to="/landing" />} // Use Navigate to redirect
      />
       <Route path="/landing" element={<Landing/>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/home" element={<Callsidebar />} />
    </Routes>

    {/* <App /> */}
  </Router>
  // <React.StrictMode>

  //   <BrowserRouter>
  //    <Header/>
  //   <App />
  //   </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
