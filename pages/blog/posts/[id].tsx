import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../components/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import 'tailwindcss/tailwind.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Navbar } from '@/components/navbar';
import { auth } from '../../../components/firebaseConfig';

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    fetchBlog();

    return () => unsubscribe();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!blog) return <p>No blog found.</p>;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <div className=" mx-auto p-4 flex justify-center overflow-hidden">
        <div className="w-full sm:w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 mt-4 sm:mt-10 p-4 sm:p-6 border dark:bg-gray-800 dark:border-pink-600 rounded-lg shadow-md dark:shadow-[0_10px_20px_rgba(255,20,147,0.7)] dark:border-2 dark:border-opacity-50 overflow-x-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-1 sm:pb-2">
            {blog.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">By {blog.author}</p>
          <div className="mt-2 sm:mt-4 prose dark:prose-dark max-w-none overflow-x-auto">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
          {user && user.email === blog.userEmail && (
            <button
              onClick={() => router.push(`/blog/edit/${id}`)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Edit Blog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
