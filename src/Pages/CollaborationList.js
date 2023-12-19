// import React, { useState, useEffect } from "react";
// // import firebase from "firebase/app";
// // import "firebase/database";

// const CollaborationList = ({ onBackButtonClick }) => {
//     const [collaborations, setCollaborations] = useState([]);

//     useEffect(() => {
//         // Fetch data from Firebase
//         // const database = firebase.database();
//         // const collaborationRef = database.ref("collaborations");

//         // collaborationRef.on("value", (snapshot) => {
//         //   const collaborationsData = snapshot.val();
//         //   if (collaborationsData) {
//         //     const collaborationsArray = Object.values(collaborationsData);
//         //     setCollaborations(collaborationsArray);
//         //   }
//         // });

//         // // Cleanup listener on component unmount
//         // return () => collaborationRef.off("value");
//     }, []);

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-4xl font-semibold mb-6">Collaborating Restaurants</h2>
//                 <button
//                     onClick={onBackButtonClick}
//                     className="bg-gray-500 text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
//                 >
//                     Back to form
//                 </button>
//             </div>

//             <ul>
//                 <p className="mt-12">list:</p>
//                 {collaborations.map((collaboration, index) => (
//                     <li key={index}>
//                         <strong>Restaurant Name:</strong> {collaboration.restaurantName}<br />
//                         <strong>Collaboration Duration:</strong> {collaboration.collaborationDuration}<br />
//                         <strong>Collaboration Details:</strong> {collaboration.collaborationDetails}<br />
//                         <strong>Contact Person:</strong> {collaboration.contactPerson}<br />
//                         <strong>Contact Email:</strong> {collaboration.contactEmail}<br />
//                         <hr />
//                     </li>
//                 ))}
//             </ul>


//         </div>
//     );
// };

// export default CollaborationList;


import React, { useState, useEffect } from "react";
import logo from "./../cutlery.png";

const CollaborationList = ({ onBackButtonClick }) => {
    const [collaborations, setCollaborations] = useState([
        {
            id: 1,
            name: "Restaurant A",
            duration: "6 months",
            contactPerson: "John Doe",
            contactEmail: "john.doe@example.com",
        },
        {
            id: 2,
            name: "Restaurant B",
            duration: "3 months",
            contactPerson: "Jane Smith",
            contactEmail: "jane.smith@example.com",
        },
        {
            id: 3,
            name: "Restaurant C",
            duration: "3 months",
            contactPerson: "Jane Smith",
            contactEmail: "jane.smith@example.com",
        },
        {
            id: 4,
            name: "Restaurant D",
            duration: "3 months",
            contactPerson: "Jane Smith",
            contactEmail: "jane.smith@example.com",
        },
        {
            id: 5,
            name: "Restaurant E",
            duration: "3 months",
            contactPerson: "Jane Smith",
            contactEmail: "jane.smith@example.com",
        },
       
    ]);

    useEffect(() => {
        // Fetch collaborations or perform any other necessary actions
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

            {collaborations.map((restaurant) => (
                <div key={restaurant.id} className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center">
                 
                    <div className="mr-4">
                    <img src={logo} alt="Restaurant Icon" className="w-12 h-12" />
                    </div>

                    {/* Restaurant Information */}
                    <div>
                        <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                        <p>Collaboration Duration: {restaurant.duration}</p>
                        <p>Contact Person: {restaurant.contactPerson}</p>
                        <p>Contact Email: {restaurant.contactEmail}</p>
                    </div>

                    {/* Connect Button */}
                    <button className="ml-auto bg-blue-500 text-white font-medium text-sm rounded-md px-3 py-1 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Connect
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CollaborationList;

