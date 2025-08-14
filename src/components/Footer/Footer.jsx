import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  // Handlers for promo buttons
  const handleExploreTest = () => {
    navigate('/test');
  };

  const handleExploreCourses = () => {
    navigate('/coursesOption');
  };

  return (
    <>
      {/* Promo Section */}
      <section className="promo-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={5} className="promo-card">
              <div className="promo-content">
                <p className="text-warning fw-bold">START YOUR JOURNEY TODAY</p>
                <h3 className="fw-bold">Become a typing expert and boost your typing speed and accuracy to new heights!</h3>
                <Button variant="warning" className="fw-bold mt-3 px-4" onClick={handleExploreTest}>
                  Explore Test
                </Button>
              </div>
              <div className="promo-image instructor"></div>
            </Col>

            <Col md={5} className="promo-card">
              <div className="promo-content">
                <p className="text-success fw-bold">UNLOCK YOUR POTENTIAL</p>
                <h3 className="fw-bold">Enhance Your Skills and Stay Ahead</h3>
                <Button variant="success" className="fw-bold mt-3 px-4" onClick={handleExploreCourses}>
                  Explore Courses
                </Button>
              </div>
              <div className="promo-image students"></div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={3}>
              <h4 className="mb-3">My Rank</h4>
              <p>
                My Rank website is an essential part that provides visitors with insights into the program or service
                offered.
              </p>
              <div className="d-flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaFacebookF size={20} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaTwitter size={20} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaLinkedinIn size={20} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light"><FaInstagram size={20} /></a>
              </div>
            </Col>

            <Col md={2}>
              <h5 className="mb-3">Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/contact" className="text-light">Contact Now</Link></li>
                <li><Link to="/faq" className="text-light">FAQ</Link></li>
                <li><Link to="/purchase-guide" className="text-light">Purchase Guide</Link></li>
                <li><Link to="/Disclaimer" className="text-light">Disclaimer</Link></li>
                <li><Link to="/TermsAndConditions" className="text-light">Terms Conditions</Link></li>
                <li><Link to="/PrivacyPolicy" className="text-light">Privacy Policy</Link></li>
              </ul>
            </Col>

            {/* Right-most section (Contact) */}
            <Col md={3} className="contact-section">
              <h5 className="mb-3">Contact Us</h5>
              <p><b>Address:</b></p>
              <p>Street: Vikram Nagar, Velodrome Road</p>
              <p>City/Town: New Delhi</p>
              <p>State/Province: Delhi</p>
              <p>Zip/Postal Code: 110002</p>
              <p><b>Phone Number:</b> 011 2331 2721</p>
              <p>
                <b>Email:</b>{" "}
                <a href="mailto:contact@mytestrank.com" className="text-light">
                  contact@mytestrank.com
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
