import React, { useState } from 'react';
import FixedCost from './FixedCost';
import FixedMonthly from '../Components/FixedMonthly';

const Profile = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    location: '',
    email: '',
    phone: '',
  });

  const spacing = 2;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">

            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                restaurantData.location
              )}&output=embed`}
              style={{ marginRight: spacing + 'em' }}
              ></iframe>

            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">{restaurantData.location}</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a className="text-indigo-500 leading-relaxed">
                  {restaurantData.email}
                </a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed">{restaurantData.phone}</p>


              </div>
            </div>
          </div>
          <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Restaurant Profile
                </h2>
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Restaurant Name</h3>
                  <input
                    type="text"
                    name="name"
                    value={restaurantData.name}
                    onChange={handleChange}
                    className="text-gray-800 font-semibold w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Location</h3>
                  <input
                    type="text"
                    name="location"
                    value={restaurantData.location}
                    onChange={handleChange}
                    className="text-gray-800 font-semibold w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <input
                    type="text"
                    name="email"
                    value={restaurantData.email}
                    onChange={handleChange}
                    className="text-gray-800 font-semibold w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <input
                    type="text"
                    name="phone"
                    value={restaurantData.phone}
                    onChange={handleChange}
                    className="text-gray-800 font-semibold w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <FixedMonthly/>
              <div className="bg-gray-100 p-4 flex justify-end">
                <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                  Edit Profile
                </button>
                <button className="bg-green-500 text-white py-2 px-4 ml-2 rounded-md hover:bg-green-600">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;