import React, { useState, useEffect, useRef } from 'react';
import BookingModal from './Booking';
import { useParams } from 'react-router-dom';
import { getAllTours, getRelatedTours } from '../srevices/TourService';
import TourCard from 'shared/TourCard';
import { FaSpinner } from 'react-icons/fa';
import { MdExpandMore } from 'react-icons/md';

const TourDetails = () => {
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for controlling which tour is selected for booking
  const [selectedTour, setSelectedTour] = useState(null);
  const { id } = useParams();
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const tours = await getAllTours();
        const currentTour = tours.find((tour) => tour.id === id);
        setTour(currentTour);

        if (currentTour) {
          const related = await getRelatedTours(id);
          setRelatedTours(related);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const scrollToTop = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-green-600 text-lg">Tour not found</p>
      </div>
    );
  }

  // Destructure properties from tour
  const { imgUrl, title, description, price, duration, sightseeing } = tour;
  const descriptionLines = description.split('\n');

  // FAQ Item for Sightseeing Itinerary using MdExpandMore icon
  const FaqItem = ({ day, index }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className=" rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center bg-green-50 px-4 py-3 text-left focus:outline-none hover:bg-green-100 transition-colors"
        >
          <span className="font-medium text-gray-800 text-lg">
            {day.dayTitle ? day.dayTitle : `Day ${index + 1}`}
          </span>
          <MdExpandMore
            className={`text-gray-600 transform transition-transform duration-300 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
            size={20}
          />
        </button>
        {open && (
          <div className="px-4 py-3 bg-green-100">
            <p className="text-gray-700 text-base">{day.dayDescription}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 py-8" ref={sectionRef}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Tour Details
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Tour Info */}
        <div>
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-auto rounded-lg shadow-xl mb-"
          />
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              {title}
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <span className="text-xl font-semibold text-gray-600">₹ {price}</span>
              <span className="text-lg text-gray-700 mt-2 sm:mt-0">Duration: {duration}</span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Description</h3>
              <ul className="list-disc ml-6 text-base text-gray-800 space-y-1">
                {descriptionLines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
            {sightseeing && sightseeing.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Sightseeing Itinerary
                </h3>
                <div className="space-y-4">
                  {sightseeing.map((day, index) => (
                    <FaqItem key={index} day={day} index={index} />
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setSelectedTour(tour)}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 text-lg"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Right Column: Related Tours */}
        <div>
          <h2 className="text-xl md:text-xl font-bold text-gray-800 text-center mb-6">
            Related Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedTours.map((relatedTour) => (
              <TourCard
                key={relatedTour.id}
                tour={relatedTour}
                onBook={() => setSelectedTour(relatedTour)}
              />
            ))}
          </div>
        </div>
      </div>
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

export default TourDetails;
