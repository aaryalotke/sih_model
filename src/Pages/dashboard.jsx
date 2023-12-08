import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import sales from './sales.png';

const Dashboard = () => {
  const barChartData = [
    { name: "Monday", value: 10000 },
    { name: "Tuesday", value: 15000 },
    { name: "Wednesday", value: 7000 },
  ];

  const pieChartData = [
    { name: "Tomato", value: 25 },
    { name: "Onion", value: 40 },
    { name: "Potato", value: 35 },
  ];

  const lineChartData = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 7 },
  ];

  const commodities = [
    { name: "Daily Sales", price: 1500 },
    { name: "Weekly Sales", price: 25 },
    { name: "Monthly Sales", price: 25 },
  ];

  const data = [
    {
      icon: 'https://media.istockphoto.com/id/499146870/photo/red-onions.jpg?s=612x612&w=0&k=20&c=OaZUynAtxIJyPaSgAsAGWwAbpTs_EfKF5zT_UvBDpbY=',
      name: 'Onion',
      price: 15,
      quantitySold: 500,
      revenue: 1250,
      category: 'Vegetable',
    },
    {
      icon: 'https://thumbs.dreamstime.com/b/one-juicy-red-tomato-isolated-white-background-54347510.jpg',
      name: 'Tomato',
      price: 10,
      quantitySold: 700,
      revenue: 1050,
      category: 'Vegetable',
    },
    // Add more data entries as needed
  ];

  return (
    
    <div className="grid grid-cols-4 h-screen">

      {/* Main Content */}
      <div className="col-span-3 p-8">
        <h3 className="text-xl mb-2">Dashboard</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {commodities.map((commodity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4"
              style={{ width: "100%", maxWidth: "320px" }}
            >
              <div className="flex items-center">
                <img
                  src={sales}
                  alt="Image"
                  className="w-20 h-20 rounded-tl-lg mr-12"
                />
                <div className="">
                  <h2 className="text-lg font-semibold mb-2">
                    {commodity.name}
                  </h2>
                  <div className="text-gray-600">Price: Rs {commodity.price}</div>
                  <div className="text-gray-600">+50% sales</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mb-4">
          {/* Charts */}
          <div className="flex-grow bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold ml-16 mb-2">Daily Analysis</h2>
            <div className="border-t border-gray-300 my-2"></div>
            <BarChart width={350} height={200} data={barChartData}>
              <Bar dataKey="value" fill="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </div>
          <div className="flex-grow bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold ml-16 mb-2">Commodities</h2>
            <div className="border-t border-gray-300 my-2"></div>
            <PieChart width={350} height={200}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={pieChartData}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
          <div className="flex-grow bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold ml-16 mb-2">
              Monthly Analysis
            </h2>
            <div className="border-t border-gray-300 my-2"></div>
            <LineChart width={350} height={200} data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        <div style={{ marginLeft: '1px' }}>
          <div className="max-w-3xl p-6 rounded-lg shadow-md bg-white">
            <h1 className="text-3xl font-semibold mb-4">Commodities Analytics</h1>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto rounded-lg bg-blue-50">
                <thead className="bg-blue-100">
                  <tr>
                    {[
                      "Icon",
                      "Name",
                      "Price",
                      "Quantity Sold",
                      "Revenue",
                      "Category",
                    ].map((el, index) => (
                      <th
                        key={index}
                        className={`border-b border-blue-200 py-3 px-6 text-left ${
                          index === 6 ? '' : 'text-sm font-medium text-blue-500'
                        }`}
                      >
                        {el}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={`py-3 px-5 ${
                        index === data.length - 1 ? '' : 'border-b border-blue-200'
                      }`}
                    >
                      <td className="py-2">
                        <img
                          src={item.icon}
                          alt={`Icon for ${item.name}`}
                          width="30"
                          height="30"
                          className="rounded-full"
                        />
                      </td>
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">Rs.{item.price.toFixed(2)}</td>
                      <td className="py-2">{item.quantitySold}</td>
                      <td className="py-2">Rs.{item.revenue.toFixed(2)}</td>
                      <td className="py-2">{item.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
