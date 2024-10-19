"use client";

import { useEffect, useState } from "react";
import { Image, Chip, Button } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";
import Countdown from "react-countdown";
import DefaultLayout from "@/layouts/default";
import { Strings } from "@/public/values/strings";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
 
export default function DocsPage() {
  useEffect(() => {
    toast.success(
      "Please scroll below to register for summer training program",
      {
        position: "bottom-center",
      }
    );
  }, []);

  const verify_forwar = (workshop: { name: string; image: string; description: string; registration_date: string; start_date: string; end_date: string; } | { name: string; image: string; description: string; registration_date: string; start_date: string; end_date: string; link: string; }) => {
    // const fileUrl = "/ci.pdf"; // URL of the file to download
    // const link = document.createElement("a");
    // link.href = fileUrl;
    // link.download = "rules_and_regulation.pdf"; // The name of the downloaded file
    // link.click();

    const userConfirmed = confirm(
      "You are proceeding towards registration."
    );

    if (userConfirmed) {
      window.open(workshop.link, "_blank"); // Open the link in a new tab
    } else {
      toast.error("Registration canceled");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="pb-10 max-w-7xl text-center items-center justify-center place-content-center">
          <BackdropAnimation />

          <Image
            src="/srm_logo.png"
            width={100}
            height={50}
            alt="SRM Logo"
            className="border-4 border-violet-300/50 md:hidden rounded-full mx-auto mb-3"
          />

          <Breadcrumbs className="md:hidden mr:auto">
            <BreadcrumbItem onClick={() => location.replace("/")}>
              CIIE Web App
            </BreadcrumbItem>
            <BreadcrumbItem color="primary" className="font-bold">
              Events
            </BreadcrumbItem>
          </Breadcrumbs>

          <div className="max-w-5xl w-fit mt-10 mx-auto">
            <Image
              src="/events.svg"
              alt="CIIE Web App"
              className="w-[300px] lg:w-[400px] mx-auto"
            />
          </div>

          <h1 className="mt-3 text-2xl font-bold md:text-4xl">Events</h1>

          <h1 className="text-sm mb-20 mt-5 mx-5 md:text-lg lg:text-xl">
            CIIE regularly hosts events and hackathons, ensuring that everyone
            has a fair chance to spotlight their skills and abilities in a
            relaxed and inclusive environment.
          </h1>

          <h1 className=" text-lg text-pretty text-left mt-4">
            We are actively hosting single as well as budled courses that not
            only act as a <span className=" text-violet-400">launchpad for beginners</span> but also provide an
            opportunity <span className=" text-violet-400">for experienced programmers to upskill themselves</span>. From
            basics to deployment, from fundamentals to complex algorithms, we
            cover everything here.
          </h1>

          {/* <h1 className="text-3xl mt-5  text-pretty text-left font-bold">
              Collaboration with SCIPR
          </h1>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 cursor-pointer">
            {Object.values(Strings.events.current.IPR).map((workshop) => {
              const startDate = new Date(workshop.start_date);
              const registrationDate = new Date(workshop.registration_date);
              const endDate = new Date(workshop.end_date);
              const now = new Date();

              return (
                <div
                  key={workshop.name}
                  className="flex flex-col rounded-2xl max-w-md backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20 transform transition-all duration-500 hover:scale-105 hover:bg-gray-400/40"
                  onClick={() => verify_forwar(workshop)}
                >
                  <div className="flex place-content-center rounded-xl mb-2 px-2">
                    <Image
                      className="min-w-[270px] w-full rounded-lg"
                      src={workshop.image}
                      loading="lazy"
                      alt={workshop.name}
                    />
                  </div>
                  <div className="flex flex-col place-content-center">
                    <h1 className="font-bold text-xl mb-1 text-center md:text-xl">
                      {workshop.name}
                    </h1>

                    <div className="flex flex-row place-content-center gap-2">
                      <Image src="/icons/calendar.png"  alt="img" width={25} />
                      <h1 className="my-auto text-sm font-bold text-[#9966ff]">
                        {workshop.start_date}
                      </h1>
                     
                    </div>

                    <div className="mt-5">
                      <h1 className="text-sm opacity-70">
                        {workshop.description}
                      </h1>
                    </div>

                    {now <= registrationDate && now <= startDate && (
                      <div className="mt-10 bg-gray-400/20 p-2 w-fit mx-auto transition-all duration-300 rounded-xl">
                        <h1 className="mr-1 font-bold mb-1">
                          Register Within:
                        </h1>

                        <Countdown
                          date={registrationDate}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <div className="flex place-content-center">
                              <div className="text-sm font-bold flex flex-row">
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {days}
                                </h1>
                                <h1 className="mr-2 mt-auto mb-1">D</h1>
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {hours}
                                </h1>
                                <h1 className="mr-2 mt-auto mb-1">H</h1>
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {minutes}
                                </h1>
                                <h1 className="mr-2 mt-auto mb-1">M</h1>
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {seconds}
                                </h1>
                                <h1 className="mt-auto mb-1">S</h1>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}

                   
                  </div>
                </div>
              );
            })}
          </div> */}


          <h1 className="text-3xl mt-5  text-pretty text-left font-bold">
            Single courses
          </h1>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 cursor-pointer">
            {Object.values(Strings.events.current.workshops).map((workshop) => {
              const startDate = new Date(workshop.start_date);
              const registrationDate = new Date(workshop.registration_date);
              const endDate = new Date(workshop.end_date);
              const now = new Date();

              return (
                <div
                  key={workshop.name}
                  className="flex flex-col rounded-2xl max-w-md backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20 transform transition-all duration-500 hover:scale-105 hover:bg-gray-400/40"
                  onClick={() => verify_forwar(workshop)}
                >
                  <div className="flex place-content-center rounded-xl mb-2 px-2">
                    <Image
                      className="min-w-[270px] w-full rounded-lg"
                      src={workshop.image}
                      loading="lazy"
                      alt={workshop.name}
                    />
                  </div>
                  <div className="flex flex-col place-content-center">
                    <h1 className="font-bold text-xl mb-1 text-center md:text-xl">
                      {workshop.name}
                    </h1>

                    <div className="flex flex-row place-content-center gap-2">
                      <Image src="/icons/calendar.png" alt="img" width={25} />
                      <h1 className="my-auto text-sm font-bold text-[#9966ff]">
                        {workshop.start_date}
                      </h1>
                      <h1 className="font-bold my-auto"> {"=>"} </h1>
                      <h1 className="my-auto text-sm font-bold text-[#9966ff]">
                        {workshop.end_date}
                      </h1>
                    </div>

                    <div className="mt-5">
                      <h1 className="text-sm opacity-70">
                        {workshop.description}
                      </h1>
                    </div>

                    {now <= registrationDate && now <= startDate && (
                      <div className="mt-10 bg-gray-400/20 p-2 w-fit mx-auto transition-all duration-300 rounded-xl">
                        <h1 className="mr-1 font-bold mb-1">
                          Register Within:
                        </h1>

                        <Countdown
                          date={registrationDate}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <div className="flex place-content-center">
                              <div className="text-sm font-bold flex flex-row">
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {days}
                                </h1>
                                <h1 className="mr-2 mt-auto mb-1">D</h1>
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {hours}
                                </h1>
                                <h1 className="mr-2 mt-auto mb-1">H</h1>
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {minutes}
                                </h1>
                                <h1 className="mr-2 mt-auto mb-1">M</h1>
                                <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {seconds}
                                </h1>
                                <h1 className="mt-auto mb-1">S</h1>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}

                   
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* <h1 className="text-3xl  text-pretty text-left font-bold mt-10">
            Bundle courses{" "}
          </h1> */}
          {/* <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 cursor-pointer">
            {Object.values(Strings.events.current.bundle_workshops).map(
              (workshop) => {
                const startDate = new Date(workshop.start_date);
                const registrationDate =new Date(workshop.registration_date) ;
                const endDate = new Date(workshop.end_date);
                const now = new Date();

                return (
                  <div
                    key={workshop.name}
                    className="flex flex-col rounded-2xl max-w-md backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20 transform transition-all duration-500 hover:scale-105 hover:bg-gray-400/40"
                    onClick={() => verify_forwar(workshop)}
                  >
                    <div className="relative flex justify-center items-center mb-2">
                      <div className="relative">
                        <Image
                          className="min-w-[270px] w-full rounded-lg absolute z-10 transform -rotate-6"
                          src={workshop.image2}
                          loading="lazy"
                          alt={workshop.name}
                        />
                        <Image
                          className=" min-w-[270px] m-6 w-60 rounded-lg relative z-20 transform rotate-6"
                          src={workshop.image1}
                          loading="lazy"
                          alt={workshop.name}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col place-content-center">
                      <h1 className="font-bold text-xl mb-1 text-center md:text-xl">
                        {workshop.name}
                      </h1>

                      <div className="flex flex-row place-content-center gap-2">
                        <Image
                          src="/icons/calendar.png"
                          width={25}
                          alt="Calendar icon"
                        />
                        <h1 className="my-auto text-sm font-bold text-[#9966ff]">
                          {workshop.start_date}
                        </h1>
                        <h1 className="font-bold my-auto"> {"=>"} </h1>
                        <h1 className="my-auto text-sm font-bold text-[#9966ff]">
                          {workshop.end_date}
                        </h1>
                      </div> */}

                      {/* <Countdown
                        date={"2 July 2024"}
                        renderer={({ days, hours, minutes, seconds }) => (
                          <div className="flex place-content-center">
                            <div className="text-sm font-bold flex flex-row">
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {days}
                              </h1>
                              <h1 className="mr-2 mt-auto mb-1">D</h1>
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {hours}
                              </h1>
                              <h1 className="mr-2 mt-auto mb-1">H</h1>
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {minutes}
                              </h1>
                              <h1 className="mr-2 mt-auto mb-1">M</h1>
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {seconds}
                              </h1>
                              <h1 className="mt-auto mb-1">S</h1>
                            </div>
                          </div>
                        )
                       }
                      /> */}

                      {/* <div className="mt-5">
                        <h1 className="text-sm opacity-70">
                          {workshop.description}
                        </h1>
                      </div> */}

                      {/* 
                  {now <= registrationDate && now <= startDate && (
                    <div className="mt-10 bg-gray-400/20 p-2 w-fit mx-auto transition-all duration-300 rounded-xl">
                      <h1 className="mr-1 font-bold mb-1">
                        Register Within:
                      </h1>
              
                      <Countdown
                        date={registrationDate}
                        renderer={({ days, hours, minutes, seconds }) => (
                          <div className="flex place-content-center">
                            <div className="text-sm font-bold flex flex-row">
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {days}
                              </h1>
                              <h1 className="mr-2 mt-auto mb-1">D</h1>
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {hours}
                              </h1>
                              <h1 className="mr-2 mt-auto mb-1">H</h1>
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {minutes}
                              </h1>
                              <h1 className="mr-2 mt-auto mb-1">M</h1>
                              <h1 className="bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                {seconds}
                              </h1>
                              <h1 className="mt-auto mb-1">S</h1>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  )} 
                  */}

                      {/* {now < registrationDate && (
                    <Button
                      className="mt-4 w-[90%] mx-auto"
                      color="primary"
                      onClick={() => {
                        // TODO: handle registration logic
                        console.log('Register Now');
                      }}
                      variant="shadow"
                    >
                      Register Now
                    </Button>
                  )} */}
                    {/* </div>
                  </div>
                );
              }
            )}
          </div> */}
        </div>
      </section>

      <Toaster position="bottom-center" />
    </DefaultLayout>
  );
}
