// src/components/Tours.jsx
import React, { useState, useEffect } from 'react';
import CommonSection from 'shared/CommonSection';
import TourCard from 'shared/TourCard';
import BookingModal from 'components/Booking'; // Adjust the path if needed
import { getAllTours } from 'srevices/TourService';
import CardSection from './CardSection';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null); // For booking modal

  // Fetch all tours when component mounts
  useEffect(() => {
    async function fetchData() {
      const result = await getAllTours();
      setTours(result);
    }
    fetchData();
  }, []);

  // Calculate the page count (replace with your real logic if needed)
  useEffect(() => {
    const pages = Math.ceil(5 / 4); // Replace "5" with the total count from backend if available
    setPageCount(pages);
  }, [page]);

  return (
    <>
      <CommonSection />

      <section className="mt-8 mb-[5rem] p-4 pt-0">
      <div className="text-center  mb-1">
        <h1 className="inline-block bg-[#FFE6C9] text-[#4B164C] uppercase tracking-wide px-3 py-1 rounded-xl">
          Tour Pakages
        </h1>
        <p className="text-xl md:text-2l  font-semold text-gray-200 p-6 mt-2">
        Immerse yourself in the authentic magic of Kashmir
        </p>
      </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {tours?.map((tour) => (
              <div key={tour.id}>
                {/* Pass the onBook callback to trigger the BookingModal */}
                <TourCard tour={tour} onBook={() => setSelectedTour(tour)} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-[4rem] space-x-3">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={`${
                  page === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                } px-4 py-2 cursor-pointer rounded-full`}
              >
                {number + 1}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <CardSection />
      </section>

      {/* Render the BookingModal if a tour has been selected */}
      {selectedTour && (
        <BookingModal
          tour={selectedTour}
          isOpen={true}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </>
  );
};

export default Tours;
