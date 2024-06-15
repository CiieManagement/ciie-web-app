import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackdropAnimation from '@/components/utils/backdrop_animation';
import {Navbar} from '../../components/navbar';

const certifications = [
  {
    title: "Certificate of Recognition",
    pdf: "/ciie1.pdf",
    thumbnail: "/ciie_cover1.png", // Thumbnail image path
    description: "This is the certification of recognition."
  },
  {
    title: "Certificate of Establishment",
    pdf: "/ciie2.pdf",
    thumbnail: "/ciie_cover2.png", // Thumbnail image path
    description: "This is the certificate issued by mhrd."
  }
];

const Certifications = () => {
  return (
    <>
    <Navbar/>
    <BackdropAnimation/>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64">
              <Image 
                src={cert.thumbnail}
                alt={cert.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Link href={cert.pdf} target="_blank" rel="noopener noreferrer">
                     View Full PDF     
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">{cert.title}</h3>
              <p>{cert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Certifications;
