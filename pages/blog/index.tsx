import { useEffect, useState } from 'react';
import { db } from '../../components/firebaseConfig'; // Make sure to configure Firebase
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { auth } from '../../components/firebaseConfig';
import { useRouter } from 'next/router'; // Add this import if not already present
import toast, { Toaster } from 'react-hot-toast';

const Blogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const toastId = toast.loading('Loading blogs...'); // Show loading toast
      try {
        const blogCollection = collection(db, 'blogs');
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogList);
        toast.success('Blogs loaded successfully!', { id: toastId });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-6 border-1 dark:bg-gray-800 dark:border-pink-500 rounded-lg shadow-lg">
            <Link href={`/blog/posts/${blog.id}`}>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{blog.title}</div>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
            {user && user.email === blog.userEmail && (
              <button
                onClick={() => router.push(`/blog/edit/${blog.id}`)} // Update path
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Editclear npm run
              </button>
            )}
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default Blogs;
