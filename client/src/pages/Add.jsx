import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [input, setInput] = useState({
    userid: null,
    username: "",
    name: "",
    password: "",
    email: "",
    phoneno: "",
    image: "",
    role:""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user", input);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add new user</h1>
      <input
        type="text"
        placeholder="userid"
        name="userid"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="phone no"
        name="phoneno"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="image"
        name="image"
        onChange={handleChange}
      /><input
      type="text"
      placeholder="role"
      name="role"
      onChange={handleChange}
    />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
