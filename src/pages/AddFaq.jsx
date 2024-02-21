import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFAQ = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqCollection = collection(db, 'faqs');

  const addFAQ = async () => {
    if (question && answer && !isSubmitting) {
      try {
        setIsSubmitting(true);
        await addDoc(faqCollection, {
          question,
          answer,
          timestamp: new Date(),
        });
        setQuestion('');
        setAnswer('');
        toast.success('FAQ added successfully!');
      } catch (error) {
        console.error('Error adding FAQ: ', error);
        toast.error('Error adding FAQ. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please enter both question and answer');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add FAQ</h1>

        {/* FAQ Form */}
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <textarea
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 p-2 w-full border border-blue-500 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          > </textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-1 p-2 w-full border border-blue-500 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>

        <button
          onClick={addFAQ}
          className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding FAQ...' : 'Add FAQ'}
        </button>

        {/* Toast Container for displaying toasts */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
};

export default AddFAQ;
