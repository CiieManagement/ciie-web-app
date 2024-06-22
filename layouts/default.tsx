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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Title</ModalHeader>
              <ModalBody>
                body <br></br>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
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
            className=" cursor-pointer flex items-center gap-1 text-current"
            // href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
            onClick={onOpen}
            title="nextui.org homepage"
          >
            <span className="text-default-600">Created by </span>
            <p className="text-[#8800ff]">CIIE Core Team</p>
          </Link>
        </footer>
      </div>
    </>
  );
}
