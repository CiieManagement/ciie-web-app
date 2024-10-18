import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../../components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore"; // Firestore methods for adding data
import axios from "axios";

interface FormData {
  pythonProficiency: string;
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  course: string;
  branch: string;
  section: string;
  department: string;
  linuxExperience?: string;
  shellScripting?: string;
  githubActionsExperience?: string;
  ansibleExperience?: string;
  terraformExperience?: string;
  jiraExperience?: string;
  jenkinsExperience?: string;
  dockerExperience?: string;
  kubernetesExperience?: string;
}

const Apply: React.FC = () => {
  const router = useRouter();
  const { department } = router.query; // Get the department from the query

  const [formData, setFormData] = useState<FormData>({
    name: "",
    registrationNumber: "",
    email: "",
    phoneNumber: "",
    course: "",
    branch: "",
    section: "",
    department: "", // Initially empty
  });

  useEffect(() => {
    if (department) {
      // Update the department in formData once department is available
      setFormData((prevData) => ({
        ...prevData,
        department: department as string, // Cast to string
      }));
    }
  }, [department]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add form data to Firestore (replace 'applications' with your collection name)
      await addDoc(collection(db, "applications"), {
        ...formData,
        appliedAt: new Date(), // Store the timestamp of application
      });

      setSuccessMessage("Application submitted successfully!");
      const newFormData : FormData = {
        name: "",
        registrationNumber: "",
        email: "",
        phoneNumber: "",
        course: "",
        branch: "",
        section: "",
        department: ""
      }
       // setFormData(newFormData);
    } catch (error) {
      console.error("Error submitting application: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-gray-400/20 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold  mb-6 text-center">Apply for Community</h1>

          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block ">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block ">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block ">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block ">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block ">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label>Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block ">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department} // Auto-filled with department
                readOnly
                className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {formData.department === "Cloud" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block ">Experience on Linux</label>
                  <input
                    type="text"
                    name="linuxExperience"
                    value={formData.linuxExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Shell Scripting</label>
                  <input
                    type="text"
                    name="shellScripting"
                    value={formData.shellScripting || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">GitHub Actions Experience</label>
                  <input
                    type="text"
                    name="githubActionsExperience"
                    value={formData.githubActionsExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Experience on Ansible</label>
                  <input
                    type="text"
                    name="ansibleExperience"
                    value={formData.ansibleExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Experience on Terraform</label>
                  <input
                    type="text"
                    name="terraformExperience"
                    value={formData.terraformExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Experience on Jira</label>
                  <input
                    type="text"
                    name="jiraExperience"
                    value={formData.jiraExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Experience on Jenkins</label>
                  <input
                    type="text"
                    name="jenkinsExperience"
                    value={formData.jenkinsExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Experience on Docker</label>
                  <input
                    type="text"
                    name="dockerExperience"
                    value={formData.dockerExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block ">Experience on Kubernetes</label>
                  <input
                    type="text"
                    name="kubernetesExperience"
                    value={formData.kubernetesExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            )}
            {formData.department === "AI and ML" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Proficiency level in Basic Mathematics */}
                <div>
                  <label className="block ">
                    What is your current proficiency level in Basic Mathematics (Algebra, Probability, Statistics)?
                  </label>
                  <select
                    name="mathProficiency"
                    value={formData.mathProficiency || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select your proficiency</option>
                    <option value="Beginner">Beginner (Basic understanding, but no application experience)</option>
                    <option value="Intermediate">Intermediate (Comfortable with concepts and some application)</option>
                    <option value="Advanced">Advanced (Strong understanding and ability to apply concepts)</option>
                  </select>
                </div>

                {/* Proficiency in Python */}
                <div>
                  <label className="block ">
                    How would you rate your proficiency in Python programming?
                  </label>
                  <select
                    name="pythonProficiency"
                    value={formData.pythonProficiency || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select your proficiency</option>
                    <option value="Beginner">Beginner (Limited knowledge, can write simple programs)</option>
                    <option value="Intermediate">Intermediate (Comfortable with basic libraries like NumPy, Pandas)</option>
                    <option value="Advanced">Advanced (Experienced with Python, able to use libraries like Scikit-learn, TensorFlow)</option>
                  </select>
                </div>

                {/* Completed any ML or Data Science courses */}
                <div>
                  <label className="block ">
                    Have you completed any courses related to Machine Learning or Data Science?
                  </label>
                  <select
                    name="mlCourses"
                    value={formData.mlCourses || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formData.mlCourses === "Yes" && (
                    <input
                      type="text"
                      name="mlCourseDetails"
                      placeholder="Please specify the courses"
                      value={formData.mlCourseDetails || ""}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  )}
                </div>

                {/* ML topics of interest */}
                <div>
                  <label className="block ">
                    What Machine Learning topics are you most interested in? (Select all that apply)
                  </label>
                  <select
                    name="mlTopics"
                    value={formData.mlTopics || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select your topics</option>
                    <option value="Supervised Learning">Supervised Learning</option>
                    <option value="Unsupervised Learning">Unsupervised Learning</option>
                    <option value="Neural Networks">Neural Networks</option>
                    <option value="Data Preprocessing">Data Preprocessing</option>
                    <option value="Model Evaluation">Model Evaluation</option>
                    <option value="Other">Other (please specify)</option>
                  </select>
                  {formData.mlTopics === "Other" && (
                    <input
                      type="text"
                      name="otherMlTopics"
                      placeholder="Specify other topics"
                      value={formData.otherMlTopics || ""}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  )}
                </div>

                {/* Experience with data analysis libraries */}
                <div>
                  <label className="block ">
                    What prior experience do you have with data analysis libraries (e.g., NumPy, Pandas)?
                  </label>
                  <select
                    name="dataAnalysisExperience"
                    value={formData.dataAnalysisExperience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select your experience</option>
                    <option value="None">None</option>
                    <option value="Basic">Basic (Understand usage but limited hands-on experience)</option>
                    <option value="Intermediate">Intermediate (Can use libraries for basic data analysis)</option>
                    <option value="Advanced">Advanced (Frequently use libraries for data manipulation and analysis)</option>
                  </select>
                </div>

                {/* Workshop goal */}
                <div>
                  <label className="block ">
                    What do you hope to achieve by attending this workshop?
                  </label>
                  <select
                    name="workshopGoal"
                    value={formData.workshopGoal || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select your goal</option>
                    <option value="Gain foundational knowledge">Gain foundational knowledge in Machine Learning</option>
                    <option value="Learn about Neural Networks">Learn about Neural Networks</option>
                    <option value="Improve Python skills">Improve Python skills</option>
                    <option value="Network with peers and faculty">Network with peers and faculty</option>
                    <option value="Other">Other (please specify)</option>
                  </select>
                  {formData.workshopGoal === "Other" && (
                    <input
                      type="text"
                      name="otherWorkshopGoal"
                      placeholder="Specify other goals"
                      value={formData.otherWorkshopGoal || ""}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  )}
                </div>

                {/* How did you hear about this workshop */}
                <div>
                  <label className="block ">
                    How did you hear about this workshop?
                  </label>
                  <select
                    name="workshopSource"
                    value={formData.workshopSource || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="College Announcement">College Announcement</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Word of Mouth">Word of Mouth</option>
                    <option value="Other">Other (please specify)</option>
                  </select>
                  {formData.workshopSource === "Other" && (
                    <input
                      type="text"
                      name="otherWorkshopSource"
                      placeholder="Specify other source"
                      value={formData.otherWorkshopSource || ""}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  )}
                </div>

                {/* Workshop topics */}
                <div>
                  <label className="block ">
                    Which topics would you like to see emphasized in the workshop? (Select all that apply)
                  </label>
                  <select
                    name="workshopTopics"
                    value={formData.workshopTopics || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="" disabled>Select your topics</option>
                    <option value="Basics of Machine Learning">Basics of Machine Learning</option>
                    <option value="Introduction to Neural Networks">Introduction to Neural Networks</option>
                    <option value="Data Science Essentials">Data Science Essentials</option>
                    <option value="Hands-on Python Exercises">Hands-on Python Exercises</option>
                    <option value="Case Studies and Applications">Case Studies and Applications</option>
                    <option value="Other">Other (please specify)</option>
                  </select>
                  {formData.workshopTopics === "Other" && (
                    <input
                      type="text"
                      name="otherWorkshopTopics"
                      placeholder="Specify other topics"
                      value={formData.otherWorkshopTopics || ""}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  )}
                </div>
              </div>
            )}


            <button
              type="submit"
              className="w-full bg-indigo-500 text-white mt-5 py-2 rounded-lg hover:bg-indigo-600 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default Apply;
