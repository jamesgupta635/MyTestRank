import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Import custom CSS for styling

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container text-center">
        <div className="not-found-box">
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! We couldn't find the page you're looking for.</p>
          <p className="description">It seems the page is lost in cyberspace...</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Go to Homepage
          </Link>
        </div>
      </div>
      <div className="bg-animation"></div>
    </div>
  );
};

export default NotFoundPage;
