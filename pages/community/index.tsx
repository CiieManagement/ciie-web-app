import { useEffect, useState } from "react";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { useRouter } from "next/router";
import { db } from "@/components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const CommunityPage = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "communities"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/community/detail/${id}`);
  };

  return (
    <div className="min-h-screen relative">
      <BackdropAnimation />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Communities
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Discover and connect with our vibrant community network
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Loading Communities...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => handleCardClick(member.id)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full bg-gray-100">
                  <Image
                    src={
                      member.communityImage ||
                      (member.gender === "male" 
                        ? "/anonymous_male.svg" 
                        : "/anonymous_female.svg")
                    }
                    alt={`${member.name}'s profile`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h2>
                    <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide">
                      {member.department}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {member.description}
                  </p>

                  {/* CTA Section */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-700 transition-colors">
                      View Details
                    </span>
                    <svg
                      className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;