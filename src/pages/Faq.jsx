import React, { useState, useEffect } from "react";
import { fetchFaqs } from "srevices/Faqservices"; // Update the path accordingly
import { BsPlus, BsDash, BsTrash, BsPencil } from "react-icons/bs";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Import your Firestore instance
import { toast } from "react-toastify";
const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqsData = async () => {
      try {
        const faqsData = await fetchFaqs();
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching FAQs: ", error);
      }
    };

    fetchFaqsData();
  }, []);

  // Retrieve user data from localStorage
  const userData = localStorage.getItem("USER");
  let currentUser = null;
  let isAdmin = false;

  if (userData) {
    currentUser = JSON.parse(userData);
    isAdmin = currentUser.isAdmin;
  }

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete featured product ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "faqs", id));
        toast.success("faq deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className=" justify-center lg:p-[9rem] md:p-8 p-3 my-12">
       
      
      <div className="text-center p-4">
        
        <h1 className="text-4xl text-[#3D2117] font-extrabold leading-tight mb-4 text-center">
        Frequently Asked Questions
      </h1>
     

       
      </div>
      
      <div className="grid gap-4">
        {faqs &&
          faqs.map((faq, index) => (
            <div key={faq.id} className="rounded-md bg-white p-4 shadow-md">
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-sm leading-relaxed md:text-lg lg:text-xl xl:text-xl xl:text-xl   text-gray-400 ">{faq.question}</h3>
                <span className="text-purple-500 ">
                  {activeIndex === index ? <BsDash size={35}/> : <BsPlus size={35} />}
                </span>
              </div>
              {activeIndex === index && (
                <div className="text-gray-400 text-sm leading-relaxed md:text-lg lg:text-xl xl:text-xl xl:text-xl  mt-4">{faq.answer}</div>
              )}
              {isAdmin && (
                <div className="mt-4 flex">
                  <Link to={`/updatefaq/${faq.id}`} className="mr-4 text-blue-500">
                    <BsPencil size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-500"
                  >
                    <BsTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default FaqSection;
