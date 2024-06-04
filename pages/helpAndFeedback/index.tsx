import React, { useState } from 'react';
import { db } from '../../components/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import {Navbar} from '../../components/navbar';
import toast, { Toaster } from 'react-hot-toast';

const FeedbackForm = () => {
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'feedback'), {
        subject,
        details,
        createdAt: new Date()
      });
      setSubject('');
      setDetails('');
      toast.success("Thank you so much !!")
     
      toast.success("Feedback submitted successfully")
      
      
    } catch (error) {
      console.error('Error adding feedback: ', error);
      alert('Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
    <div className="flex items-center justify-center mt-20 bg-black-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-4">Submit Feedback</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
            Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-whtie-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      <Toaster/>
    </div>
    </>
  );
};

export default FeedbackForm;
