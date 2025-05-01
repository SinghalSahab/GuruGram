import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Mentor {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  occupation: string;
  education: string;
  specialties: string[];
  ranking: number;
  totalMentees: number;
}

interface FilterState {
  search: string;
  specialty: string;
  location: string;
}

const AllMentors: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    specialty: '',
    location: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get<Mentor[]>(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/`);
        setMentors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch mentors. Please try again later.');
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredMentors = mentors.filter(mentor => {
    const searchLower = filters.search.toLowerCase();
    return (
      (mentor.name.toLowerCase().includes(searchLower) ||
      mentor.email.toLowerCase().includes(searchLower) ||
      mentor.bio.toLowerCase().includes(searchLower) ||
      mentor.location.toLowerCase().includes(searchLower) ||
      mentor.occupation.toLowerCase().includes(searchLower) ||
      mentor.education.toLowerCase().includes(searchLower) ||
      mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchLower))) &&
      (filters.specialty === '' || mentor.specialties.includes(filters.specialty)) &&
      (filters.location === '' || mentor.location.includes(filters.location))
    );
  });

  const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
    <Link 
      to={`/profile/mentor/${mentor._id}`} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="p-6">
      <div className="flex items-center mb-4">
        <img 
        src={mentor.avatar || "/placeholder.svg"} 
        alt={`${mentor.name}'s avatar`} 
        className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{mentor.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{mentor.occupation}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{mentor.bio}</p>
      <div className="mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Location:</span>
        <span className="ml-2 text-gray-600 dark:text-gray-300">{mentor.location}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Education:</span>
        <span className="ml-2 text-gray-600 dark:text-gray-300">{mentor.education}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Ranking:</span>
        <span className="ml-2 text-gray-600 dark:text-gray-300">
        {mentor.ranking} ({mentor.totalMentees} mentees)
        </span>
      </div>
      <div className="flex flex-wrap -mx-1">
        {mentor.specialties.map((specialty, index) => (
        <span 
          key={index} 
          className="m-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
        >
          {specialty}
        </span>
        ))}
      </div>
      </div>
    </Link>
  );

  if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading mentors...</div>;
  if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Find a Mentor</h1>
      
      <div className="mb-8">
        <input
          type="text"
          name="search"
          placeholder="Search mentors..."
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white  bg-gray-100"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="specialty"
            value={filters.specialty}
            onChange={handleFilterChange}
            className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white  bg-gray-100"
          >
            <option value="">All Specialties</option>
            {[...new Set(mentors.flatMap(mentor => mentor.specialties))].map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-100"
          >
            <option value="">All Locations</option>
            {[...new Set(mentors.map(mentor => mentor.location))].map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredMentors.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No mentors found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMentors;
