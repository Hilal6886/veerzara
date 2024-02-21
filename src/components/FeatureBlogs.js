import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureBlogs = ({ blogs, title }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 sticky">
      <div className="text-xl font-semibold mb-4">{title}</div>
      {blogs?.map((item) => (
        <div
          className="mb-4 p-4 bg-white shadow-lg rounded-lg cursor-pointer"
          key={item.id}
          onClick={() => navigate(`/arfa/detail/${item.id}`)}
        >
          <div className="mt-4">
            <div className="text-lg text-[#444444] font-semibold">{item.title}</div>
            <div className="text-gray-500">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBlogs;
