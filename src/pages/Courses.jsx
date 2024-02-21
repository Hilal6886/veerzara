import React, { useState, useEffect } from 'react';

import TourCard from 'shared/TourCard';

import { getAllTours } from 'srevices/TourService';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Courses = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllTours();
      setTours(result);
    }
    fetchData();
  }, []);

  return (
    <section>
      <div className="text-center  p-4">
      <h1 className="text-4xl font-extrabold text-[#3D2117] leading-tight mb-4 text-center">
        Discover Your Next Adventure
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Explore the world with our curated travel experiences and create unforgettable memories.
      </p>
     
      </div>
      <div data-aos="fade-up" className="grid p-4 lg:p-12 rid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tours?.map((tour) => (
          <div key={tour.id} className="mb-4">
            <TourCard tour={tour} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
