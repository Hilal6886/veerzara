import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { FaTrash, FaEdit } from "react-icons/fa";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  handleDelete,
}) => {
  const userData = localStorage.getItem("USER");
  const currentUser = userData ? JSON.parse(userData) : null;
  const isAdmin = currentUser?.isAdmin || false;

  // Optionally apply Cloudinary transformation (e.g., resize & crop)
  const transformedImgUrl = imgUrl
    ? imgUrl.replace("/upload/", "/upload/w_600,h_400,c_fill/")
    : imgUrl;

  return (
    <div className="blog-section-container bg-gradient-to-r from-white via-white to-gray-100 rounded-lg overflow-hidden shadow-xl hover:shadow-lg transition duration-300">
      <div className="blog-section-image">
        <img
          className="w-full h-56 object-cover"
          src={transformedImgUrl || imgUrl}
          alt={title}
        />
      </div>
      <div className="p-6">
        <h6 className="text-indigo-700 uppercase tracking-wide">{category}</h6>
        <h2 className="text-lg md:text-lg lg:text-xl xl:text-xl font-sami-bold mb-1 text-Heart-100">
          {title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed md:text-lg lg:text-lg xl:text-lg mt-4">
          {excerpt(description, 120)}
        </p>
        <Link to={`/detail/${id}`}>
          <button className="mt-4 bg-indigo-600 w-full uppercase text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Read More
          </button>
        </Link>
        {isAdmin && (
          <div className="mt-4 flex justify-end items-center">
            <FaTrash
              className="mr-4 cursor-pointer text-red-600 hover:text-red-800"
              onClick={() => handleDelete(id)}
            />
            <Link to={`/update/${id}`}>
              <FaEdit className="cursor-pointer text-blue-600 hover:text-blue-800" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
