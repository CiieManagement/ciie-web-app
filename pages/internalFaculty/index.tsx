"use client";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import {
  SpeechCard,
  TeamMemberCard,
  VisionCard,
} from "@/components/widgets/aboutScreenCards";

import DefaultLayout from "@/layouts/default";
import { Strings1 } from "@/public/values/strings1";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import "firebase/firestore";
import "firebase/analytics";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import App from "../../pages/navbar1";
import withAdminAuth from "@/components/withAdminAuth";

function DocsPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 p-6">
      <App />
      <BackdropAnimation />
      <div className="w-full flex justify-end">
        <Link href="/admin">
          <Button
            color="danger"
            variant="bordered"
            startContent={<IoMdExit className="transform rotate-180 size-7" />}
            className="mt-8"
          >
            Admin Page
          </Button>
        </Link>
      </div>
      <div className="max-w-7xl w-full text-center items-center justify-center">
        <BackdropAnimation />

        <div className="flex flex-col items-center mb-8">
          <Image
            src="/srm_logo.png"
            width={100}
            height={50}
            alt="SRM Logo"
            className="border-4 border-violet-300/50 rounded-full mb-3"
          />

          <Breadcrumbs className="mb-5">
            <BreadcrumbItem onClick={() => location.replace("/internalFaculty")}>
              CIIE Web App
            </BreadcrumbItem>
            <BreadcrumbItem color="primary" className="font-bold">
              About Us
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <h1 className="mt-10 text-2xl font-bold mb-10 md:text-3xl">
          Faculty
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {Object.values(Strings1.professors).map((professor) => (
            <div key={professor.name} >
              <SpeechCard
                name={professor.name}
                designation={professor.designation}
                speech={professor.speech}
                image={professor.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default withAdminAuth(DocsPage);
