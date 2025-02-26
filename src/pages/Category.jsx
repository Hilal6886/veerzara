import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function About() {
  return (
    <div>
      {/* About Section */}
      <div className="container mx-auto py-20 px-4">
      <div className="text-center  mb-3">
        <h1 className="inline-block bg-[#FFE6C9] text-[#4B164C] uppercase tracking-wide px-3 py-1 rounded-xl">
          About us
        </h1>
        <p className="text-xl md:text-2l  font-semold text-gray-200 p-6 mt-2">
        Experience the heart of Kashmir
        </p>
      </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text Column */}
          <div className="w-full md:w-1/2">
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Welcome to{" "}
              <span className="text-purple-800">
                Veer Zara Tour and Travel
              </span>
            </h1>
            <p className="text-gray-700 mb-4">
              Experience the magic of Kashmir like never before. At Veer Zara Tour and Travel, we offer exclusive journeys that showcase the pristine beauty and rich cultural heritage of Kashmir.
            </p>
            <p className="text-gray-700 mb-6">
              Our expert team curates personalized itineraries featuring scenic helicopter rides,
               luxurious houseboat stays on Dal Lake, guided treks through breathtaking valleys,
                and immersive cultural tours. 
                Let us take you on an unforgettable adventure through the enchanting landscapes of Kashmir.
            </p>
            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                "Scenic Helicopter Rides",
                "Luxury Houseboats",
                "Guided Treks & Tours",
                "Local Cultural Experiences",
                "Customized Itineraries",
                "24/7 Support",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="flex items-center justify-center bg-purple-600 text-white rounded-full p-1 mr-2">
                    <FaArrowRight />
                  </span>
                  <p className="m-0">{feature}</p>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="bg-purple-800 hover:bg-purple-700 text-white py-3 px-5 rounded-md block text-center"
            >
              Read More
            </Link>
          </div>
          {/* Image Column */}
          <div className="w-full md:w-1/2 min-h-[400px] relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://img.freepik.com/free-photo/two-friends-have-traveling-enjoy-spending-free-time-together-being-experienced-tourists_273609-33386.jpg?t=st=1740315695~exp=1740319295~hmac=b410651bf681e9553894736102d878f0e4750a227b628f20609ff7a91d4c315a&w=1060"
              alt="Kashmir Landscape"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
