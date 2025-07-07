import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OptioAvailable() {
  const navigate = useNavigate();

  const handleStartDemo = () => {
    navigate('/test');
  };

  const handleCourses = () => {
    navigate('/courses');
  };

  const handleTestAvailable = () => {
    navigate('/test-available');
  };

  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-md-center">
          {/* Card 1: Courses */}
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="shadow-lg h-100 border-light">
              <Card.Body className="d-flex flex-column justify-content-between text-center">
                <Card.Title className="display-5 font-weight-bold text-primary mb-3">Courses</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Explore a wide range of courses and start your learning journey today!
                </Card.Text>
                <Button variant="primary" className="w-100" onClick={handleCourses}>
                  Explore Courses
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Demo Test */}
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="shadow-lg h-100 border-light">
              <Card.Body className="d-flex flex-column justify-content-between text-center">
                <Card.Title className="display-5 font-weight-bold text-info mb-3">Demo Test</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Get a preview of the test experience with our demo tests.
                </Card.Text>
                <Button variant="info" className="w-100" onClick={handleStartDemo}>
                  Start Demo
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3: Test Available */}
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="shadow-lg h-100 border-light">
              <Card.Body className="d-flex flex-column justify-content-between text-center">
                <Card.Title className="display-5 font-weight-bold text-success mb-3">Test Available</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Take the test now and assess your skills in real-time.
                </Card.Text>
                <Button variant="success" className="w-100" onClick={handleTestAvailable}>
                  Take the Test
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OptioAvailable;
