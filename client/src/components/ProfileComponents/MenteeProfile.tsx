import { Container, Row, Col } from 'react-bootstrap';
import MenteeProfileHeader from './MenteeProfileHeader';
import MenteeSkills from './MenteeSkills';
import MenteeGoals from './MenteeGoals';
import MentorInfo from './MentorInfo';

function MenteeProfile() {
  const mentee = {
    name: 'John Doe',
    bio: 'Aspiring software engineer with a passion for learning new technologies.',
    profileImage: 'https://avatar.iran.liara.run/public/boy',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Algorithms'],
    goals: ['Build a personal portfolio', 'Learn backend development', 'Prepare for technical interviews'],
    mentor: {
      name: 'Jane Smith',
      position: 'Senior Developer',
      company: 'Tech Corp',
      bio: 'Experienced full-stack developer helping mentees navigate the tech industry.',
      email: 'jane.smith@example.com',
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={4}>
          <MenteeProfileHeader 
            name={mentee.name} 
            bio={mentee.bio} 
            profileImage={mentee.profileImage} 
          />
        </Col>
        <Col md={8}>
          <MenteeSkills skills={mentee.skills} />
          <MenteeGoals goals={mentee.goals} />
          <MentorInfo mentor={mentee.mentor} />
        </Col>
      </Row>
    </Container>
  );
}

export default MenteeProfile;
