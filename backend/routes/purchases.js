import express from "express";
import {
  addPurchase,
  deletePurchase,
  getPurchase,
  getPurchases,
  updatePurchase,
} from "../controllers/purchase.js";
import {
  verifyToken,
  isAdmin,
  isOwnerOrAdmin,
} from "../middleware/authRole.js";

const router = express.Router();

// Get all purchases
router.get("/", verifyToken, isAdmin, getPurchases);

// Get a purchase by ID
router.get("/:id", verifyToken, isAdmin, isOwnerOrAdmin, getPurchase);

// Add a purchase
router.post("/", verifyToken, addPurchase);

// Update a purchase by ID
router.put("/:id", verifyToken, isAdmin, updatePurchase);

// Delete a purchase by ID
router.delete("/:id", verifyToken, isAdmin, deletePurchase);

export default router;
