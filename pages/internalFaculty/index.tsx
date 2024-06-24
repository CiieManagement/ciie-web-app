import React from 'react';
import DefaultLayout from '@/layouts/default';
import {InternalFaculty } from '@/components/widgets/aboutScreenCards';
import { InternalFacultyData } from '@/public/values/InternalFaculty';
import { allumni } from '@/public/values/allumni';
import withAdminAuth from "@/components/withAdminAuth";

const DocsPage = () => {
  return (
    <DefaultLayout>
        
      <div className="bg-black py-12">
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-gray-900 bg-opacity-80 rounded-lg max-w-6xl mx-auto">
          <h1 className="mt-4 text-left text-3xl font-bold mb-10 text-white md:text-4xl">
            Internal CIIE Faculty
          </h1>
          <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2 transition-all duration-300 max-w-4xl mx-auto">
            {Object.values(InternalFacultyData.InternalFacultyData).map((member) => (
              <InternalFaculty
                key={member.name}
                image={member.image === ""
                  ? member.gender === "male"
                    ? "/anonymous_male.svg"
                    : "/anonymous_female.svg"
                  : member.image}
                position={member.position}
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}
                twitter = {member.twitter}   
                google_scholar={member.google_scholar}/>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DocsPage;
