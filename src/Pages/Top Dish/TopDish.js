import React, { useState, useEffect } from "react";
// import BarGraph from "../../Components/BarGraph";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import "./TopDish.css";

function TopDish() {
  const [data, setData] = useState({ document1: [], document2: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/dishes/topdish");

        let { document1, document2 } = await response.json();

        document1 = JSON.parse(document1);
        document2 = JSON.parse(document2);

        setData({ document1, document2 });
        setLoading(false); // Set loading to false after data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []); 

  return (
    <div className=" items-center justify-between mb-6 bg-white p-6 rounded-lg shadow-md">
                    <header className="bg-gray-800 p-4 text-white text-center rounded-lg mb-4">
          <h1 className="text-4xl font-semibold">Top Dish</h1>
        </header>
      {loading ? (
        // <p>Loading top dishes...</p>
        <div className="text-center">
          <p>Loading top dishes...</p>
          <div className="flex justify-center items-center mt-4">
            <BarLoader
              css={loaderStyle}
              size={150}
              color={"#36D7B7"}
            />
        </div>
        </div>
      ) : (
        <>
          {/* Monthly Prediction Section */}
          <div className="flex items-center justify-center mt-12 mb-6">
          <div className="flex items-center justify-center flex-1">
            <h2 className="text-2xl font-semibold mb-4">Monthly analysis</h2>
          </div>
        </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <BarChart
                width={400}
                height={300}
                data={data.document1}
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DishID" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total Quantity Sales" fill="#8884d8" name="Total Quantity Sales" />
              </BarChart>
            </div>
            <div style={{ flex: 1, marginLeft: 20 }}>
              {/* <h2>Monthly Prediction Table</h2> */}
              <table className="table-auto w-full text-left whitespace-no-wrap">
  <thead>
    <tr>
      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">DishID</th>
      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Total Quantity Sales</th>
    </tr>
  </thead>
  <tbody>
    {data.document1 &&
      data.document1.map((item) => (
        <tr key={item.DishID}>
          <td className="px-4 py-3">{item.DishID}</td>
          <td className="px-4 py-3">{item["Total Quantity Sales"]}</td>
        </tr>
      ))}
  </tbody>
</table>
            </div>
          </div>

          {/* Daily Prediction Section */}
          <div className="flex items-center justify-center mt-12 mb-6">
          <div className="flex items-center justify-center flex-1">
            <h2 className="text-2xl font-semibold mb-4">Daily analysis</h2>
          </div>
        </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <div style={{ flex: 1 }}>
              <BarChart
                width={400}
                height={300}
                data={data.document2}
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DishID" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Quantity Sales" fill="#82ca9d" name="Quantity Sales" />
              </BarChart>
            </div>
            <div style={{ flex: 1, marginLeft: 20 }}>
              <table className="table-auto w-full text-left whitespace-no-wrap">
  <thead>
    <tr>
      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">DishID</th>
      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity Sales</th>
    </tr>
  </thead>
  <tbody>
    {data.document2 &&
      data.document2.map((item) => (
        <tr key={item.DishID}>
          <td className="px-4 py-3">{item.DishID}</td>
          <td className="px-4 py-3">{item["Quantity Sales"]}</td>
        </tr>
      ))}
  </tbody>
</table>

            </div>
          </div>

          
        </>
      )}
    </div>
  );

  
}
const loaderStyle = css`
  display: block;
  margin: 0 auto;
`;

export default TopDish;
