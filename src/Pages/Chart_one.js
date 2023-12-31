import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import axios from "axios";
import Header from "./header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


function ChartOne() {
  // const [startDay, setStartDay] = useState("1"); // Default start day
  // const [startMonth, setStartMonth] = useState("01"); // Default start month
  // const [startYear, setStartYear] = useState("2021"); // Default start year
  // const [endDay, setEndDay] = useState("1"); // Default end day
  // const [endMonth, setEndMonth] = useState("01"); // Default end month
  // const [endYear, setEndYear] = useState("2023"); // Default end year
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const [selectedState, setSelectedState] = useState("1"); // Default selected state
  const [selectedDistrict, setSelectedDistrict] = useState("1"); // Default selected district
  const [selectedMarket, setSelectedMarket] = useState("1"); // Default selected market
  // const [selectedCommodity, setSelectedCommodity] = useState(""); // Default selected commodity

  const commodities = [
    { value: 1, name: "Tomato" },
    { value: 2, name: "Potato" },
    { value: 3, name: "Onion" },
  ];

  const [selectedCommodity, setSelectedCommodity] = useState("");

  const yearOptions = [{ value: "2022", label: "2022" },{ value: "2023", label: "2023" }, { value: "2024", label: "2024" },];

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

  const defaultState = stateOptions[0];
  const [state, setState] = useState(defaultState.value); // Default state

  const defaultDistrict = stateOptions[0];
  const [district, setDistrict] = useState(defaultDistrict.value); // Default district

  const defaultMarket = stateOptions[0];
  const [market, setMarket] = useState(defaultMarket.value); // Default market

  const defaultStartDay = dayOptions[29];
  const [startDay, setStartDay] = useState(defaultStartDay.label); // Default start day

  const defaultStartMonth = monthOptions[10];
  const [startMonth, setStartMonth] = useState(defaultStartMonth.value); // Default start month

  const defaulStartYear = yearOptions[0];
  const [startYear, setStartYear] = useState(defaulStartYear.value); // Default start year

  const defaultEndDay = dayOptions[29];
  const [endDay, setEndDay] = useState(defaultEndDay.value); // Default end day

  const defaultEndMonth = monthOptions[11];
  const [endMonth, setEndMonth] = useState(defaultEndMonth.value); // Default end month

  const defaultEndYear = yearOptions[0];
  const [endYear, setEndYear] = useState(defaultEndYear.value); // Default end year

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  // const years = ["2021", "2022", "2023", "2024"]; // Update with your desired years

  const getMarketOptionsForDistrict = (districtValue) => {
    const mappedMarkets = marketMapping[districtValue] || [];
    return mappedMarkets.map((market, index) => ({
      value: String(index + 1),
      label: market,
    }));
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    const newMarketOptions = getMarketOptionsForDistrict(newDistrict);
    const defaultMarketOption =
      newMarketOptions.length > 0 ? newMarketOptions[0].value : "";

    setDistrict(newDistrict);
    setMarket(defaultMarketOption); // Set the default market for the new district
  };

  const fetchData = async () => {
    try {
      setLoading(true); 
      setChartData(null);
      const response = await axios.post("http://127.0.0.1:5000/chart", {
        start_day: startDay,
        start_month: startMonth,
        start_year: startYear,
        end_day: endDay,
        end_month: endMonth,
        end_year: endYear,
        commodity: selectedCommodity,
        state: selectedState,
        district: selectedDistrict,
        market: selectedMarket,
      });

      console.log(response.data);

      setChartData(response.data.predictions);
      console.log(chartData);
    } catch (error) {
      console.error("Error:", error);
    }finally {
      setLoading(false); // Set loading to false when data fetching is completed
    }
  };

  useEffect(() => {
    setChartData(null);
    fetchData();
  }, [
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    selectedCommodity,
    selectedState,
    selectedDistrict,
    selectedMarket,
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-white-100 min-h-screen">
        <header className="bg-gray-800 mb-12 p-4 text-white text-center rounded-lg lg:flex-grow">
          <h1 className="text-4xl font-semibold">Commodity Price Prediction</h1>
        </header>
        <div className="my-4" style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "60%"}}>
          <label className="mr-6  text-sm font-medium text-gray-700">
            Commodity :
          </label>
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Select a commodity</option>
            {commodities.map((commodity) => (
              <option key={commodity.value} value={commodity.value}>
                {commodity.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="my-4" style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "60%"}}>
          <label className="mr-6  text-sm font-medium text-gray-700">
            State :
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Maharashtra</option>
            {stateOptions.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="my-4" style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "60%"}}>
          <label className="mr-6  text-sm font-medium text-gray-700">
            District :
          </label>
          <select
            value={district}
            onChange={handleDistrictChange}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Ahmednagar</option>
            {districtOptions.map((district) => (
              <option key={district.value} value={district.value}>
                {district.label}
              </option>
            ))}
          </select>
        </div>

        {/* Market */}
        <div className="my-4" style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "60%"}}>
          <label className="mr-6  text-sm font-medium text-gray-700">
            Market :
          </label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Select a market</option>
            {getMarketOptionsForDistrict(district).map((market) => (
              <option key={market.value} value={market.value}>
                {market.label}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4" style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "60%"}}>
          <label className="mr-6  text-sm font-medium text-gray-700">
            Start Date :
          </label>
          <select
            value={startDay}
            onChange={(e) => setStartDay(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 h-12 w-20" // Increased padding and height
          >
            <option value="">30</option>
            {dayOptions.map((day) => (
              <option key={day.value} value={day.value}>
                {day.value}
              </option>
            ))}
          </select>
          <select
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="border border-gray-300 rounded pl-3 py-2 h-12 w-24" // Increased padding and height
          >
            <option value="">11</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.value}
              </option>
            ))}
          </select>
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="border border-gray-300 rounded pl-3 py-2 h-12 w-24" // Increased padding and height
          >
            <option value="">2023</option>
            {yearOptions.map((year) => (
              <option key={year.value} value={year.value}>
                {year.value}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4" style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "60%"}}>
          <label className="mr-6  text-sm font-medium text-gray-700">
            End Date :{" "}
          </label>
          <select
            value={endDay}
            onChange={(e) => setEndDay(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 h-12 w-20 " // Increased padding and height
          >
            <option value="">30</option>
            {dayOptions.map((day) => (
              <option key={day.value} value={day.value}>
                {day.value}
              </option>
            ))}
          </select>
          <select
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 h-12 w-24" // Increased padding and height
          >
            <option value="">12</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.value}
              </option>
            ))}
          </select>
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 h-12 w-24" // Increased padding and height
          >
            <option value="">2023</option>
            {yearOptions.map((year) => (
              <option key={year.value} value={year.value}>
                {year.value}
              </option>
            ))}
          </select>
        </div>
        

<button
  onClick={fetchData}
  className="bg-[#272635] text-white font-medium text-lg rounded-md px-4 py-2 hover:bg-[#000] h-10 w-40 my-8 "
  disabled={!selectedDistrict || !selectedCommodity}
>
  Predict
</button>

{/* Render loading bar and chart based on the loading state */}
{loading ? (
  <div className="text-center">
    <p>Loading predictions...</p>
    <div className="flex justify-center items-center mt-4">
      <BarLoader css={loaderStyle} size={150} color={"#36D7B7"} />
    </div>
  </div>
):(
  selectedCommodity &&

chartData &&(
  <div className="md:w-1/2">
    <h2 className="text-xl font-bold mb-12">Predictions for the Date Range</h2>
    <LineChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="modal"
        name="Modal Price"
        stroke="rgba(75, 192, 192, 1)"
      />
      <Line
        type="monotone"
        dataKey="min"
        name="Min Price"
        stroke="rgba(255, 99, 132, 1)"
      />
      <Line
        type="monotone"
        dataKey="max"
        name="Max Price"
        stroke="rgba(54, 162, 235, 1)"
      />
    </LineChart>
  </div>
) )} 

      </div>
    </div>
  );
};
const loaderStyle = css`
  display: block;
  margin: 0 auto;
`;

export default ChartOne;
