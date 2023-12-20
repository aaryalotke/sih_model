import React, { useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const PricePredictionForm = () => {
  const [formData, setFormData] = useState({
    commodity: "1",
    state_name: "1",
    district_name: "1",
    market_center_name: "1",
    day: "19",
    month: "12",
    year: 2023, // Set the default year to the current year
  });
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null); // State to store predicted price
  const [minPrice, setminPrice] = useState(null); // State to store predicted price
  const [maxPrice, setmaxPrice] = useState(null); // State to store predicted price
  const [marketOption, setMarketOptions] = useState([]); // Initialize with an empty array
  // State to store predicted price

  // Define the options for the dropdowns
  const commodityOptions = [
    { value: "1", label: "Tomato" },
    { value: "2", label: "Potato" },
    { value: "3", label: "Onion" },

    // Add more options as needed
  ];

  const marketMapping = {
    6: ["Jalgaon", "Bhusaval"],
    2: ["Solapur", "Akluj"],
    1: ["Ahmednagar"],
    5: ["Aurangabad"],
    7: ["Chandrapur(Ganjwad)"],
    10: ["Junnar"],
    // Add mappings for other districts as needed
  };

  const stateOptions = [{ value: "1", label: "Maharashtra" }];

  const districtOptions = [
    { value: "1", label: "Ahmednagar" },
    { value: "2", label: "Sholapur" },
    { value: "5", label: "Aurangabad" },
    { value: "6", label: "Jalgaon" },
    { value: "7", label: "Chandrapur" },
    { value: "10", label: "Pune" },
  ];

  const marketOptions = [
    { value: "1", label: "Ahmednagar", district: "1" },
    { value: "2", label: "Akluj", district: "2" },
    { value: "5", label: "Aurangabad", district: "5" },
    { value: "6", label: "Bhusaval", district: "6" },
    { value: "8", label: "Chandrapur (Ganjwad)", district: "7" },
    { value: "11", label: "Jalgaon", district: "6" },
    { value: "12", label: "Junnar", district: "10" },
    { value: "37", label: "Solapur", district: "2" },
  ];

  const monthOptions = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sept" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  const dayOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 2015;
  const endYear = currentYear + 1;
  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => (startYear + index).toString()
  );

  // Define options for other dropdowns in a similar way

  const getMarketOptionsForDistrict = (districtValue) => {
    const mappedMarkets = marketMapping[districtValue] || [];
    return mappedMarkets.map((market, index) => ({
      value: String(index + 1),
      label: market,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const selectedMarket = marketOptions.find(
      (market) => market.value === value
    );

    setFormData({
      ...formData,
      [name]: value,
      district_name: selectedMarket ? selectedMarket.district : "", // Extract district information
    });
  };

  const marketOptionsForDistrict = marketOptions.filter(
    (market) => market.district === formData.district_name
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingPrediction(true);
      console.log(formData);
      // Send the selected field values to your Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // mode: 'cors', // Add this line
        // Convert form data to JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        console.log("Predicted Price:", result.modal);
        console.log("Min Price:", result.min);
        console.log("Max Price:", result.max);
        setPredictedPrice(result.modal);
        setminPrice(result.min);
        setmaxPrice(result.max);
        console.log(formData);
      } else {
        console.error("Failed to make the prediction request.");
        console.log(formData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingPrediction(false); // Set loading to false when the request is complete
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-white-100 min-h-screen">
        <header className="bg-gray-800 p-4 text-white text-center rounded-lg">
          <h1 className="text-4xl font-semibold">Price Prediction</h1>
        </header>
        <div className="container mx-auto mt-4 p-4">
          <div className="grid gap-4">
            {/* Dashboard Cards or Widgets */}
            <div className=" p-4 rounded-lg ">
              {/* Card Content Here */}
              <div className="flex mb-4">
                {/* Commodity */}
                <div className="flex-1">
                  <label
                    htmlFor="Commodity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Commodity:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="Commodity"
                      name="Commodity"
                      value={formData.Commodity}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {commodityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* State */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="state_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="state_name"
                      name="state_name"
                      value={formData.state_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {stateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* District */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="district_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    District:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="district_name"
                      name="district_name"
                      value={formData.district_name}
                      onChange={(e) => {
                        handleInputChange(e);
                        // Update the Market dropdown options based on the selected district
                        const selectedDistrict = e.target.value;
                        const marketOptionsForDistrict =
                          getMarketOptionsForDistrict(selectedDistrict);
                        setFormData((prevData) => ({
                          ...prevData,
                          market_center_name: "", // Reset selected market when district changes
                        }));
                        setMarketOptions(marketOptionsForDistrict);
                      }}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {districtOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Market */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="market_center_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Market:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="market_center_name"
                      name="market_center_name"
                      value={formData.market_center_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {marketOptionsForDistrict.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mb-4">
                {/* day */}
                <div className="flex-1">
                  <label
                    htmlFor="day"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Day:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="day"
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {dayOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* month */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="month"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Month:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="month"
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {monthOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* year */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {yearOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                id="ok"
                type="submit"
                className="bg-indigo-500 text-white font-medium text-lg rounded-md px-4 py-2 bg-indigo-500 h-14 w-40 my-8 "
              >
                Predict
              </button>

              {isLoadingPrediction ? (
                <div className="text-center">
                  <p>Loading predictions...</p>
                  <div className="flex justify-center items-center mt-4">
                    <BarLoader css={loaderStyle} size={150} color={"#36D7B7"} />
                  </div>
                </div>
              ) : (
                predictedPrice !== null && (
                  <section class="text-gray-600 body-font">
                    <div class="container px-5 py-24 mx-auto">
                      <div class="flex flex-col text-center w-full mb-20">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                          Market Prices Per Quintal for{" "}
                          {formData.Commodity
                            ? commodityOptions.find(
                                (option) => option.value === formData.Commodity
                              )?.label
                            : "Commodity"}{" "}
                          in{" "}
                          {formData.state_name
                            ? stateOptions.find(
                                (option) => option.value === formData.state_name
                              )?.label
                            : "state_name"}
                        </h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                          Explore the market prices for a specific commodity in
                          a particular market center.
                        </p>
                      </div>
                      <div class="flex flex-wrap -m-4 text-center">
                        <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                          <div class="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                              {predictedPrice.toFixed(3)}
                            </h2>
                            <p class="leading-relaxed">Predicted Price</p>
                          </div>
                        </div>
                        <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                          <div class="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                              {minPrice.toFixed(3)}
                            </h2>
                            <p class="leading-relaxed">Minimum Price</p>
                          </div>
                        </div>
                        <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                          <div class="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                              {maxPrice.toFixed(3)}
                            </h2>
                            <p class="leading-relaxed">Maximum Price</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const loaderStyle = css`
  display: block;
  margin: 0 auto;
`;

export default PricePredictionForm;
