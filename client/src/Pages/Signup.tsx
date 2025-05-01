import React, { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, UserPlus, Search } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { INTERESTS } from "../constants";
import { useAuthStore } from "./chat/store/useAuthStore.ts"; // Import useAuthStore

interface Skill {
  name: string;
  level: number;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  dob: string;
  avatar: string;
  bio: string;
  socialLinks: string[];
  location: string;
  occupation: string;
  education: string;
  skills: Skill[];
  goals: string[];
  specialties: string[];
  ranking: number;
  totalMentees: number;
}

const SignUp: React.FC = () => {
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    dob: '',
    avatar: 'https://avatar.iran.liara.run/public/boy',
    bio: '',
    socialLinks: [],
    location: '',
    occupation: '',
    education: '',
    skills: [],
    goals: [],
    specialties: [],
    ranking: 0,
    totalMentees: 0,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInterests, setFilteredInterests] = useState<string[]>(INTERESTS);
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { connectSocket } = useAuthStore(); // Destructure connectSocket

  useEffect(() => {
    setFilteredInterests(
      INTERESTS.filter((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSkillChange = (index: number, field: 'name' | 'level', value: string | number) => {
    const updatedSkills = [...userData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setUserData(prevData => ({ ...prevData, skills: updatedSkills }));
  };

  const addSkill = () => {
    setUserData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, { name: '', level: 0 }],
    }));
  };

  const handleInterestToggle = (interest: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = role === 'mentee' ? 'api/mentee/addMentee' : 'api/mentor/addMentor';
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, interests, role }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success('Account created successfully!');
        connectSocket(); // Connect socket after successful signup
        setTimeout(() => {
            if (role === 'mentee') {
            navigate('/login');
            } else {
            navigate('/complete-profile');
            }
        }, 2000);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response: any) => {
    try {
      const endpoint =
        role === "mentee"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/mentee/google-login`
          : `${import.meta.env.VITE_BACKEND_URL}/api/mentor/google-login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });
      if (res.ok) {
        const { token, ...rest } = await res.json();
        console.log(rest);
        if (role === "mentee") {
          login(token, rest.mentee._id, rest.mentee.email, role);
        } else {
          login(token, rest.mentor._id, rest.mentor.email, role);
          navigate("/complete-profile");
        }
        toast.success("Google login successful!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(
          `Google login failed. Please try again.${await res.text()}`,
          {
            position: "top-right",
            autoClose: 4000,
          }
        );
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up for GuruGram
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our community as a {role}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setRole('mentee')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                role === 'mentee'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Mentee
            </button>
            <button
              onClick={() => setRole('mentor')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                role === 'mentor'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Mentor
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="dob" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={userData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Location"
                  value={userData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="occupation" className="sr-only">
                  Occupation
                </label>
                <input
                  id="occupation"
                  name="occupation"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Occupation"
                  value={userData.occupation}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="education" className="sr-only">
                  Education
                </label>
                <input
                  id="education"
                  name="education"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Education"
                  value={userData.education}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Tell us about yourself"
                  value={userData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              {userData.skills.map((skill, index) => (
                <div key={index} className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    placeholder="Skill name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  />
                  <input
                    type="number"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                    placeholder="Skill level"
                    min="0"
                    max="100"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Skill
              </button>
            </div>

            {role === 'mentee' && (
              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                  Goals (comma-separated)
                </label>
                <input
                  type="text"
                  name="goals"
                  id="goals"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={userData.goals.join(', ')}
                  onChange={(e) => setUserData(prevData => ({ ...prevData, goals: e.target.value.split(', ').map(goal => goal.trim()) }))}
                />
              </div>
            )}

            {role === 'mentor' && (
              <>
                <div>
                  <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                    Specialties (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="specialties"
                    id="specialties"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={userData.specialties.join(', ')}
                    onChange={(e) => setUserData(prevData => ({ ...prevData, specialties: e.target.value.split(', ').map(specialty => specialty.trim()) }))}
                  />
                </div>
                <div>
                  <label htmlFor="ranking" className="block text-sm font-medium text-gray-700">
                    Ranking
                  </label>
                  <input
                    type="number"
                    name="ranking"
                    id="ranking"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={userData.ranking}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="5"
                  />
                </div>
                <div>
                  <label htmlFor="totalMentees" className="block text-sm font-medium text-gray-700">
                    Total Mentees
                  </label>
                  <input
                    type="number"
                    name="totalMentees"
                    id="totalMentees"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={userData.totalMentees}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {role === 'mentee' ? 'Interests' : 'Field of Expertise'}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search field..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-2 max-h-40 overflow-y-auto">
                {filteredInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={handleInterestToggle(interest)}
                    className={`m-1 px-3 py-1 rounded-full text-sm font-medium ${
                      interests.includes(interest)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() =>
                    toast.error("Google login failed. Please try again.", {
                      position: "top-right",
                      autoClose: 4000,
                    })
                  }
                  type="standard"
                  theme="filled_blue"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  logo_alignment="left"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

