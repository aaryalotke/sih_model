import React from 'react';
const FixedCost = ({ onSubmit, rent, employeeSalaries, utilities, desiredProfitPercentage }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
        case 'rent':
          onSubmit({ rent: parseFloat(value) || 0, employeeSalaries, utilities, desiredProfitPercentage });
          break;
        case 'employeeSalaries':
          onSubmit({ rent, employeeSalaries: parseFloat(value) || 0, utilities, desiredProfitPercentage });
          break;
        case 'utilities':
          onSubmit({ rent, employeeSalaries, utilities: parseFloat(value) || 0, desiredProfitPercentage });
          break;
        case 'desiredProfitPercentage':
          onSubmit({ rent, employeeSalaries, utilities, desiredProfitPercentage: parseFloat(value) || 0 });
          break;
        default:
          break;
      }
    // Handle input changes if needed
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ rent, employeeSalaries, utilities, desiredProfitPercentage });
  };
  console.log(rent);

  return (
    <div style={{ marginLeft: '240px' }}>
      <div className="max-w-full mx-auto mt-8 p-6 rounded-lg shadow-md bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Fixed Costs Incurred per Month</h2>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          {/* Rent Input */}
          <div className="mb-5">
            <label htmlFor="rent" className="block mb-2 text-sm font-medium text-gray-900">
              Rent (Monthly):
              <input
                type="number"
                id="rent"
                name="rent"
                value={rent}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>

          {/* Employee Salaries Input */}
          <div className="mb-5">
            <label htmlFor="employeeSalaries" className="block mb-2 text-sm font-medium text-gray-900">
              Employee Salaries (Monthly):
              <input
                type="number"
                id="employeeSalaries"
                name="employeeSalaries"
                value={employeeSalaries}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>

          {/* Utilities Input */}
          <div className="mb-5">
            <label htmlFor="utilities" className="block mb-2 text-sm font-medium text-gray-900">
              Utilities (Electricity, Gas, Light - Monthly Estimate):
              <input
                type="number"
                id="utilities"
                name="utilities"
                value={utilities}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>

          {/* Desired Profit Percentage Input */}
          <div className="mb-5">
            <label htmlFor="desiredProfitPercentage" className="block mb-2 text-sm font-medium text-gray-900">
              Desired Profit Percentage:
              <input
                type="number"
                id="desiredProfitPercentage"
                name="desiredProfitPercentage"
                value={desiredProfitPercentage}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Save Monthly Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default FixedCost;