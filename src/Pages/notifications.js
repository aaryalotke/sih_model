import axios from "axios";
import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

const NotificationsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/notifs");
        setData(response.data.predictions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
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
        {loading ? (
          <div className="text-center">
            <p>Loading alerts...</p>
            <div className="flex justify-center items-center mt-4">
            <BarLoader color="#4FD1C5" loading={loading} />
          </div>
          </div>
        ) : (
          <div>
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
                          {getCommodityName(prediction.commodity)} prices are
                          high ({prediction.modal.toFixed(3)}) STOCK UP STOCK UP.
                        </div>
                      )
                  )}
                </div>
              ) : null}
            </div>
  
            <div className="mb-4">
              {Array.isArray(data) &&
              data.some(
                (prediction) =>
                  prediction.modal > 1000 && prediction.modal <= 2000
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
                          {getCommodityName(prediction.commodity)} prices are
                          going to be moderately high ({prediction.modal.toFixed(
                            3
                          )}).
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
                          cheaper than usual ({prediction.modal.toFixed(3)}) STOCK UP STOCK UP.
                        </div>
                      )
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default NotificationsPage;