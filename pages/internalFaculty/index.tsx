import React from 'react';
import { App } from '../../pages/navbar1'; // Assuming App is a navigation component
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { SpeechCard } from "@/components/widgets/aboutScreenCards";
import { Strings1 } from "@/public/values/strings1";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import withAdminAuth from "@/components/withAdminAuth";

const DocsPage = () => {
  return (
   <>coming soon</>
  );
};

export default withAdminAuth(DocsPage);
