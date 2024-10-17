import { useEffect, useState } from "react";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { useRouter } from "next/router";
import { db } from "@/components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const Index = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetching team members from Firestore
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "communities"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/community/detail/${id}`);
  };

  const renderTeamMembers = (members) => {
    return members.map((member) => (
      <div
        key={member.id}
        onClick={() => handleCardClick(member.id)}
        className="bg-white p-6 flex items-center justify-between mx-auto max-w-3xl rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer mb-8 transform hover:scale-105 hover:bg-gradient-to-br from-purple-500 to-pink-500 hover:text-white"
      >
        {/* Profile Image */}
        <Image
          src={
            member.communityImage === ""
              ? member.gender === "male"
                ? "/anonymous_male.svg"
                : "/anonymous_female.svg"
              : member.communityImage
          }
          alt={`${member.name}'s profile`}
          width={120}
          height={120}
          className="rounded-full shadow-lg object-cover border-4 border-gray-300 hover:border-transparent transition-all"
        />
        <div className="ml-6 flex-1">
          <h2 className="text-3xl font-bold text-gray-900 group-hover:text-white transition duration-200">
            {member.name}
          </h2>
          <h3 className="text-lg text-blue-600 group-hover:text-blue-200 font-medium transition duration-200">
            {member.department}
          </h3>
          <p className="text-gray-700 text-left mt-2 max-w-2xl group-hover:text-gray-100 transition duration-200">
            {member.description.length > 150
              ? `${member.description.substring(0, 150)}...`
              : member.description}
          </p>
        </div>
        <div className="ml-4 transition duration-200">
          <svg
            className="w-6 h-6 text-gray-500 group-hover:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <BackdropAnimation />
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-8">
        <h1 className="text-5xl font-bold mb-12 text-white tracking-wide">
          Meet Our Community Coordinators
        </h1>

        {/* Rendering fetched team members */}
        <div className="w-full space-y-6">
          {renderTeamMembers(teamMembers)}
        </div>
      </div>
    </div>
  );
};

export default Index;
