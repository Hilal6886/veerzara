
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import hero from "../assets/hero.mp4";

export default function Hero() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleExplore = () => {
    const queryParams = new URLSearchParams({
      destination: destination,
      priceRange: priceRange,
    });

    navigate(`/filtered-tours?${queryParams}`);
  };
  return (
    <section id="hero" className="relative w-full h-full  overflow-hidden">
      <div className="h-screen  ">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full lg:h-[85%] object-cover object-center opacity-100"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        >
          <source
            src={hero}// Replace with your video URL
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute p-0 m-0 top-1/2 lg:top-1/3 md:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-5xl uppercase  md:text-6xl md:mt-0 text-center font-bold mb-4">
          Explore the Beauty Of Kashmir
        </h1>
        <p className="text-lg uppercase md:text-xl mb-6 ">
          Embark on a journey to discover amazing destinations.
        </p>
        <div className="bg-white bg-opacity-20 p-6 w-[20rem] rounded-md shadow-md backdrop-blur-md lg:w-[50rem]  mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="mb-4 md:mb-0 w-full md:w-1/3">
              
              <input
                type="text"
                id="destination"
                placeholder="Enter your destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 border border-white rounded-md bg-transparent text-Heart-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="mb-4 md:mb-0 w-full md:w-1/3">
              
              <input
                type="number"
                id="people"
                placeholder="Enter No Of People"
                className="w-full p-3 border border-white rounded-md bg-transparent text-Heart-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="mb-4 md:mb-0 w-full md:w-1/3">
              
              <input
                type="number"
                id="destination"
                placeholder="Enter Price Range"
                value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-3 border border-white rounded-md bg-transparent text-Heart-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button onClick={handleExplore} className="bg-[#03AC13] hover:bg-green-600 text-white px-6 py-3 rounded-md">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
