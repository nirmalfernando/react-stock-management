import { db } from "../connect.js";
import bcrypt from "bcryptjs";

// Update a User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, name, password, email, phoneno, image, role } = req.body;

  try {
    // Find the user by ID
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    let hashedPassword = user.password;
    if (password) {
      const salt = bcrypt.genSaltSync(20);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    // Update the fields if they are provided
    const updatedFields = {
      username: username || user.username,
      name: name || user.name,
      password: hashedPassword,
      email: email || user.email,
      phoneno: phoneno || user.phoneno,
      image: image || user.image,
      role: role || user.role,
    };

    // Update the user in the database
    const query =
      "UPDATE user SET username = ?, name = ?, email = ?, phoneno = ?, image = ?, role = ? WHERE id = ?";

    await db.query(query, [
      updatedFields.username,
      updatedFields.name,
      updatedFields.email,
      updatedFields.phoneno,
      updatedFields.image,
      updatedFields.role,
      id,
    ]);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error during user update: ", error);
    res
      .status(500)
      .json({ message: "Unable to update user", error: error.message });
  }
};

// Get all Users
export const getUsers = async (req, res) => {
  try {
    // Find all users where status is true (active users)
    const [users] = await db.query("SELECT * FROM user WHERE status = 1");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error during getting users: ", error);
    res
      .status(500)
      .json({ message: "Unable to get users", error: error.message });
  }
};

// Get a User by ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const { password, ...userData } = user;

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during getting user: ", error);
    res
      .status(500)
      .json({ message: "Unable to get user", error: error.message });
  }
};

// Delete a User (set status of the user to false)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set user status to false
    await db.query("UPDATE user SET status = 0 WHERE id = ?", [id]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during deleting user: ", error);
    res
      .status(500)
      .json({ message: "Unable to delete user", error: error.message });
  }
};
