// src/components/Courses.jsx
import React, { useState, useEffect } from 'react';
import TourCard from 'shared/TourCard';
import BookingModal from 'components/Booking'; // Adjust the import path as needed
import { getAllTours } from 'srevices/TourService';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Courses = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

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
    
      <div className="text-center mt-[4rem] mb-[3rem]">
          <h1 className="inline-block bg-indigo-100 text-indigo-900 uppercase tracking-wide px-4 py-2 rounded-xl">
            Tour Pakages
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 mt-4">
          Immerse yourself in the authentic magic of Kashmir
          </p>
        </div>
      <div
        data-aos="fade-up"
        className="grid p-4 lg:p-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        {tours?.map((tour) => (
          <div key={tour.id} className="mb-4">
            {/* Pass onBook callback to trigger the booking modal */}
            <TourCard tour={tour} onBook={() => setSelectedTour(tour)} />
          </div>
        ))}
      </div>
      {/* Render BookingModal if a tour is selected */}
      {selectedTour && (
        <BookingModal
          tour={selectedTour}
          isOpen={true}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  );
};

export default Courses;
