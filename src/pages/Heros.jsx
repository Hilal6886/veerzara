import React, { useState } from "react";

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px] text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
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
    const getformEndpoint = "https://formspree.io/f/xwppglda";

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
            "Thank you! Your inquiry has been received. Our team will get in touch with you soon!",
        });
        setName("");
        setEmail("");
        setPhone("");
      } else {
        setModal({ isOpen: true, message: "Submission failed. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setModal({ isOpen: true, message: "An error occurred. Please try again later." });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <Modal isOpen={modal.isOpen} message={modal.message} onClose={() => setModal({ isOpen: false, message: "" })} />
      <div className="h-screen relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-[90%] lg:h-[70%] object-cover"
        >
          <source src="https://videos.pexels.com/video-files/13750318/13750318-uhd_2560_1440_60fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
        <form
          onSubmit={handleGetQuote}
          className="bg-white bg-opacity-20 p-6 w-[20rem] rounded-md shadow-md backdrop-blur-md lg:w-[50rem] mx-auto text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-bold uppercase">
            Discover Unforgettable Adventures
          </h1>
          <p className="text-sm sm:text-base mt-2">
            Plan your dream journey with Veer Zara Tour and Travel.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-indigo-500 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-indigo-500 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
              required
            />
            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-indigo-500 rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
            />
            <button
              type="submit"
              className="bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-4 rounded-md transition-all duration-300 w-full mt-3"
            >
              Get a Quote
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
