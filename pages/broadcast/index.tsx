// frontend/pages/success.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../components/firebaseConfig'; // Assuming auth is exported from your Firebase config
import toast, { Toaster } from 'react-hot-toast';
import BackdropAnimation from '@/components/utils/backdrop_animation';
import App from '../../pages/navbar1';

const SuccessPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [subject, setSubject] = useState('');
    const [emailIds, setEmailIds] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/login'); // Redirect to login page if not logged in
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, []);

    const baseUrl = "https://ciie-request-backend.onrender.com";

    const handleEmailChange = (e) => {
        const { value } = e.target;

        // Split input by commas or spaces, trim whitespace, and filter out empty strings
        const emails = value.split(/[ ,]+/)
            .map(email => email.trim())
            .filter(email => email !== "");

        setEmailIds(emails.join(', '));
    };

    const sendEmail = async () => {
        try {
            const emails = emailIds.split(',').map(email => email.trim());

            const dataSend = {
                emails: emails,
                subject: subject,
                message: message,
            };

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
            console.error('Error sending email: ', error);
            toast.error("An error occurred while sending the message");
        }
    };

    return (
        <>
            <App />
            <BackdropAnimation />
            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    <div className="flex flex-col space-y-4 p-4">
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Enter multiple email IDs separated by commas"
                            value={emailIds}
                            onChange={handleEmailChange}
                            onBlur={handleEmailChange}
                            className="p-2 border border-gray-300 rounded"
                            rows="4"
                        />
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            rows="4"
                        />
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            onClick={sendEmail}
                        >
                            Send
                        </button>
                    </div>
                </div>
                <Toaster position='bottom-center' />
            </div>
        </>
    );
};

export default SuccessPage;
