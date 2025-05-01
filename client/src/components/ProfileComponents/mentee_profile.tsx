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
  guruCoins?: number // New prop
}

export default function MenteeProfile({
  name,
  avatar,
  location,
  occupation,
  education,
  bio,
  skills,
  goals
}: MenteeProfileProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <div className="mt-2 flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <BriefcaseIcon className="w-4 h-4" />
                {occupation}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <AcademicCapIcon className="w-4 h-4" />
                {education}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600">{bio}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, index) => (
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
              {goals.map((goal, index) => (
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
      </div>
  )
}