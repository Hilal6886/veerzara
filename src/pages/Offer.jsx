import React, { useEffect, useState } from 'react';
import { MdKingBed, MdBathtub, MdAirportShuttle, MdLocationOn } from 'react-icons/md';
import { FaWifi, FaTrash, FaEdit, FaStar, FaSwimmingPool } from 'react-icons/fa';
import { AiOutlineSafety } from 'react-icons/ai';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { getAllOffers } from 'srevices/offerService';
import { Link } from "react-router-dom";

const amenitiesList = [
  { icon: <MdKingBed />, label: '2 Beds' },
  { icon: <MdBathtub />, label: '1 Bath' },
  { icon: <FaWifi />, label: 'Wi-Fi' },
  { icon: <MdAirportShuttle />, label: 'Shuttle' },
  { icon: <FaSwimmingPool />, label: ' Pool' },
  { icon: <AiOutlineSafety />, label: 'Safety' },
];

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("USER");
  let currentUser = null;
  let isAdmin = false;
  if (userData) {
    currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }

  useEffect(() => {
    Aos.init({ duration: 2000 });
    getAllOffers().then((offers) => {
      setOffers(offers);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Hotel?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "offers", id));
        toast.success("Offer deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className=" container mt-[rem] p-4 py-12">

      <div className="text-center mb-[3rem]">
          <h1 className="inline-block bg-indigo-100 text-indigo-900 uppercase tracking-wide px-4 py-2 rounded-xl">
          Our Luxury Hotels
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 mt-4">
          We are committed to providing you with the best experiences
          </p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {offers.map(({ id, imgUrl, stTdeitle, location, price, title }) => (
          <div
            key={id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
            data-aos="fade-up"
          >
            <div className="relative">
              <img src={imgUrl} alt={stTdeitle} className="object-cover w-full h-56" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute top-2 left-2 bg-purple-200 text-blue-800 text-sm px-3 py-1 rounded-full">
                20% off
              </div>
            </div>
            <div className="px-4 py-6">
              <h6 className="text-lg font-semibold  mb-2">{title}</h6>
              <div className="flex items-center mb-2">
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bld text-gray-200">{location}</span>
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 text-lg mr-1" />
                  <FaStar className="text-yellow-500 text-lg mr-1" />
                  <FaStar className="text-yellow-500 text-lg mr-1" />
                  <FaStar className="text-yellow-500 text-lg mr-1" />
                  <FaStar className="text-gray-400 text-lg mr-1" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {amenitiesList.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl text-white text-sm lg:text-xl md:text-lg bg-green-400">
                      {amenity.icon}
                    </div>
                    <span className="text-sm">{amenity.label}</span>
                  </div>
                ))}
              </div>
              <button className="bg-indigo-600 uppercase text-white w-full py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                <Link to={`/hotel/${id}`}>Book Now</Link>
              </button>
            </div>
            {isAdmin && (
              <div className="absolute top-4 right-4 flex space-x-2">
                 <Link to={`/updatehotels/${id}`}>
                 <FaEdit className="text-blue-600 cursor-pointer hover:text-blue-800"  />

                 
                            </Link>
                <FaTrash className="text-red-600 cursor-pointer hover:text-red-800" onClick={() => handleDelete(id)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offer;
