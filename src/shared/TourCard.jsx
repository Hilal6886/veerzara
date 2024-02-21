import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdAirportShuttle } from 'react-icons/md';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';

const TourCard = ({ tour }) => {
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem('USER');
  let currentUser = null;
  let isAdmin = false;

  if (userData) {
    currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }

  const { id, imgUrl, city, price, title, distance } = tour;

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Tour?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'tours', id));
        toast.success('Offer deleted successfully');
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    
    <div
     
      className="bg-gradient-to-r from-white via-white to-gray-100 text-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl"
    >
    
      <div className="relative h-48 overflow-hidden">
        <img className="w-full h-full object-cover" src={imgUrl} alt="tour" />
        <span className="absolute top-2 right-2 bg-green-500 bg-opacity-70 text-white p-1 rounded text-sm">30% off</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-xl font-bold">₹ {price}</h6>
          <span className="bg-green-500 rounded text-white p-1 text-sm">Featured</span>
        </div>
        <h5 className="text-lg font-semibold mb-2">
          <Link to={`/tour/${id}`} className="hover:underline">
            {title}
          </Link>
        </h5>
        <div className="flex text-lg items-center mb-2">
          <MdLocationOn className="mr-1 text-[#587498]" />
          <span>{city}</span>
        </div>
        <div className="flex text-xl items-center mb-4">
          <MdAirportShuttle className="mr-1 text-[#587498]" />
          <small>Duration: {distance}</small>
        </div>
        <button className="bg-[#03AC13] uppercase text-white w-full py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
          <Link to={`/tour/${id}`} >
            Book Now
          </Link>
        </button>
      </div>
      {isAdmin && (
        <div className="flex justify-end p-4">
          <BsTrash
            className="mr-4 cursor-pointer text-red-600 hover:text-red-700 transition duration-300"
            size={24}
            onClick={() => handleDelete(id)}
          />
          <Link to={`/tous/${id}`} className="hover:underline">
            <BsPencil
              className="cursor-pointer text-blue-600 hover:text-blue-700 transition duration-300"
              size={24}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default TourCard;
