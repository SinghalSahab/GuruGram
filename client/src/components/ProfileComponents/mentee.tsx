import { useEffect, useState } from 'react';
import axios from 'axios';
import MenteeProfile from './mentee_profile'
import { useNavigate } from 'react-router-dom';

export default function MenteePage() {
  const menteeId = localStorage.getItem('_id');
  const role = localStorage.getItem('role');

  const navigate = useNavigate();

  if(role=="mentor")
    navigate("/profile/mentor");
  console.log(menteeId);

  const [menteeData2, setMenteeData] = useState({});

  useEffect(() => {
    if (menteeId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentee/${menteeId}`)
        .then(response => {
          setMenteeData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [menteeId]);

  if (!menteeData2) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <MenteeProfile name={''} avatar={''} location={''} occupation={''} education={''} bio={''} skills={[]} goals={[]} {...(menteeData2 || {})} />
    </div>
  )
}