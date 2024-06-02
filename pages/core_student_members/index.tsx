import React from 'react';
import { Strings } from '@/public/values/strings';
import { TeamMemberCard } from '@/components/widgets/aboutScreenCards';
import DefaultLayout from '@/layouts/default';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { IoMdExit } from 'react-icons/io';

const Index = () => {
  return (
    <DefaultLayout>
         <Link href="/about">
        <Button color="danger" variant="bordered" startContent={<IoMdExit className="transform rotate-180 size-7" />} className=' ml-10'>
        About Page
        </Button>
      </Link>
      <div className="relative min-h-screen bg-black py-12">
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-gray-900 bg-opacity-80 rounded-lg max-w-6xl mx-auto">
          <h1 className="mt-4 text-left text-3xl font-bold mb-10 text-white md:text-4xl">
            Meet Our Team
          </h1>
          <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2 transition-all duration-300 max-w-4xl mx-auto">
            {Object.values(Strings.team_members).map((member) => (
              <TeamMemberCard
                key={member.name}
                image={
                  member.image === ""
                    ? member.gender === "male"
                      ? "/anonymous_male.svg"
                      : "/anonymous_female.svg"
                    : member.image
                }
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}
              />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Index;
