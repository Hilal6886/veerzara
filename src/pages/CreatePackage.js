import React, { useState,useEffect } from "react";
import { addPackage, getPackageById, updatePackage } from "srevices/packageService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreatePackage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing
  const [formData, setFormData] = useState({
    travelerName: "",
    checkInDate: "",
    checkOutDate: "",
    duration: "",
    itinerary: [],
    hotels: [],
    inclusions: "",
    exclusions: "",
    bookingPolicy: "",
    finalNote: "",
    agencyOwner: "",
    totalAmount: "",
  });
  useEffect(() => {
    if (id) {
      // Fetch package data if editing
      getPackageById(id).then((data) => {
        setFormData(data);
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { dayTitle: "", description: "", sightseeing: "", note: "", finalMessage: "" },
      ],
    });
  };

  const removeItineraryDay = (index) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary.splice(index, 1);
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  const addHotel = () => {
    setFormData({
      ...formData,
      hotels: [...formData.hotels, { stars: "", location: "", nights: "", name: "", roomType: "" }],
    });
  };

  const removeHotel = (index) => {
    const updatedHotels = [...formData.hotels];
    updatedHotels.splice(index, 1);
    setFormData({ ...formData, hotels: updatedHotels });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (id) {
        await updatePackage(id, formData);
        toast.success("Package updated successfully!");
      } else {
        await addPackage(formData);
        toast.success("Package created successfully!");
      }
      navigate("/pakageslist");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Create/Edit Travel Package</h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Traveler Name</label>
          <input
            type="text"
            name="travelerName"
            value={formData.travelerName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Check-In Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Check-Out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="e.g., 5 Nights / 6 Days"
            required
          />
        </div>

        {/* Itinerary Section */}
        <h2 className="text-lg font-semibold">Itinerary</h2>
        {formData.itinerary.map((day, index) => (
          <div key={index} className="p-4 border rounded mb-4">
            <div>
              <label className="block text-sm font-medium">Day Title</label>
              <input
                type="text"
                value={day.dayTitle}
                onChange={(e) => {
                  const updatedItinerary = [...formData.itinerary];
                  updatedItinerary[index].dayTitle = e.target.value;
                  setFormData({ ...formData, itinerary: updatedItinerary });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={day.description}
                onChange={(e) => {
                  const updatedItinerary = [...formData.itinerary];
                  updatedItinerary[index].description = e.target.value;
                  setFormData({ ...formData, itinerary: updatedItinerary });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Sightseeing</label>
              <textarea
                value={day.sightseeing}
                onChange={(e) => {
                  const updatedItinerary = [...formData.itinerary];
                  updatedItinerary[index].sightseeing = e.target.value;
                  setFormData({ ...formData, itinerary: updatedItinerary });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Note</label>
              <textarea
                value={day.note}
                onChange={(e) => {
                  const updatedItinerary = [...formData.itinerary];
                  updatedItinerary[index].note = e.target.value;
                  setFormData({ ...formData, itinerary: updatedItinerary });
                }}
                className="w-full px-4 py-2 border rounded text-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Final Message</label>
              <textarea
                value={day.finalMessage}
                onChange={(e) => {
                  const updatedItinerary = [...formData.itinerary];
                  updatedItinerary[index].finalMessage = e.target.value;
                  setFormData({ ...formData, itinerary: updatedItinerary });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItineraryDay(index)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            >
              Remove Day
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItineraryDay}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Day
        </button>

        {/* Hotels Section */}
        <h2 className="text-lg font-semibold mt-6">Proposed Hotels</h2>
        {formData.hotels.map((hotel, index) => (
          <div key={index} className="p-4 border rounded mb-4">
            <div>
              <label className="block text-sm font-medium">Star Rating</label>
              <select
                value={hotel.stars}
                onChange={(e) => {
                  const updatedHotels = [...formData.hotels];
                  updatedHotels[index].stars = e.target.value;
                  setFormData({ ...formData, hotels: updatedHotels });
                }}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="1 Star">1 Star</option>
                <option value="2 Star">2 Star</option>
                <option value="3 Star Premium">3 Star Premium</option>
                <option value="4 Star Premium">4 Star Premium</option>
                <option value="5 Star Premium">5 Star Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                value={hotel.location}
                onChange={(e) => {
                  const updatedHotels = [...formData.hotels];
                  updatedHotels[index].location = e.target.value;
                  setFormData({ ...formData, hotels: updatedHotels });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nights</label>
              <input
                type="text"
                value={hotel.nights}
                onChange={(e) => {
                  const updatedHotels = [...formData.hotels];
                  updatedHotels[index].nights = e.target.value;
                  setFormData({ ...formData, hotels: updatedHotels });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Hotel Name</label>
              <input
                type="text"
                value={hotel.name}
                onChange={(e) => {
                  const updatedHotels = [...formData.hotels];
                  updatedHotels[index].name = e.target.value;
                  setFormData({ ...formData, hotels: updatedHotels });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Room Type</label>
              <input
                type="text"
                value={hotel.roomType}
                onChange={(e) => {
                  const updatedHotels = [...formData.hotels];
                  updatedHotels[index].roomType = e.target.value;
                  setFormData({ ...formData, hotels: updatedHotels });
                }}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={() => removeHotel(index)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            >
              Remove Hotel
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHotel}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Hotel
        </button>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium">Total Amount</label>
          <input
            type="text"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="e.g., 34,300/-"
            required
          />
        </div>

        {/* Inclusions, Exclusions, Booking Policy */}
        <div>
          <label className="block text-sm font-medium">Inclusions</label>
          <textarea
            name="inclusions"
            value={formData.inclusions}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Exclusions</label>
          <textarea
            name="exclusions"
            value={formData.exclusions}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Booking Policy</label>
          <textarea
            name="bookingPolicy"
            value={formData.bookingPolicy}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Final Note */}
        <div>
          <label className="block text-sm font-medium">Final Note</label>
          <textarea
            name="finalNote"
            value={formData.finalNote}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Agency Owner */}
        <div>
          <label className="block text-sm font-medium">Agency Owner</label>
          <input
            type="text"
            name="agencyOwner"
            value={formData.agencyOwner}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-6"
        >
          {id ? "Update Package" : "Create Package"}
        </button>
      </div>
    </form>
  );
};

export default CreatePackage;
