import { useEffect, useState } from 'react';
import { db } from '../../../components/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Navbar } from '@/components/navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAdminAuth from '@/components/withAdminAuth';

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
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">Pending Blogs</h1>
      {pendingBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingBlogs.map((blog) => (
            <div
              key={blog.id}
              className="relative p-6 rounded-lg shadow-lg border"
            >
              {/* Conditionally render the border overlay for the selected blog */}
              {visibleBlogId === blog.id && (
                <div className="absolute inset-0 border-2 border-indigo-600 rounded-lg pointer-events-none"></div>
              )}
              <div className="relative z-10">
                <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{blog.title}</div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
                <div className="mt-4">
                  <button
                    onClick={() => toggleView(blog.id)}
                    className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    {visibleBlogId === blog.id ? 'Hide' : 'View'}
                  </button>
                  <button
                    onClick={() => handleAccept(blog)}
                    className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(blog.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Reject
                  </button>
                </div>
                {visibleBlogId === blog.id && (
                  <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-900 overflow-auto max-w-full">
                    <h2 className="text-xl font-semibold mb-2">Content:</h2>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">No pending blogs at the moment.</p>
            <p className="text-gray-500 dark:text-gray-400">Please check back later.</p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default withAdminAuth(ReviewBlogs);
