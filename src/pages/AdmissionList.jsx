import React, { useState, useEffect } from 'react';
import { getAllBookings } from 'srevices/bookingservice';
import { FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllBookings();
        setBookings(result);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }
    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'bookings', id));
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
        toast.success('Booking deleted successfully');
      } catch (err) {
        console.log(err);
        toast.error('Failed to delete booking');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-3 px-4 py-8 max-w-screen-xl mx-auto">
      <ToastContainer />
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
           <span className=" text-[#3D2117]">Bookings</span> 
        </h2>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto shadow-lg">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="px-6 py-3 uppercase">Date</th>
              <th className="px-6 py-3 uppercase">Name</th>
              <th className="px-6 py-3 uppercase">Email</th>
              <th className="px-6 py-3 uppercase">Phone No</th>
              <th className="px-6 py-3 uppercase">Guest Size</th>
              <th className="px-6 py-3 uppercase">Adults</th>
              <th className="px-6 py-3 uppercase">Children</th>
              <th className="px-6 py-3 uppercase">Total Amount</th>
              <th className="px-6 py-3 uppercase">Package</th>
              <th className="px-6 py-3 uppercase">Coming Date</th>
              <th className="px-6 py-3 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-4 text-center text-gray-600">{formatTimestamp(booking.createdAt)}</td>
                <td className="p-4 text-center text-gray-600">{booking.fullName}</td>
                <td className="p-4 text-center text-gray-600">{booking.userEmail}</td>
                <td className="p-4 text-center text-gray-600">{booking.phone}</td>
                <td className="p-4 text-center text-gray-600">{booking.guestSize}</td>
                <td className="p-4 text-center text-gray-600">{booking.adults}</td>
                <td className="p-4 text-center text-gray-600">{booking.children}</td>
                <td className="p-4 text-center text-gray-600">{booking.totalAmount}</td>
                <td className="p-4 text-center text-gray-600">{booking.tourTitle}</td>
                <td className="p-4 text-center text-gray-600">{booking.bookAt}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Booking"
                    disabled={loading}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
