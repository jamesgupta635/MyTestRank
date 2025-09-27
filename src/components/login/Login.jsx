import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { publicPost } from '../../utils/api';
import './Login.css';
import logo from '../../assets/logo.png'; 
import HalfBackgroung from '../../assets/B2.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const data = await publicPost('/authenticate', {
        email: formData.email.trim(),
        password: formData.password
      });

      // Use AuthContext to handle login
      login(data.token, formData.email, data.user || {});
      
      // Redirect to user dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={HalfBackgroung} alt="Login" />
      </div>
      <div className="login-form">
        <div className="form-container">
          <img src={logo} alt="iStudy" className="logo" />
          <h2 className="form-title">Log In</h2>
          <p className="form-subtitle">Welcome back</p>
          
          {errors.general && (
            <div className="alert alert-error">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required 
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Your Password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required 
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group form-check">
              <input type="checkbox" id="rememberMe" className="form-check-input" />
              <Link to="/forgotPassword" className="forgot-password">Forgot Password?</Link>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary btn-block ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* <div className="social-login">
            <p>OR SignIn With</p>
            <button className="btn btn-google">Google</button>
          </div> */}
          
          <p className="sign-in-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;