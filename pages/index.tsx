import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Image from "next/image";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import {
  SearchingForInnovationCard,
  WorkIsPriorityCard,
} from "@/components/widgets/homeScreenCards";
import { AllAboutLearningCard } from "@/components/widgets/homeScreenCards";
import { TeamCardForHome } from "@/components/widgets/TeamCard";
import { Strings } from "@/public/values/strings";
import { auth } from '../components/firebaseConfig';

export default function IndexPage() {
  const [username, setUsername] = useState('');

 
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email); // Use displayName or email as fallback
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <DefaultLayout>
      <BackdropAnimation />
    
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10 duration-400 transition-all">
        {/* WELCOME CARD */}
        <div className="flex flex-col sm:mx-10 lg:flex-row text-center">
          <Image
            src={"/drone.svg"}
            layout="responsive"
            width={100}
            height={100}
            alt={""}
            className="max-w-md mx-auto"
          />
          <div className="flex flex-col animate-appearance-in mt-10 lg:mt-0 max-w-xl lg:ml-20 duration-400">
            <h1 className={title()}>Welcome </h1>
            <h1 className="font-bold text-3xl">To</h1>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#7700ff]">
              Center for Innovation, Incubation and Entrepreneurship{" "}
            </h1>
            <br />
            <h4 className={subtitle({ class: "mt-4" })}>
              A place to unleash your potential
            </h4>
          </div>
        </div>
        <SearchingForInnovationCard />
        <AllAboutLearningCard />
        <WorkIsPriorityCard />
        <TeamCardForHome teamMembers={Object.values(Strings.team_members)} />
        <div className="h-[50px]"></div>
      </section>
    </DefaultLayout>
  );
}
