import express from "express";
import {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.js";
import {
  verifyToken,
  isAdmin,
  isOwnerOrAdmin,
} from "../middleware/authRole.js";

const router = express.Router();

// Get all users
router.get("/", verifyToken, isAdmin, getUsers);

// Get a user by ID
router.get("/:id", verifyToken, isOwnerOrAdmin, getUser);

// Update a user by ID
router.put("/:id", verifyToken, isOwnerOrAdmin, updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
