import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ".././Footerinsidepoint.css"; // Custom CSS for animations and styling

const PrivacyPolicy = () => {
  return (
    <div className="terms-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>Privacy Policy</h1>
        <p>
                  <Link to="/">
                     <span>🏠 My Test Rank &gt;</span>
                   </Link>  Privacy Policy
        </p>
      </div>

      {/* Privacy Policy Content Section */}
      <Container className="content-section">
        <Card className="terms-card">
          <Card.Body>
            <h2>Effective Date: [Insert Date]</h2>
            <p>
              At <strong>My Test Rank</strong>, accessible from www.mytestrank.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by <strong>My Test Rank</strong> and how we use it.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We may collect the following types of personal information from users:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> This includes information such as your name, email address, phone number, and payment details, which are necessary for registration, processing orders, or providing customer support.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> This includes data such as IP addresses, browser types, pages viewed, referring websites, and other usage data. We collect this information automatically through cookies and tracking technologies.
              </li>
            </ul>

            <h3>2. How We Collect Information</h3>
            <p>
              We collect personal and non-personal information through:
            </p>
            <ul>
              <li>
                <strong>User Sign-Ups:</strong> When you sign up for an account or use our services, we collect personal details such as your name, email address, and other contact information.
              </li>
              <li>
                <strong>Cookies and Tracking:</strong> We use cookies and other tracking technologies (such as Google Analytics) to monitor site usage and enhance user experience. These tools help us analyze trends and improve the functionality of our website.
              </li>
            </ul>

            <h3>3. Use of Information</h3>
            <p>
              The information we collect is used for the following purposes:
            </p>
            <ul>
              <li>
                <strong>To Improve User Experience:</strong> We use data to enhance the functionality and performance of our website, ensuring that users have a smooth experience.
              </li>
              <li>
                <strong>To Process Transactions:</strong> We may use personal data, such as payment information, to process payments for our services.
              </li>
              <li>
                <strong>Marketing and Communications:</strong> With your consent, we may use your contact information to send newsletters, promotional emails, and other relevant communications. You can opt-out of these communications at any time.
              </li>
              <li>
                <strong>For Legal Compliance:</strong> We may use your data to comply with legal obligations and resolve disputes.
              </li>
            </ul>

            <h3>4. Sharing of Information</h3>
            <p>
              We may share your data with third-party service providers who assist us in operating our website, conducting business, or servicing you. These third parties may include:
            </p>
            <ul>
              <li>
                <strong>Payment Processors:</strong> To process payments for purchases or services.
              </li>
              <li>
                <strong>Analytics Providers:</strong> We may use services like Google Analytics to help us analyze website traffic and improve our services.
              </li>
              <li>
                <strong>Advertisers:</strong> We may share data with third-party advertisers to serve relevant ads, but no personally identifiable information will be shared without your consent.
              </li>
            </ul>
            <p>We will never sell your personal data to third parties.</p>

            <h3>5. Data Protection</h3>
            <p>
              We take the privacy and security of your personal information seriously. We implement a variety of security measures to protect your personal data, including:
            </p>
            <ul>
              <li>
                <strong>Encryption:</strong> We use SSL (Secure Socket Layer) encryption to ensure that your data is transmitted securely.
              </li>
              <li>
                <strong>Access Control:</strong> Access to personal information is restricted to authorized personnel only.
              </li>
            </ul>

            <h3>6. Your Rights Over Your Data</h3>
            <p>
              You have the following rights regarding your personal data:
            </p>
            <ul>
              <li>
                <strong>Access and Correction:</strong> You can request access to the personal data we hold about you and request corrections to any inaccuracies.
              </li>
              <li>
                <strong>Deletion:</strong> You have the right to request the deletion of your personal data, subject to certain legal requirements.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us at any time by following the unsubscribe instructions included in our emails or by contacting us directly.
              </li>
            </ul>

            <h3>7. Children’s Privacy</h3>
            <p>
              Our website is not intended for use by children under the age of 13, and we do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child under 13, we will take steps to delete that information as soon as possible.
            </p>

            <h3>8. Changes to This Privacy Policy</h3>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any changes to this policy will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
            </p>

            <h3>9. Contact Us</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy;