// src/shared/TourCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { MdDelete, MdEdit, MdStar } from "react-icons/md";

import {
  FaStar,
  FaSpinner,
  FaRupeeSign,
  FaTaxi,
  FaUserTie,
  FaMapMarkedAlt,
  FaHeadset,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RiArticleLine } from 'react-icons/ri';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Aos from 'aos';
import 'aos/dist/aos.css';


import { GiHouse, GiBoatFishing, GiFlowerPot, GiKnifeFork, GiCastle } from "react-icons/gi";
import { FaMountain } from "react-icons/fa";

// Updated amenities list for a travel agency card
const amenitiesList = [
  { icon: <FaTaxi />, label: 'Cab Service', bgColor: 'bg-blue-500' },
  { icon: <FaUserTie />, label: 'Tour Guide', bgColor: 'bg-green-500' },
  { icon: <FaMapMarkedAlt />, label: 'Custom Itinerary', bgColor: 'bg-purple-500' },
  { icon: <FaHeadset />, label: '24/7 Support', bgColor: 'bg-red-500' },
  { icon: <FaUsers />, label: 'Group Booking', bgColor: 'bg-indigo-500' },
  { icon: <GiFlowerPot />, label: "Gardens", bgColor: "bg-green-500" },
  { icon: <FaMountain />, label: "Trekking", bgColor: "bg-purple-500" },
  { icon: <GiKnifeFork />, label: "Cuisine", bgColor: "bg-red-500" },
  { icon: <GiCastle />, label: "Heritage", bgColor: "bg-indigo-500" },
];

const TourCard = ({ tour, onBook = () => {} }) => {
  const [loading, setLoading] = useState(false);

  const userData = localStorage.getItem('USER');
  let currentUser = null;
  let isAdmin = false;
  if (userData) {
    currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }

  const { id, imgUrl, price, title, duration, rating } = tour;

  // Scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle deletion with a loading indicator
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Tour?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'tours', id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // Render exactly 5 star icons based on the rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-yellow-400'}
      />
    ));
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-gradient-to-r from-white via-white to-gray-100 text-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl">
      <div className="relative">
        {/* Responsive image height */}
        <img
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
          src={imgUrl}
          alt="tour"
        />
       {isAdmin && (
          <div className="absolute top-3 right-3 flex space-x-2">
            {loading ? (
              <div className="animate-spin text-blue-500">
                <MdStar size={24} />
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-100 p-2 rounded-full hover:bg-red-200"
                  aria-label="Delete tour"
                >
                  <MdDelete size={20} className="text-red-500" />
                </button>
                <Link
                  to={`/tous/${id}`}
                  className="bg-blue-100 p-2 rounded-full hover:bg-blue-200"
                  aria-label="Edit tour"
                >
                  <MdEdit size={20} className="text-blue-500" />
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Price Section with Icon */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg text-gray-600 flex items-center gap-2">
            <FaRupeeSign size={15} /> {price} <span className='text-sm -200'>per person</span>
          </h6>
          <span className="bg-[#DAD2FF] rounded text-black p-1 text-sm">Featured</span>
        </div>

        {/* Title Section with Icon */}
        <h5 className="text-lg font-sembold text-blue-800 flex items-center gap-2 mb-2">
          <RiArticleLine size={20} />
          <Link to={`/tour/${id}`} onClick={scrollToTop} className="hover:underline">
            {title}
          </Link>
        </h5>

        {/* Duration and Rating Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AiOutlineClockCircle className="text-gray-600" size={18} />
            <small className="text-lg">{duration}</small>
          </div>
          <div className="flex items-center gap-2">{renderStars(rating)}</div>
        </div>

        {/* Amenities Section (Responsive Grid) */}
        <div className='border-t border-gray-200 pt-4 mb-6'></div>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mb-4">
          {amenitiesList.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`p-2 rounded-lg ${amenity.bgColor} text-white text-lg`}
              >
                {amenity.icon}
              </div>
              <span className="text-xs sm:text-sm">{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
          <Link
            to={`/tour/${id}`}
            onClick={scrollToTop}
            className="w-full sm:w-1/2 text-center border border-indigo-600 uppercase text-indigo-900 py-2 px-4 rounded-md  transition duration-300"
          >
            View More
          </Link>
          <button
            onClick={onBook}
            className="w-full sm:w-1/2 bg-indigo-600 uppercase text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
