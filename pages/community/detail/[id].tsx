import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { db } from "../../../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Navbar } from "@/components/navbar";

const CommunityDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [community, setCommunity] = useState<any | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (id) {
        const docRef = doc(db, "communities", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data()) {
          setCommunity(docSnap.data());
        }
      }
    };
    fetchCommunity();
  }, [id]);

  if (!community) return <div className="text-center py-20">Loading...</div>;

  const handleApply = () => {
    router.push({
      pathname: "/community/apply",
      query: { department: community.department },
    });
  };

  return (
    <>
      {/* <Navbar/> */}
    <div className="min-h-screen  flex flex-col items-center max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-5xl font-bold mb-4 text-center text-white text-gray-800">
        {community.name}
      </h1>
      <p className="text-lg opacity-80 px-5 bg-black rounded-full text-center mb-6">
        {community.department || "N/A"}
      </p>

      <div className="flex flex-col md:grid grid-cols-2 gap-10">

        {/* Coordinator Section */}
        <div className="flex flex-col mx-5 md:mx-0 max-w-lg items-center space-y-6 mb-8">
          {community.personalImage && (
            <Image
              src={community.personalImage}
              alt={community.name}
              width={200}
              height={200}
              layout="responsive"
              className="rounded-full mb-5 shadow-lg object-cover w-full max-w-xs"
            />
          )}
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Course Coordinator</h2>
            <p className="mb-2 text-white font-bold">Dr. {community.faculty}</p>
            <div className="border-2 p-2 rounded-lg">
            <p className="opacity-80 font-mono font-semibold text-justify mx-4 leading-relaxed">
              {community.personalThoughts}
            </p>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="flex flex-col md:items-center  border-2 border-white rounded-3xl shadow-lg p-6">
          {community.teamMembers && community.teamMembers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-center text-white text-gray-800 mb-4">
                Team Members
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {community.teamMembers.map((member: any, index: number) => (
                  <div key={index} className="bbprder-2 border-white p-4 rounded-2xl  shadow-md hover:shadow-lg transition">  
                   <Image
                      src={ "/anonymous_male.svg"                     
                     }
                     width={100}
                     height={100}
                     layout="responsive"
                     alt=""
                     className="mx-auto mb-4"
                        />
                    <h4 className="text-lg font-extrabold text-center">
                      {member.name}
                    </h4>
                    <p className="font-semibold text-sm text-white text-center">
                      {member.role}
                    </p>
                    <div className="flex justify-center mt-2 space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg" width={24} height={24} alt="LinkedIn" />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="bg-white rounded-full">
                          <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" width={24} height={24} alt="GitHub" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 hover:scale-105 transition transform"
            >
              Apply for {community.name}
            </button>
          </div>
        </div>

      </div>
      </div>
      </>
  );
};

export default CommunityDetails;
