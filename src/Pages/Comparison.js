import React, { useState, useEffect } from "react";
// import { BarChart, Bar, ReferenceLine } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import axios from "axios";

function Comparison() {

  const [selectedDay, setSelectedDay] = useState("1");
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

  const commodities = [
    { value: 1, name: "Tomato" },
    { value: 2, name: "Potato" },
    { value: 3, name: "Onion" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = ["2021", "2022", "2023", "2024"];

  const stateOptions = [{ value: "1", label: "Maharashtra" }];

  const districtOptions = [
    { value: "1", label: "Ahmednagar" },
    { value: "10", label: "Pune" },
    // Add other districts as needed
  ];

  const marketMapping = {
    10: ["Baramati", "Pune", "Junnar", "Indapur"],
    1: ["Ahmednagar", "Akole", "Jamkhed"],
    // Add mappings for other districts as needed
  };

  const marketOptions = [
    { value: "44", label: "Baramati" },
    { value: "25", label: "Pune" },
    { value: "12", label: "Junnar" },
    { value: "54", label: "Indapur" },
    { value: "1", label: "Ahmednagar" },
    { value: "42", label: "Akole" },
    { value: "55", label: "Jamkhed" },
    // Additional markets...
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


      // Set the chart data state with the data received from the comparison API
      setChartData(compareResponse.data);
      console.log(chartData);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
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
  }, [chartData, selectedCommodity, predictions]);

  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-white-100 min-h-screen">
        {/* ... existing code ... */}

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

        <label className="mr-6 text-sm font-medium text-gray-700">Day :</label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="border border-gray-300 rounded px-2 py-2 h-12 w-24 mr-7"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <label className="mr-6 text-sm font-medium text-gray-700">
          Month :
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-2 py-2 h-12 w-32 mr-7"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label className="mr-6 text-sm font-medium text-gray-700">Year :</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-2 py-2 h-12 w-32 mr-7"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          View 
        </button>
        

   
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

        {/* Render a single BarChart based on the selected commodity */}
        {selectedCommodity && chartData && chartData[selectedCommodity] && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedCommodity} Data
            </h2>
            <BarChart
              width={800}
              height={400}
              data={Object.values(chartData[selectedCommodity])}
              margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis
                dataKey="market"
                tickFormatter={(index) => cheapestMarketData.marketNames[index]}
              /> */}
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Assuming your data structure has keys like 'modal', 'min', 'max' */}
              <Bar dataKey="modal" fill="#8884d8" name="Modal" />
              <Bar dataKey="min" fill="#82ca9d" name="Min" />
              <Bar dataKey="max" fill="#ff7300" name="Max" />
            </BarChart>
          </div>
        )}

<div className="flex flex-wrap items-start mb-8 p-10">
  {/* Cheapest Market Price */}
  {cheapestMarketData && (
    <div className="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 p-10">
      <div className="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
        <h2 className="title-font font-medium text-3xl text-gray-900">
          {cheapestMarketData.modalPrice}
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
    <div className="w-full sm:w-1/2 lg:w-1/4 mt-5 p-5">
      <div className={`border-2 border-gray-200 px-4 py-9 rounded-lg shadow-md ${savingsPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        <h2 className="title-font font-medium text-3xl">
          {savingsPercentage >= 0 ? '+' : ''}{savingsPercentage.toFixed(2)}%
        </h2>
        <p className="leading-relaxed">Savings Percentage</p>
        {/* You can add additional information or styling here */}
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
}

export default Comparison;
