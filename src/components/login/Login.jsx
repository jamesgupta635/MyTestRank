import React from 'react';
import './Login.css';
import logo from '../../assets/logo.png'; 
import HalfBackgroung from '../../assets/B2.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={HalfBackgroung} alt="Login" /> {/* Replace with your image path */}
      </div>
      <div className="login-form">
        <div className="form-container">
          <img src={logo} alt="iStudy" className="logo" />
          <h2 className="form-title">Log In</h2>
          <p className="form-subtitle">Welcome back Wick</p>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" className="form-control" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input type="password" id="password" className="form-control" placeholder="Your Password" required />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" id="rememberMe" className="form-check-input" />
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </form>
          <div className="social-login">
            <p>OR SignIn With</p>
            <button className="btn btn-google">Google</button>
          </div>
          <p className="sign-in-link">Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;