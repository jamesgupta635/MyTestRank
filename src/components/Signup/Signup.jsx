import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../../assets/logo.png'; 
import HalfBackgroung from '../../assets/B2.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
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
    setSuccessMessage('');
    setErrors({});

    try {
      const response = await fetch('https://www.srv620732.hstgr.cloud:8085/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: ''
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      } else {
        // Handle API errors
        if (data.message) {
          if (data.message.includes('email')) {
            setErrors({ email: 'This email is already registered' });
          } else if (data.message.includes('phone')) {
            setErrors({ phone: 'This phone number is already registered' });
          } else {
            setErrors({ general: data.message });
          }
        } else {
          setErrors({ general: 'An error occurred. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleSignup = () => {
  //   // Placeholder for Google OAuth integration
  //   alert('Google signup will be implemented soon!');
  // };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={HalfBackgroung} alt="Signup" />
      </div>
      <div className="login-form">
        <div className="form-container">
          <img src={logo} alt="iStudy" className="logo" />
          <h2 className="form-title">Sign Up</h2>
          <p className="form-subtitle">Join us by creating a free account</p>
          
          {successMessage && (
            <div className="alert alert-success">
              {successMessage}
            </div>
          )}
          
          {errors.general && (
            <div className="alert alert-error">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                className={`form-control ${errors.firstName ? 'error' : ''}`}
                placeholder="First Name" 
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isLoading}
                required 
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                className={`form-control ${errors.lastName ? 'error' : ''}`}
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isLoading}
                required 
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-control ${errors.phone ? 'error' : ''}`}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                maxLength="10"
                title="Please enter a valid 10-digit phone number"
                onInput={e => {
                  if (e.target.value.length > 10) {
                    e.target.value = e.target.value.slice(0, 10);
                  }
                }}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

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

            <button 
              type="submit" 
              className={`btn btn-primary btn-block ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* <div className="social-login">
            <p>OR SignUp With</p>
            <button 
              className="btn btn-google" 
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              Google
            </button>
          </div> */}

          <p className="sign-in-link">
            Already have an account? <Link to="/Login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;