import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      {/* About Section */}
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image Column */}
          <div className="w-full md:w-1/2 min-h-[400px] relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://img.freepik.com/free-photo/two-friends-have-traveling-enjoy-spending-free-time-together-being-experienced-tourists_273609-33386.jpg?t=st=1740315695~exp=1740319295~hmac=b410651bf681e9553894736102d878f0e4750a227b628f20609ff7a91d4c315a&w=1060"
              alt="Kashmir Landscape"
            />
          </div>
          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <div className="inline-block bg-[#4B164C] text-white uppercase tracking-wide px-3 py-1 rounded mb-4">
              About Us
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Welcome to{" "}
              <span className="text-indigo-600">
                Veer Zara Tour and Travel
              </span>
            </h1>
            <p className="text-gray-700 mb-4">
              Experience the magic of Kashmir like never before. At Veer
              Zara Tour and Travel, we offer exclusive journeys that showcase
              the pristine beauty and rich cultural heritage of Kashmir.
            </p>
            <p className="text-gray-700 mb-6">
              Our expert team curates personalized itineraries featuring scenic
              helicopter rides, luxurious houseboat stays on Dal Lake, guided
              treks through breathtaking valleys, and immersive cultural tours.
              Let us take you on an unforgettable adventure through the
              enchanting landscapes of Kashmir.
            </p>
            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-indigo-600 mr-2">→</span>
                <p className="m-0">Scenic Helicopter Rides</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-600 mr-2">→</span>
                <p className="m-0">Luxury Houseboats</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-600 mr-2">→</span>
                <p className="m-0">Guided Treks & Tours</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-600 mr-2">→</span>
                <p className="m-0">Local Cultural Experiences</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-600 mr-2">→</span>
                <p className="m-0">Customized Itineraries</p>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-600 mr-2">→</span>
                <p className="m-0">24/7 Support</p>
              </div>
            </div>
            <Link
              to="/about"
              className="bg-indigo-800 hover:bg-indigo-700 text-white py-3 px-5 rounded-md block text-center"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
