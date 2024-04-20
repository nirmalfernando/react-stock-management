import express from "express";
import {
  addSalesOrder,
  getSalesOrder,
  getSalesOrders,
} from "../controllers/salesorder.js";

const router = express.Router();

router.post("/order", addSalesOrder);
router.get("/order/:id", getSalesOrder);
router.get("/order", getSalesOrders);

export default router;
