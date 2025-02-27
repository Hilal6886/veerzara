import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    review:
      "This travel agency provided an unforgettable experience. Highly recommended! It was truly magical from start to finish with attention to every detail.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ayesha Khan",
    review:
      "Excellent service and well-organized tours. I loved every moment of the trip, the guides were professional and the itinerary was perfectly balanced between adventure and relaxation.",
    rating: 4,
  },
  {
    id: 3,
    name: "Vikram Patel",
    review:
      "A professional team that takes care of every detail. My family had a fantastic time exploring the beauty and culture of the region. It was a memorable journey.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sunita Verma",
    review:
      "Great value for money with superb customer service. I will definitely book again. The entire experience was seamless and exceeded all my expectations.",
    rating: 4,
  },
];

const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const maxLength = 100;
  const reviewText = testimonial.review;
  const displayText =
    isExpanded || reviewText.length <= maxLength
      ? reviewText
      : reviewText.substring(0, maxLength) + "...";

  return (
    <div
      className="p-5 h-full flex flex-col justify-between"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "12px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <div className="flex items-center mb-4">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="mr-4"
            style={{ width: "40px", height: "40px" }}
          />
          <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
        </div>
        <div className="flex items-center mb-2">
          {Array.from({ length: testimonial.rating }, (_, index) => (
            <FaStar key={index} className="text-yellow-400 mr-1" />
          ))}
          {Array.from({ length: 5 - testimonial.rating }, (_, index) => (
            <FaStar key={index} className="text-gray-300 mr-1" />
          ))}
        </div>
        <p className="text-gray-700 italic text-sm">
          {displayText}{" "}
          {reviewText.length > maxLength && (
            <button onClick={toggleReadMore} className="text-indigo-600 font-sebold">
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // screens smaller than 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // screens smaller than 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="py-12 bg-[#fff">
      <style>
        {`
          .slick-dots li button:before {
            color: #4F46E5; /* indigo-600 */
          }
          .slick-dots li.slick-active button:before {
            color: #4338CA; /* indigo-700 */
          }
        `}
      </style>
      <div className="container  mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
         
        </h2>
        <div className="text-center mb-[3rem]">
          <h1 className="inline-block bg-indigo-100 text-indigo-900 uppercase tracking-wide px-4 py-2 rounded-xl">
            Testimonial
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 mt-4">
          What Our Customers Say
          </p>
        </div>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-2">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;
