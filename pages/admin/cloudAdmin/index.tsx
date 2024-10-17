import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '@/components/firebaseConfig';  // Ensure correct Firebase config import
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';  // Import Image from Next.js
import { Dialog } from '@headlessui/react';  // For modal functionality
import { Button } from 'react-bootstrap';  // Import Button from React Bootstrap
import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  github: string;
  linkedin: string;
}

interface Community {
  communityImage: string;
  department: string;
  description: string;
  faculty: string;
  name: string;
  personalImage: string;
  personalThoughts: string;
  teamMembers: TeamMember[];
}

interface Application {
  registrationNumber: string;
  name: string;
  year: string;
}

const CommunityPage = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const [newMember, setNewMember] = useState<TeamMember>({
    name: '',
    role: '',
    github: '',
    linkedin: '',
  });
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkCoordinator = async (email: string | null) => {
      if (!email) {
        setErrorMessage('You are not authorized to view this page.');
        setLoading(false);
        return;
      }

      try {
        const coordinatorsCollection = collection(db, 'coordinators');
        const q = query(coordinatorsCollection, where('email', '==', email));
        const coordinatorSnapshot = await getDocs(q);

        if (!coordinatorSnapshot.empty) {
          const coordinatorData = coordinatorSnapshot.docs[0].data();

          if (coordinatorData.community === 'Cloud') {
            setIsCoordinator(true);
          } else {
            setErrorMessage('You are a coordinator, but you are in the wrong community.');
          }
        } else {
          setErrorMessage('You are not authorized to view this page.');
        }
      } catch (error) {
        console.error('Error checking coordinator:', error);
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCommunitiesAndApplications = async () => {
      try {
        const communitiesCollection = collection(db, 'communities');
        const q = query(communitiesCollection, where('department', '==', 'Cloud'));
        const communitySnapshot = await getDocs(q);
        const communityList: Community[] = communitySnapshot.docs.map((doc) => doc.data() as Community);

        const applicationsCollection = collection(db, 'applications');
        const w = query(applicationsCollection, where('department', '==', 'Cloud'));
        const applicationSnapshot = await getDocs(w);
        const applicationList: Application[] = applicationSnapshot.docs.map((doc) => doc.data() as Application);

        setCommunities(communityList);
        setApplications(applicationList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleAuthChange = () => {
      onAuthStateChanged(auth, (user) => {
        if (user?.email) {
          checkCoordinator(user.email);
        } else {
          setErrorMessage('You are not logged in.');
          setLoading(false);
        }
      });
    };

    handleAuthChange();
    fetchCommunitiesAndApplications();
  }, []);

  const handleAddMember = async () => {
    try {
      const communitiesCollectionRef = collection(db, 'communities');
      const q = query(communitiesCollectionRef, where('department', '==', 'Cloud'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          teamMembers: arrayUnion(newMember),
        });

        setIsModalOpen(false);
        setNewMember({ name: '', role: '', github: '', linkedin: '' });

        const updatedSnapshot = await getDocs(q);
        const updatedCommunitiesList = updatedSnapshot.docs.map((doc) => doc.data() as Community);

        setCommunities(updatedCommunitiesList);
      } else {
        console.error('No community found with department "Cloud".');
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return isCoordinator ? (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Cloud Community Details</h1>

      <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Team Member
      </Button>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-xl font-semibold">Add New Team Member</Dialog.Title>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Role"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={newMember.github}
                onChange={(e) => setNewMember({ ...newMember, github: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={newMember.linkedin}
                onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
                className="border p-2 mb-4 w-full"
              />
              <button onClick={handleAddMember} className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Member
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="flex justify-center mb-12">
        {communities.map((community, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-52 h-48">
              <Image
                src={community.personalImage}
                alt="Community Coordinator"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                className="rounded-2xl"
              />
            </div>
            <h1 className="text-xl font-bold text-blue-600">
              Community Coordinator - Dr. {community.faculty}
            </h1>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-8">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {communities.map((community, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Team Members</h3>
            <ul className="list-disc pl-5">
              {community.teamMembers.map((member, idx) => (
                <li key={idx} className="mb-4">
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>Role:</strong> {member.role}</p>
                  <p>
                    <strong>GitHub:</strong>{' '}
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      {member.github}
                    </a>
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      {member.linkedin}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {applications.map((application, idx) => (
          <div key={idx} className="border p-4 rounded-lg shadow-lg">
            <p><strong>Name:</strong> {application.name}</p>
            <p><strong>Registration Number:</strong> {application.registrationNumber}</p>
            <p><strong>Year:</strong> {application.year}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>{errorMessage}</p>
  );
};

export default CommunityPage;
