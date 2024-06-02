import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';

function SearchingForInnovationCard() {
    return (
        <div>
            <div className='flex flex-col lg:w-[90%] text-center lg:flex-row rounded-2xl bg-gray-400/20 py-2 px-4 lg:p-10 mt-10 lg:mt-20 z-20 transition-all duration-500 backdrop-blur-sm lg:hidden '>
                <div className='m-10 mx-auto max-w-[300px]'>
                    <Image src={'/telescope.svg'} layout='responsive' width={100} height={100} alt={''} className='mx-auto' />
                </div>
                <div className='flex flex-col max-w-lg mb-5'>
                    <h1 className='text-3xl lg:text-4xl font-bold text-[#8800ff]'> Searching for Innovation </h1>
                    <h1 className='mt-2 text-lg'>CIIE Provides the direction for the innovative ideas and creators</h1>
                    <h1 className='mt-2 text-lg'>it&apos;s about igniting the passion and purpose within every individual, guiding them towards a future where innovation thrives and possibilities are endless.</h1>
                    <Link href="/connect">
                        <button className='mt-10 w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold hover:scale-110 transition-all duration-300 px-4 bg-gradient-to-l from-purple-500 to-blue-400'>Join and Innovate with us</button>
                    </Link>
                    <button className='mt-4 w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold px-4 bg-gradient-to-l hover:scale-110 transition-all duration-300 from-purple-500 to-blue-400'> Or independently contribute your ideas</button>
                </div>
            </div>
            <div className='flex-row w-full h-fit mx-auto text-center rounded-2xl bg-gray-400/20 py-2 px-10 lg:pt-10 lg:px-10 pb-0 mt-10 lg:mt-20 z-20 transition-all duration-500 backdrop-blur-sm lg:flex hidden animate-appearance-in '>
                <div className='flex flex-col max-w-lg'>
                    <h1 className='text-3xl lg:text-4xl font-bold text-[#8800ff]'> Searching for Innovation </h1>
                    <h1 className='mt-2 text-lg'>CIIE Provides the direction for the innovative ideas and creators</h1>
                    <h1 className='mt-2 text-lg'>it&apos;s about igniting the passion and purpose within every individual, guiding them towards a future where innovation thrives and possibilities are endless.</h1>
                    <Link href="/connect">
                        <button className='mt-auto mb-2 w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold hover:scale-110 transition-all duration-300 px-4 bg-gradient-to-l from-purple-500 to-blue-400'> Join and Innovate with us</button>
                    </Link>
                    <button className='mb-10 w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold px-4 bg-gradient-to-l hover:scale-110 transition-all duration-300 from-purple-500 to-blue-400'> Or independently contribute your ideas</button>
                </div>
                <div className='m-10 max-w-[300px]'>
                    <Image src={'/telescope.svg'} layout='responsive' width={100} height={100} alt={''} className='' />
                </div>
            </div>
        </div>
    )
}

function AllAboutLearningCard() {
    return (
        <div className='flex flex-col lg:w-[90%] text-center lg:flex-row rounded-2xl bg-transparent py-2 px-4 lg:p-10 mt-10 lg:mt-20 z-20 transition-all duration-500 backdrop-blur-sm '>
            <div className='m-10 max-w-sm'>
                <Image src={'/learning.svg'} layout='responsive' width={100} height={100} alt={''} className='' />
            </div>
            <div className='flex flex-col max-w-md mb-5'>
                <h1 className='text-3xl lg:text-4xl font-bold text-[#8800ff]'> And..It&apos;s all about Learning </h1>
                <h1 className='mt-2 text-lg'>Learning is a treasure that follows its owner everywhere</h1>
                <h1 className='mt-2 text-lg'>The more that you read, the more things you will know. The more that you learn, the more places you&apos;ll go. The beautiful thing about learning is that no one can take it away from you</h1>
            </div>
        </div>
    )
}

function WorkIsPriorityCard() {
    return (
        <div>
            <div className='flex flex-col lg:w-[90%] text-center lg:flex-row rounded-2xl bg-gray-400/20 py-2 px-4 lg:p-10 mt-10 lg:mt-20 z-20 transition-all duration-500 backdrop-blur-sm lg:hidden '>
                <div className='m-10 mx-auto max-w-[300px]'>
                    <Image src={'/work.svg'} layout='responsive' width={100} height={100} alt={''} className='mx-auto' />
                </div>
                <div className='flex flex-col max-w-lg mb-5'>
                    <h1 className='text-3xl lg:text-4xl font-bold text-[#8800ff]'> Work on your Priority! </h1>
                    <h1 className='mt-2 text-lg'> Here, work on your priorities, not on what&apos;s easy. Often, the most important tasks are the ones that require more effort, focus, and dedication.</h1>
                    <h1 className='mt-2 text-lg'>Dive deep into what&apos;s unknown and left to explore yet. The treasure is hidden in the dark and depth, not on the surface</h1>
                    <button className='mt-10 w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold px-4 hover:scale-110 transition-all duration-300 bg-gradient-to-l from-purple-500 to-blue-400'> View common rules for CIIE room</button>
                </div>
            </div>
            <div className='flex-row w-full h-fit mx-auto text-center rounded-2xl bg-gray-400/20 py-2 px-10 lg:pt-10 lg:px-10 pb-0 mt-10 lg:mt-20 z-20 transition-all duration-500 backdrop-blur-sm lg:flex hidden animate-appearance-in '>
                <div className='flex flex-col max-w-lg'>
                    <h1 className='text-3xl lg:text-4xl font-bold
                text-[#8800ff]'> Work on your Priority! </h1>
                <h1 className='mt-2 text-lg'>Dive deep into what&apos;s unknown and left to explore yet. The treasure is hidden in the dark and depth, not on the surface!</h1>
                <h1 className='mt-2 text-lg'>Dive deep into what&apos;s unknown and left to explore yet. The treasure is hidden in the dark and depth, not on the surface</h1>
                <button className='mt-auto mb-10 w-fit rounded-full py-2 mx-auto shadow-sm text-white font-bold hover:scale-110 transition-all duration-300 px-4 bg-gradient-to-l from-purple-500 to-blue-400'> View common rules for CIIE room</button>
                </div>
                <div className='m-10 max-w-[300px]'>
                <Image src={'/work.svg'} layout='responsive' width={100} height={100} alt={''} className='' />
                </div>
                </div>
                </div>
                )
                }

                export { SearchingForInnovationCard };
                export { AllAboutLearningCard };
                export { WorkIsPriorityCard };
