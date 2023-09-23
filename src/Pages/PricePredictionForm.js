import React, { useState } from 'react';

const PricePredictionForm = () => {
  const [formData, setFormData] = useState({
    commodity: '',
    stateName: '',
    districtName: '',
    marketCenterName: '',
    variety: '',
    date: '',
  });

  // Define the options for the dropdowns
  const commodityOptions = [
    { value: '1', label: 'Tomato' },
    { value: '2', label: 'Onion' },
    { value: '3', label: 'Potato' },
    { value: '4', label: 'Garlic' },
    // Add more options as needed
  ];

  const varietyOptions = [
    { value: '1', label: 'Local' },
    { value: '2', label: 'Other' },
  ];

  const stateOptions = [
    { value: '1', label: 'Maharashtra' },

  ];

  const groupOptions = [
    { value: '1', label: 'Vegetables' },
   
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


  // Define options for other dropdowns in a similar way

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the selected field values to your Flask backend
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // Convert form data to JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Predicted Price:', result.predicted_price);
    console.log(formData);
      } else {
        console.error('Failed to make the prediction request.');
        console.log(formData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="commodity">Commodity:</label>
        <select
          id="commodity"
          name="commodity"
          value={formData.commodity}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {commodityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="state">State:</label>
        <select
          id="state"
          name="state"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {stateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="district">District:</label>
        <select
          id="district"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {districtOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="market">Market:</label>
        <select
          id="market"
          name="market"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {marketOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="variety">Variety:</label>
        <select
          id="variety"
          name="variety"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {varietyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="group">Group:</label>
        <select
          id="group"
          name="group"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Repeat the above block for other dropdowns */}
      
      <div>
        <label htmlFor="day">Day:</label>
        <select
          id="day"
          name="day"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {dayOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="month">Month:</label>
        <select
          id="month"
          name="month"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          name="year"
          value={formData.market}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {yearOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Predict</button>
    </form>
  );
};

export default PricePredictionForm;
