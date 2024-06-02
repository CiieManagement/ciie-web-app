import React from 'react';
import { VisionCard } from '@/components/widgets/aboutScreenCards';
import { Strings } from '@/public/values/strings';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { IoMdExit } from 'react-icons/io';
import DefaultLayout from '@/layouts/default';

const Index = () => {
  return (
    <DefaultLayout>
          <Link href="/about">
            <Button color="danger" variant="bordered" startContent={<IoMdExit className="transform rotate-180 size-7" />}>
              About Page
            </Button>
          </Link>
      <div className="relative min-h-screen bg-black">
       
        {/* Admin Button */}

        {/* Main Content */}
        <div className="flex items-center justify-center py-12">
          <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-gray-900 bg-opacity-80 rounded-lg max-w-4xl">
            <h1 className="mt-4 text-left text-3xl font-bold mb-10 text-white sm:text-2xl md:text-4xl">
              Our Vision
            </h1>
            <VisionCard
              fixedflex={false}
              image={Strings.vision.image}
              visionText={Strings.vision.visionText}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Index;
