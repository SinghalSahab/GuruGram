import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormData {
  location: string
  customLocation: string
  occupation: string
  customOccupation: string
  education: string
  customEducation: string
  bio: string
  skills: { name: string; level: number }[]
  specialties: string[]
}

const locationOptions = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Bhopal",
  "Other",
]

const occupationOptions = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Specialist",
  "Financial Analyst",
  "Teacher",
  "Doctor",
  "Lawyer",
  "Entrepreneur",
  "Architect",
  "Journalist",
  "HR Manager",
  "Sales Executive",
  "Mechanical Engineer",
  "Chef",
  "Photographer",
  "Graphic Designer",
  "Accountant",
  "Researcher",
  "Other",
]

const educationOptions = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "Ph.D.",
  "Diploma",
  "Vocational Training",
  "Self-taught",
  "Other",
]

const skillOptions = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "Node.js",
  "SQL",
  "Machine Learning",
  "Data Analysis",
  "Project Management",
  "UI/UX Design",
  "Digital Marketing",
  "Content Writing",
  "Public Speaking",
  "Leadership",
  "Financial Planning",
  "Sales",
  "Customer Service",
  "Graphic Design",
  "Video Editing",
  "Other",
]

const specialtyOptions = [
  "Coding skills",
  "New programming language",
  "Transition to management",
  "Start a business",
  "Public speaking",
  "Expand professional network",
  "Certification in a specific technology",
  "Contribute to open-source projects",
  "Technical blogging",
  "Mentoring junior professionals",
  "Work-life balance",
  "Cloud computing",
  "Leadership skills",
  "Problem-solving abilities",
  "Data visualization",
  "AI/ML techniques",
  "Communication skills",
  "Personal branding",
  "Design tools",
  "Time management",
  "Other",
]

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
}

export default function ProfileCompletion() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    location: "",
    customLocation: "",
    occupation: "",
    customOccupation: "",
    education: "",
    customEducation: "",
    bio: "",
    skills: [{ name: "", level: 0 }],
    specialties: [""],
  })

  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem("_id")
    if (!userId) {
      navigate("/login")
    }
  }, [navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "location" && value !== "Other" && { customLocation: "" }),
      ...(name === "occupation" && value !== "Other" && { customOccupation: "" }),
      ...(name === "education" && value !== "Other" && { customEducation: "" }),
    }))
  }

  const handleSkillChange = (index: number, field: "name" | "level", value: string | number) => {
    const newSkills = [...formData.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    setFormData({ ...formData, skills: newSkills })
  }

  const handleSpecialtyChange = (index: number, value: string) => {
    const newSpecialties = [...formData.specialties]
    newSpecialties[index] = value
    setFormData({ ...formData, specialties: newSpecialties })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userId = localStorage.getItem("_id")
      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/mentor/updateMentor`

      const submissionData = {
        ...formData,
        location: formData.location === "Other" ? formData.customLocation : formData.location,
        occupation: formData.occupation === "Other" ? formData.customOccupation : formData.occupation,
        education: formData.education === "Other" ? formData.customEducation : formData.education,
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submissionData, _id: userId }),
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        navigate("/profile/mentor")
      } else {
        console.error("Failed to update profile:", res)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" {...fadeInOut}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Basic Information</h2>
            <div className="space-y-6">
              {renderSelect("location", "Location", locationOptions)}
              {formData.location === "Other" &&
                renderInput("customLocation", "Specify Location", "text", "Enter your location")}
              {renderSelect("occupation", "Occupation", occupationOptions)}
              {formData.occupation === "Other" &&
                renderInput("customOccupation", "Specify Occupation", "text", "Enter your occupation")}
              {renderSelect("education", "Education", educationOptions)}
              {formData.education === "Other" &&
                renderInput("customEducation", "Specify Education", "text", "Enter your education")}
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div key="step2" {...fadeInOut}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Professional Bio</h2>
            <div className="space-y-6">{renderTextarea("bio", "Bio", "Write a short professional bio")}</div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div key="step3" {...fadeInOut}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Skills</h2>
            <div className="space-y-4">
              {formData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex space-x-2"
                >
                  <select
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="">Select a skill</option>
                    {skillOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, "level", Number.parseInt(e.target.value))}
                    placeholder="Level"
                    min="0"
                    max="100"
                    className="w-24 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSkills = [...formData.skills]
                      newSkills.splice(index, 1)
                      setFormData({ ...formData, skills: newSkills })
                    }}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={() => setFormData({ ...formData, skills: [...formData.skills, { name: "", level: 0 }] })}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} className="mr-2" /> Add Skill
              </motion.button>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div key="step4" {...fadeInOut}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Specialties</h2>
            <div className="space-y-4">
              {formData.specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex space-x-2"
                >
                  <select
                    value={specialty}
                    onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="">Select a specialty</option>
                    {specialtyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const newSpecialties = [...formData.specialties]
                      newSpecialties.splice(index, 1)
                      setFormData({ ...formData, specialties: newSpecialties })
                    }}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={() => setFormData({ ...formData, specialties: [...formData.specialties, ""] })}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} className="mr-2" /> Add Specialty
              </motion.button>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  const renderInput = (name: keyof FormData, label: string, type: string, placeholder: string) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name] as string}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        required
      />
    </motion.div>
  )

  const renderSelect = (name: keyof FormData, label: string, options: string[]) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name] as string}
        onChange={handleInputChange}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  )

  const renderTextarea = (name: keyof FormData, label: string, placeholder: string) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={formData[name] as string}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        required
      ></textarea>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Complete Your Profile
          </motion.h1>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((s) => (
                <motion.div
                  key={s}
                  className={`w-1/4 h-2 ${
                    s <= step ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
                  } ${s === 1 ? "rounded-l-full" : ""} ${s === 4 ? "rounded-r-full" : ""}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: s * 0.1 }}
                ></motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Basic Info</span>
              <span>Bio</span>
              <span>Skills</span>
              <span>Specialties</span>
            </div>
          </motion.div>
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            <motion.div
              className="mt-8 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={20} className="mr-2" /> Previous
                </motion.button>
              )}
              {step < 4 ? (
                <motion.button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next <ChevronRight size={20} className="ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Complete Profile
                </motion.button>
              )}
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  )
}

