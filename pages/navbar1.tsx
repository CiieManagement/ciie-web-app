import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar
} from "@nextui-org/react";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../components/firebaseConfig";
 
export default function App() {
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Navbar className="flex flex-row w-full  justify-around ">


      <div className="flex flex-row items-center gap-20">
        <NavbarBrand className="flex flex-row gap-4 items-center">
          <Image
            src={"/ciie_logo.png"}
            height={40}
            width={40}
            alt="ciie_logo"
          />
          <p className="font-bold text-inherit text-3xl">CIIE</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/admin-report" aria-current="page" color="secondary">
              Reports
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/internalFaculty">
              Internal Faculty
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Manage
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/requests">
             Request
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>





      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar 
              name={username.charAt(0).toUpperCase()} 
              className="bg-green-700 text-2xl cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{username}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
       
            <DropdownItem key="configurations" href="/">Ciie Page</DropdownItem>
      
            <DropdownItem key="help_and_feedback">
              <Link color="foreground" href="/helpAndFeedback">
                Help & Feedback
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
