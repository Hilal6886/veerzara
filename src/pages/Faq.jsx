import React, { useState, useEffect } from "react";
import { fetchFaqs } from "srevices/Faqservices"; // Update path as needed
import { doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Your Firestore instance
import { toast } from "react-toastify";

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqsData = async () => {
      try {
        const faqsData = await fetchFaqs();
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
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

  // Toggle FAQ
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Delete FAQ (Admin only)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteDoc(doc(db, "faqs", id));
        toast.success("FAQ deleted successfully");
        // Filter out the deleted FAQ from state
        setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className="container py-12 bg-indig">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        
        <div className="text-center mb-[3rem]">
          <h1 className="inline-block bg-indigo-100 text-indigo-900 uppercase tracking-wide px-4 py-2 rounded-xl">
            FAQ
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-200 mt-4">
          Explore Common Questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border border-indigo-200 rounded-lg bg-white shadow">
              {/* Question Header */}
              <button
                type="button"
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => handleToggle(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                {/* Rotating Arrow Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 text-indigo-600 transition-transform duration-300 ${openIndex === index ? "rotate-0" : "rotate-180"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Collapsible Answer */}
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700">
                  <p>{faq.answer}</p>

                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className="mt-4 flex space-x-4">
                      {/* Edit */}
                      <Link to={`/updatefaq/${faq.id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.828 2.586a2 2 0 012.828 0l3.758 3.758a2 2 0 010 2.828L9.414 20.172a2 2 0 01-1.414.586H4a1 1 0 01-1-1v-4c0-.53.21-1.04.586-1.414l10.242-10.242zM15 4l5 5-2 2-5-5 2-2zM3 19h3.586l9.172-9.172-3.586-3.586L3 15.414V19z" />
                        </svg>
                      </Link>

                      {/* Delete */}
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm2 2h2v1h-2V5zm7 15H6V6h14v14z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-gray-600">
          Still have questions?{" "}
          <span className="text-indigo-600 font-medium">Contact our support</span>
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
