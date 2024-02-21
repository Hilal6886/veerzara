import React from "react";
import { useNavigate } from "react-router-dom";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <>
    <form className="mb-4">
      <div className="mb-4">
        <textarea
          rows="4"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your comment here..."
        />
      </div>
    </form>
  
    {!userId ? (
      <>
        <h5 className="mb-2">
          Please login or create an account to post a comment.
        </h5>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </>
    ) : (
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        type="submit"
        onClick={handleComment}
      >
        Post Comment
      </button>
    )}
  </>
  
  );
};

export default CommentBox;
