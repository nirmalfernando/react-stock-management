import express from "express";
import {
  addGoodReceive,
  getGoodReceiveQty,
} from "../controllers/goodreceive.js";

const router = express.Router();

router.post("/goodreceive", addGoodReceive);
router.get("/receive/qty/:id", getGoodReceiveQty);

export default router;
