import React, { useEffect, useState } from 'react';
import { auth } from '../../components/firebaseConfig';
import toast, { Toaster } from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');


useEffect(()=>{
  toast.custom("Maintain the privacy, don't share your credentials to anyone");
},[toast])


  const handleResetPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    

     

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      window.location.href="/login";
      setEmail('');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Error sending password reset email');
    }
  };

  return (
    <>
    <h1 className='flex justify-center text-5xl mt-40'>CIIE</h1>
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleResetPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
       
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
      <Toaster/>
    </div>
    </>
  );
};

export default ResetPasswordForm;
