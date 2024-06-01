import express from "express";
import {
  addSalesOrder,
  getSalesOrder,
  getSalesOrderQty,
  getSalesOrders,
  getTotalSalesMonthly,
  getTotalSalesYearly,
} from "../controllers/salesorder.js";

const router = express.Router();

router.post("/order", addSalesOrder);
router.get("/order/:id", getSalesOrder);
router.get("/order", getSalesOrders);
router.get("/order/qty/:id", getSalesOrderQty);
router.get("/totSalesMonthly", getTotalSalesMonthly);
router.get("/totSalesYearly", getTotalSalesYearly);

export default router;
