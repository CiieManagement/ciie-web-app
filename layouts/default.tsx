import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import bubbleCSS from "../styles/bubbleCSS.module.css";
import Image from "next/image";
import BubbleEffect from "../components/bubbleEffect";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function  DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent className="max-w-full h-screen overflow-auto w-auto md:w-3/4 lg:w-1/2">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Web Design and development team</ModalHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <ModalBody className="flex-1 overflow-auto ">
                  <strong>Web Development Team</strong>
                  <hr />
                  <br />
                  <p>
                    <strong>Sahil Tiwari: </strong>
                    It was a good experience collaborating with the team, I worked on the Login Page and Route Protection.
                  </p>
                  <p>
                    <strong>Shivansh Shukla: </strong>
                    Our team has succeeded because of intense amount of understanding and hardwork. I linked RTDB and saw API & Backend and properly utilized.
                  </p>
                  <p>
                    <strong>Ashwin Sharma: </strong>
                    Being a member of a good and understanding team with a very strong foundational code is cherry on top. I Developed the core templates and dynamicity.
                  </p>
                </ModalBody>
                <ModalBody className="flex overflow-auto">
                  <strong>Ui/Ux Team</strong>
                  <hr />
                  <br />
                  <p>
                    <strong>Arjun Rai: </strong>
                     Final products are an outcome of teamwork and collaboration. I initiated the User Interface and laid down the basic wireframe.
                  </p>
                  <p>
                    <strong>Manan Kashyap: </strong>
                    Along with Arjun, I polished and developed the further User Interface and suggested better ways for User Experience.
                  </p>               
                </ModalBody>
              </div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="relative flex flex-col h-screen w-screen overflow-x-hidden">
        <Head />
        <Navbar />

        <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16 z-10">
          {children}
        </main>

        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="cursor-pointer flex items-center gap-1 text-current"
            // href=""
            onClick={onOpen}
            title="CIIE"
          >
            <span className="text-default-600">Created by </span>
            <p className="text-[#8800ff]">CIIE Core Team</p>
          </Link>
        </footer>
      </div>
    </>
  );
}
