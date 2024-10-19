import { useState, useEffect } from "react";
import {
  Button,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { Modal } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import Image from "next/image";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { Menu } from "@headlessui/react";
import adminData from "./admins.json";
import { allumni } from "../public/values/allumni";
import { InternalFacultyData } from "../public/values/InternalFaculty";
import { Strings2 } from "../public/values/strings2";
import { Strings } from "../public/values/strings";
import { useRouter } from "next/router";
import pather from "./pather.json";
import { collection, getDocs, query, where } from "@firebase/firestore";

const SearchSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul className="absolute bg-gray-400/20 backdrop-blur-md mt-1 rounded-2xl shadow-lg max-h-48 overflow-y-auto z-50">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 cursor-pointer hover:scale-110 hover:text-violet-400 duration-300 w-fit transition-all"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [path, setPath] = useState("Home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email || "");
        setIsAdmin(adminData.admins.includes(user.email || ""));
      } else {
        setUsername("");
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const checkCoordinator = async (email: string | null) => {
      if (!email) {
        setErrorMessage('You are not authorized to view this page.');
        setLoading(false);
        return;
      }

      console.log("email is",email);
      

      try {
        const coordinatorsCollection = collection(db, 'coordinators');
        const q = query(coordinatorsCollection, where('email', '==', email));
        const coordinatorSnapshot = await getDocs(q);

        if (!coordinatorSnapshot.empty) {
          const coordinatorData = coordinatorSnapshot.docs[0].data();

          if (coordinatorData.community === 'Cloud') {
            setIsCoordinator(true);
          }
        } else {
          setErrorMessage('You are not authorized to view this page.');
        }
      } catch (error) {
        console.error('Error checking coordinator:', error);
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };


  },[]);
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "./";
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSuggestions(getSearchSuggestions(query));
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion) {
      const source = getSuggestionSource(suggestion);
      if (source) {
        window.location.href = source;
      }
      setSearchQuery(suggestion);
      setSuggestions([]);
    }
  };

  const getSuggestionSource = (suggestion) => {
    const alumniNames = Object.values(allumni.alumni).map(
      (person) => person.name
    );
    const facultyNames = Object.values(
      InternalFacultyData.InternalFacultyData
    ).map((person) => person.name);
    const firstYearMembers = Object.values(Strings2.First_Year).map(
      (person) => person.name
    );
    const secondYearMembers = Object.values(Strings2.Second_Year).map(
      (person) => person.name
    );
    const thirdYearMembers = Object.values(Strings2.Third_Year).map(
      (person) => person.name
    );
    const mentors = Object.values(Strings.professors).map(
      (person) => person.name
    );

    if (alumniNames.includes(suggestion)) {
      return "/allumni";
    } else if (facultyNames.includes(suggestion)) {
      return "/internalFaculty";
    } else if (
      firstYearMembers.includes(suggestion) ||
      secondYearMembers.includes(suggestion) ||
      thirdYearMembers.includes(suggestion)
    ) {
      return "/core_student_members";
    } else if (mentors.includes(suggestion)) {
      return "/mentors";
    }

    return null;
  };

  const getSearchSuggestions = (query) => {
    const alumniNames = Object.values(allumni.alumni).map(
      (person) => person.name
    );
    const facultyNames = Object.values(
      InternalFacultyData.InternalFacultyData
    ).map((person) => person.name);
    const firstYearMembers = Object.values(Strings2.First_Year || {}).map(
      (person) => person.name
    );
    const secondYearMembers = Object.values(Strings2.Second_Year || {}).map(
      (person) => person.name
    );
    const thirdYearMembers = Object.values(Strings2.Third_Year || {}).map(
      (person) => person.name
    );
    const mentors = Object.values(Strings.professors || {}).map(
      (person) => person.name
    );

    const allNames = [
      ...alumniNames,
      ...facultyNames,
      ...firstYearMembers,
      ...secondYearMembers,
      ...thirdYearMembers,
      ...mentors,
    ];

    if (!query) return [];
    return allNames.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const searchInput = (
    <div className="relative">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit mr-20">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src="/ciie_logo.png"
              alt="logo"
              width={40}
              height={30}
              className="translate-y-1 mr-2"
            />
            <p className="font-bold text-inherit text-2xl">CIIE</p>
          </NextLink>
        </NavbarBrand>

        <div className="hidden sm:flex gap-4 justify-start ml-6">
          {siteConfig.navItems.map(
            (item) =>
              item.label! && (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles(
                        item.label == pather.currentPath
                          ? { color: "primary" }
                          : { color: "foreground" }
                      ),
                      " text-lg hover:text-violet-400 hover:scale-110 duration-300 transition-all"
                    )}
                    color="primary"
                    onClick={() => (pather.currentPath = item.label)}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              )
          )}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

        {user ? (
          <Menu as="div" className="relative">
            <Menu.Button className="flex flex-row items-center content-center bg-gray-300/20 rounded-xl">
              <Image
                src={user.photoURL || "/anonymous_male.svg"}
                width={40}
                height={40}
                alt=""
                className="rounded-xl mb-3 ml-2 mr-2"
              />
              <span>{user.displayName}</span>
            </Menu.Button>

            <Menu.Items className="absolute right-1 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <Dropdown>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{username}</p>
                      </DropdownItem>
                      <DropdownItem key="settings">
                        {" "}
                        <Link color="foreground" href="/setting">
                          My Settings
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="settings">
                        {" "}
                        <Link color="foreground" href="/blog/createBlog">
                          Create Blog
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="settings">
                        {" "}
                        <Link color="foreground" href="/blog">
                          Read Blogs
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="team_settings">
                        Team Settings
                      </DropdownItem>
                      <DropdownItem key="analytics">Analytics</DropdownItem>
                      <DropdownItem key="system">System</DropdownItem>
                      <DropdownItem key="configurations">
                        Configurations
                      </DropdownItem>
                    
                    
                      {!isCoordinator ? (
                        <DropdownItem key="admin_section">
                          <Link href="/admin/cloudAdmin">
                            <a className="text-foreground">Admin Section</a>
                          </Link>
                        </DropdownItem>
                      ):(
                        <DropdownItem key="help_and_feedback">
                        <Link color="foreground" href="/helpAndFeedback">
                          Help & Feedback
                        </Link>
                      </DropdownItem>
                      )}


                      {isAdmin ? (
                        <DropdownItem key="admin_section">
                          <Link color="foreground" href="/admin">
                            Admin Section
                          </Link>
                        </DropdownItem>
                      ) : (
                        <DropdownItem key="help_and_feedback">
                          <Link color="foreground" href="/helpAndFeedback">
                            Help & Feedback
                          </Link>
                        </DropdownItem>
                      )}
                      <DropdownItem key="logout" color="danger" withDivider>
                        <Button onClick={handleLogout}>Log Out</Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <NavbarItem>
            <Button className="bg-blue-500">
              <Link color="foreground" href="/login">
                Login
              </Link>
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={visible ? "Close menu" : "Open menu"}
          onClick={() => setVisible(!visible)}
        />
      </NavbarContent>

      {user ? (
        isAdmin ? (
          <NavbarMenu className="z-40">
            {searchInput}
            <div className="mt-2 flex flex-col gap-2">
              {siteConfig.loginAdminNavMenuItems.map(
                (item) =>
                  item.label! && (
                    <NavbarMenuItem key={`${item}`}>
                      <Link
                        className={clsx(
                          linkStyles(
                            {"color": item.label == pather.currentPath? "primary" : item.label == "Logout" ? "danger" : item.label == "Admin Section" ? "success" : "foreground"}
                          ),
                          "data-[active=true]:text-primary data-[active=true]:font-medium text-lg hover:text-violet-400 duration-300 transition-all"
                        )}
                        color="primary"
                        onClick={ item.label == "Logout" ? handleLogout : () => (pather.currentPath = item.label)}
                        href={item.href}
                        size="lg"
                      >
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  )
              )}
            </div>
          </NavbarMenu>
        ) : (
          <NavbarMenu className="z-40">
            {searchInput}
            <div className="mt-2 flex flex-col gap-2">
              {siteConfig.loginNavMenuItems.map(
                (item) =>
                  item.label! && (
                    <NavbarMenuItem key={`${item}`}>
                      <Link
                        className={clsx(
                          linkStyles(
                            // item.label == pather.currentPath
                            //   ? { color: "primary" }
                            //   : (item.label == "Logout" ? color: "foreground" : null)
                            {"color": item.label == pather.currentPath? "primary" : item.label == "Logout" ? "danger" : item.label == "Admin Section" ? "success" : "foreground"}
                          ),
                          "data-[active=true]:text-primary data-[active=true]:font-medium text-lg hover:text-violet-400 duration-300 transition-all"
                        )}
                        color="primary"
                        onClick={item.label == "Logout" ? handleLogout : () => (pather.currentPath = item.label)}
                        href={item.href}
                        size="lg"
                      >
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  )
              )}
            </div>
          </NavbarMenu>
        )
      ) : (
        <NavbarMenu className="z-40">
          {searchInput}
          <div className="mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map(
              (item) =>
                item.label! && (
                  <NavbarMenuItem key={`${item}`}>
                    <Link
                      className={clsx(
                        linkStyles(
                          {"color": item.label == pather.currentPath? "primary" : item.label == "Login" ? "success" : "foreground"}
                        ),
                        "data-[active=true]:text-primary data-[active=true]:font-medium text-lg hover:text-violet-400 duration-300 transition-all"
                      )}
                      color="primary"
                      onClick={() => (pather.currentPath = item.label)}
                      href={item.href}
                      size="lg"
                    >
                      {item.label}
                    </Link>
                  </NavbarMenuItem>
                )
            )}
          </div>
        </NavbarMenu>
      )}
    </NextUINavbar>
  );
};
  function setErrorMessage(arg0: string) {
    throw new Error("Function not implemented.");
  }

  function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

