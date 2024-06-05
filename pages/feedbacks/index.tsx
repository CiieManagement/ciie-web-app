import React, { useEffect, useState } from 'react';
import { db } from '../../components/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Modal from '@/components/Model';
import toast, { Toaster } from 'react-hot-toast';
import App from '../navbar1'
import BackdropAnimation from '@/components/utils/backdrop_animation';
import withAdminAuth from '@/components/withAdminAuth';
const FeedbackDisplay = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleDetailsClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
  };

  const handleReject = async (feedbackId: string) => {
    try {
      await deleteDoc(doc(db, 'feedback', feedbackId));
      setFeedbackData((prevData) => prevData.filter((feedback) => feedback.id !== feedbackId));
      toast.error("Feedback neglected")
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  const handleAccept = async (feedbackId: string) => {
    try {
      await deleteDoc(doc(db, 'feedback', feedbackId));
      setFeedbackData((prevData) => prevData.filter((feedback) => feedback.id !== feedbackId));
      toast.success("Feedback accepted!")
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <App/>
    <BackdropAnimation/>
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Feedback</h1>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-3 pl-6 border-b border-gray-700">Subject</th>
              <th className="px-4 py-3 pl-3 border-b border-gray-700">Details</th>
              <th className="px-4 py-3 pl-10 border-b border-gray-700">Created At</th>
              <th className="px-4 py-3 pl-24 border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback) => (
              <tr key={feedback.id} className="odd:bg-gray-900 even:bg-gray-800">
                <td className="px-4 py-3 border-b border-gray-700">{feedback.subject}</td>
                <td
                  className="px-4 py-3 border-b border-gray-700 cursor-pointer underline"
                  onClick={() => handleDetailsClick(feedback)}
                >
                  {feedback.details}
                </td>
                <td className="px-4 py-3 border-b border-gray-700">
                  {new Date(feedback.createdAt.seconds * 1000).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-green-500 m-10 hover:underline"
                    onClick={() => handleAccept(feedback.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleReject(feedback.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
          <p><strong>Subject:</strong> {selectedFeedback.subject}</p>
          <p><strong>Details:</strong> {selectedFeedback.details}</p>
          <p><strong>Created At:</strong> {new Date(selectedFeedback.createdAt.seconds * 1000).toLocaleString()}</p>
        </Modal>
      )}
      <Toaster/>
    </div>
    </>
  );
};

export default withAdminAuth(FeedbackDisplay);
