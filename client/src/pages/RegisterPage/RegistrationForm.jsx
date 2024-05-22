import React, { useState } from "react";
import "./RegistrationForm.css";
import { FaTrash, FaImage } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Login from "../LoginPage/Login";

const RegistrationForm = () => {
  const [inputs, setInputs] = useState({
    userid: null,
    username: "",
    name: "",
    password: "",
    email: "",
    phoneno: "",
    image: "",
    role: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form>
        <div className="column">
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userid"
              placeholder="User ID"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="column">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phoneno"
              name="phoneno"
              placeholder="Phone No"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="Role"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div className="photo-upload">
          <label htmlFor="photo">Choose Photo:</label>
          <div className="photo-upload-input">
            <input type="file" id="photo" accept="image/*" />
            <label htmlFor="photo" className="file-label">
              <FaImage /> Choose File
            </label>
          </div>
          {/* <input
            type="text"
            placeholder="image"
            id="image"
            name="image"
            onChange={handleChange}
          /> */}
        </div>

        <div className="delete-button">
          <FaTrash />
        </div>
        {err && err}
        <button type="submit" className="submit-button" onClick={handleClick}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
