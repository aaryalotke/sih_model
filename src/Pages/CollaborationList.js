import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/database";

const CollaborationList = ({ onBackButtonClick }) => {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase
    // const database = firebase.database();
    // const collaborationRef = database.ref("collaborations");

    // collaborationRef.on("value", (snapshot) => {
    //   const collaborationsData = snapshot.val();
    //   if (collaborationsData) {
    //     const collaborationsArray = Object.values(collaborationsData);
    //     setCollaborations(collaborationsArray);
    //   }
    // });

    // // Cleanup listener on component unmount
    // return () => collaborationRef.off("value");
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-6">
        

<h2 className="text-4xl font-semibold mb-6">Collaborating Restaurants</h2>
        
        <button
        onClick={onBackButtonClick}
        className="bg-gray-500 text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
      >
        Back to form
      </button>
      </div>
      
        
      <ul>
      <p className="mt-12">list:</p>
        {collaborations.map((collaboration, index) => (
          <li key={index}>
            
            <strong>Restaurant Name:</strong> {collaboration.restaurantName}<br />
            <strong>Collaboration Duration:</strong> {collaboration.collaborationDuration}<br />
            <strong>Collaboration Details:</strong> {collaboration.collaborationDetails}<br />
            <strong>Contact Person:</strong> {collaboration.contactPerson}<br />
            <strong>Contact Email:</strong> {collaboration.contactEmail}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaborationList;
