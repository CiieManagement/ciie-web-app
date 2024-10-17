import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '@/components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { Button, Accordion } from 'react-bootstrap';
import React from 'react';
import * as XLSX from 'xlsx';  // Import XLSX for exporting data

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
  yedataAnalysisExperiencer: string;
  workshopSource: string;
  workshopTopics: string;
  workshopGoal: string;
  mlCourses: string;
  pythonProficiency: string;
  course: string;
  phoneNumber: string;
  appliedAt: any;
  department: string;
  email: string;
  branch: string;
  section: string;
  mathProficiency: string;
  mlTopics: string;
  registrationNumber: string;
  name: string;
  year: string;
}

const CommunityPage = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

          if (coordinatorData.community === 'AI and ML') {
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
        const q = query(communitiesCollection, where('department', '==', 'AI and ML'));
        const communitySnapshot = await getDocs(q);
        const communityList: Community[] = communitySnapshot.docs.map((doc) => doc.data() as Community);

        const applicationsCollection = collection(db, 'applications');
        const w = query(applicationsCollection, where('department', '==', 'AI and ML'));
        const applicationSnapshot = await getDocs(w);
        const applicationList: Application[] = applicationSnapshot.docs.map((doc) => {
          const data = doc.data() as Application;

          if (data.appliedAt && data.appliedAt.seconds) {
            data.appliedAt = new Date(data.appliedAt.seconds * 1000).toLocaleDateString();
          }

          return data;
        });

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
      const q = query(communitiesCollectionRef, where('department', '==', 'AI and ML'));
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
        console.error('No community found with department "AI and ML".');
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    XLSX.writeFile(workbook, 'applications_data.xlsx');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return isCoordinator ? (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">AI and ML Community Details</h1>

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

      {/* Collapsible Section for Community */}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Community Coordinator</Accordion.Header>
          <Accordion.Body>
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
                      className="rounded-lg"
                    />
                  </div>
                  <h1 className="font-bold text-2xl">{community.faculty}</h1>
                  <h2 className="italic text-lg">{community.name}</h2>
                  <p className="text-center">{community.personalThoughts}</p>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Collapsible Section for Team Members */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Team Members</Accordion.Header>
          <Accordion.Body>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community, index) =>
                community.teamMembers.map((teamMember, memberIndex) => (
                  <div key={memberIndex} className="flex flex-col items-center border p-4 rounded-lg">
                    <h3 className="text-xl font-bold">{teamMember.name}</h3>
                    <p className="italic">{teamMember.role}</p>
                    <div className="flex space-x-4">
                      <a href={teamMember.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                      <a href={teamMember.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Collapsible Section for Applications */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Applications</Accordion.Header>
          <Accordion.Body>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-400">Name</th>
                    <th className="px-4 py-2 border border-gray-400">Registration Number</th>
                    <th className="px-4 py-2 border border-gray-400">Email</th>
                    <th className="px-4 py-2 border border-gray-400">Applied At</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">{application.name}</td>
                      <td className="border border-gray-400 px-4 py-2">{application.registrationNumber}</td>
                      <td className="border border-gray-400 px-4 py-2">{application.email}</td>
                      <td className="border border-gray-400 px-4 py-2">{application.appliedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button onClick={downloadExcel} className="bg-green-500 text-white p-2 rounded mt-4">
              Download Applications Data as Excel
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  ) : null;
};

export default CommunityPage;
