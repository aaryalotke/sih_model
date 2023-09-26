import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

function ChartOne() {
  const [startDay, setStartDay] = useState('01'); // Default start day
  const [startMonth, setStartMonth] = useState('10'); // Default start month
  const [startYear, setStartYear] = useState('2023'); // Default start year
  const [endDay, setEndDay] = useState('07'); // Default end day
  const [endMonth, setEndMonth] = useState('10'); // Default end month
  const [endYear, setEndYear] = useState('2023'); // Default end year
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/chart', {
        start_day: startDay,
        start_month: startMonth,
        start_year: startYear,
        end_day: endDay,
        end_month: endMonth,
        end_year: endYear,
      });

      setChartData(response.data.predictions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDay, startMonth, startYear, endDay, endMonth, endYear]);

  const handleStartDayChange = (e) => {
    setStartDay(e.target.value);
  };

  const handleStartMonthChange = (e) => {
    setStartMonth(e.target.value);
  };

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  };

  const handleEndDayChange = (e) => {
    setEndDay(e.target.value);
  };

  const handleEndMonthChange = (e) => {
    setEndMonth(e.target.value);
  };

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
  };

  return (
    <div className="App">
      <h1>Commodity Price Prediction</h1>
      <div>
        <label>Start Date:</label>
        <input type="text" value={startDay} onChange={handleStartDayChange} />
        <input type="text" value={startMonth} onChange={handleStartMonthChange} />
        <input type="text" value={startYear} onChange={handleStartYearChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="text" value={endDay} onChange={handleEndDayChange} />
        <input type="text" value={endMonth} onChange={handleEndMonthChange} />
        <input type="text" value={endYear} onChange={handleEndYearChange} />
      </div>
      {chartData ? (
        <div>
          <h2>Predictions for the Date Range</h2>
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="modal" name="Modal Price" stroke="rgba(75, 192, 192, 1)" />
            <Line type="monotone" dataKey="min" name="Min Price" stroke="rgba(255, 99, 132, 1)" />
            <Line type="monotone" dataKey="max" name="Max Price" stroke="rgba(54, 162, 235, 1)" />
          </LineChart>
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default ChartOne;





// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// function ChartOne() {
//   const data = [
//     { name: '2023-10-01', modal: 10, min: 8, max: 12 },
//     { name: '2023-10-02', modal: 15, min: 12, max: 18 },
//     { name: '2023-10-03', modal: 12, min: 10, max: 14 },
//     { name: '2023-10-04', modal: 14, min: 11, max: 16 },
//     { name: '2023-10-05', modal: 11, min: 9, max: 13 },
//     { name: '2023-10-06', modal: 13, min: 11, max: 15 },
//     { name: '2023-10-07', modal: 16, min: 14, max: 18 },
//   ];

//   return (
//     <div className="App">
//       <h1>Commodity Price Prediction</h1>
//       <LineChart width={600} height={300} data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="modal" name="Modal Price" stroke="rgba(75, 192, 192, 1)" />
//         <Line type="monotone" dataKey="min" name="Min Price" stroke="rgba(255, 99, 132, 1)" />
//         <Line type="monotone" dataKey="max" name="Max Price" stroke="rgba(54, 162, 235, 1)" />
//       </LineChart>
//     </div>
//   );
// }

// export default ChartOne;