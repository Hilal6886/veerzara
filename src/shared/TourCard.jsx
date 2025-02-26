// src/shared/TourCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsTrash, BsPencil } from 'react-icons/bs';
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

// Updated amenities list for a travel agency card
const amenitiesList = [
  { icon: <FaTaxi />, label: 'Cab Service', bgColor: 'bg-blue-500' },
  { icon: <FaUserTie />, label: 'Tour Guide', bgColor: 'bg-green-500' },
  { icon: <FaMapMarkedAlt />, label: 'Custom Itinerary', bgColor: 'bg-purple-500' },
  { icon: <FaHeadset />, label: '24/7 Support', bgColor: 'bg-red-500' },
  { icon: <FaShieldAlt />, label: 'Travel Insurance', bgColor: 'bg-yellow-500' },
  { icon: <FaUsers />, label: 'Group Booking', bgColor: 'bg-indigo-500' },
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
        className={index < rating ? 'text-yellow-400' : 'text-yellow-600'}
      />
    ));
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-[#FFE6C9] text-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl">
      <div className="relative">
        {/* Responsive image height */}
        <img
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
          src={imgUrl}
          alt="tour"
        />
        {isAdmin && (
          <div className="absolute top-2 right-2 flex space-x-2">
            {loading ? (
              <FaSpinner className="text-blue-600 animate-spin" size={24} />
            ) : (
              <>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                  aria-label="Delete tour"
                >
                  <BsTrash size={24} />
                </button>
                <Link to={`/tous/${id}`}>
                  <BsPencil className="text-blue-600 hover:text-blue-800" size={24} />
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Price Section with Icon */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-xl font-semibold flex items-center gap-2">
            <FaRupeeSign size={20} /> {price}
          </h6>
          <span className="bg-[#FCDE70] rounded text-black p-1 text-sm">Featured</span>
        </div>

        {/* Title Section with Icon */}
        <h5 className="text-lg font-semibold flex items-center gap-2 mb-2">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
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
            className="w-full sm:w-1/2 text-center border border-green-600 uppercase text-black py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            View More
          </Link>
          <button
            onClick={onBook}
            className="w-full sm:w-1/2 bg-[#185519] uppercase text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
