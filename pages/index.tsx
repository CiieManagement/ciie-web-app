"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Image from "next/image";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import {
  SearchingForInnovationCard,
  WorkIsPriorityCard,
} from "@/components/widgets/homeScreenCards";
import { AllAboutLearningCard } from "@/components/widgets/homeScreenCards";
import { TeamCardForHome } from "../components/widgets/TeamCard";
import { Strings } from "@/public/values/strings";
import { auth } from "../components/firebaseConfig";
import { useRouter } from "next/router";
import Link from "next/link";

export default function IndexPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName! || user.email!);
      } else {
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <DefaultLayout>
      <BackdropAnimation />

      <section className="flex flex-col items-center justify-center gap-4 duration-400 transition-all">
        {/* QUICK ACCESS LINKS - MOBILE FIRST DESIGN */}
        {/* Explore Section */}
    <div className="w-full mb-5">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl  font-bold text-white mb-8 text-center">
      Explore Our Ecosystem
    </h2>
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Link href="/mission" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Mission</span>
        </div>
      </Link>

      <Link href="/vision" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Vision</span>
        </div>
      </Link>

      <Link href="/mentors" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Mentors</span>
        </div>
      </Link>

      <Link href="/community" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Communities</span>
        </div>
      </Link>

      <Link href="/allumni" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Alumni</span>
        </div>
      </Link>

      <Link href="/certifications" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Certifications</span>
        </div>
      </Link>

      <Link href="/internalFaculty" className="group relative">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 transition-all hover:border-[#7700ff] hover:bg-[#7700ff]/20 h-full">
          <div className="text-[#7700ff] mb-2 transition-all group-hover:scale-110">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-white font-semibold text-center">Internal Faculty</span>
        </div>
      </Link>
    </div>
  </div>
</div>

        {/* MAIN CONTENT SECTION */}
        <div className="flex flex-col sm:mx-10 lg:flex-row text-center">
          <Image
            src={"/drone.svg"}
            layout="responsive"
            width={100}
            height={100}
            alt={"Innovation Drone"}
            className="max-w-md mx-auto"
          />
          <div className="flex flex-col animate-appearance-in mt-10 lg:mt-0 max-w-xl lg:ml-20 duration-400">
            <h1 className={title()}>Welcome</h1>
            <h1 className="font-bold text-3xl">To</h1>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#7700ff]">
              Center for Innovation, Incubation and Entrepreneurship
            </h1>
            <br />
            <h4 className={subtitle({ class: "mt-4" })}>
              A place to unleash your potential
            </h4>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <SearchingForInnovationCard />
        <AllAboutLearningCard />
        <WorkIsPriorityCard />
        
        <div className="h-[50px]"></div>
      </section>
    </DefaultLayout>
  );
}