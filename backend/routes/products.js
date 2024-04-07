import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post("/product", addProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/product/:id", getProduct);
router.get("/product", getProducts);

export default router;
