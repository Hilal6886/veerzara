import React, { useState, useEffect } from 'react';
import { getAllBookings } from 'srevices/bookingservice';

const AdmissionList = () => {
  const [bookings, setBookings] = useState([]);

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
    return date.toLocaleString(); // Adjust the date formatting as needed
  };

  return (
    <div className="mt-[6rem] px-4 py-8 max-w-screen-xl mx-auto overflow-x-auto">
      <div className="text-center mb-[4rem]">
        <h2 className="text-2xl hed md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-6">
          New <span className="text-blue-500 hed"> Booking</span> Data
        </h2>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-indigo-900 text-white">
              <th className="px-6 py-3 uppercase">Date</th>
              <th className="px-6 py-3 uppercase">Name</th>
              <th className="px-6 py-3 uppercase">Email</th>
              <th className="px-6 py-3 uppercase">Phone No</th>
              <th className="px-6 py-3 uppercase">Guest Size</th>
              <th className="px-6 py-3 uppercase">Adults</th>
              <th className="px-6 py-3 uppercase">Childrens</th>

              <th className="px-6 py-3 uppercase">Total Amount</th>
              <th className="px-6 py-3 uppercase">Package</th>
              <th className="px-6 py-3 uppercase">Coming date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="p-4 text-center  text-gray-400">{formatTimestamp(booking.createdAt)}</td>
                <td className="p-4 text-center text-gray-400">{booking.fullName}</td>
                <td className="p-4 text-center text-gray-400">{booking.userEmail}</td>
                <td className="p-4 text-center text-gray-400">{booking.phone}</td>
                <td className="p-4 text-center text-gray-400">{booking.guestSize}</td>
                <td className="p-4 text-center text-gray-400">{booking.adults}</td>
                <td className="p-4 text-center text-gray-400">{booking.children}</td>

                <td className="p-4 text-center text-gray-400">{booking.totalAmount}</td>
                <td className="p-4 text-center text-gray-400">{booking.tourTitle}</td>
                <td className="p-4 text-center  text-gray-400">{booking.bookAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionList;
