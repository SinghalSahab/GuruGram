import { useState, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CalendarIcon,
  AcademicCapIcon,
  CpuChipIcon,
  StarIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import Card from "./Card.tsx";
import Testimonial from "./Testimonial.tsx";

const texts = [
  "Marketing",
  "AWS",
  "Career",
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Finance",
  "Healthcare",
  "Education"
];
const cardData = [
  {
    name: "Mentor for Marketing",
    description: "Expert in Marketing",
    domainStatement: "Specialized in Marketing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAP6Xtg0nVu6xQjovz_4tX2XCMSXL4amNHzQ&s",
  },
  {
    name: "Mentor for AWS",
    description: "Expert in AWS",
    domainStatement: "Specialized in AWS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR90q7In__TwXz3i7N84H9KvqesuUsNZZNpUQ&s",
  },
  {
    name: "Mentor for Career",
    description: "Expert in Career Coaching",
    domainStatement: "Specialized in Career Guidance",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkT69vKHoVk5zVyLAKiymWIkuPL5g-dscORA&s",
  },
  {
    name: "Mentor for Web Development",
    description: "Expert in Web Development",
    domainStatement: "Specialized in Web Development",
    image: "data:image/jpeg;base64,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",
  },
  {
    name: "Mentor for Data Science",
    description: "Expert in Data Science",
    domainStatement: "Specialized in Data Science",
    image: "https://img-b.udemycdn.com/user/200_H/38516954_b11c_3.jpg",
  },
  {
    name: "Mentor for UI/UX Design",
    description: "Expert in UI/UX Design",
    domainStatement: "Specialized in UI/UX Design",
    image: "https://img-b.udemycdn.com/user/200_H/79584910_daa6_3.jpg",
  },
  {
    name: "Mentor for Finance",
    description: "Expert in Finance",
    domainStatement: "Specialized in Finance",
    image: "https://img-b.udemycdn.com/user/200_H/9685726_67e7_4.jpg",
  },
  {
    name: "Mentor for Healthcare",
    description: "Expert in Healthcare",
    domainStatement: "Specialized in Healthcare",
    image: "https://img-b.udemycdn.com/user/200_H/22973584_f602_5.jpg",
  },
];
const features = [
  {
    title: "Discussion forums",
    description:
      "Dedicated channels for peer-to-peer and mentor-to-peer support",
    icon: ChatBubbleLeftRightIcon,
    emoji: "💬",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Verified Mentors",
    description: "All mentors are verified professionals in their field",
    icon: ShieldCheckIcon,
    emoji: "✅",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Gamified Learning",
    description: "Earn points and badges as you progress",
    icon: TrophyIcon,
    emoji: "🏆",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Flexible Pricing",
    description: "Choose from various pricing options",
    icon: CurrencyDollarIcon,
    emoji: "💰",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Video Sessions",
    description: "High-quality video calls for immersive learning",
    icon: VideoCameraIcon,
    emoji: "🎥",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Global Access",
    description: "Connect with mentors worldwide",
    icon: GlobeAltIcon,
    emoji: "🌐",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your growth with detailed analytics",
    icon: ChartBarIcon,
    emoji: "📊",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Easy Scheduling",
    description: "Book sessions that fit your calendar",
    icon: CalendarIcon,
    emoji: "📅",
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Skill Certifications",
    description: "Earn certificates to showcase your skills",
    icon: AcademicCapIcon,
    emoji: "🎓",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "AI-Powered Matching",
    description: "Get paired with the perfect mentor for your goals",
    icon: CpuChipIcon,
    emoji: "🤖",
    color: "bg-cyan-100 text-cyan-600",
  },
];

const categories = [
  { name: "Marketing", emoji: "📣", color: "bg-red-100 text-red-600" },
  { name: "AWS", emoji: "☁️", color: "bg-orange-100 text-orange-600" },
  { name: "Career", emoji: "💼", color: "bg-yellow-100 text-yellow-600" },
  {
    name: "Web Development",
    emoji: "🌐",
    color: "bg-green-100 text-green-600",
  },
  { name: "Data Science", emoji: "📊", color: "bg-teal-100 text-teal-600" },
  { name: "UI/UX Design", emoji: "🎨", color: "bg-blue-100 text-blue-600" },
  { name: "Finance", emoji: "💹", color: "bg-indigo-100 text-indigo-600" },
  { name: "Healthcare", emoji: "🏥", color: "bg-purple-100 text-purple-600" },
  { name: "Education", emoji: "📚", color: "bg-pink-100 text-pink-600" },
  { name: "Art", emoji: "🎭", color: "bg-cyan-100 text-cyan-600" },
  { name: "Music", emoji: "🎵", color: "bg-lime-100 text-lime-600" },
];

const topMentors = [
  {
    name: "John Doe",
    expertise: "Marketing Guru",
    rating: 4.9,
    sessions: 120,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Jane Smith",
    expertise: "AWS Expert",
    rating: 4.8,
    sessions: 98,
    image:
      "https://plus.unsplash.com/premium_photo-1683121771856-3c3964975777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Alex Johnson",
    expertise: "Career Coach",
    rating: 4.7,
    sessions: 85,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Emily Brown",
    expertise: "Web Developer",
    rating: 4.9,
    sessions: 150,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % (texts.length-1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12=== md:py-20">
        <div className="container mx-auto px-4 pt-20 md:px-14">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Unlock Your Potential with Expert Mentorship
              </h1>
              <p className="text-xl mb-6">
                Connect with top professionals for personalized 1-on-1 guidance
                in
              </p>
              <div className="text-2xl md:text-4xl font-extrabold mb-6">
                <span className="text-yellow-300">
                  {texts[currentTextIndex]}
                </span>
              </div>
              <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                Find Your Mentor
              </button>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full">
              <div className="absolute inset-0 overflow-hidden">
                {cardData.map((data, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-500 ease-in-out"
                    style={{
                      transform: `translateY(${
                        (index - currentTextIndex) * 100
                      }%)`,
                      opacity: index === currentTextIndex ? 1 : 0,
                    }}
                  >
                    <Card
                      name={data.name}
                      description={data.description}
                      domainStatement={data.domainStatement}
                      image={data.image}     />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-14">
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 dark:text-white">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p>
                Your data and interactions are protected with top-notch security
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p>
                Accelerate your career with personalized guidance and support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-14">
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your account and complete your profile",
                color: "from-pink-400 to-red-500",
              },
              {
                step: 2,
                title: "Find a Mentor",
                description:
                  "Browse our expert mentors and choose the best fit",
                color: "from-green-400 to-blue-500",
              },
              {
                step: 3,
                title: "Schedule a Session",
                description:
                  "Book a time that works for both you and your mentor",
                color: "from-yellow-400 to-orange-500",
              },
              {
                step: 4,
                title: "Start Learning",
                description:
                  "Join your session and begin your learning journey",
                color: "from-purple-400 to-indigo-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.color} rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white`}
              >
                <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4  md:px-14">
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 dark:text-white">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex items-start ${feature.color} bg-opacity-20 hover:bg-opacity-30 transition duration-300`}
              >
                <div className="mr-4">
                  <div className={`${feature.color} rounded-full p-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container mx-auto px-4  md:px-14">
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 dark:text-white">
            Top Mentors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {topMentors.map((mentor, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1 dark:text-white">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {mentor.expertise}
                  </p>
                  <div className="flex items-center mb-2">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-semibold dark:text-white">
                      {mentor.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <UserGroupIcon className="w-5 h-5 mr-1" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4  md:px-14">
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 dark:text-white">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${category.color} font-semibold py-3 px-4  md:px-14 rounded-lg shadow transition duration-300 flex items-center justify-center hover:opacity-80`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4  md:px-14">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of learners who are achieving their goals with
              personalized mentorship
            </p>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 text-lg">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
