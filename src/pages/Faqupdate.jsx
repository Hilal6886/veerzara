import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc,collection } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditFaqForm = () => {
  const { id } = useParams();
  const [faq, setFaq] = useState({ question: '', answer: '' });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current FAQ ID:', id);
    const fetchFaq = async () => {
      try {
        if (!id) {
          console.error('FAQ ID is undefined');
          return;
        }
  
        const faqRef = doc(collection(db, 'faqs'), id);
        const faqDoc = await getDoc(faqRef);
  
        if (faqDoc.exists()) {
          const faqData = faqDoc.data();
          setFaq(faqData); // Update the state with the fetched data
        } else {
          console.error('FAQ not found');
        }
      } catch (error) {
        console.error('Error fetching FAQ:', error);
      }
    };
  
    fetchFaq();
  }, [id]);
  
  

  const handleUpdate = async () => {
    try {
      const newData = { question: faq.question, answer: faq.answer };
      await updateDoc(doc(collection(db, 'faqs'), id), newData);
      toast.success('FAQ updated successfully');
      navigate('/arfa/hero');
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Error updating FAQ');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-blue-600 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-white">Edit FAQ</h2>

        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-white">
            Question
          </label>
          <textarea
            type="text"
            id="question"
            value={faq.question}
            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
            className="mt-1 p-2 w-full border border-white rounded-md focus:outline-none focus:ring focus:border-white"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block text-sm font-medium text-white">
            Answer
          </label>
          <textarea
            id="answer"
            value={faq.answer}
            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
            rows="4"
            className="mt-1 p-2 w-full border border-white rounded-md focus:outline-none focus:ring focus:border-white"
          ></textarea>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-white text-blue-600 p-3 rounded-md hover:bg-blue-300 focus:outline-none focus:ring focus:border-white"
        >
          Update FAQ
        </button>

        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </div>
  );
};

export default EditFaqForm;
