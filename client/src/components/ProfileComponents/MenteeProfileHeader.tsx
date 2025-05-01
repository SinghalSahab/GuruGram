import { Card } from 'react-bootstrap';

interface MenteeProfileHeaderProps {
  name: string;
  bio: string;
  profileImage: string;
}

function MenteeProfileHeader({ name, bio, profileImage }: MenteeProfileHeaderProps) {
  return (
    <Card className="bg-dark text-light text-center">
      <Card.Img 
        variant="top" 
        src={profileImage} 
        alt={`${name}'s profile`} 
        style={{ width: '150px', margin: 'auto', borderRadius: '50%' }} 
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MenteeProfileHeader;
