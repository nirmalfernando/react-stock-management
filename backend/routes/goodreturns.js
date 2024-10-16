import express from "express";
import { addGoodReturn, getGoodReturnQty } from "../controllers/goodreturn.js";
import { verifyToken, isAdmin } from "../middleware/authRole.js";

const router = express.Router();

// Get good return quantity
router.get("/qty", verifyToken, isAdmin, getGoodReturnQty);

// Add a good return
router.post("/", verifyToken, isAdmin, addGoodReturn);

export default router;
