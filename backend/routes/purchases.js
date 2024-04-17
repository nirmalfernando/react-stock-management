import express from "express";
import {
  addPurchase,
  deletePurchase,
  getPurchase,
  getPurchases,
  updatePurchase,
} from "../controllers/purchase.js";

const router = express.Router();

router.post("/purchase", addPurchase);
router.put("/purchase/:id", updatePurchase);
router.delete("/purchase/:id", deletePurchase);
router.get("/purchase/:id", getPurchase);
router.get("/purchase", getPurchases);

export default router;