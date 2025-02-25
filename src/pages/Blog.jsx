import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Blog = ({ user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [active]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className=" mt-[3rm] p-4 py-12">
  

      <div className="text-center p-4">
        
        <h1 className="text-4xl text-[#3D2117] font-extrabold leading-tight mb-4 text-center">
        Our Daily Blogs
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
      Dive into Our Daily Blogs
      </p>

       
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogSection key={blog.id} user={user} handleDelete={handleDelete} {...blog} />
        ))}
      </div>

      {/* The "See More Blogs" button can be added if needed */}
    </section>
  );
};

export default Blog;
