import React, { useState } from "react";
import { db, storage } from '../../components/firebaseConfig'; // Adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from "next/image";

function AddMemberForm() {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    image: "",
    description: "",
    gender: "",
    linkedin: "",
    github: "",
    year: "First_Year",
    
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setFormData({
        ...formData,
        image: URL.createObjectURL(file), // Display image preview
      });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `core-members/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newMemberData = { ...formData, image: imageUrl };

      await addDoc(collection(db, 'core-members'), newMemberData);
      alert("Member added successfully!");
      setFormData({
        name: "",
        domain: "",
        image: "",
        description: "",
        gender: "",
        linkedin: "",
        github: "",
        year: "First_Year",
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
          title="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Domain</label>
          <input
          title="domain"
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
          title="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        {imageFile && (
          <div className="mt-2">
            <Image
              src={formData.image}
              alt="Preview"
              height={200}
              width={100}
              className="max-w-full h-auto rounded-md"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
          title="decription"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
          title="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">LinkedIn URL</label>
          <input
          title="linkedin"
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">GitHub URL</label>
          <input
          title="github"
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Year</label>
          <select
          title="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="First_Year">First Year</option>
            <option value="Second_Year">Second Year</option>
            <option value="Third_Year">Third Year</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
}

export default AddMemberForm;
