import { ListGroup } from 'react-bootstrap';

interface MenteeGoalsProps {
  goals: string[];
}

function MenteeGoals({ goals }: MenteeGoalsProps) {
  return (
    <ListGroup className="bg-dark text-light">
      <ListGroup.Item className="bg-dark text-light" active>
        Current Goals
      </ListGroup.Item>
      {goals.map((goal, index) => (
        <ListGroup.Item className="bg-dark text-light" key={index}>
          {goal}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MenteeGoals;
