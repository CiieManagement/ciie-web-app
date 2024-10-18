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

  const handleCardClick = (id: any) => {
    router.push(`/community/detail/${id}`);
  };

  const renderTeamMembers = (members: any[]) => {
    return members.map((member) => (
      <div
        key={member.id}
        onClick={() => handleCardClick(member.id)}
        className="bg-gray-400/20 overflow-hidden w-full sm:max-w-lg flex flex-col items-center justify-between rounded-2xl shadow-md sm:hover:shadow-xl duration-300 ease-in-out cursor-pointer transform hover:scale-105 transition-all"
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
          width={0}
          height={0}
          layout="responsive"
          className="w-full h-auto shadow-lg"
        />
        <div className="p-2 sm:mx-3 flex-1 mt-2">
          <h2 className="text-xl sm:text-2xl font-bold text-center sm:group-hover:text-white transition duration-200">
            {member.name}
          </h2>
          <h3 className="text-sm sm:text-lg text-blue-600 sm:group-hover:text-blue-200 font-medium text-center transition duration-200">
            {member.department}
          </h3>
          <p className="text-left my-4 text-sm sm:text-base sm:group-hover:text-gray-100 transition duration-200">
            {member.description.length > 150
              ? `${member.description.substring(0, 150)}...`
              : member.description}
          </p>
        </div>
        <div className="mb-4 transition duration-200">
          <svg
            className="w-6 h-2 text-gray-500 group-hover:text-white"
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
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-white tracking-wide">
          Our Community
        </h1>

        {/* Rendering fetched team members */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderTeamMembers(teamMembers)}
        </div>
      </div>
    </div>
  );
};

export default Index;
