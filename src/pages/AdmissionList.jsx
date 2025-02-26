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
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'bookings', id));
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
        toast.success('Booking deleted successfully');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete booking');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-8 px-4 py-8 max-w-screen-xl mx-auto">
      <ToastContainer />
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900">
          Bookings
        </h2>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-800">
            <tr>
              {[
                'Date',
                'Name',
                'Email',
                'Phone No',
                'Guest Size',
                'Adults',
                'Children',
                'Total Amount',
                'Package',
                'Coming Date',
                'Actions'
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-5 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <tr key={booking.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatTimestamp(booking.createdAt)}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.fullName}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.userEmail}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.phone}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.guestSize}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.adults}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.children}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.totalAmount}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.tourTitle}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatTimestamp(booking.bookAt)}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-center text-sm">
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Booking"
                    disabled={loading}
                  >
                    <FaTrashAlt size={18} />
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
