import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { db } from "../../../components/firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";

const CommunityDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [community, setCommunity] = useState<any | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    console.log("Fetched Team Members:", teamMembers);
    
    const fetchCommunity = async () => {
      if (id) {
        const docRef = doc(db, "communities", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()) {
          setCommunity(docSnap.data());

          // Fetch team members based on the department and order by timestamp
          const teamMembersRef = collection(db, "teamMembers");
          const q = query(
            teamMembersRef, 
            where("department", "==", docSnap.data().department), 
            orderBy("timestamp", "asc") // Sorting by timestamp (earliest first)
          );

          const teamMembersSnap = await getDocs(q);
          const members = teamMembersSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null, // Convert Firestore Timestamp to JS Date
          }));

          setTeamMembers(members);
        }
      }
    };

    fetchCommunity();
  }, [id]);

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
          <div className="h-96 bg-gray-100 rounded-xl mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Community Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{community.name}</h1>
          <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
            {community.department || "Undergraduate Program"}
          </span>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Coordinator Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-100">
                <Image
                  src={community.personalImage || (community.gender === "male" 
                    ? "/anonymous_male.svg" 
                    : "/anonymous_female.svg")}
                  alt={community.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-500 mb-2">Course Coordinator</h2>
                <p className="text-xl font-bold text-gray-900 mb-4">Dr. {community.faculty}</p>
                <div className="prose bg-gray-50 p-6 rounded-xl">
                  <blockquote className="text-gray-600 italic">{community.personalThoughts}</blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* Team Members Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Team</h3>

            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {teamMembers.map((member: any) => (
                  <div key={member.id} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={member.photo || (member.gender === "male" 
                          ? "/anonymous_male.svg" 
                          : "/anonymous_female.svg")}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                    <div className="flex space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener" className="text-gray-400 hover:text-indigo-600">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener" className="text-gray-400 hover:text-gray-600">
                          <span className="sr-only">GitHub</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No team members found.</p>
            )}
            <Link href={"/community/apply"}>
              <button className="items-center border-2 px-4 rounded-lg text-gray-400 border-gray-300 mt-10">Join us</button>
              </Link>

          </section>

        </div>
      </main>
    </div>
  );
};

export default CommunityDetails;
