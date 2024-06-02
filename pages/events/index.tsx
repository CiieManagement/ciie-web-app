/* eslint-disable jsx-a11y/alt-text */
import { title } from "@/components/primitives";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import DefaultLayout from "@/layouts/default";
import { Strings } from "@/public/values/strings";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Image,
  Chip,
  Button,
} from "@nextui-org/react";
import Countdown from "react-countdown";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="pb-10 max-w-7xl text-center items-center justify-center place-content-center">
          <BackdropAnimation />

          <Image
            src="/srm_logo.png"
            width={100}
            height={50}
            alt={""}
            className=" border-4 border-violet-300/50 md:hidden rounded-full mx-auto mb-3"
          ></Image>

          <Breadcrumbs className=" md:hidden mr:auto">
            <BreadcrumbItem onClick={() => location.replace("/")}>
              CIIE Web App
            </BreadcrumbItem>
            <BreadcrumbItem color="primary" className=" font-bold">
              Events
            </BreadcrumbItem>
          </Breadcrumbs>

          <div className="max-w-5xl w-fit mt-10 mx-auto">
            <Image
              src="/events.svg"
              alt="CIIE Web App"
              className=" w-[300px] lg:w-[400px] mx-auto"
            />
          </div>

          <h1 className={" mt-3 text-2xl font-bold md:text-4xl"}>Events</h1>

          <h1 className=" text-sm mb-20 md:text-lg lg:text-xl">
            CIIE regularly hosts events and hackathons, ensuring that everyone
            has a fair chance to spotlight their skills and abilities in a
            relaxed and inclusive environment.
          </h1>

          {/* Chip container */}
          <div className="flex flex-row gap-2 mr-auto p-2 w-fit rounded-full">
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 cursor-pointer hover:scale-110 duration-300 transition-all",
                content: "drop-shadow shadow-black font-bold text-white",
              }}
            >
              Current
            </Chip>

            <Chip
              variant="shadow"
              color="default"
              className="cursor-pointer hover:scale-110 duration-300 transition-all"
            >
              {" "}
              Previous{" "}
            </Chip>
          </div>

          {/* Events container */}
          <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300">
            {Object.values(Strings.events.current.workshops).map((workshop) => {
              const startDate = new Date(workshop.start_date);
              const registrationDate = new Date(workshop.registration_date);
              const endDate = new Date(workshop.end_date);
              const now = new Date();

              return (
                <div key={workshop.name} className=" flex flex-col rounded-2xl max-w-md backdrop-blur-sm p-5 bg-gray-300/20 border-2 border-gray-400/20">
                  <div className="flex place-content-center rounded-xl mb-2 px-2 ">
                    <Image
                      className=" min-w-[270px] w-full rounded-lg"
                      src={workshop.image}
                      loading="lazy"
                      alt={workshop.name}
                    />
                  </div>
                  <div className="flex flex-col place-content-center">
                    <h1 className=" font-bold text-xl mb-1 text-center md:text-xl">
                      {workshop.name}
                    </h1>

                    <div className="flex flex-row place-content-center gap-2 ">
                      <Image src="/icons/calendar.png" width={25} />
                      <h1 className=" my-auto text-sm font-bold text-[#9966ff]">
                        {" "}
                        {workshop.start_date}{" "}
                      </h1>
                      <h1 className=" font-bold my-auto"> {">>"} </h1>
                      <h1 className=" my-auto text-sm font-bold text-[#9966ff]">
                        {" "}
                        {workshop.end_date}{" "}
                      </h1>
                    </div>

                    <div className=" mt-5">
                      <h1 className=" text-sm opacity-70">{workshop.description}</h1> 
                    </div>

                    {/* Countdown Timer */}
                    {now <= registrationDate && now <= startDate && (
                      <div className="mt-10 bg-gray-400/20 p-2 w-fit mx-auto transition-all duration-300 rounded-xl">
                        <h1 className=" mr-1 font-bold mb-1">
                          Register Within :
                        </h1>

                        <Countdown
                          date={registrationDate}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <div className=" flex place-content-center">
                              <div className=" text-sm font-bold flex flex-row">
                                <h1 className=" bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {days}
                                </h1>
                                <h1 className=" mr-2 mt-auto mb-1">D</h1>
                                <h1 className=" bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {hours}
                                </h1>
                                <h1 className=" mr-2 mt-auto mb-1">H</h1>
                                <h1 className=" bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {minutes}
                                </h1>
                                <h1 className=" mr-2 mt-auto mb-1">M</h1>
                                <h1 className=" bg-purple-400/30 px-2 py-1 border-2 border-purple-400/50 rounded-md m-1">
                                  {seconds}
                                </h1>
                                <h1 className=" mt-auto mb-1">S</h1>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}

                    {/* Register Now Button */}
                    {now < registrationDate && (
                      <Button
                        className="mt-4 w-[90%] mx-auto"
                        color="primary"
                        onClick={() => {
                          //TODO: handle registration logic
                          console.log("Register Now");
                        }}
                        variant="shadow"
                      >
                        Register Now
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
