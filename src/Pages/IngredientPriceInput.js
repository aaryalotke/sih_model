import React, { useState, useEffect } from 'react';

const IngredientPriceInput = ({ ingredients, platesPerDish  }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [ingredientPrices, setIngredientPrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalIngredientQuantities, setTotalIngredientQuantities] = useState({});

  const uniqueIngredients = [...new Set(ingredients.map((ingredient) => ingredient.name))];
  

  // Calculate total ingredient quantities when the ingredients prop changes
  useEffect(() => {
    const ingredientQuantities = {};

    ingredients.forEach((ingredient) => {
      const { name, quantity } = ingredient;
      if (ingredientQuantities[name]) {
        ingredientQuantities[name] += quantity;
      } else {
        ingredientQuantities[name] = quantity;
      }
    });

    setTotalIngredientQuantities(ingredientQuantities);
  }, [ingredients]);

  const handleIngredientPriceChange = (ingredientName, price) => {
    // Update the ingredient prices
    const updatedPrices = { ...ingredientPrices, [ingredientName]: parseFloat(price) };
    setIngredientPrices(updatedPrices);

    // Calculate the total price
    const totalPrice = Object.values(updatedPrices).reduce((sum, value) => sum + value, 0);
    setTotalPrice(totalPrice);
  };

  return (
    <div className="bg-white p-4 rounded-lg ">
       {/* Add a black line divider */}
  <hr className="my-4 border-t border-black" />
  
      <h2 className="text-xl font-semibold mb-4">Ingredient Prices</h2>
      <div className="checkbox mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            onChange={() => setShowIngredients(!showIngredients)}
            className="form-checkbox text-indigo-600 h-5 w-5"
          />
          <span className="ml-2">Did you add all dishes?</span>
        </label>
      </div>
      {showIngredients && (
        <div className="ingredient-list">
          <div className="bg-gray-100 rounded-lg p-4 mr-20 mb-4 shadow-md">
  <span className="block mb-2">Enter the cost price of each raw material (per kg value) or indicate how much you buy the below ingredients (in kg).</span>
  
</div>

          <br />
          {uniqueIngredients.map((ingredientName, index) => (
            <div className="ingredient-item flex items-center mb-2" key={index}>
              <span className="mr-2">{ingredientName}</span>
              <input
                type="number"
                placeholder="Price"
                value={ingredientPrices[ingredientName] || ""}
                onChange={(e) => handleIngredientPriceChange(ingredientName, e.target.value)}
                className="border rounded-lg px-2 py-1 w-1/2"
              />
              <span className="ml-2">
                * {totalIngredientQuantities[ingredientName] }
                {" "}{"plates"}
                {platesPerDish.reduce((sum, plates) => sum + plates, 0)}
              </span>
            </div>
          ))}
           {/* Add a black line divider */}
  <hr className="my-4 border-t border-black" />
          <p className="text-lg block font-medium text-gray-700">Total Cost Price: ₹{totalPrice.toFixed(2)}</p>
          <p className="text-lg block font-medium text-gray-700">
            Total Raw Ingredient Cost Price: ₹{(
              Object.keys(totalIngredientQuantities)
                .map((ingredientName) =>
                  (ingredientPrices[ingredientName] || 0) * (totalIngredientQuantities[ingredientName] || 0)
                )
                .reduce((sum, cost) => sum + cost, 0)
            ).toFixed(2)}
          </p>
          <p className="text-lg block font-medium text-gray-700">
            Total Raw Ingredient Cost Price for a day: ₹{(
              Object.keys(totalIngredientQuantities)
                .map((ingredientName) =>
                  (ingredientPrices[ingredientName] || 0) * (totalIngredientQuantities[ingredientName] || 0) * platesPerDish.reduce((sum, plates) => sum + plates, 0)
                )
                .reduce((sum, cost) => sum + cost, 0)
            ).toFixed(2)}
          </p>
          

        </div>
      )}
    </div>
  );
};

export default IngredientPriceInput;