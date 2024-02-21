import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

import { FaUsersCog, FaSuitcaseRolling } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";
import img from "../images/memory.png";

const AboutUsPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section className="py-12 px-3 lg:px-20 ">
      <div className="text-center p-4">
        
        <h1 className="text-4xl text-[#3D2117] font-extrabold leading-tight mb-4 text-center">
        About Us
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        We are passionate about travel and committed to providing you with the best experiences. 
      </p>

       
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div
          data-aos="zoom-in"
          className="relative overflow-hidden rounded-lg  lg:mr-8"
        >
          <img
            className="w-full h-[30rem] object-cover object-center"
            src={img}
            alt=""
          />
        </div>

        <div className="max-w-lg mx-auto lg:order-2">
          <p className="text-base text-center font-semibold text-[#0056 mb-2">SJ Tour and Travels</p>
          <h1 className="text-3xl text-center  text-[#3D2117] font-bold text-[#0 mb-4">
           
           Explore the Paradise on Earth
          </h1>
          

          <ul className="mt-6 space-y-6 text-lg text-[#0]">
            <li className="flex items-start">
              < FaUsersCog  className="mt-1 h-5 w-5 flex-none text-green-00" />
              <span className="ml-3">
                <strong className="font-semibold  text-[#0E]">Personalized Service:</strong>
                Tailoring each journey to your unique preferences, SJ Tour and Travels is committed
                 to providing a personalized and memorable adventure.
              </span>
            </li>
            <li className="flex items-start">
              <FaSuitcaseRolling className="mt-1 h-5 w-5 flex-none text-een-600" />
              <span className="ml-3">
                <strong className="font-semibold  text-[06A4E]">Expert Guidance:</strong>
              
Experience Kashmir with expert guidance. Our seasoned team ensures you enjoy personalized service
 and make the most of your unique adventure.
              </span>
            </li>
            <li className="flex items-start">
              < AiOutlineSafety className="mt-1 h-5 w-5 flex-none text-een-600" />
              <span className="ml-3">
                <strong className="font-semibold  text-[6A4E]">Safety First:</strong>
                Your safety is our top priority. SJ Tour and Travels adheres to the highest standards of safety, ensuring that your travel experience is not only enjoyable but also secure.
              </span>
            </li>
          </ul>

          <div className="text-center mt-8">
            <Link to="/aboutus">
              <button className="bg-[#03AC13]  uppercase text-white py-2 px-4 rounded-md hover:bg-green-600">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
