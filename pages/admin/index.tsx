import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import DefaultLayout from "@/layouts/default";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { auth } from '../../components/firebaseConfig';
import Navbar from '../navbar1';
import withAdminAuth from '@/components/withAdminAuth';
import Link from 'next/link';

const AdminPage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email); // Use displayName or email as fallback
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <BackdropAnimation />

      <div className="container mx-auto px-4 py-8 text-white">

        <h1 className="text-center text-4xl font-bold mt-12 mb-8">Admin Dashboard</h1>
        <p className="text-center text-xl mb-12">
          Welcome, {username}. This is the admin page for the Center of Innovation and Incubation (CIIE). Here you can manage reports, add or reject entries, and view details about internal faculty involvement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/admin-report" passHref>
            <div className="bg-gray-800 shadow-md rounded-lg p-6 cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">Check Reports</h2>
              <p className="text-gray-300 mb-4">Add new student reports and manage submissions.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Check Report</button>
            </div>
          </Link>

          <Link href="/requests" passHref>
          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold ">Manage New Requests</h2>
            <p className="text-gray-300 py-5 mb-4">Reject/Accept new report who want to join CIIE .</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Manage Requests</button>
          </div>
        </Link>


          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold">Add Member Manually</h2>
            <p className="text-gray-300 mb-4">You have rights to add any new member in CIIE. </p>
            <button className="bg-green-500 text-white px-5 py-2 mt-10 rounded">Add Member</button>
          </div>

        <Link href="/requests" passHref>
          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Internal Faculty</h2>
            <p className="text-gray-300 mb-4">View and manage internal faculty involved in the CIIE.</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded">View Faculty</button>
          </div>
        </Link>

          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Attendance</h2>
            <p className="text-gray-300 mb-4">View and manage attendance of students involved in the workshop organised by CIIE.</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">View Attendance</button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <p className="text-gray-300">Here you can see the recent activities and updates related to the CIIE.</p>
            {/* Add recent activity content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAdminAuth(AdminPage);
