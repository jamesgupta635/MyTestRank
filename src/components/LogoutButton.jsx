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

  return (
    <div className="d-flex align-items-center gap-3">
      <span className="text-muted">Welcome, {user?.email}</span>
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