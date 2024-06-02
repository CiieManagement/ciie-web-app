import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../../components/firebaseConfig'; // Assuming auth is exported from your Firebase config
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DefaultLayout from '@/layouts/default';
import Modal from '../../components/Model'; // Ensure the path is correct
import Link from 'next/link';
import { Button, Navbar } from '@nextui-org/react';
import { IoMdExit } from 'react-icons/io';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import BackdropAnimation from '@/components/utils/backdrop_animation';
import App  from '../../pages/navbar1';

const SuccessPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null); // State to hold user data if needed
    const [requests, setRequests] = useState([]);
    const [selectedReason, setSelectedReason] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/login'); // Redirect to login page if not logged in
            } else {
                setUser(user);
                fetchData(); // Fetch data if logged in
            }
        });

        return () => unsubscribe();
    }, []);

    const baseUrl = "https://ciie-request-backend.onrender.com";

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'requests'));
            const fetchedRequests = [];
            querySnapshot.forEach((doc) => {
                fetchedRequests.push({ id: doc.id, ...doc.data() });
            });
            setRequests(fetchedRequests);
        } catch (error) {
            console.error('Error fetching data from Firebase: ', error);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return date.toLocaleString();
    };

    const handleReasonClick = (reason) => {
        setSelectedReason(reason);
    };

    const closeModal = () => {
        setSelectedReason(null);
    };

    const handleReject = async (id) => {
        try {
            toast.success("Data deleted");
            await deleteDoc(doc(db, 'requests', id));
            setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const sendEmail = async (request) => {
        try {
            // Example of sending email
            const dataSend = {
                email: request.email,
                subject: "Request Accepted",
                message: "Your application for joining CIIE has been accepted",
            };

            await deleteDoc(doc(db, 'requests', request.id));
            setRequests((prevRequests) => prevRequests.filter((req) => req.id !== request.id));

            toast.success("Mail sent, wait fetching current data");

            setTimeout(() => {
                window.location.reload();
            }, 5000);

            const res = await fetch(`${baseUrl}/email/sendEmail`, {
                method: "POST",
                body: JSON.stringify(dataSend),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                toast.success("Message sent successfully!");
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            console.error('Error accepting document: ', error);
        }
    };

    return (
       <>
       <App/>
            <BackdropAnimation />
            <div className="container mx-auto">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold mt-6">Requests</h1>
                    <Link href="/admin">
                        <Button
                            color="danger"
                            variant="bordered"
                            startContent={<IoMdExit className="transform rotate-180 size-5" />}
                            className="mb-5 mt-5"
                        >
                            Admin Page
                        </Button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-black border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Year</th>
                                <th className="py-2 px-4 border-b">Specialization</th>
                                <th className="py-2 px-4 border-b">Technical Skills</th>
                                <th className="py-2 px-4 border-b">Reason to Join CIIE</th>
                                <th className="py-2 px-4 border-b">Submitted At</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td className="py-2 px-4 border-b">{request.name}</td>
                                    <td className="py-2 px-4 border-b">{request.email}</td>
                                    <td className="py-2 px-4 border-b">{request.year}</td>
                                    <td className="py-2 px-4 border-b">{request.specialization}</td>
                                    <td className="py-2 px-4 border-b">{request.technicalSkills}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span
                                            className="text-blue-500 hover:underline cursor-pointer"
                                            onClick={() => handleReasonClick(request.reasonToJoin)}
                                        >
                                            {request.reasonToJoin ? request.reasonToJoin.slice(0, 10) + '...' : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">{formatDate(request.submittedAt)}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="text-green-500 hover:underline mr-2"
                                            onClick={() => sendEmail(request)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedReason && (
                    <Modal onClose={closeModal}>
                        <h2 className="text-xl font-bold mb-4">Reason to Join CIIE</h2>
                        <p>{selectedReason}</p>
                    </Modal>
                )}
                <Toaster position='bottom-center'/>
            </div>
            </>
    );
};

export default SuccessPage;
