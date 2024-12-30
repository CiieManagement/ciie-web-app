// pages/core-members/index.tsx

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the admins.json file
import adminsData from '@/components/admins.json';  // Adjust the path based on your structure

interface Community {
  name: string;
  department: string;
}

const CommunitiesListingPage = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async (userEmail: string | null) => {
      if (!userEmail) {
        setErrorMessage('You are not authorized to view this page.');
        setLoading(false);
        return;
      }

      try {
        // First, check Firebase for admin privileges
        const adminCollection = collection(db, 'admin');
        const adminSnapshot = await getDocs(adminCollection);
        const isAdminInFirebase = adminSnapshot.docs.some(doc => doc.data().email === userEmail);

        if (isAdminInFirebase) {
          setIsAuthorized(true);
          return;
        }

        // Optionally, check if the user is a coordinator in Firebase
        const coordinatorsCollection = collection(db, 'coordinators');
        const coordinatorsSnapshot = await getDocs(coordinatorsCollection);
        const isCoordinatorInFirebase = coordinatorsSnapshot.docs.some(doc => doc.data().email === userEmail);

        if (isCoordinatorInFirebase) {
          setIsAuthorized(true);
          return;
        }

        // If not authorized in Firebase, check the local admins.json file
        const adminEmails = adminsData.admins;
        const isAdminInJSON = adminEmails.includes(userEmail);

        if (isAdminInJSON) {
          setIsAuthorized(true);
        } else {
          setErrorMessage('You are not authorized to view this page.');
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCommunities = async () => {
      try {
        const communitiesCollection = collection(db, 'communities');
        const communitiesSnapshot = await getDocs(communitiesCollection);
        const communityList: Community[] = communitiesSnapshot.docs.map(doc => doc.data() as Community);
        setCommunities(communityList);
      } catch (error) {
        console.error('Error fetching communities:', error);
        setErrorMessage('Error fetching communities.');
      } finally {
        setLoading(false);
      }
    };

    const handleAuthChange = () => {
      onAuthStateChanged(auth, user => {
        if (user?.email) {
          checkAuthorization(user.email).then(() => {
            if (isAuthorized) {
              fetchCommunities();
            }
          });
        } else {
          setErrorMessage('You are not logged in.');
          setLoading(false);
        }
      });
    };

    handleAuthChange();
  }, [isAuthorized]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;
  }

  if (!isAuthorized) {
    return <p className="text-center mt-10 text-red-500">You are not authorized to view this page.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Communities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {communities.map((community, index) => (
          <Link href={`/core-members/${encodeURIComponent(community.name)}`} key={index}>
            <div className="block p-6 bg-white rounded-lg shadow hover:bg-indigo-100 transition">
              <h2 className="text-xl font-semibold mb-2">{community.name}</h2>
              <p className="text-gray-600">Department: {community.department}</p>
            </div>
          </Link>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CommunitiesListingPage;
