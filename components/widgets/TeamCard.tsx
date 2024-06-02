"use client"
import { Console } from 'console'
import Image from 'next/image' 
import React from 'react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router';

import {motion} from "framer-motion"
// import { redirect } from 'next/dist/server/api-utils'


interface TeamMember {
    name: string,
    domain: string,
    image: string,
    description:string,
    gender: string,
    linkedin: string,
    github: string,
}

interface TeamListingProps {
    teamMembers: TeamMember[]
}

function TeamCardForHome({ teamMembers }: TeamListingProps) {
    
    // const router = useRouter();
    const handleRedirect = () => {
        window.location.href = '/about';
    
    };
    

    return (
        <div>

            {/* Desktop View */}
            <div className=' flex-col gap-4 animate-appearance-in flex lg:flex-row mx-auto mt-20'>


                <div className='flex mx-auto text-center lg:text-right mt-5 flex-col f max-w-lg lg:mr-10 z-20 backdrop-blur-sm'>
                    <h1 className=' font-bold text-3xl lg:text-5xl text-[#8800ff] mt-5 lg:mt-0 max-w-lg' >
                        Meet our team
                    </h1>
                    <h1 className=' text-lg mt-2 lg:text-xl'>
                        Our team is composed of talented and dedicated professionals who are passionate about delivering high-quality solutions to our clients. With diverse backgrounds and expertise, we work collaboratively to drive innovation and excellence in every project we undertake.
                    </h1>



                    <button className=' hidden lg:block mt-8 mb-auto w-fit rounded-full py-2 ml-auto shadow-sm text-white font-bold hover:scale-110 transition-all duration-300 px-4 bg-gradient-to-l from-purple-500 to-blue-400'  onClick={handleRedirect}> Know More About Us</button>


                </div>

                <div className=' max-w-md px-2 p-2 rounded-3xl border-2 border-gray-400/80'>

                    <motion.div className=' z-20 flex gap-2 flex-col w-full h-96 overflow-y-auto rounded-xl '
                    >
                        {teamMembers.slice(0,3).map((member) => (
                            <div key={member.name} className=' flex w-full p-3 rounded-2xl bg-gray-400/20 backdrop-blur-sm overflow-hidden'>
                                <div className=' max-w-[100px] mr-5'>
                                    <Image src={member.image == "" ? (member.gender == "male" ? "/anonymous_male.svg" : member.gender == "female" ? "/anonymous_female.svg" : "/anonymous_male.svg"): member.image} layout='responsive' width={50} height={20} alt={member.name + " Image"} className=' rounded-2xl' />
                                </div>

                                <div>
                                    <h1 className='font-bold text-xl text-left mt-1'>
                                        {member.name}
                                    </h1>
                                    <h1 className='text-sm opacity-70 text-left'>
                                        {member.domain}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>

            </div>
            <div
                className=' lg:hidden w-full place-content-center grid'
            >

            <button className=' mt-8 mb-auto w-fit rounded-full py-2 ml-auto shadow-sm text-white font-bold hover:scale-110 transition-all duration-300 px-4 bg-gradient-to-l from-purple-500 to-blue-400'> Meet our team</button>
            </div>


            {/* Mobile view */}
            {/* <div className=' flex flex-col lg:hidden lg:flex-row mx-auto mt-20'>

                <div className=' flex mx-auto mt-5 flex-col max-w-lg lg:mr-10 z-20 backdrop-blur-sm'>
                    <h1 className=' font-bold text-3xl lg:text-5xl text-[#8800ff] text-center mt-5 lg:mt-0 max-w-lg'>
                        Meet our team
                    </h1>
                    <h1 className=' text-lg mt-2 lg:text-xl text-center'>
                        Our team is composed of talented and dedicated professionals who are passionate about delivering high-quality solutions to our clients. With diverse backgrounds and expertise, we work collaboratively to drive innovation and excellence in every project we undertake.
                    </h1>


                </div>

                <div className=' max-w-md mt-5 px-2 pb-2 rounded-3xl border-2 border-gray-400/80'>

                    <div className=' z-20 flex flex-col w-full '>
                        {teamMembers.map((member) => (
                            <div key={member.name} className=' flex w-full p-3 rounded-2xl bg-gray-400/20 backdrop-blur-sm mt-2'>
                                <div className=' max-w-[100px] mr-5'>
                                    <Image src={member.imageUrl} layout='responsive' width={50} height={20} alt={''} className=' rounded-2xl' />
                                </div>

                                <div>
                                    <h1 className='font-bold text-xl text-left mt-1'>
                                        {member.name}
                                    </h1>
                                    <h1 className='text-sm opacity-70 text-left'>
                                        {member.branch}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


                <button className=' mt-5 mb-auto w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold hover:scale-110 transition-all duration-300 px-4 bg-gradient-to-l from-purple-500 to-blue-400'> View the whole team</button>

            </div> */}

        </div>

    )
}

export { TeamCardForHome };