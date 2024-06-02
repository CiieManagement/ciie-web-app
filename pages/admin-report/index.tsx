import { useEffect, useState } from 'react';
import { db } from '../../components/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import withAdminAuth from '@/components/withAdminAuth';
import Modal from '@/components/Model';
import { Button } from '@nextui-org/react';
import { IoMdExit } from "react-icons/io";
import Link from 'next/link';
import App from '../../pages/navbar1';
import BackdropAnimation from '@/components/utils/backdrop_animation';

interface Submission {
  email: string;
  name: string;
  regNo: string;
  uploadedAt: {
    seconds: number;
    nanoseconds: number;
  };
  year: string;
  fileUrl?: string;
  project?: string;
}

const AdminPage = () => {
  const [data, setData] = useState<Submission[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'submissions'));
        const dataList = querySnapshot.docs.map(doc => doc.data() as Submission);
        setData(dataList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = (project: string | undefined) => {
    setSelectedProject(project || null);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto p-4">
      <BackdropAnimation/>
      <App/>
      <div className='flex flex-row justify-between'>
        <h1 className="text-2xl font-bold mt-10">Data Table</h1>
          <Link href="/admin">
            <Button color="danger" variant="bordered" startContent={<IoMdExit className="transform rotate-180 size-7" />} className='mt-10 mb-5'>
              Admin Page
            </Button>
          </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Registration Number</th>
              <th className="py-2 px-4 border-b">Uploaded At</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">File</th>
              <th className="py-2 px-4 border-b">Project Des</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.email}</td>
                <td className="py-2 px-4 pl-16 border-b">{item.name}</td>
                <td className="py-2 px-4 pl-16 border-b">{item.regNo}</td>
                <td className="py-2 px-4 pl-16 border-b">{new Date(item.uploadedAt.seconds * 1000).toLocaleString()}</td>
                <td className="py-2 px-4 pl-12 border-b">{item.year}</td>
                <td className="py-2 px-4 border-b">
                  {item.fileUrl ? (
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View File
                    </a>
                  ) : (
                    'No file uploaded'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.project ? (
                    <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => handleProjectClick(item.project)}
                    >
                      {item.project.split(' ')[0] + "..."}
                    </span>
                  ) : (
                    'No description'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProject && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Project Description</h2>
          <p>{selectedProject}</p>
        </Modal>
      )}
    </div>
  );
};

export default withAdminAuth(AdminPage);
