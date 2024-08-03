import { useEffect, useState } from 'react';
import { db } from '../../../components/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAdminAuth from '@/components/withAdminAuth';
import Navbar from '../../../pages/navbar1'
import Link from 'next/link';
// Define a TypeScript interface for the blog data
interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  ciieEmail: string;
  userEmail: string;
}

const ReviewBlogs = () => {
  const [pendingBlogs, setPendingBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleBlogId, setVisibleBlogId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        const blogCollection = collection(db, 'pendingBlogs');
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog)); // Type assertion
        setPendingBlogs(blogList);
      } catch (error) {
        toast.error('Failed to load pending blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBlogs();
  }, []);

  const handleAccept = async (blog: Blog) => {
    try {
      await setDoc(doc(db, 'blogs', blog.id), blog); // Use setDoc to explicitly set the document ID
      await deleteDoc(doc(db, 'pendingBlogs', blog.id));
      setPendingBlogs(pendingBlogs.filter(b => b.id !== blog.id));
      toast.success('Blog accepted and published');
    } catch (error) {
      toast.error('Failed to accept blog');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pendingBlogs', id));
      setPendingBlogs(pendingBlogs.filter(b => b.id !== id));
      toast.success('Blog rejected and deleted');
    } catch (error) {
      toast.error('Failed to reject blog');
    }
  };

  const toggleView = (id: string) => {
    setVisibleBlogId(prevId => (prevId === id ? null : id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">Pending Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/blog/pendingBlogs" passHref>
            <div className="bg-gray-800 shadow-md rounded-lg p-6 cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">Pending Blogs</h2>
              <p className="text-gray-300 mb-4">Blogs that needs permission for publishing will be here</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Review Pending Blogs</button>
            </div>
          </Link>

          <Link href="/blog/pastBlogs" passHref>
          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold ">Past Blogs</h2>
            <p className="text-gray-300 py-5 mb-4">Blogs that are rejected will be here</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Review Past Blogs</button>
          </div>
        </Link>
            <Link href="/blog/currentBlogs" passHref>
            <div className="bg-gray-800 shadow-md rounded-lg p-6 cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">Current Blogs</h2>
              <p className="text-gray-300 mb-4">Blogs that are currenlty published can be managed here</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Review currently published Blogs</button>
            </div>
          </Link>  
        
        </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default withAdminAuth(ReviewBlogs);
