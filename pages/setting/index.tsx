"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, deleteUser, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../components/firebaseConfig';
import { Navbar } from "../../components/navbar";
import toast, { Toaster } from 'react-hot-toast';

const MySetting = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const reauthenticate = async (enteredPassword: string) => {
    console.log(enteredPassword); // For debugging purposes
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, enteredPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        setError("Re-authentication failed. Please check your password and try again.");
        return false;
      }
    }
    return false;
  };

  const handleDeleteAccount = async () => {
    const enteredPassword = prompt("Please enter your password to verify:");
    if (enteredPassword === null) {
      return;
    }

    const reauthenticated = await reauthenticate(enteredPassword);
    if (reauthenticated) {
      const agree = confirm("This will delete your account and you will not be able to recover your data. Are you sure?");
      if (agree) {
        try {
          await deleteUser(auth.currentUser);
          setUser(null);
          router.push('/'); // Redirect to home page or any other page after account deletion
          toast.success("Account successfully deleted");
        } catch (error) {
          setError(error.message);
        }
      } else {
        toast.success("Account deletion has been canceled.");
      }
    } else {
      alert("Re-authentication failed. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (user) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        toast.success("Password reset email sent! Check your inbox.");
      } catch (error) {
        setError("Failed to send password reset email. Please try again.");
      }
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <Navbar />
      <div className='border-2 border-gray-300 bg-white w-80 rounded-2xl mt-10 p-6 shadow-lg'>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-black ">Profile</h1>
          <hr />
          <div className='mt-6'>
            {user ? (
              <>
                <div className="text-left">
                  <p className='text-lg text-red-500 mb-2'>You are currently logged in as:</p>
                  <p className=' text-lg text-gray-600 font-semibold'>{user.email}</p> {/* Display user's email */}
                </div>
              </>
            ) : (
              <p className='text-center mb-4 text-gray-700'>No user is currently logged in.</p>
            )}
            <hr className='w-full' />
          </div>

          {error && <p className='text-red-500 mt-4'>{error}</p>}

          <button
            onClick={handleDeleteAccount}
            className='w-36 h-9 bg-red-600 mt-9 rounded-lg text-white'
          >
            Delete my account
          </button>

          {user && (
            <button
              onClick={handleResetPassword}
              className='w-36 h-9 bg-blue-600 mt-6 rounded-lg text-white'
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default MySetting;
