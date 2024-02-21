import React, { useState, useEffect } from 'react';
import CommonSection from 'shared/CommonSection';
import TourCard from 'shared/TourCard';
import { getAllTours } from 'srevices/TourService';
import CardSection from './CardSection';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllTours();
      setTours(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const pages = Math.ceil(5 / 4); // Replace with the actual count from the backend
    setPageCount(pages);
  }, [page]);

  return (
    <>
      <CommonSection />

      <section className=' mt-8 mb-[5rem] p-4 pt-0'>
        <div className="text-center p-4">
          <h1 className="text-4xl font-extrabold text-[#3D2117] leading-tight mb-4 text-center">
            All Packages - Kashmir Tours
          </h1>
          <p className="text-lg text-gray-400 mb-8 text-center">
            Discover Your Next Adventure in Kashmir with our diverse tour packages.
          </p>
        </div>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
            {tours?.map((tour) => (
              <div key={tour.id}>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center  mt-[4rem]  space-x-3'>
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={`${
                  page === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                } px-4 py-2 cursor-pointer rounded-full`}
              >
                {number + 1}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section>
        <CardSection/>
      </section>
    </>
  );
};

export default Tours;
