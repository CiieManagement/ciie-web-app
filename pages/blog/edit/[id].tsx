import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../components/firebaseConfig'; // Ensure correct path
import { doc, getDoc, setDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Navbar } from '@/components/navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../../components/firebaseConfig'; // Ensure correct path

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query; // Fetch blog ID from URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [ciieEmail, setCiieEmail] = useState('');
  const [date, setDate] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // Loading authentication state
  const [loadingData, setLoadingData] = useState(true); // Loading data state
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Consider screen width less than 1024px as small
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return; // Ensure blog ID is available
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);

      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
        setDate(data.date);
        setCiieEmail(data.ciieEmail);
        const userData = auth.onAuthStateChanged(async (user) => {
          if (data.userEmail !== user.email) {
            console.log("Email is ", data.userEmail);
            setIsAuthorized(false);
        }
          
        })}
       else {
        console.log("No such document!");
      }
      setLoadingData(false); // Set loadingData to false after data is fetched
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email || "");
        setLoadingAuth(false); // Set loadingAuth to false once auth is loaded
        if (id) {
          await fetchBlog();
        }
      } else {
        setUser(null);
        setLoadingAuth(false);
        setLoadingData(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, email]);

  const handleUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const blogRef = doc(db, 'pendingBlogs', id);
      await setDoc(blogRef, {
        title,
        content,
        author,
        date,
        ciieEmail,
        userEmail: email,
      });
      toast.success("Blog updated and sent for review");
      router.push('/blog');
    } catch (error) {
      toast.error("Failed to update blog");
      console.error("Error updating document: ", error);
    }
  };

  if (loadingAuth || loadingData) return <p>Loading...</p>;

  if (isSmallScreen) {
    return (
      <>
        <Navbar />
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold p-6">
          <div className="relative p-8 bg-gray-900 rounded-lg shadow-lg">
            <span>Please use a laptop or larger screen to edit the blog.</span>
          </div>
        </div>
      </>
    );
  }

  if (!isAuthorized) {
    return (
      <>
        <Navbar />
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold p-6">
          <div className="relative p-8 bg-gray-900 rounded-lg shadow-lg">
            <span>You are not authorized to edit this blog post.</span>
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
              Edit Blog
            </h1>
            <form onSubmit={handleUpdate} className="space-y-6 dark:bg-gray-800 p-8 shadow-lg rounded-lg">
              <div className="space-y-4 dark:bg-gray-700">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className='space-y-16'>
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
                        ['emoji'] // For emoji support
                      ]
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="text"
                    placeholder="CIIE Email"
                    value={ciieEmail}
                    onChange={(e) => setCiieEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <input
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
                Update
              </button>
            </form>
            <ToastContainer />
          </>
        ) : (
          <p className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold p-6">
            <div className="relative p-8 bg-gray-900 rounded-lg shadow-lg">
              <button
                onClick={() => window.location.replace('/login')} // Adjust the route as needed
                className="absolute top-2 right-2 text-white hover:text-gray-400"
              >
                &times;
              </button>
              <span>Please log in to edit a blog post.</span>
            </div>
          </p>
        )}
      </div>
    </>
  );
};

export default EditBlog;
