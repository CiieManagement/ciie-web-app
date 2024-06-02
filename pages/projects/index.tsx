// pages/docs.js
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { auth, db, storage } from "../../components/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from 'react-hot-toast';
import Image from "next/image";
import { ChangeEvent } from "react";
import { User } from 'firebase/auth';

export default function DocsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initially loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [regNo, setRegNo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [project, setProject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName || "");
        setEmail(user.email || "");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate minimum word count for project description
    const wordCount = project.trim().split(/\s+/).length;
    if (wordCount < 100) {
      toast.error("Please provide a minimum of 100 words for the project description.");
      return;
    }

    try {
      if (name === "" || email === "" || year === "" || regNo === "" || project === "" || !file) {
        toast.error("Please fill in all fields and select a file.");
        return;
      }

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Save data to Firestore
      const docRef = doc(db, "submissions", name);
      await setDoc(docRef, {
        name,
        email,
        year,
        regNo,
        fileUrl: url,
        project,
        uploadedAt: Timestamp.now(),
      });

      // Clear form after submission
      setName("");
      setEmail("");
      setYear("");
      setRegNo("");
      setFile(null);
      setProject("");
      setErrorMessage("");

      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again later.");
    }
  };

  if (!user && !loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen overflow-hidden">
          <div className="pb-52 mb-10 max-w-7xl text-center items-center justify-center place-content-center">
            <BackdropAnimation />
            <Toaster position="bottom-center" />
            <Card className="max-w-[400px] mx-auto">
              <CardHeader className="flex gap-3 items-center">
                <Image
                  alt="CIIE"
                  height={40}
                  width={40}
                  src="/ciie_logo.png"
                  className="rounded-sm"
                />
                <div className="flex flex-col">
                  <p className="text-left">CIIE</p>
                  <p className="text-small text-default-500">
                    Incubation and Innovation Cell
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  If you are a CIIE member and you are not logged in, you cant see any projects.
                  <br />
                  Please login first.
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link href="./login">Login</Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="pb-10 max-w-7xl text-center items-center justify-center place-content-center">
          <BackdropAnimation />

          <h1 className="text-5xl mb-5">Submit Your Report</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center justify-center w-full m-5"
          >
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />

            <Input
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />

            <Input
              label="Registration Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />

            <Textarea
              label="About Your Project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="h-32 overflow-y-hidden"
              required
            />

            <input
              aria-label="file"
              onChange={handleFileChange}
              type="file"
              accept=".png, .jpg,.jpeg,.pdf"
              required
            />

            {file && (
              <p className="text-gray-600">Selected file: {file.name}</p>
            )}

            {errorMessage && (
              <Textarea readOnly value={errorMessage} />
            )}

            <Button
              color="primary"
              type="submit"
              disabled={!name || !email || !year || !regNo || !file || !project}
            >
              Submit
            </Button>
          </form>
          <Toaster position="bottom-center" />
        </div>
      </section>
    </DefaultLayout>
  );
}
