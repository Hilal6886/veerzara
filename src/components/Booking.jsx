import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllTours } from '../srevices/TourService';
import { db } from './../firebase';
import { collection, addDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const [tours, setTours] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userEmail: '',
    fullName: '',
    phone: '',
    guestSize: '',
    adults: '',
    children: '',
    bookAt: '',
    tourid: '',
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getAllTours();
      setTours(result);
    }
    fetchData();
  }, []);

  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return <div>Tour not found</div>;
  }

  const { price, title } = tour;

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;

  const totalAmount =
    Number(price) * (Number(credentials.adults) + Number(credentials.children)) + Number(serviceFee);

  const validateForm = () => {
    const { userEmail, fullName, phone, guestSize, adults, children, bookAt } = credentials;
    return userEmail && fullName && phone && guestSize && adults && children && bookAt;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    try {
      // Add the booking to the 'bookings' collection
      const bookingData = {
        userId: null,
        userEmail: credentials.userEmail,
        fullName: credentials.fullName,
        phone: credentials.phone,
        guestSize: credentials.guestSize,
        adults: credentials.adults,
        children: credentials.children,
        bookAt: credentials.bookAt,
        totalAmount: totalAmount,
        createdAt: new Date(),
        tourTitle: title,
      };

      const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);
      const bookingSnapshot = await getDoc(bookingRef);
      const createdTimestamp = bookingSnapshot.data().createdAt;

      console.log('Booking created at: ', createdTimestamp);

      // Show success toast
      toast.success('Thank you for booking! Our team will contact you within 24 hours.');

      // Reset input fields
      setCredentials({
        userEmail: '',
        fullName: '',
        phone: '',
        guestSize: '',
        adults: '',
        children: '',
        bookAt: '',
        tourid: '',
      });

    } catch (error) {
      console.error('Error adding booking: ', error);
      // Show error toast if needed
      toast.error('An error occurred while processing your booking.');
    }
  };

  return (
    <div className="container border-gray-300 md:sticky top-[6rem] mx-auto my-12  bg-gradient-to-r from-white via-white to-gray-100  shadow-lg p-8 rounded-md">
      <h2 className="text-xl font-semibod mb-6">Book Tour: {title}</h2>

      <form onSubmit={handleClick} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userEmail" className="block text-lg font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none bg-gradient-to-br from-white to-white shadow-md  rounded-md focus:border-blue-500"
              onChange={handleChange}
              value={credentials.userEmail}
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-lg font-medium text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              className="mt-1 p-3 bg-gradient-to-br from-white to-white shadow-md  rounded-md border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={credentials.fullName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-400">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              required
              className="mt-1 p-3 bg-gradient-to-br from-white to-white shadow-md  border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={credentials.phone}
            />
          </div>
          <div>
            <label htmlFor="bookAt" className="block text-lg font-medium text-gray-400">
              Booking Date
            </label>
            <input
              type="date"
              id="bookAt"
              required
              className="mt-1 p-3 border bg-gradient-to-br from-white to-white shadow-md  border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={credentials.bookAt}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="guestSize" className="block text-lg font-medium text-gray-400">
              Number of Guests
            </label>
            <input
              type="number"
              id="guestSize"
              required
              className="mt-1 p-3 border border-gray-300 bg-gradient-to-br from-white to-white shadow-md  rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={credentials.guestSize}
            />
          </div>
          <div>
            <label htmlFor="adults" className="block text-lg font-medium text-gray-400">
              Number of Adults
            </label>
            <input
              type="number"
              id="adults"
              required
              className="mt-1 p-3 border border-gray-300 bg-gradient-to-br from-white to-white shadow-md  rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={credentials.adults}
            />
          </div>
          <div>
            <label htmlFor="children" className="block text-lg font-medium text-gray-400">
              Number of Children
            </label>
            <input
              type="number"
              id="children"
              required
              className="mt-1 p-3 border border-gray-300 bg-gradient-to-br from-white to-white shadow-md  rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={credentials.children}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Summary:</h3>
          <p className="text-gray-400 text-lg">
            Tour: {title} <br />
            Price per person: ₹{price} <br />
            Service Fee: ₹{serviceFee} <br />
            Total Amount: ₹{totalAmount}
          </p>
        </div>

        <button
          type="submit"
          className="bg-[#03AC13] text-white px-6  w-full py-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;
