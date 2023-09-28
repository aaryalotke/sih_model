// import Navbar from './Navbar';
import React, { useState } from 'react';
import IngredientPriceInput from './IngredientPriceInput';

const RestaurantManagerPage = () => {
  const [dishes, setDishes] = useState([]);
  const [sellingPrices, setSellingPrices] = useState({});


  const handleAddDish = () => {
    const newDish = {
      name: "New Dish",
      ingredients: [],
      otherCosts: 0,
      numberOfPlates: 1,
      showOtherCostsInput: false,
      sellingPrice: 0,
    };

    setDishes([...dishes, newDish]);
  };

  const handleAddIngredient = (dishIndex) => {
    const newIngredient = {
      name: "Ingredient Name",
      quantity: 0,
    };

    const updatedDishes = [...dishes];
    updatedDishes[dishIndex].ingredients.push(newIngredient);

    setDishes(updatedDishes);
  };

  const handleToggleOtherCosts = (dishIndex) => {
    const updatedDishes = [...dishes];
    updatedDishes[dishIndex].showOtherCostsInput = !updatedDishes[dishIndex].showOtherCostsInput;
    setDishes(updatedDishes);
  };

  const handleSaveDish = () => {
    // Assuming you want to log the details for all dishes
    dishes.forEach((dish, index) => {
      console.log(`Dish ${index + 1} Details:`);
      console.log(`Name: ${dish.name}`);
      console.log(`Ingredients:`);
      dish.ingredients.forEach((ingredient, ingredientIndex) => {
        console.log(`  Ingredient ${ingredientIndex + 1}:`);
        console.log(`    Name: ${ingredient.name}`);
        console.log(`    Quantity: ${ingredient.quantity}`);
      });
      console.log(`Other Costs: ${dish.otherCosts}`);
      console.log(`Number of Plates: ${dish.numberOfPlates}`);
      console.log("-----------------------------");
    });
  };


  return (
    <div >
    <div className="bg-white min-h-screen rounded-lg ">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        {/* <h1 className="text-3xl font-semibold mb-8">Restaurant Manager</h1> */}
        <header className="bg-gray-800 p-4 text-white text-center rounded-lg">
        <h1 className="text-4xl font-semibold">Add Dish</h1>
      </header>
        
        <input
          type="text"
          placeholder="Restaurant User Name"
          className="mt-10 border rounded-lg px-4 py-2 mb-4 w-72"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, dishIndex) => (
            <div key={dishIndex} className="bg-yellow-100 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">{dish.name}</h2>
              <input
                type="text"
                placeholder="Dish Name"
                value={dish.name}
                onChange={(e) => {
                  const updatedDishes = [...dishes];
                  updatedDishes[dishIndex].name = e.target.value;
                  setDishes(updatedDishes);
                }}
                className="border rounded-lg px-2 py-1 mb-2 w-full"
              />
              <button
                onClick={() => handleAddIngredient(dishIndex)}
                className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mb-2"
              >
                Add Ingredient
              </button>


              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Ingredient Name</th>
                    <th className="px-4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {dish.ingredients.map((ingredient, ingredientIndex) => (
                    <tr key={ingredientIndex}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          placeholder="Ingredient Name"
                          value={ingredient.name}
                          onChange={(e) => {
                            const updatedDishes = [...dishes];
                            updatedDishes[dishIndex].ingredients[ingredientIndex].name = e.target.value;
                            setDishes(updatedDishes);
                          }}
                          className="border rounded-lg px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={ingredient.quantity}
                          onChange={(e) => {
                            const updatedDishes = [...dishes];
                            updatedDishes[dishIndex].ingredients[ingredientIndex].quantity = e.target.value;
                            setDishes(updatedDishes);
                          }}
                          className="border rounded-lg px-2 py-1 w-full"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => handleToggleOtherCosts(dishIndex)}
                className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mb-2"
              >
                Other Costs
              </button>
              {dish.showOtherCostsInput && (
                <div className="mb-2">
                  <label className="block font-semibold">Other Costs:</label>
                  <input
                    type="number"
                    placeholder="Other Costs"
                    value={dish.otherCosts}
                    onChange={(e) => {
                      const updatedDishes = [...dishes];
                      updatedDishes[dishIndex].otherCosts = e.target.value;
                      setDishes(updatedDishes);
                    }}
                    className="border rounded-lg px-2 py-1 w-full"
                  />
                </div>
              )}
              <div className="mb-2">
                <label className="block font-semibold">Number of Plates required- per day:</label>
                <select
                  value={dish.numberOfPlates}
                  onChange={(e) => {
                    const updatedDishes = [...dishes];
                    updatedDishes[dishIndex].numberOfPlates = parseInt(e.target.value);
                    setDishes(updatedDishes);
                  }}
                  className="border rounded-lg px-2 py-1 w-full"
                >
                  {Array.from({ length: 50 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block font-semibold">Selling Price of Dish:</label>
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={dish.sellingPrice}
                  onChange={(e) => {
                    const updatedDishes = [...dishes];
                    updatedDishes[dishIndex].sellingPrice = e.target.value;
                    setDishes(updatedDishes);
                  }}
                  className="border rounded-lg px-2 py-1 w-full"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddDish}
          className="bg-green-500 hover:bg-green-700 text-white mr-6 font-bold py-2 px-4 rounded-full mt-4"
        >
          Add Dish
        </button>
        <button
          onClick={handleSaveDish}
          className="bg-purple-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Save Dish
        </button>
        
      </div>
      <IngredientPriceInput ingredients={dishes.flatMap((dish) => dish.ingredients)} 
      platesPerDish={dishes.map((dish) => dish.numberOfPlates)}
     />
      
    </div>
    </div>
  );
};

export default RestaurantManagerPage;