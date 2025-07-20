import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import GoogleIcon from '../../assets/google.jpg'; // Ensure you provide the correct path to the Google icon image
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './NavbarMain.css'; // Import your custom CSS for additional styles
function NavbarMain() {
  return (
    <>
      {/* White Background to Cover Content Behind the Navbar */}
      <div className="fixed-top" style={{ backgroundColor: 'white', height: '80px', zIndex: '999' }}></div>
      
      {/* Navbar with white background and shadow */}
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" fixed="top" className="rounded-3 shadow-lg py-2 mx-4 my-3">
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Navbar.Brand href="#home" className="fw-bold text-dark" style={{ marginRight: '24px', marginLeft: '8px' }}>
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
                <Nav.Link href="#features" className="text-dark py-2 px-3 rounded hover-effect">
                  Courses
                </Nav.Link>
                <Nav.Link href="#pricing" className="text-dark py-2 px-3 rounded hover-effect">
                  Test
                </Nav.Link>
                <Nav.Link href="#pricing" className="text-dark py-2 px-3 rounded hover-effect">
                  Demo Test
                </Nav.Link>
                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/Login" className="text-dark py-2 px-3 rounded hover-effect">LOGIN</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-dark py-2 px-3 rounded hover-effect">
                  SIGN UP FOR FREE
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </div>
      </Navbar>
    </>
  );
}

export default NavbarMain;
