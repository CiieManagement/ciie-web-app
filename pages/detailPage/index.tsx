import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Navbar } from '../../components/navbar';
import { ThemeSwitch } from '@/components/theme-switch';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';


const IndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-6xl w-full p-4 md:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
              <div className="relative h-96 md:h-auto flex items-center justify-center">
                <Image
                  src="/law.jpg"
                  alt="Web Development Image"
                  sizes="200vw"
                  height={300}
                  width={400}
                  className="p-10 rounded-full"
                />
              </div>
              <Link href={"/registration"}>
              <Button
                color="primary"
                variant="light"
                className="mt-4 w-full md:w-auto bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform transform hover:scale-105"
              >
                Register Now
              </Button></Link>
            </div>

            {/* Right Side: Centered Details Section */}
            <div className="w-full md:w-1/2 px-4 md:px-8 text-center md:text-left">
              <div className="text-4xl text-[#F50057] font-bold">
                IPR & Cyber Course
              </div>
              <div className="mt-4 text-lg text-gray-600 dark:text-gray-300 space-y-2">
                <p>✔️ Beginner-Friendly Foundations</p>
                <p>✔️ Intermediate-Level Exploration</p>
                <p>✔️ Advanced Mastery</p>
                <p>✔️ Hands-on Learning & Support</p>
                <p>✔️ Q/A Sessions</p>
              </div>
              <div className="mt-8 text-lg text-black dark:text-white">
                👉 Understand the intersection of cyberspace and intellectual property rights, including issues like domain name disputes and online copyright infringements.
                <br />
                👉 Delve into the fundamentals and complexities of copyright law, including how to protect creative works.
                <br />
                👉 Learn about the legal aspects of incubating start-ups, including the protection of intellectual property within incubation centers.
                <br />
                👉 Understand the intricacies of patent law, including the process of obtaining patents and the enforcement of patent rights.
              </div>
              <div className="mt-40 text-lg text-[#F50057] font-bold">
                👈🏾 To Know in-depth details of course please Register
              </div>
            </div>
          </div>

          {/* Modal for Terms */}
          <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                READ BEFORE YOU REGISTER
              </ModalHeader>
              <ModalBody>
                <p>1. 75% attendance is mandatory for course consideration and for certificate issue</p>
                <p>2. No student should apply for more than one course except bundle courses (only one bundle course is allowed as it consists of two courses).</p>
                <p>3. All quizzes and practice sets need to be solved for certification.</p>
                <p>4. Discipline is mandatory; no misbehavior will be entertained with other students or mentors.</p>
                <p>5. You need to join classes right on time.</p>
                <p>6. During class time, the camera should be opened so that the mentors can assure you are properly focused in the session.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default IndexPage;
