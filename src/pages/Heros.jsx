import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md text-center">
        <p className="text-xl font-semibold mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-3 rounded-md transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Hero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [modal, setModal] = useState({ isOpen: false, message: "" });

  const handleGetQuote = async (e) => {
    e.preventDefault();
    const formData = { name, email, phone };
    const getformEndpoint = "https://formspree.io/f/xrbengnl";
    try {
      const response = await fetch(getformEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setModal({
          isOpen: true,
          message:
            "Thank you! Your inquiry has been received. Our team will contact you soon!",
        });
        setName("");
        setEmail("");
        setPhone("");
      } else {
        setModal({
          isOpen: true,
          message: "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setModal({
        isOpen: true,
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <Modal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={() => setModal({ isOpen: false, message: "" })}
      />
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/ddccbvbku/video/upload/v1740577340/nrz9iba1ytamoc0ei2xt.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      {/* Form Container */}
      <div
        className="absolute z-10 w-full px-4
                   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   md:top-10 md:left-10 md:translate-x-0 md:translate-y-0"
      >
        <form
          onSubmit={handleGetQuote}
          className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-lg flex flex-col gap-6"
        >
          {/* Title & Subtitle (as originally provided) */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl text-white drop-shadow-md font-bold uppercase">
              Discover Unforgettable Adventures in Kashmir
            </h1>
            <p className="text-sm sm:text-base mt-2 text-white">
              Plan your dream journey with Veer Zara Tour and Travel.
            </p>
          </div>
          {/* Name Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          {/* Email Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          {/* Phone Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
              <FaPhone />
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-indigo-800 hover:bg-indigo-900 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 focus:outline-none"
          >
            <FaPaperPlane />
            Get a Quote
          </button>
        </form>
      </div>
    </section>
  );
}
