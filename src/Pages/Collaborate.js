import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
import { BarLoader } from "react-spinners";
import CollaborationList from "./CollaborationList";

function Collaborate () {
    const [showCollaborationList, setShowCollaborationList] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
  
    const [formData, setFormData] = useState({
      restaurantName: '',
    //   dishName: '',
      collaborationDuration: '',
      collaborationDetails: '',
      contactPerson: '',
      contactEmail: '',
    });

    const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Collaboration Data:', formData);

      //**************** Store data in Firebase*****************************
        // const database = firebase.database();
        // const collaborationRef = database.ref("collaborations");

        // collaborationRef.push(formData);

      setIsDetailsSubmitted(true);

      // Reset the form after 3 seconds
      setTimeout(() => {
        setIsDetailsSubmitted(false);
        setFormData({
          restaurantName: "",
          collaborationDuration: "",
          collaborationDetails: "",
          contactPerson: "",
          contactEmail: "",
        });
      }, 2000);
    };

    // Handle the click event for showing CollaborationList
  const handleShowCollaborationList = () => {
    setShowCollaborationList(true);
    setIsButtonVisible(false);
  };

  const handleBackButtonClick = () => {
    setShowCollaborationList(false);
    setIsButtonVisible(true);
  };
    
      

      return (
        <div>
             {/* Button to show CollaborationList component */}
      {isButtonVisible && !showCollaborationList && !isDetailsSubmitted && (
    //     <div className="bg-white p-6 rounded-lg shadow-md">
    //     <h2 className="text-4xl font-semibold mb-6">Collaboration Request Form</h2>
    //     <div className="flex items-center">
    //       <button
    //         onClick={handleShowCollaborationList}
    //         className="bg-gray-500 text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
    //       >
    //         Show Collaborating Restaurants
    //       </button>
    //     </div>
    //   </div>

    <div className="flex items-center justify-between mb-6 bg-white p-6 rounded-lg shadow-md">
        

        <h2 className="text-4xl font-semibold ">Collaboration Request Form</h2>
        
        <button
            onClick={handleShowCollaborationList}
            className="bg-gray-500 text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
          >
            Show Collaborating Restaurants
          </button>
      </div>
      )}

      
      
      

          {isDetailsSubmitted ? (
            <div className="bg-white h-screen flex flex-col rounded-lg items-center justify-center">
            <div className="rounded-full bg-green-500 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="mx-auto h-12 w-12 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-green-500 text-lg mt-4">Details submitted</p>
          </div>
          ) : showCollaborationList ? (
            // Render CollaborationList component here
            <CollaborationList onBackButtonClick={handleBackButtonClick} />
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {/* <h2 className="text-4xl font-semibold mb-6">Collaboration Request Form</h2> */}
          
          
    
          <div className="grid grid-cols-2 gap-4">
            {/* Restaurant Name */}
            <div className="col-span-2 mb-4">
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                Restaurant Name:
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
    
            {/* Dish Name */}
            <div className="col-span-2 mb-4">
              <label htmlFor="dishName" className="block text-sm font-medium text-gray-700">
                Collaboration Duration:
              </label>
              <input
                type="text"
                id="collaborationDuration"
                name="collaborationDuration"
                value={formData.collaborationDuration}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
    
            {/* Collaboration Details */}
            <div className="col-span-2 mb-4">
              <label htmlFor="collaborationDetails" className="block text-sm font-medium text-gray-700">
                Collaboration Details:
              </label>
              <textarea
                id="collaborationDetails"
                name="collaborationDetails"
                value={formData.collaborationDetails}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
    
            {/* Contact Person */}
            <div className="mb-4">
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                Contact Person:
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
    
            {/* Contact Email */}
            <div className="mb-4">
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Contact Email:
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>
    
          <button
            type="submit"
            className="bg-indigo-500 text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit Collaboration Request
          </button>
        </form>
        
          )}
        </div>
      );
    };

export default Collaborate;
