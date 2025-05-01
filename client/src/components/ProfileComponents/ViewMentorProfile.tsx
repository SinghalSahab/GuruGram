import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPinIcon, BriefcaseIcon, AcademicCapIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/outline'

interface Skill {
  name: string
  level: number
}

interface Badge {
  name: string
  description: string
}

interface MentorProfileProps {
  name: string
  avatar: string
  location: string
  occupation: string
  education: string
  bio: string
  skills: Skill[]
  specialties: string[]
  rating: number
  totalMentees: number
  badges: Badge[]
}

export default function ViewMentorProfile() {
  const { id } = useParams<{ id: string }>()
  const [mentorData, setMentorData] = useState<MentorProfileProps | null>(null)

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${id}`)
        const data = await response.json()
        setMentorData(data)
      } catch (error) {
        console.error('Error fetching mentor data:', error)
      }
    }

    fetchMentorData()
  }, [id])

  if (!mentorData) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={mentorData.avatar || "/placeholder.svg"}
            alt={mentorData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left flex-grow">
            <h1 className="text-2xl font-bold text-gray-800">{mentorData.name}</h1>
            <div className="mt-2 flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {mentorData.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <BriefcaseIcon className="w-4 h-4" />
                {mentorData.occupation}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <AcademicCapIcon className="w-4 h-4" />
                {mentorData.education}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <StarIcon className="w-5 h-5" />
              <span className="font-bold">{mentorData.rating.toFixed(1)}</span>
            </div>
           
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600">{mentorData.bio}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="space-y-2">
              {mentorData.skills.map((skill, index) => (
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
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {mentorData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Badges</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mentorData.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <TrophyIcon className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">{badge.name}</h3>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                </div>
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

