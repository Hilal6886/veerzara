import React from "react";
import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa"; // Import folder icon from react-icons

const Category = ({ catgBlogsCount }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sticky">
     
      <div className="">
        <ul className="list-none p-0">
          {catgBlogsCount?.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={`/category/${item.category}`}
                className="text-gray-700 flex items-center"
              >
                <FaFolder className="mr-2  text-[#163269]" /> {/* Folder icon */}
                <span>{item.category}</span>
                <span className="text-sm text-gray-500 ml-1">({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
};

export default Category;
