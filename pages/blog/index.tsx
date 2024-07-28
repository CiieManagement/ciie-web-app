import { useEffect, useState } from 'react';
import { db } from '../../components/firebaseConfig'; // Make sure to configure Firebase
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { auth } from '../../components/firebaseConfig';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';




const Blogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, 'blogs');
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogList);
       } catch (error) {
        toast.error('Failed to load blogs', { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    fetchBlogs();
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">Blogs</h1>
    {blogs.length > 0 ? (
      <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-6 border-1 dark:bg-gray-800 dark:border-pink-500 rounded-lg shadow-lg">
              <Link href={`/blog/posts/${blog.id}`}>
                <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{blog.title}</div>
              </Link>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
              {user && user.email === blog.userEmail && (
                <button
                  onClick={() => router.push(`/blog/edit/${blog.id}`)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div></>
    ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">No blogs at the moment.</p>
            <Link href="/createBlog">
              <p className="text-gray-500 dark:text-gray-400">Or Create One</p>
            </Link>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Blogs;
