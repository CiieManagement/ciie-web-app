import { useState } from "react";
import { db, storage } from "../../../components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [faculty, setFacultyName] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [personalThoughts, setPersonalThoughts] = useState("");
  const [personalImage, setPersonalImage] = useState<File | null>(null);
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [teamMembers, setTeamMembers] = useState([{ name: "", role: "", linkedin: "", github: "" }]);

  const handleCreateCommunity = async () => {
    let personalImageURL = ""; // Store personal image URL
    let communityImageURL = ""; // Store community image URL

    try {
      // Upload the personal image if it exists
      if (personalImage) {
        const personalImageRef = ref(storage, `community-images/personal/${personalImage.name}`);
        await uploadBytes(personalImageRef, personalImage);
        personalImageURL = await getDownloadURL(personalImageRef); // Get the download URL
      }

      // Upload the community image if it exists
      if (communityImage) {
        const communityImageRef = ref(storage, `community-images/community/${communityImage.name}`);
        await uploadBytes(communityImageRef, communityImage);
        communityImageURL = await getDownloadURL(communityImageRef); // Get the download URL
      }

      // Create a new community document in Firestore
      await addDoc(collection(db, "communities"), {
        faculty,
        name,
        department,
        description,
        personalImage: personalImageURL, // Store the personal image URL
        communityImage: communityImageURL, // Store the community image URL
        personalThoughts,
        teamMembers,
      });

      alert('Community created successfully!');
      // Reset form fields
      setName("");
      setFacultyName("");
      setDepartment("");
      setDescription("");
      setPersonalThoughts("");
      setPersonalImage(null);
      setCommunityImage(null);
      setTeamMembers([{ name: "", role: "", linkedin: "", github: "" }]);
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Please try again.');
    }
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field as keyof typeof updatedTeamMembers[0]] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "", linkedin: "", github: "" }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Community</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Community Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Faculty Name"
            onChange={(e) => setFacultyName(e.target.value)}
            value={faculty}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Department"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <textarea
            placeholder="Personal Thoughts"
            onChange={(e) => setPersonalThoughts(e.target.value)}
            value={personalThoughts}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Community Page Image</h3>
            <input
              type="file"
              onChange={(e) => setCommunityImage(e.target.files![0])}
              className="w-full text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Coordinator Image</h3>
            <input
              type="file"
              onChange={(e) => setPersonalImage(e.target.files![0])}
              className="w-full text-gray-600"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">Add Team Members</h3>
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-2 shadow-sm">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleTeamMemberChange(index, "role", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={member.linkedin}
                onChange={(e) => handleTeamMemberChange(index, "linkedin", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={member.github}
                onChange={(e) => handleTeamMemberChange(index, "github", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            onClick={addTeamMember}
            className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Add Team Member
          </button>

          <button
            onClick={handleCreateCommunity}
            className="w-full py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
