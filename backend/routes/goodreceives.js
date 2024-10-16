import express from "express";
import {
  addGoodReceive,
  getGoodReceiveQty,
} from "../controllers/goodreceive.js";
import { verifyToken, isAdmin } from "../middleware/authRole.js";

const router = express.Router();

// Get good receive quantity
router.get("/qty", verifyToken, isAdmin, getGoodReceiveQty);

// Add a good receive
router.post("/", verifyToken, isAdmin, addGoodReceive);

export default router;
