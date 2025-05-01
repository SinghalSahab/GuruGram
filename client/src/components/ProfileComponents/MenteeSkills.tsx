import { Card, Badge } from 'react-bootstrap';

interface MenteeSkillsProps {
  skills: string[];
}

function MenteeSkills({ skills }: MenteeSkillsProps) {
  return (
    <Card className="bg-dark text-light">
      <Card.Body>
        <Card.Title>Skills and Interests</Card.Title>
        {skills.map((skill: string, index: number) => (
          <Badge key={index} pill bg="info" className="m-1">
            {skill}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  );
}

export default MenteeSkills;
