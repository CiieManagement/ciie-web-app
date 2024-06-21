import React from 'react';
import { AllumniCard } from '@/components/widgets/aboutScreenCards';
 
import DefaultLayout from '@/layouts/default';
 
import { allumni } from '@/public/values/allumni';

const Index = () => {
  return (
    <DefaultLayout>
        
      <div className="bg-black py-12">
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-gray-900 bg-opacity-80 rounded-lg max-w-6xl mx-auto">
          <h1 className="mt-4 text-left text-3xl font-bold mb-10 text-white md:text-4xl">
            Our Alumni
          </h1>
          <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2 transition-all duration-300 max-w-4xl mx-auto">
            {Object.values(allumni.alumni).map((member) => (
              <AllumniCard
                key={member.name}
                image={member.image === ""
                  ? member.gender === "male"
                    ? "/anonymous_male.svg"
                    : "/anonymous_female.svg"
                  : member.image}
                batch={member.Batch}
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}
                twitter = {member.twitter}           />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Index;
