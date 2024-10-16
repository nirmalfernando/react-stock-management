import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
import {
  verifyToken,
  isAdmin,
  isOwnerOrAdmin,
} from "../middleware/authRole.js";

const router = express.Router();

// Get all products
router.get("/", verifyToken, getProducts);

// Get a product by ID
router.get("/:id", verifyToken, getProduct);

// Add a product
router.post("/", verifyToken, isAdmin, addProduct);

// Update a product by ID
router.put("/:id", verifyToken, isAdmin, updateProduct);

// Delete a product by ID
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
