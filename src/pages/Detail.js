import { isEmpty } from "lodash";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentBox from "../components/CommentBox";
import UserComments from "../components/UserComments";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import {
  collection,
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import { getBlog, updateBlog } from "srevices/blog.service";
import { FaThumbsUp } from "react-icons/fa";

const Detail = ({ setActive, user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");

  // Fetch recent blogs (not used in UI currently)
  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(blogRef, orderBy("timestamp", "desc"), limit(5));
      const docSnapshot = await getDocs(recentBlogs);
      // Optionally, you can use this data for related blogs
    };
    getRecentBlogs();
  }, []);

  const getBlogDetail = async () => {
    const blogDetail = await getBlog(id);
    blogDetail.timestamp = blogDetail.timestamp.toDate().toDateString();
    setBlog(blogDetail || {});
    setLikes(blogDetail.likes || []);
    setComments(blogDetail.comments || []);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getBlogDetail();
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: new Date(),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    await updateBlog(id, { ...blog, comments });
    toast.success("Comment posted successfully");
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
        await updateBlog(id, { ...blog, likes });
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Blog Header Image */}
        <div>
          <img
            src={blog?.imgUrl}
            alt="Blog"
            className="w-full h-80 object-cover"
          />
        </div>
        {/* Blog Content */}
        <div className="p-8">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            {blog?.title}
          </h2>
          <div className="text-sm text-gray-500 mb-4">
            <p>
              By {blog?.author} • {blog?.timestamp}
            </p>
          </div>
          <div className="flex items-center mb-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300"
            >
              <FaThumbsUp />
              Like {likes.length}
            </button>
          </div>
          <p className="text-lg leading-relaxed text-gray-700 mb-8 text-justify">
            {blog?.description}
          </p>
          {/* Comments Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Comments ({comments.length})
            </h3>
            {isEmpty(comments) ? (
              <UserComments msg="No comments yet. Be the first to comment." />
            ) : (
              comments.map((comment, index) => (
                <UserComments key={index} {...comment} />
              ))
            )}
          </div>
          {/* Comment Box */}
          <CommentBox
            userId={userId}
            userComment={userComment}
            setUserComment={setUserComment}
            handleComment={handleComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
