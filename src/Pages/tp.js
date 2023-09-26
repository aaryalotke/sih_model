// import React, { useState } from 'react';

// const PricePredictionForm = () => {
//   // ... (Rest of your component code)

//   return (
//     <form onSubmit={handleSubmit} className="bg-green-100 p-6 rounded-lg shadow-md">
//       <div className="flex mb-4">
//         {/* Commodity */}
//         <div className="flex-1">
//           <label htmlFor="Commodity" className="block text-sm font-medium text-gray-700">
//             Commodity:
//           </label>
//           <div className="relative inline-block w-32">
//             <select
//               id="Commodity"
//               name="Commodity"
//               value={formData.Commodity}
//               onChange={handleInputChange}
//               className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//             >
//               <option value="">Select</option>
//               {commodityOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* state_name */}
//         <div className="flex-1 ml-4">
//           <label htmlFor="state_name" className="block text-sm font-medium text-gray-700">
//             State:
//           </label>
//           <div className="relative inline-block w-32">
//             <select
//               id="state_name"
//               name="state_name"
//               value={formData.state_name}
//               onChange={handleInputChange}
//               className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//             >
//               <option value="">Select</option>
//               {stateOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* district_name */}
//         <div className="flex-1 ml-4">
//           <label htmlFor="district_name" className="block text-sm font-medium text-gray-700">
//             District:
//           </label>
//           <div className="relative inline-block w-32">
//             <select
//               id="district_name"
//               name="district_name"
//               value={formData.district_name}
//               onChange={handleInputChange}
//               className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//             >
//               <option value="">Select</option>
//               {districtOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* market_center_name */}
//         <div className="flex-1 ml-4">
//           <label htmlFor="market_center_name" className="block text-sm font-medium text-gray-700">
//             Market:
//           </label>
//           <div className="relative inline-block w-32">
//             <select
//               id="market_center_name"
//               name="market_center_name"
//               value={formData.market_center_name}
//               onChange={handleInputChange}
//               className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//             >
//               <option value="">Select</option>
//               {marketOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Variety and group */}
//       <div className="flex mb-4">
//         {/* Variety */}
//         <div className="flex-1">
//           <label htmlFor="Variety" className="block text-sm font-medium text-gray-700">
//             Variety:
//           </label>
//           <select
//             id="Variety"
//             name="Variety"
//             value={formData.Variety}
//             onChange={handleInputChange}
//             className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             <option value="">Select</option>
//             {varietyOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* group */}
//         <div className="flex-1 ml-4">
//           <label htmlFor="group_name" className="block text-sm font-medium text-gray-700">
//             Group:
//           </label>
//           <select
//             id="group_name"
//             name="group_name"
//             value={formData.group_name}
//             onChange={handleInputChange}
//             className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             <option value="">Select</option>
//             {groupOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Day, month, and year */}
//       <div className="flex mb-4">
//         {/* Day */}
//         <div className="flex-1">
//           <label htmlFor="day" className="block text-sm font-medium text-gray-700">
//             Day:
//           </label>
//           <select
//             id="day"
//             name="day"
//             value={formData.day}
//             onChange={handleInputChange}
//             className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             <option value="">Select</option>
//             {dayOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* month */}
//         <div className="flex-1 ml-4">
//           <label htmlFor="month" className="block text-sm font-medium text-gray-700">
//             Month:
//           </label>
//           <select
//             id="month"
//             name="month"
//             value={formData.month}
//             onChange={handleInputChange}
//             className="appearance-none h-10 px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             <option value="">Select</option>
//             {monthOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* year */}
//         <div className="flex-1 ml-4">
//           <label htmlFor="year" className="block text-sm font-medium text-gray-700">
//             Year:
//           </label>
//           <select
//             id="year"
//             name="year"
//             value={formData.year}
//             onChange={handleInputChange}
//             className="appearance-none h-10 px-4 py-2 w-full
