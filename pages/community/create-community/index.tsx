import { useState } from "react";
import { db, storage } from "../../../components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface TeamMember {
  name: string;
  role: string;
  github: string;
  linkedin: string;
  photo: string;
  gender: string;
}

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [faculty, setFacultyName] = useState("");
  const [personalThoughts, setPersonalThoughts] = useState("");
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [personalImage, setPersonalImage] = useState<File | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    if (name === 'name' && !value.trim()) return 'Community name is required';
    if (name === 'department' && !value.trim()) return 'Department is required';
    if (name === 'description' && !value.trim()) return 'Description is required';
    return '';
  };

  const handleCreateCommunity = async () => {
    const newErrors = {
      name: validateField('name', name),
      department: validateField('department', department),
      description: validateField('description', description),
    };

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const communityLogoRef = communityImage ? ref(storage, `communityLogos/${communityImage.name}`) : null;
      const personalImageRef = personalImage ? ref(storage, `personalImages/${personalImage.name}`) : null;
      let communityLogoUrl = "";
      let personalImageUrl = "";

      if (communityImage && communityLogoRef) {
        const logoSnapshot = await uploadBytes(communityLogoRef, communityImage);
        communityLogoUrl = await getDownloadURL(logoSnapshot.ref);
      }

      if (personalImage && personalImageRef) {
        const personalSnapshot = await uploadBytes(personalImageRef, personalImage);
        personalImageUrl = await getDownloadURL(personalSnapshot.ref);
      }

      await addDoc(collection(db, "communities"), {
        name,
        department,
        description,
        faculty,
        personalThoughts,
        communityLogoUrl,
        personalImageUrl,
      });

      alert('Community created successfully!');
      setName('');
      setDepartment('');
      setDescription('');
      setFacultyName('');
      setPersonalThoughts('');
      setCommunityImage(null);
      setPersonalImage(null);
      setTeamMembers([]);
      setErrors({});
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, {
      name: '',
      role: '',
      github: '',
      linkedin: '',
      photo: '',
      gender: ''
    }]);
    
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleTeamMemberPhotoChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updatedMembers = [...teamMembers];
      updatedMembers[index].photo = base64String;
      setTeamMembers(updatedMembers);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create New Community</h1>
          <p className="mt-2 text-gray-600">Build and manage your academic community platform</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          {/* Core Information Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
              Core Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Community Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-4 py-3 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setErrors({ ...errors, department: '' });
                  }}
                  className={`w-full px-4 py-3 border ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: '' });
                }}
                rows={4}
                className={`w-full px-4 py-3 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </section>

          {/* Leadership Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
              Leadership Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faculty Coordinator
                </label>
                <input
                  type="text"
                  value={faculty}
                  onChange={(e) => setFacultyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coordinator Statement
                </label>
                <textarea
                  value={personalThoughts}
                  onChange={(e) => setPersonalThoughts(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
              Media Assets
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Community Logo
                </label>
                <div className="relative group border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center hover:border-indigo-500 transition-colors">
                  <input
                    type="file"
                    onChange={(e) => setCommunityImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center p-4">
                    <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {communityImage ? communityImage.name : 'Upload Image'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Coordinator Image
                </label>
                <div className="relative group border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center hover:border-indigo-500 transition-colors">
                  <input
                    type="file"
                    onChange={(e) => setPersonalImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center p-4">
                    <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {personalImage ? personalImage.name : 'Upload Image'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Members Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
              Team Members
            </h2>

            <div>
              <button
                type="button"
                onClick={addTeamMember}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Member
              </button>
            </div>

          {teamMembers.map((member, index) => (
              <div key={index} className="space-y-4 mb-6 p-4 border rounded-lg">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => {
                        const updated = [...teamMembers];
                        updated[index].name = e.target.value;
                        setTeamMembers(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => {
                        const updated = [...teamMembers];
                        updated[index].role = e.target.value;
                        setTeamMembers(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={member.github}
                      onChange={(e) => {
                        const updated = [...teamMembers];
                        updated[index].github = e.target.value;
                        setTeamMembers(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={member.linkedin}
                      onChange={(e) => {
                        const updated = [...teamMembers];
                        updated[index].linkedin = e.target.value;
                        setTeamMembers(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      value={member.gender}
                      onChange={(e) => {
                        const updated = [...teamMembers];
                        updated[index].gender = e.target.value;
                        setTeamMembers(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleTeamMemberPhotoChange(index, file);
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    {member.photo && (
                      <img 
                        src={member.photo} 
                        alt="Preview" 
                        className="mt-2 h-20 w-20 object-cover rounded"
                      />
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Member
                </button>
              </div>
            ))}
          </section>

          <div className="text-right">
            <button
              type="button"
              onClick={handleCreateCommunity}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Community'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;