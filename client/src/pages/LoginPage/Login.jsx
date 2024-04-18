import React, { useContext, useState } from "react";
import "../LoginPage/LoginPage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/side");
    } catch (err) {
      setErr(err.response.data);
    }
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
            placeholder="Username"
            name="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="password-input"
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        {err && err}
        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <a href="#" className="create-account">
          <Link to="/register">
            Don’t have Account? Login as Owner or Create an Account
          </Link>
        </a>
      </div>
    </div>
  );
};

export default Login;
