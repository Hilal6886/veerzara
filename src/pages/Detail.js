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
import Category from "components/Category";
import FeatureBlogs from "components/FeatureBlogs";


const Detail = ({ setActive, user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(blogRef, orderBy("timestamp", "desc"), limit(5));
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
    id && getBlogDetail();
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
    <div className="container mx-auto p-8 flex flex-col md:flex-row justify-between items-start gap-8">
    <div className="max-w-xl mb-8">
      <div className="mb-8 mt-[60px]">
        <img src={blog?.imgUrl} alt="Blog" className="w-full h-96 object-cover rounded-md" />
      </div>
      <div className="mb-8">
        <h2 className="text-3xl  font-bold">{blog?.title}</h2>
        <div className="text-gray-600">
          <p className="mb-2">By {blog?.author} - {blog?.timestamp}</p>
        </div>
        <p className="text-lg text-center text-gray-700">{blog?.description}</p>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>
        {isEmpty(comments) ? (
          <UserComments msg="No comments yet. Be the first to comment." />
        ) : (
          <>
            {comments.map((comment, index) => (
              <UserComments key={index} {...comment} />
            ))}
          </>
        )}
      </div>
      <CommentBox
        userId={userId}
        userComment={userComment}
        setUserComment={setUserComment}
        handleComment={handleComment}
      />
    </div>
  
    <div className="max-w-xl sticky top-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Most Featured</h3>
        <FeatureBlogs title={"Most Featured"} blogs={blogs} />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Categories</h3>
        <Category  />
      </div>
    </div>
  </div>
  

  );
};

export default Detail;
