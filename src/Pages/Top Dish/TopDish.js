import React, { useState, useEffect } from "react";
// import "./TopDish.css";


function TopDish() {
  const [data, setData] = useState({ document1: [], document2: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the server
        const response = await fetch("http://127.0.0.1:5000/dishes/topdish");

        // Parse the JSON data
        let { document1, document2 } = await response.json();

        document1 = JSON.parse(document1);
        document2 = JSON.parse(document2);

        // console.log(document1 , document2)
        // Update state with the parsed data
        setData({ document1, document2 });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  

  return (
    <div>
      <div>
        <h2>Monthly Prediction</h2>
        <table>
          <thead>
            <tr>
              <th>DishID</th>
              <th>Total Quantity Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.document1 &&
              data.document1.map((item) => (
                <tr key={item.DishID}>
                  <td>{item.DishID}</td>
                  <td>{item["Total Quantity Sales"]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Daily Prediction</h2>
        <table>
          <thead>
            <tr>
              <th>DishID</th>
              <th>Total Quantity Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.document2 &&
              data.document2.map((item) => (
                <tr key={item.DishID}>
                  <td>{item.DishID}</td>
                  <td>{item["Quantity Sales"]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopDish;
