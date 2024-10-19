import { useState } from "react";
import { db } from "@/components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Navbar } from "@/components/navbar";
import BackdropAnimation from "@/components/utils/backdrop_animation";

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
    department: "AI and ML",
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
      await addDoc(collection(db, "workshop"), formData);
      setShowReminder(true); // Show the reminder modal
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
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form!");
    }
  };

  const closeReminder = () => {
    setShowReminder(false);
    // Redirect to the WhatsApp group link
    window.location.href = "https://chat.whatsapp.com/HS8puOQihYDLoN3KGtDcey";
  };

  return (
    <>
      <Navbar />
      <BackdropAnimation />

      {!showForm ? (
      <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-teal-300 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">🚀 Deep Learning Bootcamp: From Fundamentals to Real-World Applications</h1>
    
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">📝 Description of the Workshop:</h2>
        <p className="text-lg text-gray-700 mb-4">
          Deep Learning Bootcamp: From Fundamentals to Real-World Applications</p>
    
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">🎯 Learning Outcome:</h2>
        <p className="text-lg text-gray-700 mb-4">
          This 2-day workshop introduces students to the world of AI and Deep Learning. Whether you are new to AI or just starting out, you will gain a solid foundation and hands-on, project-based experience to apply in real-world scenarios.
        </p>
    
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">🔍 Why This Workshop is Relevant to You:</h2>
        <p className="text-lg text-gray-700 mb-4">
          Deep Learning is driving innovation across industries. Whether you are pursuing a career in AI or simply curious, this workshop equips you with essential skills to get started. By the end of the workshop, you will have built and trained your own neural network, and you will walk away with practical experience that you can apply to future projects and research.
        </p>
    
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">💡 Skills You will Gain:</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>🤖 Understanding of Neural Networks</li>
          <li>🐍 Basics of Python for AI</li>
          <li>📊 Data Preprocessing Techniques</li>
          <li>🛠️ Building and Training Models</li>
          <li>🎛️ Hyperparameter Tuning</li>
          <li>📈 Model Evaluation and Optimization</li>
          <li>🔢 Knowledge of Activation Functions and Loss Functions</li>
          <li>🧠 Problem-Solving and Project-Based Learning</li>
        </ul>
    
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">📅 Day 1: Foundations of Deep Learning</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>🤖 Introduction to AI, Machine Learning, and Neural Networks</li>
          <li>📐 Basic Math (Linear Algebra, Calculus) and Activation Functions</li>
          <li>💻 Hands-on with Python libraries: NumPy, Pandas, TensorFlow</li>
          <li>🛠️ Build and train your first neural network</li>
          <li>📊 Start working on a real-world dataset</li>
        </ul>
    
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">⚙️ Day 2: Building and Tuning Models</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>🤖 Neural Network Training, Evaluation, and Optimization</li>
          <li>🎛️ Hyperparameter tuning and Regularization</li>
          <li>🔬 Cross-validation and testing on new data</li>
          <li>💡 Continue project work and apply advanced techniques</li>
        </ul>
    
        <p className="mt-6 text-lg text-gray-700">🎓 Do not miss this chance to enhance your AI and deep learning skills. Register now!</p>
    
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
              <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <input type="text" name="department" placeholder="Department" value="AI and ML" readOnly onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required/>
              <select name="cloud" value={formData.cloud} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
                <option value="">What is your current proficiency level in Basic Mathematics (Algebra, Probability, Statistics)?</option>
                <option value="Beginner">No Prior Knowledge</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

            <select name="linuxExperience" value={formData.linuxExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">How would you rate your proficiency in Python programming?</option>
              <option value="Yes">Yes</option>
              <option value="No Prior Knowledge">No Prior Knowledge</option>
            </select>

            <select name="shellScripting" value={formData.shellScripting} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Have you completed any courses related to Machine Learning or Data Science?</option>
              <option value="Beginner">No Prior Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="githubActions" value={formData.githubActions} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">What Machine Learning topics are you most interested in? (Select all that apply)</option>
              <option value="Beginner">No Prior Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="ansibleExperience" value={formData.ansibleExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">What prior experience do you have with data analysis libraries (e.g., NumPy, Pandas)?</option>
              <option value="Beginner">No Prior Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

           

            <select name="terraformExperience" value={formData.terraformExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">What do you hope to achieve by attending this workshop?</option>
              <option value="Beginner">No Prior Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="jiraExperience" value={formData.jiraExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">How did you hear about this workshop?</option>
              <option value="Beginner">No Prior Knowledge</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select name="jenkinsExperience" value={formData.jenkinsExperience} onChange={handleChange} className="input-field p-3 rounded-lg border-2 border-teal-300" required>
              <option value="">Which topics would you like to see emphasized in the workshop? (Select all that apply)</option>
              <option value="Beginner">No Prior Knowledge</option>
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
    )}


    {showReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Reminder</h3>
            <p className="text-gray-600 mb-6">Please create your AWS account if you have No Prior Knowledget done so yet. Students with accounts will be prioritized, and it is essential for the workshop.</p>
            <button onClick={closeReminder} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkshopForm;
