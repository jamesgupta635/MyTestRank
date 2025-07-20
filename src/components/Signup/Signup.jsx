import React from 'react';
import './SignUp.css';
import logo from '../../assets/logo.png'; 
import HalfBackgroung from '../../assets/B2.png';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={HalfBackgroung} alt="Login" /> {/* Replace with your image path */}
      </div>
      <div className="login-form">
        <div className="form-container">
          <img src={logo} alt="iStudy" className="logo" />
          <h2 className="form-title">Sign Up</h2>
          <p className="form-subtitle">Join us by creating a free account</p>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" className="form-control" placeholder="First Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" className="form-control" placeholder="Last Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="number"
                id="phone"
                className="form-control"
                placeholder="Phone Number"
                required
                min="1000000000"
                max="9999999999"
                title="Please enter a valid 10-digit phone number"
                onInput={e => {
                  if (e.target.value.length > 10) {
                    e.target.value = e.target.value.slice(0, 10);
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" className="form-control" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input type="password" id="password" className="form-control" placeholder="Your Password" required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
          </form>
          <div className="social-login">
            <p>OR SignUp With</p>
            <button className="btn btn-google">Google</button>
          </div>
          <p className="sign-in-link">Already have an account? <Link to="/Login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;