// DishList.js
import React from 'react';
import { useState } from 'react';

const DishList = ({ dishes, selectedDishes, handleQuantityChange, handleCheckboxChange }) => {

  const [selectedData, setSelectedData] = useState([]);

  
  const sendData = () => {
    // Create an array to store the selected data
    console.log("dish", selectedDishes);
    const selectedData = selectedDishes
      .filter((dish) => dish.isChecked) // Filter only the selected dishes
      .map((dish, index) => ({
        name: dishes[index].name,
        cost_price: dishes[index].cost_price,
        selling_price: dishes[index].selling_price,
        quantity: dish.quantity || 0,
        is_veg: dish.is_veg,
        id: dishes[index].id// Use 0 if quantity is not set
      }));

    console.log("selectedData",selectedData);
      // const fin_selectedData = JSON.stringify(selectedData);
    // Add your API call here to send the selectedData to the server
    // Example API call:
    console.log('selectedDishes isArray:', Array.isArray(selectedData));
    fetch('http://127.0.0.1:5000/save-selected-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedData),
      // body: JSON.stringify(fin_selectedData),
    })
      .then(response => response.json())
      .then(data => console.log('API response:', data))
      .catch(error => console.error('API error:', error));
  };

  const updateSelectedData = (index, isChecked, quantity) => {
    const updatedData = [...selectedData];
    const selectedDish = {
      id: dishes[index].id,
      isChecked,
      quantity,
    };

    // Update or add the selected dish to the array
    const existingIndex = updatedData.findIndex(item => item.id === selectedDish.id);
    if (existingIndex !== -1) {
      updatedData[existingIndex] = selectedDish;
    } else {
      updatedData.push(selectedDish);
    }

    setSelectedData(updatedData);
  };
  return (
    <div className="p-4 h-96 bg-gray-100 shadow-md rounded-md" style={{overflowY: "auto"}}>

            <table className="w-full  border-collapse border">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2  border-b">Dish Name</th>
                  <th className="py-2 border-b">Cost Price p.u.</th>
                  <th className="py-2 border-b">Selling Price p.u.</th>
                  <th className="py-2 border-b">Quantity</th>
                  <th className="py-2 border-b">Include</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish, index) => (
                  <tr key={dish.id} className={index % 2 === 0 ? ' bg-gray-200' : 'pl-6 bg-white'}>
                    <td className="py-2  px-2 border-b">{dish.name}</td>
                    <td className="py-2 px-2 border-b">{dish.cost_price}</td>
                    <td className="py-2 px-2 border-b">{dish.selling_price}</td>
                    <td className="py-2 px-2 border-b">
                      <input
                        type="number"
                        min="0"
                        value={selectedDishes[index]?.quantity || 0}
                        onChange={(e) => handleQuantityChange(index, +e.target.value)}
                        className="w-12 p-1 text-center border rounded"
                      />
                    </td>
                    <td className="py-2 border-b">
                      <input
                        type="checkbox"
                        checked={selectedDishes[index]?.isChecked || false}
                        onChange={() => handleCheckboxChange(index)}
                        className="form-checkbox h-5 w-5 bg-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button  className=" text-white font-medium text-sm rounded-md px-4 py-2 bg-indigo-500 h-10 w-30 my-8" onClick={sendData}>Save Data</button>
          </div>
  );
};

export default DishList;