import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-2xl max-w-3xl mx-auto">
      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleComment(e);
        }}
      >
        <div className="mb-4">
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            placeholder="Write your comment here..."
          />
        </div>
        {userId ? (
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-6 rounded-full transition-all duration-300 focus:outline-none"
          >
            <FaRegCommentDots className="text-xl" />
            Post Comment
          </button>
        ) : (
          <div className="text-center">
            <p className="text-white text-lg mb-4">
              Please login or create an account to post a comment.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-6 rounded-full transition-all duration-300 focus:outline-none"
            >
              Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentBox;
