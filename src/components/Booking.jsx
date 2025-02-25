// BookingModal.jsx
import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css'; // Import custom styles
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon

const BookingModal = ({ tour, isOpen, onClose }) => {
  // Always call hooks at the top
  const [credentials, setCredentials] = useState({
    userEmail: '',
    fullName: '',
    phone: '',
    guestSize: '',
    adults: '',
    children: '',
    bookAt: new Date(),
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Conditionally render after hooks are declared
  if (!isOpen || !tour) {
    return null;
  }

  const { price, title } = tour;
  const serviceFee = 0;

  // Calculate guest count using either adults/children or guestSize
  const guestCount =
    (Number(credentials.adults) || 0) +
    (Number(credentials.children) || 0) ||
    Number(credentials.guestSize || 0);
  const totalAmount = Number(price) * guestCount + Number(serviceFee);

  // Standard change handler for text/number inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Dedicated date change handler for DatePicker
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCredentials((prev) => ({
      ...prev,
      bookAt: date,
    }));
  };

  // Validate required fields (adults and children are optional)
  const validateForm = () => {
    const { userEmail, fullName, phone, guestSize, bookAt } = credentials;
    return userEmail && fullName && phone && guestSize && bookAt;
  };

  // Handle form submission
  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFeedback({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Build the booking data for Firebase
      const bookingData = {
        userId: null,
        userEmail: credentials.userEmail,
        fullName: credentials.fullName,
        phone: credentials.phone,
        guestSize: credentials.guestSize,
        adults: credentials.adults || 0,
        children: credentials.children || 0,
        bookAt: credentials.bookAt, // This is a Date object
        totalAmount,
        createdAt: new Date(),
        tourTitle: title,
      };

      // Save the booking in Firestore
      await addDoc(collection(db, 'bookings'), bookingData);

      // Send email via EmailJS
      // Note: Hidden fields below ensure that EmailJS receives tour title, booking date, and total amount.
      await emailjs.sendForm(
        'service_8cskupn',
        'template_se20hft',
        formRef.current,
        'h92wYviZ8KyHB_Mxm'
      );

      setFeedback({
        message: 'Thank you for booking! Our team will contact you within 24 hours.',
        type: 'success',
      });

      // Reset form fields and date state
      setCredentials({
        userEmail: '',
        fullName: '',
        phone: '',
        guestSize: '',
        adults: '',
        children: '',
        bookAt: new Date(),
      });
      setSelectedDate(new Date());
    } catch (error) {
      console.error('Error adding booking: ', error);
      setFeedback({
        message: 'An error occurred while processing your booking.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center rounded-xl justify-center px-4 py-6 bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-full flex flex-col mt-16">
        {/* Modal Header */}
        <div className="sticky rounded-2xl top-0 z-10 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-500 text-white rounded-full p-2 focus:outline-none"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          </div>
          {feedback.message && (
            <div
              className={`mt-2 text-center py-1 px-2 rounded ${
                feedback.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>

        {/* Modal Form */}
        <div className="p-6">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="user_email"
                required
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                onChange={handleChange}
                value={credentials.userEmail}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="user_name"
                  required
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  onChange={handleChange}
                  value={credentials.fullName}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  name="user_phone"
                  required
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  onChange={handleChange}
                  value={credentials.phone}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="bookAt" className="block text-sm font-medium text-gray-700">
                  Booking Date
                </label>
                <div className="relative mt-1">
                  <DatePicker
                    id='bookAt'
                    name="bookAt"
                    required
                    selected={selectedDate}
                    onChange={handleDateChange}
                    value={credentials.bookAt}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-green-600 focus:border-green-600 text-base"
                    dateFormat="yyyy-MM-dd"
                    calendarClassName="custom-calendar"
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'preventOverflow',
                        options: {
                          boundary: 'viewport',
                          rootBoundary: 'document',
                          tether: false,
                          altAxis: true,
                        },
                      },
                    ]}
                  />
                  <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="guestSize" className="block text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guestSize"
                  name="guest_size"
                  required
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  onChange={handleChange}
                  value={credentials.guestSize}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
                  Adults (Optional)
                </label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  onChange={handleChange}
                  value={credentials.adults}
                />
              </div>
              <div>
                <label htmlFor="children" className="block text-sm font-medium text-gray-700">
                  Childs (Optional)
                </label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  onChange={handleChange}
                  value={credentials.children}
                />
              </div>
            </div>

            {/* Display calculated totals */}
            <div className="flex items-center justify-between">
              <span className="text-sm bg-green-100 font-medium rounded-md px-3 py-1 text-gray-700">
                Per Person: {price}
              </span>
              <span className="text-sm bg-green-100 font-medium rounded-md px-4 py-2 text-gray-700">
                Total: ₹ {totalAmount || 0}
              </span>
            </div>

            {/* Hidden fields to include in EmailJS form submission */}
            <input type="hidden" name="tour_title" value={title} />
            <input
              type="hidden"
              name="booking_date"
              value={selectedDate.toISOString().split('T')[0]} // Format: YYYY-MM-DD
            />
            <input type="hidden" name="total_amount" value={totalAmount} />

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md w-full hover:bg-green-700 disabled:opacity-75 focus:outline-none text-base"
              >
                {isSubmitting && <FaSpinner className="animate-spin" />}
                <span>{isSubmitting ? 'Processing...' : 'Confirm Booking'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
