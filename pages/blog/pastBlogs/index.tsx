    import { useEffect, useState } from 'react';
    import { db } from '../../../components/firebaseConfig';
    import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import withAdminAuth from '@/components/withAdminAuth';
    import Navbar from "../../../pages/navbar1"


    interface Blog {
        id: string;
        title: string;
        author: string;
        date: string;
        content: string;
        ciieEmail: string;
        userEmail: string;
    }
    
    const PastBlogs = () => {
        const [loading, setLoading] = useState<boolean>(true);
        const [visibleBlogId, setVisibleBlogId] = useState<string | null>(null);
        const [pastBlogs, setPastBlogs] = useState<Blog[]>([]);

        useEffect(() => {
        const fetchPastBLogs = async () => {
            try {
            const blogCollection = collection(db, 'pastBlogs');
            const blogSnapshot = await getDocs(blogCollection);
            const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog)); // Type assertion
            setPastBlogs(blogList);
            } catch (error) {
            toast.error('Failed to load pending blogs');
            } finally {
            setLoading(false);
            }
        };
    
        fetchPastBLogs();
        }, []);
    
        const handleAccept = async (blog: Blog) => {
        try {
            await setDoc(doc(db, 'pendingBlogs', blog.id), blog); // Use setDoc to explicitly set the document ID
            await deleteDoc(doc(db, 'pastBlogs', blog.id));
            setPastBlogs(pastBlogs.filter(b => b.id !== blog.id));
            toast.success('Blog restored and sent to pending blogs');
        } catch (error) {
            toast.error('Failed to accept blog');
        }
        };
    
        const handleReject = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'pastBlogs', id));
            setPastBlogs(pastBlogs.filter(b => b.id !== id));
            toast.success('Blog rejected and got permanently deleted');
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
            {pastBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBlogs.map((blog) => (
                <div
                key={blog.id}
                className="relative p-6 rounded-lg shadow-lg border"
                >
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
                        Restore
                    </button>
                    <button
                        onClick={() => handleReject(blog.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                        Delete Permanently
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
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">No past blogs at the moment.</p>
                <p className="text-gray-500 dark:text-gray-400">Please check back later.</p>
            </div>
            </div>
        )}
        <ToastContainer />
        </div>
        </>
    );
    };

    export default withAdminAuth(PastBlogs);
