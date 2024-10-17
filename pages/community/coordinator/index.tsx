// pages/add-coordinator.tsx
import { useState } from 'react';
import { db } from '@/components/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AddCoordinator() {
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [community, setCommunity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'coordinators'), {
        name: coordinatorName,
        email: coordinatorEmail,
        community: community,
      });
      setMessage('Coordinator added successfully!');
      setCoordinatorName('');
      setCoordinatorEmail('');
      setCommunity('');
    } catch (error) {
      console.error('Error adding coordinator:', error);
      setMessage('Error adding coordinator. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Coordinator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Coordinator Name
            </label>
            <input
              type="text"
              id="name"
              value={coordinatorName}
              onChange={(e) => setCoordinatorName(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Coordinator Email
            </label>
            <input
              type="email"
              id="email"
              value={coordinatorEmail}
              onChange={(e) => setCoordinatorEmail(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="community" className="block text-sm font-medium text-gray-700">
              Community
            </label>
            <input
              type="text"
              id="community"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 text-white rounded-lg transition-colors duration-300 ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isSubmitting ? 'Submitting...' : 'Add Coordinator'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-lg font-semibold text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
