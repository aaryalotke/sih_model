import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
import { BarLoader } from "react-spinners";

function Comparison() {
 
  const [selectedDay, setSelectedDay] = useState("1");
  
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2021");
  const [chartData, setChartData] = useState(null);
  const [market, setMarketOptions] = useState(null);
  const [predictions, setCurrentMarketPrice] = useState(0);
  // const [predictions, setPredictions] = useState({});
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cheapestMarketData, setCheapestMarketData] = useState(null);

  const [selectedState, setSelectedState] = useState("1");
  const [selectedDistrict, setSelectedDistrict] = useState("1");
  const [selectedMarket, setSelectedMarket] = useState("1");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  const commodities = [
    { value: 1, name: "Tomato" },
    { value: 2, name: "Potato" },
    { value: 3, name: "Onion" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = ["2022", "2023", "2024"];

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

  const getMarketValuesForDistrict = (districtValue) => {
    const mappedMarkets = marketMapping[districtValue] || [];
    return mappedMarkets
      .map(
        (market) =>
          marketOptions.find((option) => option.label === market)?.value
      )
      .filter(Boolean);
  };

  const getMarketOptionsForDistrict = (districtValue) => {
    const mappedMarkets = marketMapping[districtValue] || [];
    return mappedMarkets.map((market, index) => ({
      value: String(index + 1),
      label: market,
    }));
  };

  const fetchCurrentData = async () => {
    try {
      setLoading(true);
      const todayResponse = await axios.get("http://localhost:5000/today");
      const predictions = todayResponse.data;
      console.log(predictions);
      setCurrentMarketPrice(predictions);
    } catch (error) {
      console.error("Error fetching current data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoadingData(true); 
      setCheapestMarketData(null); // Reset cheapestMarketData
      setSavingsPercentage(0); 
      // Get all associated market values based on the selected district
      const marketValues = getMarketValuesForDistrict(selectedDistrict);
      console.log(marketValues);

      // Fetch data for comparison
      const compareResponse = await axios.post(
        "http://localhost:5000/compare",
        {
          day: selectedDay,
          month: selectedMonth,
          year: selectedYear,
          commodity: selectedCommodity,
          state: selectedState,
          district: selectedDistrict,
          markets: marketValues,
        }
      );

      console.log(compareResponse.data);
      // Set the chart data state with the data received from the comparison API
      setChartData(compareResponse.data);
      console.log("hahaha")
      console.log(chartData);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }finally {
      setIsLoadingData(false); // Set loading state to false after data is fetched
    }
  };

  const findCheapestMarket = () => {
    if (!selectedCommodity || !chartData || !chartData[selectedCommodity]) {
      return null;
    }

    const commodityData = chartData[selectedCommodity];
    let cheapestMarketId = null;
    let cheapestModalPrice = Infinity;
    const marketNames = {};

    Object.keys(commodityData).forEach((marketId) => {
      const modalPrice = commodityData[marketId]?.modal;

      if (modalPrice && modalPrice < cheapestModalPrice) {
        cheapestModalPrice = modalPrice;
        cheapestMarketId = marketId;
      }

      marketNames[marketId] = marketOptions.find(
        (option) => option.value === marketId
      )?.label;
    });

    const cheapestMarketName = marketNames[cheapestMarketId];

    console.log(predictions);
    if (
      predictions &&
      predictions[selectedCommodity] &&
      predictions[selectedCommodity].modal
    ) {
      // Use the modal price from predictions[selectedCommodity]
      const percentageSavings =
        ((predictions[selectedCommodity].modal - cheapestModalPrice) /
          predictions[selectedCommodity].modal) *
        100;

      setSavingsPercentage(percentageSavings);
      console.log(percentageSavings);
    } else {
      console.log("yaar");
    }

    return {
      marketId: cheapestMarketId,
      modalPrice: cheapestModalPrice,
      marketName: cheapestMarketName,
      marketNames: marketNames,
    };
  };

  const handleFetchData = () => {
    fetchData();
  };

  // // Now call findCheapestMarket after fetchCurrent
  // const cheapestMarketData = findCheapestMarket();
  // console.log(cheapestMarketData);
  // console.log(predictions);

  // const cheapestMarketData = findCheapestMarket();
  // console.log(cheapestMarketData);
  // const currentPrice = fetchCurrent();
  // console.log(currentPrice); // Fetch predictions when the component mounts

  useEffect(() => {
    fetchCurrentData();
  }, [
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedCommodity,
    selectedState,
    selectedDistrict,
  ]);

  useEffect(() => {
    const cheapestMarketData = findCheapestMarket();
    setCheapestMarketData(cheapestMarketData);
    console.log(cheapestMarketData);
    console.log(predictions);
    console.log("yayyyy")
    console.log(chartData);
  }, [chartData, selectedCommodity, predictions]);

 

  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-white-100 min-h-screen">
      

        <label className="mr-6 text-sm font-medium text-gray-700">
          State :
        </label>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            // Reset district and market on state change
            setSelectedDistrict("1");
            setSelectedMarket("1");
          }}
          className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7"
        >
          <option value="">Select a state</option>
          {stateOptions.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>

        <label className="mr-6 text-sm font-medium text-gray-700">
          District :
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            // Update market options based on the selected district
            const updatedMarketOptions = getMarketOptionsForDistrict(
              e.target.value
            );
            setSelectedMarket(updatedMarketOptions[0]?.value || "1");
          }}
          className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7"
        >
          <option value="">Select a district</option>
          {districtOptions.map((district) => (
            <option key={district.value} value={district.value}>
              {district.label}
            </option>
          ))}
        </select>

        <div className="my-10 flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Day:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-24"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium text-gray-700">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-32"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium text-gray-700">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-32"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="my-10">
          <label className="mr-6 text-sm font-medium text-gray-700">
            Commodity:
          </label>
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7"
          >
            <option value="">Select a commodity</option>
            {commodities.map((commodity) => (
              <option key={commodity.value} value={commodity.name}>
                {commodity.name}
              </option>
            ))}
          </select>
        </div>
        {/* <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          View
        </button> */}

        {/* <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Fetch Data
        </button> */}
        {/* {chartData &&
          Object.keys(chartData).map((commodity) => (
            <div key={commodity}>
              <h2>{commodity}</h2>
              <LineChart
                width={800}
                height={400}
                data={Object.values(chartData[commodity])}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                 <XAxis dataKey="market" />

                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="modal"
                  name="Modal"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="min"
                  name="Min"
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  name="Max"
                  stroke="#ff7300"
                />
              </LineChart>
            </div>
          ))} */}

        {/* Loading state */}

        
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={!selectedDistrict || !selectedCommodity}
        >
          View 
        </button>

 
 {/* Render a single BarChart based on the selected commodity */}
 {isLoadingData ? ( // Show loader only when isLoadingData is true
        <div className="text-center mt-10">
          <p>Loading data...</p>
            <div className="flex justify-center items-center mt-4">
            <BarLoader color="#4FD1C5" loading={isLoadingData} />
          </div>
        </div>
      ) : (
        selectedCommodity &&
        chartData &&
        chartData[selectedCommodity] && (
          <div className="text-center">
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        {selectedCommodity} Data
      </h2>
      <BarChart
        width={800}
        height={400}
        data={Object.values(chartData[selectedCommodity])}
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="markets" /> 
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="modal" fill="#8884d8" name="Modal" />
        <Bar dataKey="min" fill="#82ca9d" name="Min" />
        <Bar dataKey="max" fill="#ff7300" name="Max" />
      </BarChart>
    </div>
  )
)}

        <div className="flex flex-wrap items-start mb-8 p-10">
          {/* Cheapest Market Price */}
          {cheapestMarketData && (
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 p-10">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {cheapestMarketData.modalPrice.toFixed(3)}
                </h2>
                <p className="leading-relaxed">Cheapest Modal Price</p>
                <p className="leading-relaxed">
                  Market: {cheapestMarketData.marketName} (
                  {cheapestMarketData.marketId})
                </p>
              </div>
            </div>
          )}

          {/* Savings Percentage */}
          {cheapestMarketData && (
            <div className="w-full sm:w-1/2 lg:w-1/4 mt-5 p-5" onMouseEnter={handleTooltipToggle}
            onMouseLeave={handleTooltipToggle}>
              <div
                className={`border-2 border-gray-200 px-4 py-9 rounded-lg shadow-md ${
                  savingsPercentage >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                <h2 className="title-font font-medium text-3xl">
                  {savingsPercentage >= 0 ? "+" : ""}
                  {savingsPercentage.toFixed(2)}%
                </h2>
                <p className="leading-relaxed">Savings Percentage</p>
                {/* You can add additional information or styling here */}
              </div>
              {showTooltip && (
              <div className="absolute bg-gray-800 text-white p-2 rounded mt-2">
                potential savings when purchasing from the cheapest market compared to your current choice
              </div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comparison;
