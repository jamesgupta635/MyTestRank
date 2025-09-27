import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  const dashboardStats = [
    {
      title: 'Tests Completed',
      value: '12',
      icon: '📊',
      color: 'primary'
    },
    {
      title: 'Average Speed',
      value: '45 WPM',
      icon: '⚡',
      color: 'success'
    },
    {
      title: 'Accuracy Rate',
      value: '92%',
      icon: '🎯',
      color: 'info'
    },
    {
      title: 'Total Time',
      value: '2h 30m',
      icon: '⏱️',
      color: 'warning'
    }
  ];

  const quickActions = [
    {
      title: 'Take a Test',
      description: 'Start a new typing test',
      link: '/all-tests',
      icon: '🚀',
      color: 'primary'
    },
    {
      title: 'View Courses',
      description: 'Browse available courses',
      link: '/coursesExam',
      icon: '📚',
      color: 'success'
    },
    {
      title: 'Demo Test',
      description: 'Try a quick demo test',
      link: '/test',
      icon: '🎮',
      color: 'info'
    },
    {
      title: 'View Profile',
      description: 'Manage your profile',
      link: '#',
      icon: '👤',
      color: 'secondary'
    }
  ];

  return (
    <div className="user-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <Container>
          <Row className="align-items-center">
            <Col>
              <div className="welcome-section">
                <h1 className="welcome-title">
                  Welcome back, <span className="user-name">{user?.email?.split('@')[0]}</span>! 👋
                </h1>
                <p className="welcome-subtitle">
                  Ready to improve your typing skills? Let's get started!
                </p>
                {user?.lastLogin && (
                  <p className="last-login">
                    Last login: {new Date(user.lastLogin).toLocaleString()}
                  </p>
                )}
              </div>
            </Col>
            <Col xs="auto">
              <Button 
                variant="outline-danger" 
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="dashboard-content">
        {/* Stats Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="section-title">Your Progress</h2>
            <Row className="g-4">
              {dashboardStats.map((stat, index) => (
                <Col xs={12} sm={6} lg={3} key={index}>
                  <Card className={`stat-card border-${stat.color}`}>
                    <Card.Body className="text-center">
                      <div className={`stat-icon bg-${stat.color}`}>
                        {stat.icon}
                      </div>
                      <h3 className="stat-value">{stat.value}</h3>
                      <p className="stat-title">{stat.title}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Quick Actions Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="section-title">Quick Actions</h2>
            <Row className="g-4">
              {quickActions.map((action, index) => (
                <Col xs={12} sm={6} lg={3} key={index}>
                  <Card 
                    className={`action-card border-${action.color} h-100`}
                    as={Link}
                    to={action.link}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card.Body className="text-center">
                      <div className={`action-icon bg-${action.color}`}>
                        {action.icon}
                      </div>
                      <h5 className="action-title">{action.title}</h5>
                      <p className="action-description">{action.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Recent Activity Section */}
        <Row>
          <Col>
            <Card className="activity-card">
              <Card.Header>
                <h3 className="mb-0">Recent Activity</h3>
              </Card.Header>
              <Card.Body>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">✅</div>
                    <div className="activity-content">
                      <h6>Completed: SSC CGL Typing Test</h6>
                      <small className="text-muted">2 hours ago • 42 WPM • 95% Accuracy</small>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">🎯</div>
                    <div className="activity-content">
                      <h6>New Personal Best!</h6>
                      <small className="text-muted">Yesterday • 48 WPM • 92% Accuracy</small>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">📚</div>
                    <div className="activity-content">
                      <h6>Started: Delhi Police Typing Course</h6>
                      <small className="text-muted">3 days ago</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;