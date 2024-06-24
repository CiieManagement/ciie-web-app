import React from 'react';
import { Strings } from '@/public/values/strings';
import { SpeechCard } from '@/components/widgets/aboutScreenCards';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { IoMdExit } from 'react-icons/io';
import DefaultLayout from '@/layouts/default';

const Index = () => {
  return (
    <DefaultLayout>        
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4   bg-opacity-80 rounded-lg max-w-6xl mx-auto">
          <h1 className="mt-4 text-left text-3xl font-bold mb-10 md:text-4xl">
            Some Golden Words...
          </h1>
          <div className="flex flex-col gap-y-5 max-w-4xl mx-auto transition-all duration-300">
            {Object.values(Strings.professors).map((professor) => (
              <SpeechCard
                key={professor.name}
                name={professor.name}
                designation={professor.designation}
                speech={professor.speech}
                image={professor.image}
              />
            ))}
          </div>
        </div>
     </DefaultLayout>
  );
};

export default Index;
