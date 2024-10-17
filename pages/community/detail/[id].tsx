import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { db } from "../../../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const CommunityDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [community, setCommunity] = useState<any | null>(null); // Explicitly type community

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

  // Add the "Apply" button that navigates to the Apply page with the department in the query
  const handleApply = () => {
    router.push({
      pathname: "/community/apply", // Navigate to the Apply page
      query: { department: community.department }, // Pass the department value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-5xl font-bold mb-4 text-center">
        {community.name}
      </h1>
      <p className="text-lg opacity-80 py-3 px-5 bg-gray-400/20 rounded-full text-center mb-6">
        {community.department || "N/A"}
      </p>

      <div className=" flex flex-col md:grid grid-cols-2 gap-10">

        <div className="flex flex-col mx-5 md:mx-0 max-w-lg items-center md:items-center space-y-6 md:space-y-0 mb-8">
          {community.personalImage && (
            <Image
              src={community.personalImage}
              alt={community.name}
              width={200}
              height={200}
              layout="responsive"
              className="rounded-3xl mb-5 shadow-md object-cover w-full max-w-sm"
            />
          )}
          <div className=" ml-2 w-full md:w-fit items-center">
            <h2 className="text-2xl mx-auto w-fit text-center font-semibold ">
              Course Coordinator
            </h2>
            <p className="mb-2 w-fit mx-auto text-indigo-500">
              Dr. {community.faculty}
            </p>
            <p className="opacity-80 text-justify mx-2 leading-relaxed">
              {community.personalThoughts}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:items-center bg-gray-400/20 rounded-3xl">

          {community.teamMembers && community.teamMembers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-center  mb-4">
                Team Members
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mx-5">
                {community.teamMembers.map((member: any, index: number) => (

                  <div key={index} className="bg-gray-400/20 p-4 rounded-2xl shadow-md">
                    <Image src={"/anonymous_male.svg"} width={100} height={100} layout="responsive" alt={""} className=" mx-auto -mt-5 mb-4" />

                    <h4 className="text-lg font-bold">
                      {member.name}
                    </h4>
                    <p className="text-indigo-500">{member.role}</p>
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
                        className="ml-4  hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                ))}

                <div className="bg-gray-400/20 opacity-50 p-4 rounded-2xl shadow-md">
                  <Image src={"/anonymous_male.svg"} width={100} height={100} layout="responsive" alt={""} className=" mx-auto -mt-5 mb-4" />
                  <h4 className="text-lg font-bold">
                    {"Member Name"}
                  </h4>
                  <p className="text-indigo-500">Member Role</p>
                </div>

                <div className="bg-gray-400/20 opacity-50 p-4 rounded-2xl shadow-md">
                  <Image src={"/anonymous_male.svg"} width={100} height={100} layout="responsive" alt={""} className=" mx-auto -mt-5 mb-4" />

                  <h4 className="text-lg font-bold">
                    {"Member Name"}
                  </h4>
                  <p className="text-indigo-500">Member Role</p>
                </div>
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="text-center mx-5 sm:mx-auto mt-5 sm:mt-auto mb-6 rounded-full">
            <button
              onClick={handleApply}

              className="px-6 py-2  bg-indigo-500 text-white rounded-full hover:bg-indigo-600 hover:scale-105 transition"
            >
              Apply for {community.name}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityDetails;
