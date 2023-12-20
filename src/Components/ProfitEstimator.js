// ProfitEstimator.js
import React, { useState, useEffect } from 'react';
import ProfitPercent from '../Components/ProfitPercent'


const ProfitEstimator = ({ totalCostPrice, totalSellingPrice, calculateProfit,profitPercentage }) => {

  // Use state to store the fetched fixedMonthlyCost
  const [fetchedFixedMonthlyCost, setFetchedFixedMonthlyCost] = useState(null);
  const [fixedMonthlyCost, setFixedMonthlyCost]= useState(null);
  useEffect(() => {
    // Fetch the fixed monthly cost from the API
    const fetchFixedMonthlyCost = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/read-fixed-exp'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          console.log("dattttttaaaa", data);

          setFetchedFixedMonthlyCost(data.total_exp);
        } else {
          console.error('Failed to fetch fixed monthly cost');
        }
      } catch (error) {
        console.error('Error fetching fixed monthly cost:', error);
      }
    };

    fetchFixedMonthlyCost();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  // Update the fixedMonthlyCost state when fetchedFixedMonthlyCost changes
  useEffect(() => {
    if (fetchedFixedMonthlyCost !== null) {
      setFixedMonthlyCost(fetchedFixedMonthlyCost);
    }
  }, [fetchedFixedMonthlyCost, setFixedMonthlyCost]);

  return (
    <div  className="p-4 bg-gray-800 text-emerald rounded-md flex justify-center items-center mt-10">
            <div  style={{width:'90%'}} className="lg:w-2/3 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full">
              <h2 className="text-gray-900 text-lg text-center font-medium title-font mb-5">Profit Estimator</h2>
              <div className="mb-4">
                <strong>Total Cost Price:</strong> {totalCostPrice}
              </div>
              <div className="mb-4">
              <div className="mb-4">
                <strong>Total Selling Price:</strong> {totalSellingPrice}
              </div>
              <div className="mb-4">
                <strong>Fixed Cost per day:</strong> {fetchedFixedMonthlyCost/30}
              </div>
              <div className="mb-4">
                <strong>Total Revenue at the end of the day:</strong> {(totalSellingPrice-totalCostPrice) - (fetchedFixedMonthlyCost/30) }
              </div>
              {/* <div className="mb-4"></div>
                <label htmlFor="total-revenue" className="leading-7 text-sm text-gray-600">Total Revenue</label>
                <input
                  type="text"
                  id="total-revenue"
                  name="total-revenue"
                  placeholder='Enter the total revenue generated at the end of the day'
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setUserEnteredRevenue(parseFloat(e.target.value))}
                />
              </div> */}
              {/* <div className="mb-4">
                <label htmlFor="profit" className="leading-7 text-sm text-gray-600">Profit Margin</label>
                <input
                  type="number"
                  id="profit"
                  name="profit"
                  placeholder='Set your desired profit margin percentage'
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setUserEnteredPP(parseFloat(e.target.value))}
                />
              </div> */}
              {/* <p className="text-xs text-gray-500 text-center">
                Note: The profit margin can be adjusted once a month.
              </p> */}
              {/* <button onClick={calculateProfit} className="text-white bg-indigo-500 border-0 py-2 px-8 mt-9 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto">
                Calculate Profit
              </button> */}
              
                <div className="mt-4 text-center">
                  <div className="text-4xl font-bold text-indigo-500 bg-yellow-200 inline-block py-2 px-4 rounded">
                    {(((totalSellingPrice*100)/(totalCostPrice+(fetchedFixedMonthlyCost/30)))-100).toFixed(2)}%
                  </div>
                </div>
            
              <div className='mt-4 flex justify-center items-center'>
                <ProfitPercent />
              </div>
            </div>
          </div>
          </div>
          
  );
};

export default ProfitEstimator;