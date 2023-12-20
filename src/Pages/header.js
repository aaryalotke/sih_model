import React from "react";
import logo from "./../cutlery.png";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from "../firebase";
import { AuthErrorCodes, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleTranslateWidget from "../Components/GoogleTranslateWidget";

function Header() {

  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      });
  };

  return (
    <header className="text-indigo-600 body-font">
      <div className="container flex flex-wrap py-4  mx-7 flex-col md:flex-row items-center w-screen">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          
          <img
         src={logo} // Replace with the path to your logo image
        alt="Logo"
        className="w-10 h-10 rounded-full"
      />
          <span className="ml-3 text-xl"><Link to="/home" class="nav-link active">ByteBistro</Link></span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-black text-base justify-center">
         
         
          <a className='p-2 hover:bg-indigo-400 cursor-pointer  rounded'><Link to="/aboutus" class="nav-link active">About Us</Link> </a> 
          <a className='p-2 hover:bg-indigo-400 cursor-pointer   rounded'><Link to="/contactus" class="nav-link active">Contact Us</Link> </a> 
          <a className='p-2 hover:bg-indigo-400 cursor-pointer   rounded'><Link to="/donation" class="nav-link active">Donation</Link> </a> 
          <GoogleTranslateWidget/>
        </nav>
        <div className="md:ml-auto md:mr-0 mt-4 md:mt-0">
          <button className="inline-flex text-white items-center bg-gray-800 border-0 mr-6 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base" onClick={handleLogout}>
            Sign out
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
