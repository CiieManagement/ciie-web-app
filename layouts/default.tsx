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

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-full w-auto md:w-3/4 lg:w-1/2">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Web Design and development team</ModalHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <ModalBody className="flex-1 overflow-auto">
                  <strong>Web Development Team</strong>
                  <br />
                  <p>
                    <strong>Sahil Tiwari: </strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    <strong>Ashwin Sharma: </strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    <strong>Shivansh Shukla: </strong>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                </ModalBody>
                <ModalBody className="flex-1 overflow-auto">
                  <strong>Ui/Ux Team</strong>
                  <br />
                  <p>
                    <strong>Arjun Rai: </strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    <strong>Manan Kashyap: </strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
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
