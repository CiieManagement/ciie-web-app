import React from 'react'
import { VisionCard } from '@/components/widgets/aboutScreenCards'
import { Strings } from '@/public/values/strings'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { IoMdExit } from 'react-icons/io'
import DefaultLayout from '@/layouts/default'

const Index = () => {
  return (
    <DefaultLayout>
    <div className="relative min-h-screen flex items-center justify-center py-12">
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-opacity-80 rounded-lg max-w-6xl">
        <h1 className="mt-4 text-left text-3xl font-bold mb-10 md:text-4xl">
          Our Mission
        </h1>
        <div className="grid gap-y-10 gap-x-5 sm:gap-y-4 md:grid-cols-3 sm:grid-cols-2 transition-all duration-300">
          {Strings.missions?.map((mission) => (
            <VisionCard
              key={mission.text}
              image={mission.image}
              visionText={mission.text}
              fixedflex={true}
            />
          ))}
        </div>
      </div>
    </div>
    </DefaultLayout>
  )
}

export default Index
