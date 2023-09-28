import axios from "axios";
import React, { useState, useEffect } from "react";

const NotificationsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the endpoint URL
    const endpointUrl = "http://127.0.0.1:5000/notifs";

    // Make a GET request to the endpoint
    axios
      .post(endpointUrl)
      .then((response) => {
        console.log("Hi");
        console.log(response.data);
        setData(response.data.predictions);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });
  }, []);

  const getCommodityName = (commodityId) => {
    switch (commodityId) {
      case 1:
        return "Tomato";
      case 2:
        return "Onion";
      case 3:
        return "Potato";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="mx-auto bg-white rounded-lg p-4 shadow-lg">
      <header className="bg-gray-800 p-4 text-white text-center rounded-lg mb-4">
        <h1 className="text-4xl font-semibold">Alerts</h1>
      </header>
        <div className="mb-4">
  
        
            {Array.isArray(data) &&
            data.some((prediction) => prediction.modal > 2000) ? (
              <div className="bg-red-100 p-2 rounded">
                {data.map(
                  (prediction) =>
                    prediction.modal > 2000 && (
                      <div
                        className="bg-red-500 text-white p-2 rounded mb-2"
                        key={prediction.date}
                      >
                        On {prediction.date},{" "}
                        {getCommodityName(prediction.commodity)} prices are high
                        ({prediction.modal}) STOCK UP STOCK UP.
                      </div>
                    )
                )}
              </div>
            ) : null}
         
        </div>

        <div className="mb-4">
          {Array.isArray(data) &&
          data.some(
            (prediction) => prediction.modal > 1000 && prediction.modal <= 2000
          ) ? (
            <div className="bg-yellow-100 p-2 rounded">
              {data.map(
                (prediction) =>
                  prediction.modal > 1000 &&
                  prediction.modal <= 2000 && (
                    <div
                      className="bg-yellow-500 text-white p-2 rounded mb-2"
                      key={prediction.date}
                    >
                      On {prediction.date},{" "}
                      {getCommodityName(prediction.commodity)} prices are going
                      to be moderately high ({prediction.modal}).
                    </div>
                  )
              )}
            </div>
          ) : null}
        </div>

        <div>
          <div className="bg-green-100 p-2 rounded">
            <div className="bg-green-500 text-white p-2 rounded mb-2">
              Wohooo!! your sales are up by 10%
            </div>
          </div>
          {Array.isArray(data) &&
          data.some((prediction) => prediction.modal < 1000) ? (
            <div className="bg-green-100 p-2 rounded">
              {data.map(
                (prediction) =>
                  prediction.modal < 1000 && (
                    <div
                      className="bg-green-500 text-white p-2 rounded mb-2"
                      key={prediction.date}
                    >
                      On {prediction.date},{" "}
                      {getCommodityName(prediction.commodity)} prices are
                      cheaper than usual ({prediction.modal}) STOCK UP STOCK UP.
                    </div>
                  )
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
