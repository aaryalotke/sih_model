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
  // const [startDay, setStartDay] = useState("1"); // Default start day
  // const [startMonth, setStartMonth] = useState("01"); // Default start month
  // const [startYear, setStartYear] = useState("2021"); // Default start year
  // const [endDay, setEndDay] = useState("1"); // Default end day
  // const [endMonth, setEndMonth] = useState("01"); // Default end month
  // const [endYear, setEndYear] = useState("2023"); // Default end year
  const [chartData, setChartData] = useState(null);

  const [selectedState, setSelectedState] = useState("1"); // Default selected state
  const [selectedDistrict, setSelectedDistrict] = useState("1"); // Default selected district
  const [selectedMarket, setSelectedMarket] = useState("1"); // Default selected market
  // const [selectedCommodity, setSelectedCommodity] = useState(""); // Default selected commodity

  
  const commodities = [
    { value: 1, name: "Tomato" },
    { value: 2, name: "Potato" },
    { value: 3, name: "Onion" },
  ];
  
  const [selectedCommodity, setSelectedCommodity] = useState("");
  

  const yearOptions = [
    { value: '2023', label: '2023' },
   
  ];

  const monthOptions = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sept' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
   
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
        { value: "31", label: "31" }
    
    
   
  ];


  const stateOptions = [
    { value: '1', label: 'Maharashtra' },

  ];

  const districtOptions = [
    { value: '1', label: 'Ahmednagar' },
    { value: '2', label: 'Sholapur' },
    { value: '3', label: 'Akola' },
    { value: '4', label: 'Amravati' },
    { value: '5', label: 'Aurangabad' },
    { value: '6', label: 'Jalgaon' },
    { value: '7', label: 'Chandrapur' },
    { value: '8', label: 'Nagpur' },
    { value: '9', label: 'Sangli' },
    { value: '10', label: 'Pune' },
    { value: '11', label: 'Thane' },
    { value: '12', label: 'Nashik' },
    { value: '13', label: 'Osmanabad' },
    { value: '14', label: 'Raigad' },
    { value: '15', label: 'Satara' },
    { value: '16', label: 'Kolhapur' },
    { value: '17', label: 'Mumbai' },
    { value: '18', label: 'Dhule' },
    { value: '19', label: 'Beed' },
    { value: '20', label: 'Buldhana' },
    { value: '21', label: 'Nandurbar' },
    { value: '22', label: 'Wardha' },
    { value: '23', label: 'Ratnagiri' },
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
    { value: "72", label: "Mankamneshwar Farmar Producer CoLtd Sanchalit Mank" },
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
    { value: "95", label: "Shivsiddha Govind Producer Company Limited Sanchal" },
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
    { value: "114", label: "Ratnagiri (Nachane)" }



  ];

  const defaultState = stateOptions[0];
  const [state, setState] = useState(defaultState.value); // Default state

  const defaultDistrict = stateOptions[0];
  const [district, setDistrict] = useState(defaultDistrict.value); // Default district

  const defaultMarket = stateOptions[0];
  const [market, setMarket] = useState(defaultMarket.value); // Default market

  const defaultStartDay = dayOptions[29];
  const [startDay, setStartDay] = useState(defaultStartDay.label); // Default start day

  const defaultStartMonth = monthOptions[10];
  const [startMonth, setStartMonth] = useState(defaultStartMonth.value); // Default start month

  const defaulStartYear = yearOptions[0];
  const [startYear, setStartYear] = useState(defaulStartYear.value); // Default start year

  const defaultEndDay = dayOptions[29];
  const [endDay, setEndDay] = useState(defaultEndDay.value); // Default end day

  const defaultEndMonth = monthOptions[11];
  const [endMonth, setEndMonth] = useState(defaultEndMonth.value); // Default end month

  const defaultEndYear = yearOptions[0];
  const [endYear, setEndYear] = useState(defaultEndYear.value); // Default end year
  
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  // const years = ["2021", "2022", "2023", "2024"]; // Update with your desired years



  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/chart", {
        start_day: startDay,
        start_month: startMonth,
        start_year:  startYear,
        end_day:  endDay,
        end_month:  endMonth,
        end_year:  endYear,
        commodity: selectedCommodity,
        state: selectedState,
        district: selectedDistrict,
        market: selectedMarket,
       
      });

      console.log(response.data);

      setChartData(response.data.predictions);
      console.log(chartData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDay, startMonth, startYear, endDay, endMonth, endYear, selectedCommodity, selectedState, selectedDistrict, selectedMarket]);


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-white-100 min-h-screen">
        <header className="bg-gray-800 mb-12 p-4 text-white text-center rounded-lg lg:flex-grow">
          <h1 className="text-4xl font-semibold">Commodity Price Prediction</h1>
        </header>
        <div className="my-4">
          <label className="mr-6  text-sm font-medium text-gray-700">Commodity :</label>
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
        {/* <div className="my-4">
      <label className="mr-6 text-sm font-medium text-gray-700">State :</label>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7"
      >
        <option value="">Select a state</option>
        {stateOptions.map((state) => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        ))}
      </select>

      <label className="mr-6 text-sm font-medium text-gray-700">District :</label>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7"
      >
        <option value="">Select a district</option>
        {districtOptions.map((district) => (
          <option key={district.value} value={district.value}>
            {district.label}
          </option>
        ))}
      </select>

      <label className="mr-6 text-sm font-medium text-gray-700">Market :</label>
      <select
        value={selectedMarket}
        onChange={(e) => setSelectedMarket(e.target.value)}
        className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7"
      >
        <option value="">Select a market</option>
        {marketOptions.map((market) => (
          <option key={market.value} value={market.value}>
            {market.label}
          </option>
        ))}
      </select>
    </div> */}

        {/* State */}
        <div className="my-4">
          <label className="mr-6  text-sm font-medium text-gray-700">State :</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Maharashtra</option>
            {stateOptions.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>

        </div>

        {/* District */}
        <div className="my-4">
          <label className="mr-6  text-sm font-medium text-gray-700">District :</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Ahmednagar</option>
            {districtOptions.map((district) => (
              <option key={district.value} value={district.value}>
                {district.label}
              </option>
            ))}
          </select>

        </div>

        {/* Market */}
        <div className="my-4">
          <label className="mr-6  text-sm font-medium text-gray-700">Market :</label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 h-12 w-96 mr-7" // Increased padding and height
          >
            <option value="">Ahmednagar</option>
            {marketOptions.map((market) => (
              <option key={market.value} value={market.value}>
                {market.label}
              </option>
            ))}
          </select>

        </div>




        <div className="my-4">
          <label className="mr-6  text-sm font-medium text-gray-700">Start Date :</label>
          <select
            value={startDay}
            onChange={(e) => setStartDay(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-20" // Increased padding and height
          >
            <option value="">30</option>
            {dayOptions.map((day) => (
              <option key={day.value} value={day.value}>
                {day.value}
              </option>
            ))}
          </select>
          <select
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
          >
            <option value="">11</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.value}
              </option>
            ))}
          </select>
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
          >
            <option value="">2023</option>
            {yearOptions.map((year) => (
              <option key={year.value} value={year.value}>
                {year.value}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className="mr-6  text-sm font-medium text-gray-700">End Date : </label>
          <select
            value={endDay}
            onChange={(e) => setEndDay(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-20 " // Increased padding and height
          >
            <option value="">30</option>
            {dayOptions.map((day) => (
              <option key={day.value} value={day.value}>
                {day.value}
              </option>
            ))}
          </select>
          <select
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
          >
            <option value="">12</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.value}
              </option>
            ))}
          </select>
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mx-4 h-12 w-24" // Increased padding and height
          >
            <option value="">2023</option>
            {yearOptions.map((year) => (
              <option key={year.value} value={year.value}>
                {year.value}
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
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold mb-12 ">Predictions for the Date Range</h2>
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
