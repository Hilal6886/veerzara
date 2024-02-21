// UserComments.js

import React from "react";
import userAvatar from '../assets/images/avatar.png';

const UserComments = ({ name, body, createdAt, msg }) => {
  const commentDate = createdAt instanceof Date ? createdAt : (createdAt ? createdAt.toDate() : null);
  const formattedDate = commentDate ? commentDate.toDateString() : "";

  return (
    <div className={` ${msg ? 'bg-blue-100 p-4 rounded-md' : 'flex items-center space-x-4'}`}>
      {msg ? (
        <h4 className="text-blue-900">{msg}</h4>
      ) : (
        <>
          <div className="flex-shrink-0">
            <img
              src={userAvatar}
              alt="user profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {name}
              <small className="text-sm text-gray-500 ml-2">{formattedDate}</small>
            </h3>
            <p className="text-gray-700">{body}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserComments;
