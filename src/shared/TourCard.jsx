import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdStar } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Aos from "aos";
import "aos/dist/aos.css";
import { GiHouse, GiBoatFishing, GiFlowerPot, GiKnifeFork, GiCastle } from "react-icons/gi";
import { FaMountain } from "react-icons/fa";

// Kashmir-specific amenities list (6 items)
const amenitiesList = [
  { icon: <GiHouse />, label: "Houseboats", bgColor: "bg-teal-500" },
  { icon: <GiBoatFishing />, label: "Shikara Ride", bgColor: "bg-orange-500" },
  { icon: <GiFlowerPot />, label: "Gardens", bgColor: "bg-green-500" },
  { icon: <FaMountain />, label: "Trekking", bgColor: "bg-purple-500" },
  { icon: <GiKnifeFork />, label: "Cuisine", bgColor: "bg-red-500" },
  { icon: <GiCastle />, label: "Heritage", bgColor: "bg-indigo-500" },
];

const TourCard = ({ tour, onBook = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const { id, imgUrl, price, title, duration, rating } = tour;

  // Determine if the user is an admin for edit/delete actions
  const userData = localStorage.getItem("USER");
  let isAdmin = false;
  if (userData) {
    const currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "tours", id));
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

  // Render 5 stars, using a lighter yellow for stars beyond the rating value
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <MdStar
        key={i}
        className={i < rating ? "text-yellow-500" : "text-yellow-300"}
        size={20}
      />
    ));
  };

  return (
    <div
      className="max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl overflow-hidden shadow-xl transform transition hover:scale-105"
      data-aos="fade-up"
    >
      <div className="relative">
        {/* Header Image */}
        <img
          className="w-full h-56 object-cover"
          src={imgUrl}
          alt={title}
        />
        {/* Admin Controls */}
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
                  to={`/tour/edit/${id}`}
                  className="bg-blue-100 p-2 rounded-full hover:bg-blue-200"
                  aria-label="Edit tour"
                >
                  <MdEdit size={20} className="text-blue-500" />
                </Link>
              </>
            )}
          </div>
        )}
        {/* Featured Badge */}
        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>
      </div>

      <div className="p-6">
        {/* Title & Price */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-samibold text-gray-900">{title}</h3>
         
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between gap-3 mb-4">
          {renderStars(rating)}
          <span className="ml-[7rem] text-sm text-gray-600">{rating} </span>
          <span className="text-lg font-seibold text-gray-800">₹{price} </span>
        </div>

        {/* Amenities with Top Border */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            {amenitiesList.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`p-3 rounded-full ${amenity.bgColor} text-white`}>
                  {amenity.icon}
                </div>
                <span className="mt-1 text-xs text-gray-700">
                  {amenity.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/tour/${id}`}
            onClick={scrollToTop}
            className="flex-1 text-center border border-purple-600 text-purple-600 py-2 rounded-md hover:bg-purple-600 hover:text-white transition"
          >
            Details
          </Link>
          <button
            onClick={onBook}
            className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
