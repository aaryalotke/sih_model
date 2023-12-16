import React, { useState, useEffect } from "react";
import BarGraph from "../../Components/BarGraph";
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
          <BarGraph data={data} />
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
          <BarGraph data={data} />
        </>
      )}
    </div>
  );
}

export default TopDish;
