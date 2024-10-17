import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { db } from "../../../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const CommunityDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (id) {
        const docRef = doc(db, "communities", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCommunity(docSnap.data());
        }
      }
    };
    fetchCommunity();
  }, [id]);

  if (!community) return <div className="text-center py-20">Loading...</div>;

  // Add the "Apply" button that navigates to the Apply page with the department in the query
  const handleApply = () => {
    router.push({
      pathname: "/community/apply", // Navigate to the Apply page
      query: { department: community.department }, // Pass the department value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{community.name}</h1>
        <p className="text-lg text-gray-600 text-center mb-6">{community.department}</p>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
          <div className="w-full md:w-1/3">
            {community.personalImage && (
              <Image
                src={community.personalImage}
                alt={community.name}
                width={300}
                height={300}
                className="rounded-lg shadow-md object-cover w-full"
              />
            )}
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-gray-800">Course Coordinator</h2>
            <p className="mb-2 text-blue-700">Dr. {community.faculty}</p>
            <p className="text-gray-700 leading-relaxed">{community.personalThoughts}</p>
          </div>
        </div>

        {community.teamMembers && community.teamMembers.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Team Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {community.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-700">{member.name}</h4>
                  <p className="text-gray-600">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 text-gray-800 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Apply for {community.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
