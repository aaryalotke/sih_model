import React, { useState } from "react";

const FixedMonthly = () => {
  const [formData, setFormData] = useState({
    rent: 0,
    employeeSalaries: 0,
    utilities: 0,
    desiredProfitPercentage: 0,
    total_exp: 0,
    expected_fluctuation: 0
  });

  const [total_expense, setTotalExpense] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name !== 'total_exp'){

      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    }
    else{
      setFormData({ ...formData, [name]: parseFloat(total_expense) || 0 });

    }
    // setFormData({...formData,['total_exp']: total_exp});
    setTotalExpense(Number(formData.rent)+Number(formData.employeeSalaries)+Number(formData.utilities))
    

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setFormData({...formData, total_exp : total_exp});
    try {
      const response = await fetch("http://127.0.0.1:5000/add-fixed-expense/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Product created successfully");
        // Handle success as needed
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <div className="max-w-full mx-auto mt-8 p-6 rounded-lg shadow-md bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">
          Fixed Costs Incurred per Month
        </h2>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          {/* Rent Input */}
          <div className="mb-5">
            <label
              htmlFor="rent"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Rent (Monthly):
              <input
                type="text"
                id="rent"
                name="rent"
                value={formData.rent}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>

          {/* Employee Salaries Input */}
          <div className="mb-5">
            <label
              htmlFor="employeeSalaries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Employee Salaries (Monthly):
              <input
                type="text"
                id="employeeSalaries"
                name="employeeSalaries"
                value={formData.employeeSalaries}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>

          {/* Utilities Input */}
          <div className="mb-5">
            <label
              htmlFor="utilities"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Utilities (Electricity, Gas, Light - Monthly Estimate):
              <input
                type="text"
                id="utilities"
                name="utilities"
                value={formData.utilities}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
            
          </div>

          {/* Desired Profit Percentage Input */}
          <div className="mb-5">
            <label
              htmlFor="desiredProfitPercentage"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Desired Profit Percentage:
              <input
                type="text"
                id="desiredProfitPercentage"
                name="desiredProfitPercentage"
                value={formData.desiredProfitPercentage}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>
          <div className="mb-5">
            <label
              htmlFor="Fluctuation"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Expected Fluctuation:
              <input
                type="text"
                id=""
                name="expected_fluctuation"
                value={formData.expected_fluctuation}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>
          <div className="mb-5">
            <label
              htmlFor="total_exp"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Total expense:
              <input
                type="text"
                id="total_exp"
                name="total_exp"
                value={total_expense}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
          </div>
              {/* <
                id="total_exp"
                onChange={handleInputChange}
              >{"Total expenses : "+ total_exp}</> */}

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

export default FixedMonthly;