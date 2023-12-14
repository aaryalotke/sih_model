

import React, { useState } from 'react';
import logo from "./../aboutus.jpg";
import "./about.css"


const Aboutus = () => {
  return (
    <div>
        <section id ="about" class="text-gray-900 body-font">
  <div class="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      {/* <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/> */}
      <img
         src={logo} 
        alt="Logo"
        className="w-100 h-100 rounded-full"
      />
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-orange-300">Pricing Profits, 
        <br class="hidden lg:inline-block"/>One Byte at a time
      </h1>
      <p class="mb-8 leading-relaxed text-white">At ByteBistro, we're passionate about revolutionizing the way restaurants and food outlets operate in the ever-evolving culinary landscape. Our mission is simple yet powerful: we provide an intuitive and user-friendly platform that empowers restaurateurs to thrive in a competitive market.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Read more!</button>
        {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
};

export default Aboutus
