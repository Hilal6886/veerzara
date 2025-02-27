import React from "react";
import { Link } from "react-router-dom";
import { FaHiking, FaTheaterMasks, FaMapMarkedAlt, FaHeadset } from "react-icons/fa";
import { GiHelicopter, GiSailboat } from "react-icons/gi";

const features = [
  { text: " Helicopter Rides", icon: <GiHelicopter className="text-xl" /> },
  { text: "Luxury Houseboats", icon: <GiSailboat className="text-xl" /> },
  { text: "Guided Treks & Tours", icon: <FaHiking className="text-xl" /> },
  { text: "Local Cultural Experiences", icon: <FaTheaterMasks className="text-xl" /> },
  { text: "Customized Itineraries", icon: <FaMapMarkedAlt className="text-xl" /> },
  { text: "24/7 Support", icon: <FaHeadset className="text-xl" /> },
];

function About() {
  return (
    <div>
      {/* About Section */}
      <div className="container mx-auto py-20 px-4">
        {/* Header */}
        <div className="text-center mb-[3rem]">
          <h1 className="inline-block bg-indigo-100 text-indigo-900 uppercase tracking-wide px-4 py-2 rounded-xl">
            About Us
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 mt-4">
            Discover the Essence of Luxury & Heritage
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">
              Welcome to <span className="text-purple-800">Veer Zara Tour and Travel</span>
            </h1>
            <p className="text-gray-700 mb-4">
              Experience the magic of Kashmir like never before. We offer exclusive journeys that showcase the pristine beauty and rich cultural heritage of this enchanting land.
            </p>
            <p className="text-gray-700 mb-6">
              Our expert team curates personalized itineraries featuring scenic helicopter rides, luxurious houseboat stays on Dal Lake, guided treks through breathtaking valleys, and immersive cultural tours. Let us take you on an unforgettable adventure.
            </p>
            {/* Extra Content */}
            
            <p className="text-gray-700 mb-1">
              We believe travel should transform and inspire, creating memories that last a lifetime.
            </p>
           
            <p className="text-gray-700 mb-6">
              Join us, and let’s create a story of travel that you will cherish forever.
            </p>
            {/* Features List */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="flex items-center justify-center bg-purple-600 text-white rounded-full p-2 mr-3">
                    {feature.icon}
                  </span>
                  <p className="m-0 text-gray-800 font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-6 rounded-md block text-center transition duration-300"
            >
              Read More
            </Link>
          </div>
          {/* Image Column */}
          <div className="w-full md:w-1/2 min-h-[400px] relative">
            <img
              className="w-full h-full object-cover rounded-lg shadow-xl"
              src="https://res.cloudinary.com/ddccbvbku/image/upload/v1740678069/33388_kgppr7.jpg"
              alt="Kashmir Landscape"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
