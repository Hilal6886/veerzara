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
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../srevices/cloudinary";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: []
};

const categoryOption = [
  'Destination Highlights',
  'Travel Tips and Guides',
  'Adventure Stories',
  'Cultural Experiences',
  'Luxury Travel',
  'Budget-Friendly Journeys',
  'Family Vacation Ideas',
  'Solo Travel Adventures',
  'Food and Culinary Explorations',
  'Hidden Gems',
  'Travel Itineraries',
  'Travel Technology',
  'Sustainable Tourism',
  'Travel Photography',
  'Travel Health and Safety',
  'Travel Gear and Essentials',
  'Exploring Nature',
  'City Escapes',
  'Beach Retreats',
  'Mountain Expeditions',
  'Historical Discoveries',
  'Festivals and Celebrations',
  'Travel Stories',
  'Local Art and Craft',
  'Off-the-Beaten-Path',
  'Wildlife Encounters',
  'Island Hopping',
  'Road Trip Adventures',
  'Cruise and Sailing',
  'Scenic Landscapes',
  'Traveling with Pets',
  'Romantic Getaways',
  'Wellness Retreats',
  'Camping and Outdoor Living',
  'Winter Wonderland',
  'Summer Escapades',
  'Springtime Explorations',
  'Autumn Retreats',
  'Travel Inspirations',
  'Cruise and Sailing',
  'Scenic Landscapes',
  'Traveling with Pets',
  'Romantic Getaways',
  'Wellness Retreats',
  'Camping and Outdoor Living',
  'Winter Wonderland',
  'Summer Escapades',
  'Springtime Explorations',
  'Autumn Retreats',
  'Travel Inspirations',
  'Travel Challenges and Solutions',
  'Cross-Country Tours',
  'Holiday Adventures',
  'Traveling on a Shoestring',
  'Volunteering Abroad',
  'Community Connections',
];

const Addblog = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

  // Upload image using Cloudinary when a file is selected
  useEffect(() => {
    const uploadFile = async () => {
      try {
        console.log("Start uploading...");
        setUploading(true);
        const downloadUrl = await uploadToCloudinary(file);
        console.log("Upload successful. Cloudinary URL:", downloadUrl);
        toast.info("Image uploaded to Cloudinary successfully");
        setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      } finally {
        setUploading(false);
      }
    };
    console.log("FILE:", file);
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    // Optional: Preview the image after submission (if needed)
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById("image-preview").src = event.target.result;
    };
    reader.readAsDataURL(file);

    navigate("/");
  };

  return (
    <div className="flex p-5 items-center justify-center min-h-screen bg-blue-500">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-[87px]">
        <div className="text-2xl font-semibold mb-4">
          {id ? "Update Blog" : "Create Blog"}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="mb-2">Is it a trending blog?</p>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                value="yes"
                name="radioOption"
                checked={trending === "yes"}
                onChange={handleTrending}
              />
              <label htmlFor="radioOption" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                value="no"
                name="radioOption"
                checked={trending === "no"}
                onChange={handleTrending}
              />
              <label htmlFor="radioOption">No</label>
            </div>
          </div>
          <div>
            <select
              value={category}
              onChange={onCategoryChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option>Please select category</option>
              {categoryOption.map((option, index) => (
                <option value={option || ""} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="py-3">
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Description"
              value={description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <h3 className="text-gray-400">Upload an image</h3>
            <input
              type="file"
              className="w-full p-3 bg-gray-00 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => {
                setFile(e.target.files[0]);
                const reader = new FileReader();
                reader.onload = (event) => {
                  document.getElementById('image-preview').src =
                    event.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
            {file && (
              <img
                id="image-preview"
                className="mt-3 rounded-md border border-gray-300"
                alt="Image Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            )}
            {uploading && <p>Uploading image...</p>}
          </div>
          <div className="mb-6">
            <button
              className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 transition duration-300"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
