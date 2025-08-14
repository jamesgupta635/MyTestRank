import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ".././Footerinsidepoint.css"; // Custom CSS for animations and styling // Custom CSS for animations and styling

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>Terms and Conditions</h1>
        <p>
         <Link to="/">
          <span>🏠 My Test Rank &gt;</span>
            </Link> 
          Terms and Conditions
        </p>
      </div>

      {/* Terms Content Section */}
      <Container className="content-section">
        <Card className="terms-card">
          <Card.Body>
            <h2>Effective Date: [Insert Date]</h2>
            <p>
              Welcome to <strong>My Test Rank!</strong> These Terms and
              Conditions outline the rules and regulations for the use of{" "}
              <strong>My Test Rank’s</strong> website, located at{" "}
              <a href="https://www.mytestrank.com" target="_blank" rel="noopener noreferrer">
                www.mytestrank.com
              </a>
              .
            </p>

            <h3>1. Acceptance of Terms</h3>
            <p>
              By using this website, you accept and agree to these Terms and
              Conditions. These terms may be updated or changed from time to
              time, and it is your responsibility to review them regularly.
            </p>

            <h3>2. Use of Our Services</h3>
            <ul>
              <li>
                <strong>Eligibility:</strong> You must be at least 18 years old
                or have the legal capacity to enter into contracts.
              </li>
              <li>
                <strong>Account Registration:</strong> You may need to create an
                account and provide accurate information.
              </li>
              <li>
                <strong>Access to Services:</strong> You have a non-transferable
                license to use the website.
              </li>
            </ul>

            <h3>3. User Conduct</h3>
            <ul>
              <li>Do not engage in unlawful activities.</li>
              <li>
                Do not attempt unauthorized access to the website or servers.
              </li>
              <li>Do not post harmful or illegal content.</li>
            </ul>

            <h3>4. Intellectual Property</h3>
            <p>
              All content, including text, graphics, logos, and software, is the
              property of My Test Rank and is protected by copyright laws.
            </p>

            <h3>5. Contact Information</h3>
            <p>
              If you have any questions, contact us at{" "}
              <a href="mailto:contact@mytestrank.com">
                contact@mytestrank.com
              </a>
              .
            </p>
          </Card.Body>
        </Card>
      </Container>

      {/* Footer */}
      <footer className="terms-footer">
        <p>
          Developed by <span className="highlight">ashx@gmail.com</span>, Designed by{" "}
          <span className="highlight">Urfirststep</span>
        </p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
