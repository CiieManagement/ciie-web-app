import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from '../../../components/firebaseConfig'; // Import the Firestore instance
import Image from 'next/image'; // Import the Image component from Next.js

const CloudAdmin = () => {
  // Define state to hold the personal data
  const [personalData, setPersonalData] = useState({
    personalImage: '',
    personalThoughts: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch the data from Firestore
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        // Replace 'communities' and 'cloudAdminDocId' with your Firestore collection and document ID
        const docRef = doc(db, "communities");
        const docSnap = await getDoc(docRef);

        console.log(docSnap);
        

        if (docSnap.exists()) {
          const data = docSnap.data();

          
          setPersonalData({
            personalImage: data.personalImage,
            personalThoughts: data.personalThoughts
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Cloud Admin Page</h1>
      
      <div className="flex flex-col items-center">
        <Image
          src={personalData.personalImage}
          alt="Cloud Admin"
          width={160} // Set width of the image (40px * 4)
          height={160} // Set height of the image (40px * 4)
          className="rounded-full shadow-lg mb-4"
        />
        <p className="text-xl text-center font-semibold">
          {personalData.personalThoughts}
        </p>
      </div>
    </div>
  );
};

export default CloudAdmin;
