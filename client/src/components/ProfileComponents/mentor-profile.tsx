import { MapPinIcon, BriefcaseIcon, AcademicCapIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import GuruCoins from '../GuruCoins'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Skill {
  name: string
  level: number
}

interface Badge {
  name: string
  description: string
}
interface Article {
  _id: any
  id: string
  title: string
  excerpt: string
}

interface MentorProfileProps {
  name: string
  avatar?: string
  location?: string
  occupation?: string
  education?: string
  bio?: string
  skills?: Skill[]
  specialties?: string[]
  ranking?: number
  totalMentees?: number
  badges?: Badge[]
  articles?: Article[]
}

export default function MentorProfile({
  name,
  avatar = "https://avatar.iran.liara.run/public/boy",
  location = "Not specified",
  occupation = "Not specified",
  education = "Not specified",
  bio = "No bio provided",
  skills = [],
  specialties = [],
  ranking = 0,
  totalMentees = 0,
  badges = [],
  articles = [],
  

}: MentorProfileProps) {
  const [guruCoins, setGuruCoins] = useState(0);
  const id  = localStorage.getItem('_id');
  useEffect(() => {
      try{
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${id}`)
      .then(response => {
        console.log(response.data);
        const { readArticles, skills, specialties } = response.data;
        const parsedArticlesCount = readArticles?.length || 0;
        const parsedSkillsCount = skills?.length || 0;
        const parsedSpecialtiesCount = specialties?.length || 0;

        console.log(parsedArticlesCount, "Here");
        console.log(parsedSkillsCount);
        console.log(parsedSpecialtiesCount);
        const coins = (parsedArticlesCount * 100) + (parsedSkillsCount * 500) + (parsedSpecialtiesCount * 1000);
        setGuruCoins(coins);
        console.log(coins);
      })
      .catch(error => {
        console.error('Error fetching mentor details:', error);
      });
    } catch (error) {
      console.error('Error fetching mentor details:', error);
    }

  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left flex-grow">
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
            <div className="mt-2">
              <GuruCoins coins={guruCoins} size="md" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <StarIcon className="w-5 h-5" />
              <span className="font-bold">{ranking.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">{totalMentees} mentees</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600">{bio}</p>
          </div>

          {skills.length > 0 && (
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
          )}

          {specialties.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Specialties</h2>
              <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {badges.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Badges</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.map((badge, index) => (
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
          )}
          {articles.length > 0 && (
        <div className="p-6 sm:p-8 border-t">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Published Articles</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article._id} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to={`/articles/${article._id}`} className="text-blue-600 hover:underline">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

        </div>
      </div>
      

      <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 flex-col gap-2">
        <Link to="/chat"
          className="w-full mt-4 flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Connect and chat
        </Link>
        <Link
          to="/complete-profile"
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out text-center block"
        >
          Complete or Update Your Profile
        </Link>
      </div>
    </div>
  )
}
