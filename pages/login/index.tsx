import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../components/firebaseConfig';
import { Checkbox } from '@nextui-org/react';
import { UsersData, AdminData } from '@/interfaces';
import Link from 'next/link';
import usersData from '@/components/users.json';
import adminData from '@/components/admins.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods

const users: UsersData = usersData;
const admin: AdminData = adminData;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const storedEmail = localStorage.getItem('loginEmail');
    const storedPassword = localStorage.getItem('loginPassword');
    if (storedEmail) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleFirebaseLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check for admin access
      if (admin.admins.includes(email)) {
        toast.success('Logged in as admin successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
        window.location.replace('./');
        return; // Exit early if logged in as admin
      }

      // Check for user access
      if (users.users.includes(email)) {
        toast.success('Logged in successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
        window.location.replace('./'); // Redirect to user dashboard or main page
        return; // Exit early if logged in as user
      }

      // Check for coordinator access
      const coordinatorQuery = query(collection(db, 'coordinators'), where('email', '==', email)); // Query by email
      const coordinatorSnapshot = await getDocs(coordinatorQuery);

      if (!coordinatorSnapshot.empty) {
        const coordinatorData = coordinatorSnapshot.docs[0].data(); // Get the first matching coordinator
        const community = coordinatorData.community; // Get the community

        toast.success(`Logged in as coordinator successfully in ${community}!`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });

        // Redirect based on community value
        switch (community) {
          case 'cloud':
            window.location.replace('/admin/cloudAdmin'); // Redirect to cloud community page
            break;
          case 'AI':
            window.location.replace('/admin/webAdmin'); // Redirect to AI community page
            break;
          // Add more cases as necessary for other communities
          default:
            window.location.replace('./'); // Default redirect
        }
        return; // Exit early if logged in as coordinator
      }

      // If no valid role found, show error
      toast.error('You are not a member of Ciie or invalid credentials.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });

    } catch (error) {
      toast.error('Error logging in! Please check your credentials.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    }

    // Handle remembering credentials
    if (rememberMe) {
      localStorage.setItem('loginEmail', email);
      localStorage.setItem('loginPassword', password);
    } else {
      localStorage.removeItem('loginEmail');
      localStorage.removeItem('loginPassword');
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      localStorage.setItem('loginEmail', email);
      localStorage.setItem('loginPassword', password);
    } else {
      localStorage.removeItem('loginEmail');
      localStorage.removeItem('loginPassword');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-2 flex flex-col justify-center">
        <div className="relative py-3 sm:max-w-xl p-2 sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-yellow-400 shadow-lg transform -skew-y-15 sm:skew-y-0 sm:-rotate-15 sm:rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 rounded-2xl bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">CIIE</h1>
              </div>
              <form className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Personal Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative mt-1">
                        <input
                          id="password"
                          name="password"
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <FontAwesomeIcon
                            icon={passwordVisible ? faEyeSlash : faEye}
                            className="text-gray-400"
                          />
                        </button>
                      </div>
                      <Link href="/resetPassword" className='text-sm'>
                        Reset password
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox defaultChecked={rememberMe} onChange={handleRememberMe} />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create an account
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleFirebaseLogin(email, password)}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
