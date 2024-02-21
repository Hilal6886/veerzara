import React, { useState, useEffect } from 'react';
import Booking from './Booking';
import { useParams } from 'react-router-dom';
import { getAllTours } from '../srevices/TourService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TourDetails = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllTours();
      setTours(result);
    }
    fetchData();
  }, []);

  const { id } = useParams();
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return <div>Tour not found</div>;
  }

  const { imgUrl, title, description, price, distance } = tour;
  const descriptionLines = description.split('\n');

  return (
    <section className="container mx-auto px-4 py-8 ">
         <div className="text-center md:hidden px-8">
      <h1 className="text-4xl font-extrabold text-[#3D2117] leading-tight  text-center">
         Pakage Description
      </h1>
     
     
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3rem] md:gap-[25rem]">

        <div className="lg:order-2  mb-[-4rem] md:mb-[0rem]   md:mt-[-5rem] lg:w-[30rem]">
          <Booking className="" tour={tour} />
          <ToastContainer />
        </div>
        <div className="lg:col-span-0 lg:order-1  md:w-[50rem] lg:w-[50rem]">
          <div className="lg:order-1 md:w-[50rem]  lg:w-[50rem]">
            <div className="mb-6 lg:mb-0">
              <img src={imgUrl} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
          <div className="tour_info bg-white p-2 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <div className="mb-6">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-green-600">
                    ₹ {price}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line text-blue-500"></i>
                  <span className="ml-2 text-lg">
                    <small className='text-lg'>Duration</small> {distance}
                  </span>
                </div>
              </div>
            </div>
            <h5 className="text-2xl font-semibold  mb-4">Description</h5>
            <ul className="list-none text-lg ml-6">
              {descriptionLines.map((line, index) => (
                <li key={index} className="mb-2">
                  {line.startsWith('Day') ? (
                    <span className="font-semibold text-lg">{line}</span>
                  ) : (
                    line
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>




    </section>
  );
};

export default TourDetails;
