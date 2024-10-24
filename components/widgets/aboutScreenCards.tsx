import React, { useEffect, useState } from "react";
import Image from "next/image";
import { px } from "framer-motion";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebaseConfig";


interface professorProp {
  name: string;
  designation: string;
  speech: string;
  image: string;
}


export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}


interface visionProp {
  image: string;
  visionText: string;
  fixedflex: boolean;
}

interface TeamMember {
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

      <div className=" flex-col flex rounded-xl md:mt-3  px-4 pb-2 max-w-lg">
        <h1 className=" text-left content-center md:text-lg opacity-80">{props.speech}</h1>

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
      <Image className=" max-h-[300]" src={props.image} loading="lazy" alt="img" width={300} height={40}/>
      <h1 className=" mt-5 md:text-xl text-lg">{props.visionText}</h1>
    </div>
  );
}

function TeamMemberCard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "communities"));
        const membersData: TeamMember[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as TeamMember[];
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-4 md:px-8">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-6 rounded-xl max-w-4xl mx-auto backdrop-blur-lg p-6 bg-white/20 shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Image section - aligned to the left on wider screens */}
          <div className="md:w-1/3 flex justify-center">
            <Image
              className="rounded-xl object-cover"
              src={member.image}
              width={250} // Adjusted width
              height={250} // Adjusted height
              loading="lazy"
              alt={`${member.name}'s profile image`}
            />
          </div>

          {/* Details section - aligned to the right */}
          <div className="flex flex-col justify-center md:w-2/3 text-left">
            <h2 className="text-xl font-semibold text-gray-800">{member.department}</h2>
            <h1 className="text-lg text-secondary font-medium mt-2">{member.name}</h1>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{member.description}</p>

            <div className="mt-5 flex space-x-5">
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
                    alt="GitHub"
                    width={28}
                    height={28}
                    className="hover:scale-110 transition-transform duration-200 ease-in-out"
                  />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg"
                    alt="LinkedIn"
                    width={28}
                    height={28}
                    className="hover:scale-110 transition-transform duration-200 ease-in-out"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}




 
function AllumniCard(props: allumni) {
  return (
    <div className="relative flex flex-col items-center rounded-2xl max-w-sm mx-auto backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20">
      <div className="flex justify-center">
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
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
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
              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg"
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
