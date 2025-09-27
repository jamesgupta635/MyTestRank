import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  const handleUserClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <span 
        className="user-email-link text-primary"
        onClick={handleUserClick}
        style={{ 
          cursor: 'pointer', 
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = '#0056b3'}
        onMouseLeave={(e) => e.target.style.color = '#007bff'}
        title="Click to go to Dashboard"
      >
        {user?.email}
      </span>
      <button 
        className="btn btn-outline-danger btn-sm"
        onClick={handleLogout}
        title="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;