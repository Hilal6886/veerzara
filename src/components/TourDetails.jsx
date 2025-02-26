import React, { useState, useEffect, useRef } from "react";
import BookingModal from "./Booking";
import { useParams } from "react-router-dom";
import { getAllTours, getRelatedTours } from "../srevices/TourService";
import TourCard from "shared/TourCard";
import { FaSpinner } from "react-icons/fa";
import { MdExpandMore, MdAttachMoney, MdAccessTime, MdStar } from "react-icons/md";

const TourDetails = () => {
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const { id } = useParams();
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const tours = await getAllTours();
        const currentTour = tours.find((t) => t.id === id);
        setTour(currentTour);
        if (currentTour) {
          const related = await getRelatedTours(id);
          setRelatedTours(related);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

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

  const { imgUrl, title, description, price, duration, sightseeing, rating } = tour;
  const descriptionLines = description.split("\n");

  // Accordion for itinerary days
  const AccordionItem = ({ day, index }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-lg font-medium text-gray-800">
            {day.dayTitle || `Day ${index + 1}`}
          </span>
          <MdExpandMore
            className={`transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
            size={24}
          />
        </button>
        {open && (
          <div className="p-4 bg-white text-gray-700">
            <p>{day.dayDescription}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section with Responsive Background Image and Title at Bottom */}
      <section
        className="relative h-[60vh] sm:h-[80vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {/* Title aligned at the bottom */}
        <div className="relative flex items-end justify-center h-full pb-8 px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
      </section>

      {/* Tour Details Section */}
      <section className="py-12 bg-gray-50" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg shadow">
                <MdAttachMoney size={28} className="mr-2" />
                <div>
                  <p className="text-sm">Price</p>
                  <p className="text-xl font-bold">₹{price}</p>
                </div>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow">
                <MdAccessTime size={28} className="mr-2" />
                <div>
                  <p className="text-sm">Duration</p>
                  <p className="text-xl font-bold">{duration}</p>
                </div>
              </div>
              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg shadow">
                <MdStar size={28} className="mr-2" />
                <div>
                  <p className="text-sm">Rating</p>
                  <p className="text-xl font-bold">{rating} / 5</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About the Tour</h2>
              <div className="prose max-w-none text-gray-700">
                {descriptionLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            {sightseeing && sightseeing.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Itinerary</h2>
                <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  {sightseeing.map((day, index) => (
                    <AccordionItem key={index} day={day} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Full-Width Indigo Book Now Button */}
            <div className="mt-8">
              <button
                onClick={() => setSelectedTour(tour)}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Related Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTours.map((relatedTour) => (
              <TourCard
                key={relatedTour.id}
                tour={relatedTour}
                onBook={() => setSelectedTour(relatedTour)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
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

export default TourDetails;
