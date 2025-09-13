import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import GoogleIcon from '../../assets/google.jpg'; // Ensure you provide the correct path to the Google icon image
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LogoutButton from '../LogoutButton';
import './NavbarMain.css'; // Import your custom CSS for additional styles
function NavbarMain() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      {/* White Background to Cover Content Behind the Navbar */}
      <div className="fixed-top" style={{ backgroundColor: 'white', height: '80px', zIndex: '999' }}></div>
      
      {/* Navbar with white background and shadow */}
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" fixed="top" className="rounded-3 shadow-lg py-0 mx-4 my-2">
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-dark" style={{ marginRight: '2px', marginLeft: '2px' }}>
            <img
              alt=""
              src={logo}
              className="d-inline-block align-top navbar-logo"
         
            />
          </Navbar.Brand>
          <Container fluid style={{ padding: 0 }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/coursesExam" className="text-dark py-2 px-3 rounded hover-effect">
                  Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/all-tests" className="text-dark py-2 px-3 rounded hover-effect">
                  Test
                </Nav.Link>
                <Nav.Link as={Link} to="/test" className="text-dark py-2 px-3 rounded hover-effect">
                  Demo Test
                </Nav.Link>
                <NavDropdown title="More" id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/Disclaimer">Disclaimer</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/PrivacyPolicy">Privacy Policy</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/TermsAndConditions">Terms & Conditions</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/coursesOption">Course Options</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ms-auto">
                {isLoading ? (
                  <div className="d-flex align-items-center">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="text-muted">Loading...</span>
                  </div>
                ) : isAuthenticated ? (
                  <LogoutButton />
                ) : (
                  <>
                    <Nav.Link as={Link} to="/Login" className="text-dark py-2 px-3 rounded hover-effect">LOGIN</Nav.Link>
                    <Nav.Link as={Link} to="/signup" className="text-dark py-2 px-3 rounded hover-effect">
                      SIGN UP FOR FREE
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </div>
      </Navbar>
    </>
  );
}

export default NavbarMain;
