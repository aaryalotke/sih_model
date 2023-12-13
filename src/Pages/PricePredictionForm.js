import React, { useState } from "react";
import axios from "axios";

const PricePredictionForm = () => {
  const [formData, setFormData] = useState({
    // commodity: '1',
    // state: '1',
    // district:'1',
    // market:'1',
    // variety: '1',
    // group: '1',
    // day: '1',
    // month: '1',
    // year: '2023',
  });
  const [predictedPrice, setPredictedPrice] = useState(null); // State to store predicted price
  const [minPrice, setminPrice] = useState(null); // State to store predicted price
  const [maxPrice, setmaxPrice] = useState(null); // State to store predicted price

  // Define the options for the dropdowns
  const commodityOptions = [
    { value: "1", label: "Tomato" },
    { value: "2", label: "Potato" },
    { value: "3", label: "Onion" },
   
    // Add more options as needed
  ];

  const varietyOptions = [
    { value: "1", label: "Local" },
    { value: "2", label: "Other" },
  ];

  const groupOptions = [{ value: "1", label: "Vegetables" }];

  const stateOptions = [{ value: "1", label: "Maharashtra" }];

  const districtOptions = [
    { value: "1", label: "Ahmednagar" },
    { value: "2", label: "Sholapur" },
    { value: "3", label: "Akola" },
    { value: "4", label: "Amravati" },
    { value: "5", label: "Aurangabad" },
    { value: "6", label: "Jalgaon" },
    { value: "7", label: "Chandrapur" },
    { value: "8", label: "Nagpur" },
    { value: "9", label: "Sangli" },
    { value: "10", label: "Pune" },
    { value: "11", label: "Thane" },
    { value: "12", label: "Nashik" },
    { value: "13", label: "Osmanabad" },
    { value: "14", label: "Raigad" },
    { value: "15", label: "Satara" },
    { value: "16", label: "Kolhapur" },
    { value: "17", label: "Mumbai" },
    { value: "18", label: "Dhule" },
    { value: "19", label: "Beed" },
    { value: "20", label: "Buldhana" },
    { value: "21", label: "Nandurbar" },
    { value: "22", label: "Wardha" },
    { value: "23", label: "Ratnagiri" },
  ];

  const marketOptions = [
    { value: "1", label: "Ahmednagar" },
    { value: "2", label: "Akluj" },
    { value: "3", label: "Akola" },
    { value: "4", label: "Amrawati (Fruit & Vegetable Market)" },
    { value: "5", label: "Aurangabad" },
    { value: "6", label: "Bhusaval" },
    { value: "7", label: "Chandrapur" },
    { value: "8", label: "Chandrapur (Ganjwad)" },
    { value: "9", label: "Hingna" },
    { value: "10", label: "Islampur" },
    { value: "11", label: "Jalgaon" },
    { value: "12", label: "Junnar" },
    { value: "13", label: "Junnar (Alephata)" },
    { value: "14", label: "Junnar (Narayangaon)" },
    { value: "15", label: "Junnar (Otur)" },
    { value: "16", label: "Kalyan" },
    { value: "17", label: "Kamthi" },
    { value: "18", label: "Khed (Chakan)" },
    { value: "19", label: "Maanachar" },
    { value: "20", label: "Murbad" },
    { value: "21", label: "Nagpur" },
    { value: "22", label: "Nasik" },
    { value: "23", label: "Osmanabad" },
    { value: "24", label: "Pen" },
    { value: "25", label: "Pune" },
    { value: "26", label: "Pune (Khadiki)" },
    { value: "27", label: "Pune (Manjri)" },
    { value: "28", label: "Pune (Moshi)" },
    { value: "29", label: "Pune (Pimpri)" },
    { value: "30", label: "Rahata" },
    { value: "31", label: "Rahuri" },
    { value: "32", label: "Rahuri (Songaon)" },
    { value: "33", label: "Ramtek" },
    { value: "34", label: "Sangli (Phale, Bhajipura Market)" },
    { value: "35", label: "Satara" },
    { value: "36", label: "Shrirampur" },
    { value: "37", label: "Solapur" },
    { value: "38", label: "Vadgaonpeth" },
    { value: "39", label: "Vai" },
    { value: "40", label: "Vashi New Mumbai" },
    { value: "41", label: "Vita" },
    { value: "42", label: "Akole" },
    { value: "43", label: "Amalner" },
    { value: "44", label: "Baramati" },
    { value: "45", label: "Barshi" },
    { value: "46", label: "Bhagyoday Cotton and Agri Market" },
    { value: "47", label: "Chalisgaon" },
    { value: "48", label: "Chandvad" },
    { value: "49", label: "Devala" },
    { value: "50", label: "Dhule" },
    { value: "51", label: "Dindori" },
    { value: "52", label: "Dindori (Vani)" },
    { value: "53", label: "Gangapur" },
    { value: "54", label: "Indapur" },
    { value: "55", label: "Jamkhed" },
    { value: "56", label: "Kada" },
    { value: "57", label: "Kalvan" },
    { value: "58", label: "Karad" },
    { value: "59", label: "Karjat (Raigad)" },
    { value: "60", label: "Kolhapur" },
    { value: "61", label: "Kopargaon" },
    { value: "62", label: "Kurdwadi (Modnimb)" },
    { value: "63", label: "Lasalgaon" },
    { value: "64", label: "Lasalgaon (Niphad)" },
    { value: "65", label: "Lasalgaon (Vinchur)" },
    { value: "66", label: "Lasur Station" },
    { value: "67", label: "Laxmi Sopan Agriculture Produce Marketing Co Ltd" },
    { value: "68", label: "Lonand" },
    { value: "69", label: "Malharshree Farmers Producer Co Ltd" },
    { value: "70", label: "Malkapur" },
    { value: "71", label: "Mangal Wedha" },
    {
      value: "72",
      label: "Mankamneshwar Farmar Producer CoLtd Sanchalit Mank",
    },
    { value: "73", label: "Manmad" },
    { value: "74", label: "Nampur" },
    { value: "75", label: "Nandgaon" },
    { value: "76", label: "Nandura" },
    { value: "77", label: "Navapur" },
    { value: "78", label: "Newasa (Ghodegaon)" },
    { value: "79", label: "Om Chaitanya Multistate Agro Purpose CoOp Society" },
    { value: "80", label: "Paithan" },
    { value: "81", label: "Palthan" },
    { value: "82", label: "Pandharpur" },
    { value: "83", label: "Paranda" },
    { value: "84", label: "Parner" },
    { value: "85", label: "Pathardi" },
    { value: "86", label: "Pimpalgaon" },
    { value: "87", label: "Pimpalgaon Baswant (Saykheda)" },
    { value: "88", label: "Pratap Nana Mahale Khajgi Bajar Samiti" },
    { value: "89", label: "Rahuri (Vambori)" },
    { value: "90", label: "Sakri" },
    { value: "91", label: "Sangamner" },
    { value: "92", label: "Satana" },
    { value: "93", label: "Shevgaon" },
    { value: "94", label: "Shirpur" },
    {
      value: "95",
      label: "Shivsiddha Govind Producer Company Limited Sanchal",
    },
    { value: "96", label: "Shree Rameshwar Krushi Market" },
    { value: "97", label: "Shree Sairaj Krushi Market" },
    { value: "98", label: "Shrigonda" },
    { value: "99", label: "Sinner" },
    { value: "100", label: "Suragana" },
    { value: "101", label: "Umrane" },
    { value: "102", label: "Vaijpur" },
    { value: "103", label: "Varora" },
    { value: "104", label: "Wardha" },
    { value: "105", label: "Yawal" },
    { value: "106", label: "Yeola" },
    { value: "107", label: "Ghoti" },
    { value: "108", label: "Kalmeshwar" },
    { value: "109", label: "Mumbai" },
    { value: "110", label: "Palus" },
    { value: "111", label: "Panvel" },
    { value: "112", label: "Parshiwani" },
    { value: "113", label: "Patan" },
    { value: "114", label: "Ratnagiri (Nachane)" },
  ];

  const yearOptions = [{ value: "2023", label: "2023" }];

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

  // Define options for other dropdowns in a similar way

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Send the selected field values to your Flask backend
  //     const response = await fetch("http://127.0.0.1:5000/predict", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //       // Convert form data to JSON
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(result);
  //       console.log("Predicted Price:", result.modal);
  //       console.log("Min Price:", result.min);
  //       console.log("Max Price:", result.max);
  //       setPredictedPrice(result.modal);
  //       setminPrice(result.min);
  //       setmaxPrice(result.max);
  //       console.log(formData);
  //     } else {
  //       console.error("Failed to make the prediction request.");
  //       console.log(formData);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // Send the selected field values to your Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // mode: 'cors', // Add this line
        // Convert form data to JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        console.log("Predicted Price:", result.modal);
        console.log("Min Price:", result.min);
        console.log("Max Price:", result.max);
        setPredictedPrice(result.modal);
        setminPrice(result.min);
        setmaxPrice(result.max);
        console.log(formData);
      } else {
        console.error("Failed to make the prediction request.");
        console.log(formData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-white-100 min-h-screen">
        <header className="bg-gray-800 p-4 text-white text-center rounded-lg">
          <h1 className="text-4xl font-semibold">Price Prediction</h1>
        </header>
        <div className="container mx-auto mt-4 p-4">
          <div className="grid gap-4">
            {/* Dashboard Cards or Widgets */}
            <div className=" p-4 rounded-lg ">
              {/* Card Content Here */}
              <div className="flex mb-4">
                {/* Commodity */}
                <div className="flex-1">
                  <label
                    htmlFor="Commodity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Commodity:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="Commodity"
                      name="Commodity"
                      value={formData.Commodity}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {commodityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* State */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="state_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="state_name"
                      name="state_name"
                      value={formData.state_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {stateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* District */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="district_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    District:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="district_name"
                      name="district_name"
                      value={formData.district_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {districtOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Market */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="market_center_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Market:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="market_center_name"
                      name="market_center_name"
                      value={formData.market_center_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {marketOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Group */}
                {/* <div className="flex-1 ml-4">
                  <label
                    htmlFor="group_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Group:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="group_name"
                      name="group_name"
                      value={formData.group_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div> */}

                {/* Variety */}
                {/* <div className="flex-1 ml-4">
                  <label
                    htmlFor="variety_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Variety:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="variety_name"
                      name="variety_name"
                      value={formData.variety_name}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {varietyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div> */}
                {/* </div> */}
              </div>

              <div className="flex mb-4">
                {/* day */}
                <div className="flex-1">
                  <label
                    htmlFor="day"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Day:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="day"
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {dayOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* month */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="month"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Month:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="month"
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {monthOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* year */}
                <div className="flex-1 ml-4">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year:
                  </label>
                  <div className="relative inline-block w-32">
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">Select</option>
                      {yearOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white font-medium text-lg rounded-md px-4 py-2 bg-indigo-500 h-14 w-40 my-8 "
              >
                Predict
              </button>
              {/* Display the predicted price */}
              {predictedPrice !== null && (
                //   <div className="mt-4">
                //   <h2 className="text-xl font-semibold">Predicted Price:</h2>
                //   <p className="text-lg text-green-600">{predictedPrice}</p>
                // </div>
                <section class="text-gray-600 body-font">
                  <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-20">
                      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Market Prices Per Quintal for{" "}
                        {formData.Commodity
                          ? commodityOptions.find(
                            (option) => option.value === formData.Commodity
                          )?.label
                          : "Commodity"}{" "}
                        in{" "}
                        {formData.state_name
                          ? stateOptions.find(
                            (option) => option.value === formData.state_name
                          )?.label
                          : "state_name"}
                      </h1>
                      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Explore the market prices for a specific commodity in a
                        particular market center.
                      </p>
                    </div>
                    <div class="flex flex-wrap -m-4 text-center">
                      <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                          <h2 class="title-font font-medium text-3xl text-gray-900">
                            {predictedPrice.toFixed(3)}
                          </h2>
                          <p class="leading-relaxed">Predicted Price</p>
                        </div>
                      </div>
                      <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                          <h2 class="title-font font-medium text-3xl text-gray-900">
                            {minPrice.toFixed(3)}
                          </h2>
                          <p class="leading-relaxed">Minimum Price</p>
                        </div>
                      </div>
                      <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg shadow-md">
                          <h2 class="title-font font-medium text-3xl text-gray-900">
                            {maxPrice.toFixed(3)}
                          </h2>
                          <p class="leading-relaxed">Maximum Price</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PricePredictionForm;
