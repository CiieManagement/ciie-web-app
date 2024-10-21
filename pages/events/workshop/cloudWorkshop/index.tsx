import { useState } from "react";
import { db } from "@/components/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Navbar } from "@/components/navbar";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const WorkshopForm = () => {
    const [showForm, setShowForm] = useState(false);

    const handleContinue = () => {
        setShowForm(true);
    };

  const [formData, setFormData] = useState({
    fullName: "",
    registrationNumber: "",
    year: "",
    email: "",
    awsAccount: "",
    phoneNumber: "",
    course: "",
    branch: "",
    section: "",
    department: "Cloud",
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

  const [showReminder, setShowReminder] = useState(false); // New state for the reminder modal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Check if the email already exists in the "workshop" collection
      const q = query(collection(db, "workshop"), where("email", "==", formData.email));
      const p = query(collection(db, "workshop"), where("registrationNumber", "==", formData.registrationNumber));
      const querySnapshot1 = await getDocs(q);
      const querySnapshot2 = await getDocs(p);
  
      if (!querySnapshot1.empty || !querySnapshot2.empty) {
        // If the email already exists, show an error message and stop submission
        toast.error("You already submitted the form");
        return;
      }
  
      const dataToSubmit = {
        ...formData,
        appliedAt: new Date(), // Set the appliedAt field to the current date
      };
  
      // Add the new document to the collection if email does not exist
      await addDoc(collection(db, "workshop"), dataToSubmit);
  
      // Reset the form data and show success message
      setFormData({
        fullName: "",
        registrationNumber: "",
        year: "",
        email: "",
        phoneNumber: "",
        course: "",
        branch: "",
        section: "",
        awsAccount: "",
        department: "Cloud",
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
      
      setShowReminder(true); // Show the reminder modal
      toast.success("Application Submitted successfully");
  
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form!");
    }
  };

  const closeReminder = () => {
    setShowReminder(false);
    // Redirect to the WhatsApp group link
    window.location.href = "https://chat.whatsapp.com/DXlCJqWO7yA5LzyAYow2BN";
  };

  return (
    <>
      <Navbar />
      <BackdropAnimation />

      {!showForm ? (
       <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-teal-300 flex items-center justify-center">
       <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl w-full">
         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Join CIIE Cloud Workshop! 🌩</h1>
     
         <p className="text-lg text-gray-700 mb-4">
           🚀 Are you excited to dive into the world of cloud computing and take your technical skills to the next level? The
           Center for Innovation Incubation and Entrepreneurship (CIIE) is thrilled to announce a two-day cloud workshop at SRM University, designed to equip you with essential knowledge and hands-on experience in AWS services and Kubernetes.
         </p>
     
         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">📅 Workshop Overview:</h2>
         <ul className="list-disc pl-5 text-gray-700 mb-4">
           <li>📆 Date: <span className="font-bold">October 24-25</span></li>
           <li>⏰ Time: <span className="font-bold">9:30 AM to 4:00 PM</span></li>
           <li>📍 Venue: <span className="font-bold">SRM University</span></li>
         </ul>
     
         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">📚 What You’ll Learn:</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-4 bg-purple-100 rounded-lg shadow">
             <h3 className="text-xl font-bold text-gray-800 mb-2">🗓 Day 1: AWS Services</h3>
             <ul className="list-disc pl-5 text-gray-700">
               <li>🐙 Git and GitHub</li>
               <li>☁️ Amazon EC2, Amazon S3, Amazon RDS</li>
               <li>🔧 Hands-On Labs with EC2, S3, and RDS</li>
             </ul>
           </div>
           <div className="p-4 bg-blue-100 rounded-lg shadow">
             <h3 className="text-xl font-bold text-gray-800 mb-2">🗓 Day 2: Kubernetes</h3>
             <ul className="list-disc pl-5 text-gray-700">
               <li>🔍 Kubernetes Concepts and Architecture</li>
               <li>🛠️ Working with Pods, Services, and Deployments</li>
               <li>🤖 Hands-On Labs with Kubernetes</li>
             </ul>
           </div>
         </div>
     
         <p className="mt-6 text-lg text-gray-700">
           🎓 Upon successful completion of the workshop, attendees will receive a certification in Amazon Web Services (AWS), validating your cloud computing proficiency.
         </p>
     
         <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">🌟 Why Attend?</h2>
         <ul className="list-disc pl-5 text-gray-700">
           <li>👩‍🏫 Hands-On Learning with CIIE mentors</li>
           <li>📜 Earn AWS Certification to boost your career</li>
         </ul>
     
         <p className="mt-6 text-lg text-gray-700">💼 Do not miss this chance to enhance your cloud skills. Register now!</p>
     
         <div className="mt-6 flex justify-center">
           <button
             onClick={handleContinue}
             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
           >
             🚀 Continue to Registration
           </button>
         </div>
       </div>
     </div>
     
      ) : (

      <div className="min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Workshop Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              {/* <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/> */}
              <select name="year" value={formData.year} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
                <option value="">Year</option>
                <option value="1st Sem/ 1st Year">1st Sem/ 1st Year</option>
                <option value="3rd Sem/ 2nd Year">3rd Sem/ 2nd Year</option>
                <option value="5th Sem/ 3rd Year">5th Sem/ 3rd Year</option>
                <option value="7th Sem/ 4th Year">7th Sem/ 4th Year</option>
              </select>
              <input type="email" name="email" placeholder="College Email" value={formData.email} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="department" placeholder="Department" value="Cloud" readOnly onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <select name="cloud" value={formData.cloud} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
                <option value="">Cloud Experience</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

            <select name="linuxExperience" value={formData.linuxExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Linux</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select name="shellScripting" value={formData.shellScripting} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Shell Scripting</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="githubActions" value={formData.githubActions} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">GitHub Actions Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="ansibleExperience" value={formData.ansibleExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Ansible</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

           

            <select name="terraformExperience" value={formData.terraformExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Terraform</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="jiraExperience" value={formData.jiraExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Jira</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="jenkinsExperience" value={formData.jenkinsExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Jenkins</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="dockerExperience" value={formData.dockerExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Docker</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="kubernetesExperience" value={formData.kubernetesExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Experience on Kubernetes</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="awsAccount" value={formData.awsAccount} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Do you have an AWS account?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            


            {formData.awsAccount === "No" && (
              <a
                href="https://aws.amazon.com/education/awseducate/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 text-center"
              >
                Create AWS Student Account
              </a>
            )}
           


          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
    )}


    {showReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Reminder</h3>
            <p className="text-gray-600 mb-6">Please create your AWS account if you have not done so yet. Students with accounts will be prioritized, and it is essential for the workshop.</p>
            <button onClick={closeReminder} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              OK
            </button>
          </div>
        </div>
      )}
        <ToastContainer />

    </>
  );
};

export default WorkshopForm;
