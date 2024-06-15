import React, { useState } from 'react';
import { TeamMemberCard } from '@/components/widgets/aboutScreenCards';
import { Strings2 } from '@/public/values/strings2';
import {Navbar} from '../../components/navbar';
import BackdropAnimation from '@/components/utils/backdrop_animation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('First Year');

  const renderTeamMembers = (members: any[]) => {
    return members.map((member) => (
      <TeamMemberCard
        key={member.name}
        image={
          member.image === ''
            ? member.gender === 'male'
              ? '/anonymous_male.svg'
              : '/anonymous_female.svg'
            : member.image
        }
        description={member.description}
        name={member.name}
        domain={member.domain}
        linkedin={member.linkedin}
        github={member.github}
      />
    ));
  };

  return (
    <div>
      <Navbar />
      <BackdropAnimation />
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-gray-900 bg-opacity-80 rounded-lg max-w-6xl mx-auto">
        <h1 className="mt-4 text-3xl font-bold mb-10 text-white md:text-4xl">
          Team Members
        </h1>
        <div className="flex space-x-4 mb-8">
          {['First Year', 'Second Year', 'Third Year'].map((year) => (
            <button
              key={year}
              onClick={() => setActiveTab(year)}
              className={`py-2 px-4 rounded-lg focus:outline-none ${
                activeTab === year
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="transition-all duration-300 max-w-4xl mx-auto">
          {activeTab === 'Third Year' && (
            <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2">
              {renderTeamMembers(Object.values(Strings2.Third_Year))}
            </div>
          )}
          {activeTab === 'Second Year' && (
            <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2">
              {renderTeamMembers(Object.values(Strings2.Second_Year))}
            </div>
          )}
          {activeTab === 'First Year' && (
            <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2">
              {renderTeamMembers(Object.values(Strings2.First_Year))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
