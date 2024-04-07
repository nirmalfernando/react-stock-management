import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [input, setInput] = useState({
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
  const location = useLocation();

  const userID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user/" +userID, input);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Updateuser</h1>
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
      />
      <input
        type="text"
        placeholder="role"
        name="role"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
