import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("/user");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("/user/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="users">
        {users.map((user) => (
          <div className="user" key={user.userid}>
            {user.image && <img src={user.image} alt="" />}
            <h5>{user.username}</h5>
            <h5>{user.name}</h5>
            <h5>{user.email}</h5>
            <h5>{user.phoneno}</h5>
            <h5>{user.role}</h5>
            <button
              className="delete"
              onClick={() => handleDelete(user.userid)}
            >
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${user.userid}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new user</Link>
      </button>
    </div>
  );
};

export default User;
