



import React, { useEffect, useState } from 'react';
import { MdKingBed } from 'react-icons/md';
import { MdBathtub } from 'react-icons/md';
import { FaWifi } from 'react-icons/fa';
import { MdAirportShuttle } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import { FaTrash, FaEdit } from "react-icons/fa";
import Aos from 'aos';
import 'aos/dist/aos.css';
import {
  deleteDoc,
  doc,
 
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

import { getAllOffers } from 'srevices/offerService';
import { Link } from "react-router-dom";

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData=localStorage.getItem("USER")
  let currentUser=null
  let isAdmin=false
  if(userData){
      currentUser = JSON.parse(userData)
      isAdmin =currentUser.isAdmin;
  }

  useEffect(() => {
    Aos.init({ duration: 2000 });
    getAllOffers().then((offers) => {
      setOffers(offers);
    });
  }, []);

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that Hotel ?")) {
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
    <section className=" mt-[7rem] p-4 py-12 ">
           <div className="text-center p-4">
        
        <h1 className="text-4xl text-[#3D2117] font-extrabold leading-tight mb-4 text-center">
        Our Luxuary Hotels
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        We are committed to providing you with the best experiences. 
      </p>

       
      </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     {offers.map(({ id, imgUrl, stTdeitle, location, price, title }) => (
        <div key={id} className="bg-gradient-to-r from-white via-white to-gray-100 p-1 rounded-lg shadow-xl transition duration-300 transform hover:scale-105">
          <div className="relative rounded-md overflow-hidden aspect-ratio-16/9 mb-4">
            <img src={imgUrl} alt={stTdeitle} className="object-cover rounded w-full h-full" />
            <span className="absolute top-2 right-2 bg-green-500 bg-opacity-70 text-white px-2 py-1 rounded">20% off</span>
          </div>
          <h6 className="text-lg font-semibold mb-2">{title}</h6>
  
          <div className="flex space-x-4 mb-2">
            <div className="flex items-center">
              <MdKingBed className="text-xl text-[#587498] mr-1" />
              <small>2 Beds</small>
            </div>
            <div className="flex items-center">
              <MdBathtub className="text-xl text-[#587498] mr-1" />
              <small>1 Bath</small>
            </div>
            <div className="flex items-center">
              <FaWifi className="text-xl  text-[#587498] mr-1" />
              <small>Wi-Fi</small>
            </div>
            <div className="flex items-center">
              <MdAirportShuttle className="text-xl text-[#587498] mr-1" />
              <small>Shuttle</small>
            </div>
          </div>
          <div className="flex items-center">
            <MdLocationOn className="text-xl text-[#587498] mr-1" />
            <small>{location}</small>
          </div>
          {isAdmin && (
       
             <div className="mt-4 flex justify-end items-center">
             <FaTrash
               className="mr-4 cursor-pointer text-red-600 hover:text-red-800"
               onClick={() => handleDelete(id)}
             />
             <Link to={`/updatehotels/${id}`}>
               <FaEdit className="cursor-pointer text-blue-600 hover:text-blue-800" />
             </Link>
           </div>
          )}
        </div>
      ))}
     </div>
   
    </section>
  );
};

export default Offer;
