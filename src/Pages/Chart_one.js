import React, { useState, useEffect } from "react";
import Header from './header';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

function ChartOne() {
  const [startDay, setStartDay] = useState("day"); // Default start day
  const [startMonth, setStartMonth] = useState("month"); // Default start month
  const [startYear, setStartYear] = useState("year"); // Default start year
  const [endDay, setEndDay] = useState("day"); // Default end day
  const [endMonth, setEndMonth] = useState("month"); // Default end month
  const [endYear, setEndYear] = useState("year"); // Default end year
  const [chartData, setChartData] = useState(null);

  const [selectedCommodity, setSelectedCommodity] = useState(""); // Default selected commodity
  const commodities = [
    { value: 1, name: "Tomato" },
    { value: 2, name: "Potato" },
    { value: 3, name: "Onion" },
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = ["2021", "2022", "2023", "2024"]; // Update with your desired years

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/chart", {
        start_day: startDay === "day" ? "" : startDay,
        start_month: startMonth === "month" ? "" : startMonth,
        start_year: startYear === "year" ? "" : startYear,
        end_day: endDay === "day" ? "" : endDay,
        end_month: endMonth === "month" ? "" : endMonth,
        end_year: endYear === "year" ? "" : endYear,
        commodity: selectedCommodity,
       
      });

      setChartData(response.data.predictions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDay, startMonth, startYear, endDay, endMonth, endYear,selectedCommodity]);

  return (
    <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
         <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Commodity Price Prediction</h1>
      <div className="my-4">
      <label className="mr-2 text-lg">Commodity:</label>
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

    

      <div className="my-4">
        <label className="mr-2 text-lg">Start Date:</label>
        <select
          value={startDay}
          onChange={(e) => setStartDay(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-20" // Increased padding and height
        >
          <option value="day">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
        >
          <option value="month">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
        >
          <option value="year">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="my-4">
        <label className="mr-2 text-lg">End Date : </label>
        <select
          value={endDay}
          onChange={(e) => setEndDay(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-20 " // Increased padding and height
        >
          <option value="day">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
        >
          <option value="month">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
        >
          <option value="year">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={fetchData}
        className="bg-indigo-500 text-white font-medium text-lg rounded-md px-4 py-2 bg-indigo-500 h-14 w-40 my-8 "
      >
        Predict
      </button>
      {chartData ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Predictions for the Date Range</h2>
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
      ) : null}
    </div>
    </div>
  );
}

export default ChartOne;
