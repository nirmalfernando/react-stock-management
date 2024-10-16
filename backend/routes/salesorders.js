import express from "express";
import {
  addSalesOrder,
  getSalesOrder,
  getSalesOrderQty,
  getSalesOrders,
  getTotalSalesMonthly,
  getTotalSalesYearly,
} from "../controllers/salesorder.js";
import { verifyToken, isAdmin } from "../middleware/authRole.js";

const router = express.Router();

// Get all sales orders
router.get("/", verifyToken, isAdmin, getSalesOrders);

// Get a sales order by ID
router.get("/:id", verifyToken, isAdmin, getSalesOrder);

// Get total sales monthly
router.get("/monthly", verifyToken, isAdmin, getTotalSalesMonthly);

// Get total sales yearly
router.get("/yearly", verifyToken, isAdmin, getTotalSalesYearly);

// Get sales order quantity
router.get("/qty", verifyToken, isAdmin, getSalesOrderQty);

// Add a sales order
router.post("/", verifyToken, isAdmin, addSalesOrder);

export default router;
