import React, { useState } from 'react';
import '../LoginPage/LoginPage.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login clicked');
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <h1 className="website-label">I-PLUS</h1>
      </div>
      <div className="right-side">
        <div className="form-group">
          <label>Username</label>
          <input
            className="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
          />
        </div>
        <button type="button" className="login-button" onClick={handleSubmit}>Login</button>
        <a href="#" className="forgot-password">Forgot Password?</a>
        <a href="#" className="create-account">Don’t have Account? Login an Owner and Create an Account</a>
      </div>
    </div>
  );
};

export default Login;
