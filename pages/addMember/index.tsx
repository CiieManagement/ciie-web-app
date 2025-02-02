"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/components/firebaseConfig";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const AddTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: "", role: "", github: "", linkedin: "", gender: "", photo: "", department: "" },
  ]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const storage = getStorage();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "communities"));
        const departmentNames: string[] = querySnapshot.docs.map(doc => doc.data().department);
        setDepartments(departmentNames);
      } catch (error) {
        console.error("Error fetching departments: ", error);
      }
    };

    fetchDepartments();
  }, []);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", github: "", linkedin: "", gender: "", photo: "", department: "" }]);
  };

  const removeTeamMember = (index: number) => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  const handleTeamMemberPhotoChange = async (index: number, file: File | null) => {
    if (!file) return;

    try {
      const storageRef = ref(storage, `teamMembers/${Date.now()}_${file.name}`);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64String = reader.result as string;

        const updatedMembers = [...teamMembers];
        updatedMembers[index].photo = base64String;
        setTeamMembers([...updatedMembers]);

        await uploadString(storageRef, base64String, "data_url");
        const downloadURL = await getDownloadURL(storageRef);

        updatedMembers[index].photo = downloadURL;
        setTeamMembers([...updatedMembers]);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const promises = teamMembers.map(async (member) => {
        if (!member.photo) {
          throw new Error("Please upload a photo for all members.");
        }

        const docRef = await addDoc(collection(db, "teamMembers"), {
          ...member,
          timestamp: new Date(),
        });

        return docRef.id;
      });

      await Promise.all(promises);
      alert("Team members added successfully!");

      setTeamMembers([{ name: "", role: "", github: "", linkedin: "", gender: "", photo: "", department: "" }]);
    } catch (error) {
      console.error("Error adding team members:", error);
      alert(error.message || "Error adding team members.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-r from-gray-500 to-red-100 flex justify-center items-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Add Team Members</h2>

        {teamMembers.map((member, index) => (
          <div key={index} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow-md mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={member.name}
              onChange={(e) => {
                const updatedMembers = [...teamMembers];
                updatedMembers[index].name = e.target.value;
                setTeamMembers(updatedMembers);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            <select
              value={member.role}
              onChange={(e) => {
                const updatedMembers = [...teamMembers];
                updatedMembers[index].role = e.target.value;
                setTeamMembers(updatedMembers);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Team Member">Team Member</option>
            </select>

            <select
              value={member.department}
              onChange={(e) => {
                const updatedMembers = [...teamMembers];
                updatedMembers[index].department = e.target.value;
                setTeamMembers(updatedMembers);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="GitHub URL"
              value={member.github}
              onChange={(e) => {
                const updatedMembers = [...teamMembers];
                updatedMembers[index].github = e.target.value;
                setTeamMembers(updatedMembers);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              placeholder="LinkedIn URL"
              value={member.linkedin}
              onChange={(e) => {
                const updatedMembers = [...teamMembers];
                updatedMembers[index].linkedin = e.target.value;
                setTeamMembers(updatedMembers);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="file"
              onChange={(e) => handleTeamMemberPhotoChange(index, e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            {member.photo && (
              <img src={member.photo} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-lg shadow-md border" />
            )}

            <select
              value={member.gender}
              onChange={(e) => {
                const updatedMembers = [...teamMembers];
                updatedMembers[index].gender = e.target.value;
                setTeamMembers(updatedMembers);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="button"
              onClick={() => removeTeamMember(index)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove Member
            </button>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button onClick={addTeamMember} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">
            Add Team Member
          </button>

          <button onClick={handleSubmit} disabled={loading} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddTeamMembers;
