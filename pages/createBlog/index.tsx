import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../components/firebaseConfig'; 
import { addDoc, collection } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Navbar } from '@/components/navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../components/firebaseConfig';  
import { User } from 'firebase/auth';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NewBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true); 
  const [date, setDate] = useState('');
  const [ciieEmail, setCiieEmail] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName || "");
        setEmail(user.email || "");
        setCiieEmail(user.email || ""); // Automatically set ciieEmail
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const blog = { title, content, author, date, ciieEmail, userEmail: email };
    try {
      await addDoc(collection(db, 'pendingBlogs'), blog); // Save to pendingBlogs
      toast.success("Blog submitted for review");
      setTimeout(() => {
        router.push('/blog');
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      toast.error("Failed to submit blog");
      console.error("Error adding document: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (isSmallScreen) {
    return (
      <>
        <Navbar />
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold p-6">
          <div className="relative p-8 bg-gray-900 rounded-lg shadow-lg">
            <span>Please use a laptop or larger screen to write the blog.</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {user ? (
          <>
            <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-indigo-400">
              Welcome to the blog section !!!
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6 dark:bg-gray-800 p-8 shadow-lg rounded-lg">
              <div className="space-y-4 dark:bg-gray-700">
                <label htmlFor="title" className="sr-only">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="space-y-16">
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="h-64"
                    modules={{
                      toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video'],
                        ['clean'],
                        ['emoji']
                      ]
                    }}
                  />
                  <label htmlFor="author" className="sr-only">Author</label>
                  <input
                    id="author"
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                {/* Removed the ciieEmail input field */}
                <label htmlFor="date" className="sr-only">Date</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Submit
              </button>
            </form>
            <ToastContainer />
          </>
        ) : (
          <p className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold p-6">
            <div className="relative p-8 bg-gray-900 rounded-lg shadow-lg">
              <button
                onClick={() => router.push('/login')}
                className="absolute top-2 right-2 text-white hover:text-gray-400"
              >
                &times;
              </button>
              <span>Please log in to create a blog post.</span>
            </div>
          </p>
        )}
      </div>
    </>
  );
};

export default NewBlog;
