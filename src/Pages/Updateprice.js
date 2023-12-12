import React, { useState } from 'react';

import axios from "axios";

const Updateprice = () => {
  
    const initialCommodityData = [
        { commodity: 'Onion', currentPrice: 15, predictedPrice: 0 },
        { commodity: 'Tomato', currentPrice: 10, predictedPrice: 0},
        { commodity: 'Potato', currentPrice: 12,  predictedPrice: 0},
      ];
  // These fields are read-only
  const state = 'Maharashtra';
  const district = 'Mumbai';
  const market = 'Mumbai';
  const [selectedDish, setSelectedDish] = useState('');
  const [predictions, setPredictions] = useState({}); 
  const [commodityData, setCommodityData] = useState(initialCommodityData);
  const [showTable, setShowTable] = useState(false); // State variable to control table visibility

  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/today');
    
        
            // setPredictions(receivedPredictions);
            setShowTable(true); // Show the table after fetching data
            if (response.status === 200) {
                const result = response.data; // Assuming the predictions are in response.data
        
                // Set the predictions state with the data received from the API
                setPredictions(result);
        
                setShowTable(true); // Show the table after fetching data
              } else {
                console.error('Failed to make the prediction request.');
              }
            }catch (error) {
        console.error('Error fetching today_price:', error);
      }
  }

  return (
    <form onSubmit={fetchData} >
    <div className="bg-white p-6 rounded-lg shadow-md">
      <header className="bg-gray-800 p-4 text-white text-center rounded-lg">
        <h1 className="text-4xl font-semibold">Today's market price</h1>
      </header>
      <div className="flex gap-4 mb-4 container mx-auto mt-4 p-4">
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={state}
            readOnly // Make it read-only
          />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            District:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={district}
            readOnly // Make it read-only
          />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Market:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={market}
            readOnly // Make it read-only
          />
        </div>
      </div>
      <div className="mb-4 gap-4 mb-4 container mx-auto mt-4 p-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Dish:
        </label>
        <select
          className="w-1/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={selectedDish}
          onClick={fetchData}
        //   type="submit"
          onChange={(e) => {setSelectedDish(e.target.value);
           
        }}
        >
          <option value="">Select</option>
          <option value="Pav Bhaji">Pav Bhaji</option>
          {/* Add more dish options here */}
        </select>
      </div>
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={fetchData}
      >
        Fetch Data
      </button> */}
      {selectedDish === 'Pav Bhaji' &&  ( // Conditional rendering of the table
        <table class="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Ingredients Used</th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Your Price (per kg)</th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Market Price (per kg)</th>
            </tr>
          </thead>
          <tbody>
            {initialCommodityData.map((item, index) => (
            //   <tr key={index}>
            //     <td class="px-4 py-3">{item.commodity}</td>
            //     <td class="px-4 py-3">{item.currentPrice}</td>
            //     <td class="px-4 py-3">{item.predictedPrice}</td>
            //   </tr>

            <tr key={index}>
            <td class="px-4 py-3">{item.commodity}</td>
            <td class="px-4 py-3">{item.currentPrice}</td>
            <td class="px-4 py-3">
              {predictions[item.commodity] ? (predictions[item.commodity].modal/100 ) : ''}
              {/* {item.predictedPrice} */}
            </td>
          </tr>

            ))}
          </tbody>
        </table>
      )}
    </div>
    </form>
  );
};

export default Updateprice;
