import React from "react";
import Image from "next/image";
import { px } from "framer-motion";
interface professorProp {
  name: string;
  designation: string;
  speech: string;
  image: string;
}

interface visionProp {
  image: string;
  visionText: string;
  fixedflex: boolean;
}

interface teamMember {
  image: string;
  name: string;
  domain: string;
  description: string;
  linkedin: string;
  github: string;
}
interface allumni {
  image: string;
  name: string;
  batch: string;
  domain: string;
  description: string;
  linkedin: string;
  twitter:string;
  github: string;
}
interface InternalFaculty {
  image: string;
  name: string;
  position: string;
  domain: string;
  description: string;
  linkedin: string;
  twitter:string;
  github: string;
  google_scholar:string;
}

function SpeechCard(props: professorProp) {
  return (
    <div className=" md:mx-auto overflow-hidden bg-gray-300/20 border-2 border-gray-400/20 max-h-sm rounded-3xl md:py-2 md:px-3 flex backdrop-blur-sm flex-col md:flex-row gap-2 w-fit max-w-7xl ">
      <div className=" max-h-sm p-3 " >
        <Image
          src={props.image}
          alt=""
          layout="responsive"
          width={100}
          height={100}
          className=" shadow-md mx-auto w-full rounded-2xl md:max-h-none"
        />
      </div>

      <div className=" flex-col flex rounded-xl md:mt-3 px-4 pb-2 max-w-lg">
        <h1 className=" text-left md:text-lg opacity-80">{props.speech}</h1>

        <h1 className=" rounded-lg text-right font-bold md:text-xl mr-1 mt-2">
          {props.name}
        </h1>

        <h1 className=" text-[#5cc3ff] font-bold text-right mr-1">
          {props.designation}
        </h1>
      </div>
    </div>
  );
}

function VisionCard(props: visionProp) {
  return props.fixedflex ? (
    <div className=" border-2 border-gray-400/20 bg-gray-300/20 flex flex-col rounded-2xl backdrop-blur-sm p-5">
      <Image src={props.image} layout="responsive" width={0} height={0} alt="img"/>
      <h1 className=" mt-5 text-md">{props.visionText}</h1>
    </div>
  ) : (
    <div className=" flex flex-col sm:flex-row md:gap-x-10 rounded-2xl max-w-3xl md:mx-auto backdrop-blur-sm py-2 px-3">
      <Image className=" max-h-[300]" src={props.image} loading="lazy" alt="img"/>
      <h1 className=" mt-5 md:text-xl text-lg">{props.visionText}</h1>
    </div>
  );
}

function TeamMemberCard(props: teamMember) {
  return (
    <div className="relative flex flex-col md:gap-x-10 rounded-2xl max-w-3xl md:mx-auto backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20">
      <div className="flex place-content-center">
        <Image
          className=" mx-auto ml-auto rounded-3xl"
          src={props.image}
          width={0}
          height={100}
          layout="responsive"
          loading="lazy"
          alt="img"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="mt-5 md:text-xl text-lg font-bold">{props.name}</h1>
        <h1 className="md:text-md text-sm text-secondary">{props.domain}</h1>
        <h1 className="mt-2 md:text-md text-sm text-left">{props.description}</h1>
      </div>

      <br />

      <div className="absolute bottom-3 right-3 flex space-x-2 ">
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={0}
              height={0}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out bg-white/60"
            />
          </a>
        )}
        {props.linkedin && (
          <a href={props.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Image
              src="/icons/linkedin.png"
              alt="LinkedIn"
              width={0}
              height={0}
              className="w-5 h-5 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </a>
        )}
      </div>
    </div>
  );
}

function AllumniCard(props: allumni) {
  return (
    <div className="relative flex flex-col md:gap-x-10 rounded-2xl max-w-3xl md:mx-auto backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20">
      <div className="flex place-content-center">
        <Image
          className="max-w-[150px] md:max-w-[100px] md:max-h-[200px] ml-auto rounded-3xl"
          src={props.image}
          loading="lazy"
          alt="img"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col">
        <h1 className="mt-5 md:text-xl text-lg font-bold">{props.name}</h1>
        <h1 className="md:text-xs text-small font-bold">{props.batch}</h1>
        <h1 className="md:text-md text-sm text-[#4ce5eb]">{props.domain}</h1>
        <h1 className="mt-2 md:text-md text-sm text-left">{props.description}</h1>
      </div>

      <br />

      <div className="absolute bottom-3 right-3 flex space-x-2 ">
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out bg-white/60"
            />
          </a>
        )}
        {props.linkedin && (
          <a href={props.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Image
              src="/icons/linkedin.png"
              alt="LinkedIn"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </a>
        )}
        {props.twitter && (
          <a href={props.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
            <Image
              src="/icons/twitter.png"
              alt="Twitter"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </a>
        )}
      </div>
    </div>
  );
}
function InternalFaculty(props: InternalFaculty) {
  return (
    <div className="relative flex flex-col items-center md:gap-x-10 rounded-2xl max-w-3xl md:mx-auto backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20">
      <div className="flex justify-center w-full">
        <Image
          className="max-w-[150px] md:max-w-[100px] md:max-h-[200px] rounded-3xl"
          src={props.image}
          loading="lazy"
          alt="img"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <h1 className="mt-5 md:text-xl text-lg font-bold">{props.name}</h1>
        <h1 className="md:text-xs text-small font-bold">{props.position}</h1>
        <h1 className="md:text-md text-sm text-[#4ce5eb]">{props.domain}</h1>
        <h1 className="mt-2 md:text-md text-sm">{props.description}</h1>
      </div>

      <br />

      <div className="absolute bottom-3 right-3 flex space-x-2 ">
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out bg-white/60"
            />
          </a>
        )}
        {props.linkedin && (
          <a href={props.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Image
              src="/icons/linkedin.png"
              alt="LinkedIn"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </a>
        )}
        {props.twitter && (
          <a href={props.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
            <Image
              src="/icons/twitter.png"
              alt="Twitter"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </a>
        )}
        {props.google_scholar && (
          <a href={props.google_scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar">
            <Image
              src="/icons/Google Scholar.png"
              alt="Google Scholar"
              width={0}
              height={100}
              className="w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </a>
        )}
      </div>
    </div>
  );
}


export { SpeechCard };
export { VisionCard };
export { TeamMemberCard };
export { AllumniCard };
export { InternalFaculty };
