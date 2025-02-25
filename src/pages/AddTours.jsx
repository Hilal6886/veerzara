import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { uploadToCloudinary } from "../srevices/cloudinary"; // Import your Cloudinary upload function

// New initial state for adding a tour package:
const initialState = {
  title: "",
  description: "",
  duration: "", // e.g., "5 days"
  price: "",
  imgUrl: "",
  sightseeing: [] // Array of day objects: { dayTitle: "", dayDescription: "" }
};

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  const { title, description, duration, price } = form;

  // Upload image using Cloudinary if a file is selected:
  useEffect(() => {
    const uploadFile = async () => {
      try {
        setUploading(true);
        const downloadUrl = await uploadToCloudinary(file);
        // Update form with image URL:
        setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
        setFeedback({
          message: "Error uploading image. Please try again.",
          type: "error",
        });
      } finally {
        setUploading(false);
      }
    };

    if (file) uploadFile();
  }, [file]);

  // If editing, load the existing tour details.
  useEffect(() => {
    if (id) {
      getBlogDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "tours", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    if (setActive) setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Optionally, preview the image:
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById("image-preview");
      if (preview) preview.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  // ----- Dynamic Sightseeing (Itinerary) Handlers -----
  const handleSightseeingChange = (index, field, value) => {
    const updatedSightseeing = [...form.sightseeing];
    updatedSightseeing[index] = { ...updatedSightseeing[index], [field]: value };
    setForm({ ...form, sightseeing: updatedSightseeing });
  };

  const addSightseeingDay = () => {
    setForm({
      ...form,
      sightseeing: [...form.sightseeing, { dayTitle: "", dayDescription: "" }],
    });
  };

  const removeSightseeingDay = (index) => {
    const updatedSightseeing = form.sightseeing.filter((_, i) => i !== index);
    setForm({ ...form, sightseeing: updatedSightseeing });
  };

  // ----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields:
    if (!title || !description || !duration || !price || !form.imgUrl) {
      setFeedback({
        message:
          "Title, description, duration, price, and image are mandatory.",
        type: "error",
      });
      return;
    }
    if (form.sightseeing.length === 0) {
      setFeedback({
        message: "Please add at least one sightseeing day.",
        type: "error",
      });
      return;
    }
    // Validate each sightseeing day:
    for (let i = 0; i < form.sightseeing.length; i++) {
      const day = form.sightseeing[i];
      if (!day.dayTitle || !day.dayDescription) {
        setFeedback({
          message: `Please fill in both title and description for day ${
            i + 1
          }.`,
          type: "error",
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (!id) {
        // Create new tour package
        await addDoc(collection(db, "tours"), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        });
        setFeedback({
          message: "Tour created successfully.",
          type: "success",
        });
      } else {
        // Update existing tour package
        await updateDoc(doc(db, "tours", id), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        });
        setFeedback({
          message: "Tour updated successfully.",
          type: "success",
        });
      }
      // After submission, navigate to home (or adjust as needed)
      navigate("/");
    } catch (err) {
      console.error(err);
      setFeedback({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 py-[7rem] min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <form
        className="max-w-md bg-gray-100 p-10 rounded-md shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Update Tour" : "Create Tour"}
        </h1>
        {/* Inline Feedback Message */}
        {feedback.message && (
          <div
            className={`mb-4 p-2 rounded-md text-center ${
              feedback.type === "error"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {feedback.message}
          </div>
        )}
        {/* Title */}
        <div className="mb-6">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 outline-none focus:border-blue-500"
            value={title}
            onChange={handleChange}
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 outline-none focus:border-blue-500"
            value={description}
            onChange={handleChange}
          />
        </div>
        {/* Duration */}
        <div className="mb-6">
          <input
            type="text"
            id="duration"
            name="duration"
            placeholder="Enter duration (e.g., 5 days)"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 outline-none focus:border-blue-500"
            value={duration}
            onChange={handleChange}
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 outline-none focus:border-blue-500"
            value={price}
            onChange={handleChange}
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <h3 className="text-gray-400">Upload an image</h3>
          <input
            type="file"
            className="w-full p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleFileChange}
          />
          {file && (
            <img
              id="image-preview"
              className="mt-3 rounded-md border border-gray-300"
              alt="Image Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
          {uploading && <p>Uploading image...</p>}
        </div>
        {/* Sightseeing (Itinerary) Days */}
        <div className="mb-6">
          <h3 className="text-gray-800 font-semibold mb-3">
            Sightseeing Itinerary
          </h3>
          {form.sightseeing.map((day, index) => (
            <div key={index} className="mb-4 border p-3 rounded-md">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder={`Day ${index + 1} Title`}
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-2 outline-none focus:border-blue-500"
                  value={day.dayTitle}
                  onChange={(e) =>
                    handleSightseeingChange(index, "dayTitle", e.target.value)
                  }
                />
              </div>
              <div>
                <textarea
                  placeholder={`Day ${index + 1} Description`}
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-2 outline-none focus:border-blue-500"
                  value={day.dayDescription}
                  onChange={(e) =>
                    handleSightseeingChange(
                      index,
                      "dayDescription",
                      e.target.value
                    )
                  }
                />
              </div>
              {form.sightseeing.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSightseeingDay(index)}
                  className="mt-2 text-red-600 text-sm"
                >
                  Remove Day
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSightseeingDay}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Another Day
          </button>
        </div>
        {/* Submit Button with Processing Icon */}
        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2"
            type="submit"
            disabled={uploading || isSubmitting}
          >
            {isSubmitting && <span className="animate-spin">⏳</span>}
            {uploading ? "Uploading Image..." : id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBlog;
