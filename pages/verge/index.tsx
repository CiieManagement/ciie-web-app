import { title } from '@/components/primitives'
import DefaultLayout from '@/layouts/default'
import BackdropAnimation from "@/components/utils/backdrop_animation";
import {
  SpeechCard,
  TeamMemberCard,
  VisionCard,
} from "@/components/widgets/aboutScreenCards";
import { Strings } from "@/public/values/strings";

import Image from "next/image";


export default function DocsPage() {
  return (
    <DefaultLayout>
            <BackdropAnimation />
           

        <div className="text-center mx-auto justify-center z-20">

 

      {/* WELCOME CARD */}
     

      <div className=" flex flex-col sm:mx-10 lg:flex-row">

        <div className=" flex flex-row justify-between  gap-40 animate-appearance-in">
          
          <div><h1 className={title()}>Welcome </h1>
          <h1 className=" font-bold text-xl">To</h1>
          {/* <h1 className={title()}>&nbsp;</h1> */}
          <h1 className=" text-4xl lg:text-5xl font-bold text-[#ee703f]">
           Verge{" "}
          </h1>
          <h1 className=" text-4xl lg:text-5xl font-bold text-[#7700ff]">
          a symbol of completeness{" "}
          </h1>
          <br />

          <h4 className= "text-3xl">
            A place to unleash your potential
          </h4></div>
          <div>
            
            <Image
              src={"/verge.png"}
              layout="responsive"
              width={100}
              height={100}
              alt={""}
              className="  max-w-md mx-auto border-radius-10"
            />
          </div>
        </div>


      </div>
      <h1 className='text-3xl animate-bounce'>This is a part of ciie that works parallely in ongoing projects</h1>
        <div className=" text-2xl md:text-3xl font-bold mt-20 mb-10"> <h1 className=" text-start">Meet from verge team</h1>   </div>
          <div className="grid gap-y-10 max-w-4xl mx-auto sm:gap-y-4 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 transition-all duration-300 ">
            {Object.values(Strings.verge).map((member) => (
              <TeamMemberCard
               
                key={member.name}
                image={member.image == "" ? (member.gender == "male" ? "/anonymous_male.svg" : "/anonymous_female.svg") : member.image}
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}

              />
            ))}
          </div>
        <div className=" text-2xl md:text-3xl font-bold mt-20 mb-10"> <h1 className=" text-start">Projects</h1>   </div>
          <div className="grid gap-y-10 max-w-4xl mx-auto sm:gap-y-4 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 transition-all duration-300 ">
            {Object.values(Strings.verge).map((member) => (
              <TeamMemberCard
               
                key={member.name}
                image={member.image == "" ? (member.gender == "male" ? "/anonymous_male.svg" : "/anonymous_female.svg") : member.image}
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}

              />
            ))}
          </div>
    </div>
    </DefaultLayout>
  )
}
