import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getStatusDatTime from "../utils/getStatusDateTime.js";

dotenv.config();

const JWT_SECRET = process.env.JWT;

// Register a new User
export const register = async (req, res) => {
  const { username, name, password, email, phoneno, image, role } = req.body;

  try {
    // Check if the user already exists
    const query = "SELECT * FROM user WHERE username = ?";
    const [rows] = await db.query(query, [username]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Encrypt the password
    const salt = bcrypt.genSaltSync(20);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new User
    const statusDate = getStatusDatTime();
    const insertQuery =
      "INSERT INTO user (username, name, password, email, image, role, status, statusdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      username,
      name,
      hashedPassword,
      email,
      phoneno,
      image,
      role,
      1,
      statusDate,
    ];

    await db.query(insertQuery, values);

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error during regisration: ", error);
    res
      .status(500)
      .json({ message: "Unable to create user", error: error.message });
  }
};

// Login a User
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the User by username
    const query = "SELECT * FROM user WHERE username = ? AND status = 1";
    const [rows] = await db.query(query, [username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = rows[0];

    // Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token and the User details (excluding the User password)
    const { password: userPassword, ...userData } = user;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({ user: userData });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ message: "Unable to login", error: error.message });
  }
};

// Logout a User
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .status(200)
    .json({ message: "Logged out" });
};
