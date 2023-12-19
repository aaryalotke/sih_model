import React, { useState, useEffect } from "react";
import logo from "./../cutlery.png";
// import firebase from "firebase/app";
// import "firebase/firestore";



const CollaborationList = ({ onBackButtonClick }) => {
  const [collaborations, setCollaborations] = useState([]);

  

  const handleConnectClick = (contactEmail) => {
    // const contactEmail = "aaryalotke@gmail.com";
    const subject = "Collaboration Inquiry";
    const body = `Hello,\n\nI am interested in collaborating with your restaurant. Let's discuss further details.\n\nBest regards,`;

    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    // Fetch data from the new Flask endpoint
    fetch('/get-collaborations/')
      .then(response => response.json())
      .then(data => setCollaborations(data))
      .catch(error => console.error('Error fetching collaborations:', error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-semibold mb-6">
          Collaborating Restaurants
        </h2>
        <button
          onClick={onBackButtonClick}
          className="bg-gray-500 text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
        >
          Back to form
        </button>
      </div>

      {collaborations.map((collaboration) => (
        <div
          key={collaboration.id}
          className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center"
        >
          <div className="mr-4">
            <img src={logo} alt="Restaurant Icon" className="w-12 h-12" />
          </div>

          {/* Restaurant Information */}
          <div>
            <h3 className="text-lg font-semibold">{collaboration.restaurantName}</h3>
            <p>Collaboration Duration: {collaboration.collaborationDuration}</p>
            <p>Contact Person: {collaboration.contactPerson}</p>
            <p>Contact Email: {collaboration.contactEmail}</p>
          </div>

          {/* Connect Button */}
          <button
            onClick={() => handleConnectClick(collaboration.contactEmail)}
            className="ml-auto bg-blue-500 text-white font-medium text-sm rounded-md px-3 py-1 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Connect
          </button>
        </div>
      ))}
    </div>
  );
};

export default CollaborationList;
