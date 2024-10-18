import { useState } from "react";
import { db } from "@/components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Navbar } from "@/components/navbar";
import BackdropAnimation from "@/components/utils/backdrop_animation";

const WorkshopForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    registrationNumber: "",
    year: "",
    email: "",
    phoneNumber: "",
    course: "",
    branch: "",
    section: "",
    department: "",
    cloud: "",
    linuxExperience: "",
    shellScripting: "",
    githubActions: "",
    ansibleExperience: "",
    terraformExperience: "",
    jiraExperience: "",
    jenkinsExperience: "",
    dockerExperience: "",
    kubernetesExperience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "workshop"), formData);
      alert("Form submitted successfully!");
      setFormData({
        fullName: "",
        registrationNumber: "",
        year: "",
        email: "",
        phoneNumber: "",
        course: "",
        branch: "",
        section: "",
        department: "",
        cloud: "",
        linuxExperience: "",
        shellScripting: "",
        githubActions: "",
        ansibleExperience: "",
        terraformExperience: "",
        jiraExperience: "",
        jenkinsExperience: "",
        dockerExperience: "",
        kubernetesExperience: "",
      });
      // Redirect to the WhatsApp group link
      window.location.href = "https://chat.whatsapp.com/HS8puOQihYDLoN3KGtDcey";
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form!");
    }
  };

  return (
    <>
    <Navbar/>
    <BackdropAnimation/>
    <div className="min-h-screen bg-gradient-to-r  from-purple-200 via-blue-200 to-teal-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Workshop Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" />

            <select name="cloud" value={formData.cloud} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Cloud Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="linuxExperience" value={formData.linuxExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Linux</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select name="shellScripting" value={formData.shellScripting} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Shell Scripting</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="githubActions" value={formData.githubActions} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">GitHub Actions Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="ansibleExperience" value={formData.ansibleExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Ansible</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="terraformExperience" value={formData.terraformExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Terraform</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="jiraExperience" value={formData.jiraExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Jira</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="jenkinsExperience" value={formData.jenkinsExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Jenkins</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="dockerExperience" value={formData.dockerExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Docker</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="kubernetesExperience" value={formData.kubernetesExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300">
              <option value="">Experience on Kubernetes</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default WorkshopForm;
