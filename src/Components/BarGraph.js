import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, BarController, Chart } from 'chart.js'; // Import BarElement and BarController

Chart.register(CategoryScale, LinearScale, BarElement, BarController); // Register BarElement and BarController

const BarGraph = ({ data }) => {
  // Check for data existence and emptiness
  if (!data || !data.document1.length) {
    return <p>No data available to display.</p>;
  }

  // Extract dish names from document1
  const dishNames = data.document1.map((item) => item.DishName || item.DishID);
  const quantities = data.document1.map((item) => item['Total Quantity Sales']);

  const chartData = {
    labels: dishNames,
    datasets: [
      {
        label: 'Total Quantity Sales',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: quantities,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Dish Name',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Quantity Sales',
        },
      },
    },
  };

  return (
    <div aria-label="Bar chart showing total quantity sales for different dishes">
      <h2>Bar Graph</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
