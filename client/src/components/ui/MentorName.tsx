import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface MentorNameProps {
    id: string;
}

const MentorName: React.FC<MentorNameProps> = ({ id }) => {
    const [mentorName, setMentorName] = useState('');

    useEffect(() => {
        const fetchMentorDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${id}`);
                setMentorName(response.data.name);
            } catch (error) {
                console.error('Error fetching mentor details:', error);
            }
        };

        fetchMentorDetails();
    }, [id]);

    return (
        <div style={{ cursor: 'pointer', display: 'flex', whiteSpace: 'nowrap' }}>
            <Link to={`/profile/mentor/${id}`} className='flex gap-2'>
                {mentorName ? <div className='flex'>Author: <span>{mentorName}</span></div> : <p></p>}
            </Link>
        </div>
    );
};

export default MentorName;