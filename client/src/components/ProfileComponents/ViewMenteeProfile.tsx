import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPinIcon, BriefcaseIcon, AcademicCapIcon, FlagIcon } from '@heroicons/react/24/outline'

interface Skill {
  name: string
  level: number
}

interface MenteeProfileProps {
  name: string
  avatar: string
  location: string
  occupation: string
  education: string
  bio: string
  skills: Skill[]
  goals: string[]
}

export default function ViewMenteeProfile() {
  const { id } = useParams<{ id: string }>()
  const [menteeData, setMenteeData] = useState<MenteeProfileProps | null>(null)

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mentee/${id}`)
        const data = await response.json()
        setMenteeData(data)
      } catch (error) {
        console.error('Error fetching mentee data:', error)
      }
    }

    fetchMenteeData()
  }, [id])

  if (!menteeData) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={menteeData.avatar || "/placeholder.svg"}
            alt={menteeData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{menteeData.name}</h1>
            <div className="mt-2 flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {menteeData.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <BriefcaseIcon className="w-4 h-4" />
                {menteeData.occupation}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <AcademicCapIcon className="w-4 h-4" />
                {menteeData.education}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600">{menteeData.bio}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="space-y-2">
              {menteeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-24 text-sm text-gray-600">{skill.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Goals</h2>
            <div className="flex flex-wrap gap-2">
              {menteeData.goals.map((goal, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
                >
                  <FlagIcon className="w-3 h-3" />
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Request Mentorship
        </button>
      </div>
    </div>
  )
}
