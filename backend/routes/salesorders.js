import express from "express";
import {
  addSalesOrder,
  getSalesOrder,
  getSalesOrderQty,
  getSalesOrders,
} from "../controllers/salesorder.js";

const router = express.Router();

router.post("/order", addSalesOrder);
router.get("/order/:id", getSalesOrder);
router.get("/order", getSalesOrders);
router.get("/order/qty/:id", getSalesOrderQty);

export default router;
