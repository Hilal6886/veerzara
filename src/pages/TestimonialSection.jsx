// src/pages/TestimonialSection.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MdEmail } from "react-icons/md";
import { FaStar } from "react-icons/fa";

// Sample testimonial data with a mix of Indian names
const testimonials = [
  {
    id: 1,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    review:
      "This travel agency provided an unforgettable experience. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Ayesha Khan",
    email: "ayesha.khan@example.com",
    review:
      "Excellent service and well-organized tours. I loved every moment of the trip.",
    rating: 4,
  },
  {
    id: 3,
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    review:
      "A professional team that takes care of every detail. My family had a fantastic time!",
    rating: 5,
  },
  {
    id: 4,
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Sunita Verma",
    email: "sunita.verma@example.com",
    review:
      "Great value for money with superb customer service. I will definitely book again.",
    rating: 4,
  },
];

const TestimonialSection = () => {
  // Slider settings for react-slick
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
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
    <section id="testimonials" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-2">
              <div className="bg-white shadow-lg border border-green-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MdEmail className="mr-1" />
                      <span>{testimonial.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: testimonial.rating }, (_, index) => (
                    <FaStar key={index} className="text-yellow-400 mr-1" />
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }, (_, index) => (
                    <FaStar key={index} className="text-gray-300 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 italic">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;
