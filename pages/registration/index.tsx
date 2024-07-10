/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Register from '@/public/register.svg'
import { Orbitronn } from '@/config/fonts'
import Girl from '@/public/registergirl.svg'
import { Input } from "@nextui-org/input";
import Book from '@/public/book.svg'
import { CheckboxGroup, Checkbox, Divider } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import Link from 'next/link';
import Email from "@/public/emails.json"
import {Navbar} from '../../components/navbar'

const index = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [collage, setCollage] = useState("");
    const [year, setYear] = useState("");
    const [yourcourse, setYourcourse] = useState("");
    const [rnumber, setRnumber] = useState("");
    const [selectedDomain, setSelectedDomain] = useState<string[]>([]);

    const updateDateTime = () => {
        setCurrentDateTime(new Date().toLocaleString());
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name === "" || number === "" || email === "" || collage === "" || year === "" || yourcourse === "" || rnumber === "" ) {
            toast.warn('Fill all the fields before submitting: ', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
        }
        else if(Email.some(user => user.email === email)){
            toast.warn('You can not use one email twice for registraion: Change Mail ', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        }
        else {

            const res = await fetch('/api/addEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            updateDateTime();

            const data = {
                Time: currentDateTime,
                Name: name,
                Number: number,
                Email: email,
                Collage: collage,
                Year: year,
                YourCourse: yourcourse,
                RegistrationNumber: rnumber,
                f: "IPR COURSE",
            }

            axios.post('https://docs.google.com/spreadsheets/d/1wiPP0ApVFX-E_D5015cWt36WrYJzsrFub-TWTpn3VyI/edit?usp=sharing', data).then((response) => {
                 setName('');
                setNumber('');
                setEmail('');
                setCollage('');
                setYear('');
                setYourcourse('');
                setRnumber('');
                setSelectedDomain([]);
            })


            toast('🦄Report submitted successfuly!', {
                position: "top-left",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


            if (confirm("Kindly join our whatsapp Anouncement group in it. Click OK to proceed.")){
                window.open("https://chat.whatsapp.com/Buq9Z2YAc0e4ei1baTjFbk")
            }
        }
    }

    const handleDomainChange = (domain: string) => {
        if (selectedDomain.includes(domain)) {
            setSelectedDomain(selectedDomain.filter((item) => item !== domain));
        } else {
            setSelectedDomain([...selectedDomain, domain]);
        }
    }

    return (
        <div>
            <Navbar /> 
            <div className='flex justify-center flex-col md:flex-row p-20'>
                <div className='md:w-3/5 '>
                    <div className='animate-appearence-in-view flex justify-center'>
                        <Image src={Register} alt='register Here' height={400} width={400} />
                    </div>
                    <div className={Orbitronn.className}>
                        <div className='text-purple-600 text-3xl font-bold animate-slide-in-from-left ml-20'>
                            CIIE Courses
                        </div>
                    </div>
                    <div className='animate-slide-in-from-left flex justify-center'>
                        Will teach you how to unlock your potential and take your first step in this tech world.The best example for made by students for the students 😁
                    </div>
                    <div className='flex items-start '>
                        <div className='border-2 animate-slide-in-from-left dark:bg-gray-900 mt-5 border-blue-500 shadow-lg hover:shadow-blue-300 dark:hover:shadow-blue-600 transition duration-300 rounded-lg w-[400px] md:w-auto md:mt-7 md:pb-3 md:pr-3'>
                            <div className='flex md:items-start flex-col md:flex-row pt-5 md:pt-0 '>
                                <div className='flex justify-center md:justify-start md:mt-10 md:ml-3 animate-slide-in-from-right  '>
                                    <Image src={Girl} alt='Girl' height={300} width={200} />
                                </div>
                                <div>
                                    <div className='text-blue-500 text-3xl flex justify-center md:justify-start  md:mt-3 md:text-2xl font-bold '>
                                        <div className={Orbitronn.className}>
                                            Register Now
                                        </div>
                                    </div>
                                    <div className=' ml-24 text-left text-[15px]'>
                                        and get 👇🏾
                                    </div>
                                    <div className='flex justify-center md:justify-start text-[15px] mb-5 md:mb-0 md:pl-3 md:ml-2 mt-5'>
                                        • Access to the exclusive first webinar<br />
                                        • Introduction to Latest Industry Tech<br />
                                        • Domain Selection Guidence <br />
                                        • One On One Mentor Ship <br />
                                        • Learn Intership Strategies <br />
                                        • Time Management Skills
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='animate-slide-in-from-right mt-10 md:mt-0 md:w-2/3 border-2 border-purple-500 shadow-md hover:shadow-lg hover:shadow-purple-400  transition duration-300 md:ml-5 rounded-xl p-5'>
                    <div className='flex items-start'>
                        <Image src={Book} alt='book' height={100} width={100} />
                        <div className='flex flex-col items-end'>
                            <div className='flex items-start '>
                                <div className='flex flex-col md:flex-row gap-2'>
                                    <div className='flex flex-row gap-2'>
                                        <div className='text-[12px] md:text-2xl font-bold mb:mb-2 mt-3'>Registering for</div>
                                        <div className={Orbitronn.className}>
                                            <div className='text-[12px] mt-3 md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500'>IPR and Cyber</div>
                                        </div>
                                    </div>
                                    <div className='text-[12px] md:mt-3 md:text-2xl font-bold mb-2'></div>
                                </div>
                            </div>
                         </div>
                    </div>
                    <div className='mt-6 font-bold'>
                        Personal Information:
                    </div>
                    <div className='flex items-start gap-2'>
                        <div className='w-[300px] mt-6 dark:bg-gray-900 rounded-xl'>
                            <Input type="text"
                                id="name"
                                value={name}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setName(e.target.value)}
                                label="Name" />
                        </div>
                        <div className=' w-[300px] mt-6 dark:bg-gray-900'>
                            <Input type="text"
                                id="number"
                                value={number}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setNumber(e.target.value)}
                                label="Phone No." />
                        </div>
                    </div>
                    <div className=' w-full mt-6 dark:bg-gray-900'>
                        <Input type="email"
                            id="email"
                            value={email}
                            onChange={(e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value)}
                            label="Email" />
                    </div>
                    <div className='mt-6 font-bold'>
                        College Information:
                    </div>
                    <div className='flex items-start gap-2'>
                        <div className='w-[300px] mt-6  dark:bg-gray-900 rounded-xl'>
                            <Input type="text"
                                id="collage"
                                value={collage}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setCollage(e.target.value)}
                                label="College" />
                        </div>
                        <div className=' w-[300px] mt-6  dark:bg-gray-900'>
                            <Input type="text"
                                id="yourcourse"
                                value={yourcourse}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setYourcourse(e.target.value)}
                                label="College Course" />
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <div className='w-[300px] mt-7 md:mt-6  dark:bg-gray-900 rounded-xl'>
                            <Input type="text"
                                id="rnumber"
                                value={rnumber}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setRnumber(e.target.value)}
                                label="Reg. Number" />
                        </div>
                        <div className=' w-[300px] mt-7 md:mt-6  dark:bg-gray-900'>
                            <Input type="text"
                                id="year"
                                value={year}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setYear(e.target.value)}
                                label="Year" />
                        </div>
                    </div>

                    <div className='mt-8 flex justify-end'>
                        <Button color="secondary" variant="ghost" className=' w-32 ml-10' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default index;