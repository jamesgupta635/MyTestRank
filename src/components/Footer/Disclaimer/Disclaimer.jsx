import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ".././Footerinsidepoint.css"; // Custom CSS for animations and styling

const Disclaimer = () => {
  return (
    <div className="terms-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>Disclaimer</h1>
        <p>
        <Link to="/">
           <span>🏠 My Test Rank &gt;</span>
         </Link> 
          Disclaimer
        </p>
      </div>

      {/* Disclaimer Content Section */}
      <Container className="content-section">
        <Card className="terms-card">
          <Card.Body>
            <h2>Effective Date: [Insert Date]</h2>
            <p>
              Welcome to <strong>My Test Rank</strong>! The information provided on this website is for general informational purposes only. By accessing and using this website, you acknowledge and agree to the following disclaimer.
            </p>

            <h3>1. General Information</h3>
            <p>
              The content provided on this website, including text, graphics, images, and other material, is for informational purposes only. We do not provide professional advice, whether legal, financial, or academic, through this website.
            </p>

            <h3>2. Accuracy of Information</h3>
            <p>
              While we strive to provide accurate, up-to-date, and reliable information, we do not guarantee the completeness, accuracy, or timeliness of the content on this website. We are not responsible for any errors or omissions in the information provided or for any damages arising from the use of such information.
            </p>

            <h3>3. External Links</h3>
            <p>
              Our website may contain links to third-party websites that are not controlled or owned by <strong>My Test Rank</strong>. We are not responsible for the content, privacy practices, or the accuracy of the information on these external sites. We recommend that you review the privacy policies and terms of use of any third-party websites you visit.
            </p>

            <h3>4. Limitation of Liability</h3>
            <p>
              Under no circumstances will <strong>My Test Rank</strong> or its employees, officers, or affiliates be held liable for any loss, damage, or injury, including but not limited to indirect, incidental, special, or consequential damages arising out of the use of this website or reliance on any information provided on it.
            </p>

            <h3>5. No Professional Advice</h3>
            <p>
              The content on this website is not intended as a substitute for professional advice in areas such as education, career planning, finance, or legal matters. Always seek the advice of qualified professionals for specific concerns related to these topics.
            </p>

            <h3>6. Use at Your Own Risk</h3>
            <p>
              Your use of this website and the information it contains is at your own risk. We make no representation or warranty regarding the reliability, availability, or accuracy of the website or the information provided. We disclaim all liability for any loss or damage caused by your reliance on any information on this website.
            </p>

            <h3>7. Changes to the Disclaimer</h3>
            <p>
              We reserve the right to update, modify, or change this Disclaimer at any time. Any changes will be reflected on this page, and the "Effective Date" will be updated accordingly. By continuing to use the website after such changes, you accept and agree to the updated Disclaimer.
            </p>

            <h3>8. Contact Information</h3>
            <p>
              If you have any questions regarding this Disclaimer or any other concerns, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:contact@mytestrank.com">contact@mytestrank.com</a>
            </p>
            <p>© 2025 My Test Rank. All rights reserved.</p>
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

export default Disclaimer;


