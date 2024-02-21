// FilteredTours.js
import React, { useEffect, useState } from 'react';
import TourCard from 'shared/TourCard'; // Assuming you have a TourCard component
import { getAllTours } from 'srevices/TourService';
import { useParams } from 'react-router-dom';

const FilteredTours = () => {
  const { destination, priceRange } = useParams();
  const [filteredTours, setFilteredTours] = useState([]);

  useEffect(() => {
    const fetchFilteredTours = async () => {
      try {
        const allTours = await getAllTours();
        const filtered = allTours
          .filter((tour) => tour && typeof tour === 'object')
          .filter((tour) => {
            const isValidTour =
              tour &&
              typeof tour === 'object' &&
              tour.city !== undefined &&
              tour.price !== undefined &&
              (tour.distance !== undefined || tour.distance === ''); // Include an empty string as a valid distance

            if (!isValidTour) {
              console.warn('Invalid tour data:', tour);
              return false;
            }

            try {
              const matchesDestination =
                (tour?.city || '').toLowerCase().includes((destination || '').toLowerCase()) || !destination;
              const matchesPriceRange =
                (tour?.price !== undefined &&
                  typeof tour.price === 'string' &&
                  tour.price >= 0 &&
                  tour.price <= parseFloat(priceRange)) ||
                !priceRange;

              return matchesDestination && matchesPriceRange;
            } catch (error) {
              console.error('Error processing tour:', tour, error);
              return false;
            }
          });

        setFilteredTours(filtered);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchFilteredTours();
  }, [destination, priceRange]);

  return (
    <section className='mt-8 mb-[5rem] p-4 pt-0'>
     <div className="container mx-auto">
     <div className="text-center  p-4">
      <h1 className="text-4xl font-extrabold text-[#3D2117] leading-tight mb-4 text-center">
        Search Result
      </h1>
      </div>
   
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        {filteredTours.map((tour) => (
          <div key={tour.id}>
            <TourCard tour={tour} />
          </div>
        ))}
      </div>
    </div>
    </section>
   
  );
};

export default FilteredTours;
