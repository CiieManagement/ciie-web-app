// pages/core-members/[community].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import * as XLSX from 'xlsx'; // Import XLSX for exporting data

interface Application {
  name: string;
  registrationNumber: string;
  email: string;
  appliedAt: any;
  department: string;
}

const CommunityDetailPage = () => {
  const router = useRouter();
  const { community } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!router.isReady) return; // Wait for the router to be ready

    const checkAuthorization = async (userEmail: string | null) => {
      if (!userEmail) {
        setErrorMessage('You are not authorized to view this page.');
        setLoading(false);
        return;
      }

      try {
        // Check if the user is an admin
        const adminCollection = collection(db, 'admin');
        const adminSnapshot = await getDocs(adminCollection);

        const isAdmin = adminSnapshot.docs.some(doc => doc.data().email === userEmail);

        if (isAdmin) {
          setIsAuthorized(true);
        } else {
          // Check if the user is a coordinator for this community
          const coordinatorsCollection = collection(db, 'coordinators');
          const coordQuery = query(coordinatorsCollection, where('email', '==', userEmail));
          const coordSnapshot = await getDocs(coordQuery);

          if (!coordSnapshot.empty) {
            const coordinatorData = coordSnapshot.docs[0].data();
            if (coordinatorData.community.toLowerCase() === community?.toString().toLowerCase()) {
              setIsAuthorized(true);
            } else {
                setIsAuthorized(true);
            //   setErrorMessage('You are a coordinator, but you are not assigned to this community.');
            }
          } else {
            setErrorMessage('You are not authorized to view this page.');
          }
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    };

    const fetchApplications = async () => {
      if (!community || typeof community !== 'string') {
        setErrorMessage('Invalid community.');
        setLoading(false);
        return;
      }

      try {
        const applicationsCollection = collection(db, 'applications');
        const appsQuery = query(applicationsCollection, where('department', '==', community));
        const applicationsSnapshot = await getDocs(appsQuery);
        const apps: Application[] = applicationsSnapshot.docs.map(doc => {
          const data = doc.data() as Application;
          if (data.appliedAt && data.appliedAt.seconds) {
            data.appliedAt = new Date(data.appliedAt.seconds * 1000).toLocaleDateString();
          }
          return data;
        });
        setApplications(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setErrorMessage('Error fetching applications.');
      } finally {
        setLoading(false);
      }
    };

    const handleAuthChange = () => {
      onAuthStateChanged(auth, user => {
        if (user?.email) {
          checkAuthorization(user.email).then(() => {
            if (isAuthorized) {
              fetchApplications();
            } else {
              setLoading(false);
            }
          });
        } else {
          setErrorMessage('You are not logged in.');
          setLoading(false);
        }
      });
    };

    handleAuthChange();
  }, [router.isReady, community, isAuthorized]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    XLSX.writeFile(workbook, `${community}_applications.xlsx`);
  };

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
      <h1 className="text-3xl font-bold mb-8 text-center">{community} Community - Student Applications</h1>
      {applications.length === 0 ? (
        <p className="text-center">No applications found for this community.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-400">Name</th>
                  <th className="px-4 py-2 border border-gray-400">Registration Number</th>
                  <th className="px-4 py-2 border border-gray-400">Email</th>
                  <th className="px-4 py-2 border border-gray-400">Applied At</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">{app.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{app.registrationNumber}</td>
                    <td className="border border-gray-400 px-4 py-2">{app.email}</td>
                    <td className="border border-gray-400 px-4 py-2">{app.appliedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={downloadExcel}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Download Applications as Excel
            </button>
          </div>
        </>
      )}
      <div className="mt-6 text-center">
        <Link href="/core-members">
          <div className="text-indigo-600 hover:text-indigo-500">← Back to Communities</div>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CommunityDetailPage;
