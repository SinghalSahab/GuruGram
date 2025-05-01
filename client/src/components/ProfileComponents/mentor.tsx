import { useEffect, useState } from 'react'
import MentorProfile from './mentor-profile'
import axios from 'axios';

export default function MentorPage() {
  
  
  const [mentorData, setMentorData] = useState({});
  const menteeId = localStorage.getItem('_id');
  console.log(menteeId);

  
  useEffect(() => {
    if (menteeId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${menteeId}`)
        .then(response => {
          setMentorData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [menteeId]);

  if (!mentorData) {
    return <div>Loading...</div>;
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <MentorProfile name={''} {...mentorData} />
    </div>
  )
}

