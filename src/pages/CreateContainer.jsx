
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";




import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
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

const initialState = {
  title: "",
  location: "",
};

const CreateContainer = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, location } = form;

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        try {
          console.log("Start uploading...");
          setUploading(true);
          const storageRef = ref(storage, file.name);
          const snapshot = await uploadBytesResumable(storageRef, file);
          console.log("Upload successful. Retrieving download URL...");
          const downloadUrl = await getDownloadURL(snapshot.ref);
          console.log("Download URL:", downloadUrl);
          toast.info("Image uploaded to Firebase successfully");
          setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image. Please try again.");
        } finally {
          setUploading(false);
        }
      };
      

      uploadFile();
    }
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "offers", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && location) {
      try {
        if (!id) {
          await addDoc(collection(db, "offers"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Hotel added successfully");
        } else {
          await updateDoc(doc(db, "offers", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Offer updated successfully");
        }
        navigate("/hotels");
      } catch (err) {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("All fields are mandatory to fill");
    }
  };

  return (
    <div className="p-3 py-[7rem] min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <form
        className="max-w-md bg-gray-100 p-10 rounded-md shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Update Hotel" : "Add Hotel"}
        </h1>
        <div className="mb-6">
          <input
            type="text"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3  outline-none focus:border-blue-500"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3  outline-none focus:border-blue-500"
            placeholder="Enter location"
            name="location"
            value={location}
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
                document.getElementById('image-preview').src = event.target.result;
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
  );
};

export default CreateContainer;

