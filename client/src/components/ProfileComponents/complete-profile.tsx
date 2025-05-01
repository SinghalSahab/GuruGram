import { useNavigate } from "react-router-dom"
import { ClipboardList, ArrowRight } from "lucide-react"

export default function CompleteProfile() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <ClipboardList className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
            Complete Your Mentor Profile
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Take a moment to set up your professional profile. This will help mentees find and connect with you more
            easily.
          </p>
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full w-1/4"></div>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile-completion")}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
          >
            Start Profile Setup
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 px-8 py-4 md:px-10 md:py-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Your profile helps you stand out and connect with potential mentees. Let's make it shine!
          </p>
        </div>
      </div>
    </div>
  )
}

