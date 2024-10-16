import jwt from "jsonwebtoken";
import { db } from "../connect.js";

const JWT_SECRET = process.env.JWT;

// Middleware to verify the token and extract user information
export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded token (which contains id, role, etc.) to req.user
    next();
  } catch (error) {
    console.error("Error during token verification: ", error);
    res
      .status(500)
      .json({ message: "Unable to verify token", error: error.message });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
  const { role } = req.user;

  console.log("User Role: ", role);

  if (!role) {
    return res.status(403).json({ message: "Access denied. No role found!" });
  }

  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Not an admin!" });
  }

  next();
};

// Middleware to check if the user is the owner of the account or an admin
export const isOwnerOrAdmin = async (req, res, next) => {
  const { id, role } = req.user;
  const userId = parseInt(req.params.id);

  try {
    if (role === "admin") {
      return next();
    }

    if (id === userId) {
      return next();
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Error during role verification: ", error);
    res
      .status(500)
      .json({ message: "Unable to verify role", error: error.message });
  }
};
