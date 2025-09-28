import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserStats, getRecentTests, getAchievements } from '../../services/userService';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentTests, setRecentTests] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch all user data in parallel
      const [stats, tests, achievements] = await Promise.all([
        getUserStats(),
        getRecentTests(),
        getAchievements()
      ]);
      
      setUserStats(stats);
      setRecentTests(tests);
      setAchievements(achievements);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set default values if API fails
      setUserStats({
        testsCompleted: 0,
        averageSpeed: 0,
        totalTimeSpent: 0,
        currentStreak: 0,
        bestSpeed: 0,
        level: 1
      });
      setRecentTests([]);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  const handleGoToMainPage = () => {
    navigate('/');
  };

  const dashboardStats = [
    {
      title: 'Tests Completed',
      value: userStats?.testsCompleted || '0',
      icon: '📊',
      color: 'primary'
    },
    {
      title: 'Average Speed',
      value: `${userStats?.averageSpeed || 0} WPM`,
      icon: '⚡',
      color: 'success'
    },
    {
      title: 'Current Streak',
      value: `${userStats?.currentStreak || 0} days`,
      icon: '🔥',
      color: 'warning'
    },
    {
      title: 'Total Time',
      value: `${userStats?.totalTimeSpent || 0} min`,
      icon: '⏱️',
      color: 'info'
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
      title: 'Main Page',
      description: 'Go back to main page',
      onClick: handleGoToMainPage,
      icon: '🏠',
      color: 'secondary'
    }
  ];

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="d-flex gap-2">
                <Button 
                  variant="outline-primary" 
                  onClick={handleGoToMainPage}
                  className="me-2"
                >
                  🏠 Main Page
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </div>
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

        {/* Level Progress Section */}
        {userStats && (
          <Row className="mb-5">
            <Col>
              <Card className="level-progress-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">Level Progress</h3>
                    <Badge bg="primary" className="fs-6">Level {userStats.level || 1}</Badge>
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Progress to next level</span>
                      <span>{Math.min(100, ((userStats.testsCompleted || 0) * 10))}%</span>
                    </div>
                    <ProgressBar 
                      now={Math.min(100, ((userStats.testsCompleted || 0) * 10))} 
                      variant="success" 
                      className="mb-2"
                    />
                    <small className="text-muted">
                      Complete {Math.max(0, 10 - (userStats.testsCompleted || 0))} more tests to reach next level
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <Row className="mb-5">
            <Col>
              <h2 className="section-title">Achievements</h2>
              <Row className="g-4">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <Col xs={12} sm={6} lg={3} key={index}>
                    <Card className="achievement-card">
                      <Card.Body className="text-center">
                        <div className="achievement-icon">
                          {achievement.icon || '🏆'}
                        </div>
                        <h6 className="achievement-title">{achievement.name}</h6>
                        <p className="achievement-description">{achievement.description}</p>
                        <Badge bg={achievement.unlocked ? 'success' : 'secondary'}>
                          {achievement.unlocked ? 'Unlocked' : 'Locked'}
                        </Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        {/* Quick Actions Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="section-title">Quick Actions</h2>
            <Row className="g-4">
              {quickActions.map((action, index) => (
                <Col xs={12} sm={6} lg={3} key={index}>
                  <Card 
                    className={`action-card border-${action.color} h-100`}
                    as={action.link ? Link : 'div'}
                    to={action.link}
                    onClick={action.onClick}
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
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

        {/* Recent Tests Section */}
        <Row>
          <Col>
            <Card className="activity-card">
              <Card.Header>
                <h3 className="mb-0">Recent Tests</h3>
              </Card.Header>
              <Card.Body>
                {recentTests.length > 0 ? (
                  <div className="activity-list">
                    {recentTests.slice(0, 5).map((test, index) => (
                      <div className="activity-item" key={index}>
                        <div className="activity-icon">
                          {test.completed ? '✅' : '⏳'}
                        </div>
                        <div className="activity-content">
                          <h6>{test.testName || 'Typing Test'}</h6>
                          <small className="text-muted">
                            {test.completedAt ? new Date(test.completedAt).toLocaleString() : 'In Progress'} • 
                            {test.speed || 0} WPM • 
                            {test.accuracy || 0}% Accuracy
                          </small>
                        </div>
                        <div className="activity-status">
                          <Badge bg={test.completed ? 'success' : 'warning'}>
                            {test.completed ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No recent tests found. Start your first test!</p>
                    <Button variant="primary" onClick={() => navigate('/all-tests')}>
                      Take a Test
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;