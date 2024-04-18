import express from "express";
import {
  addGoodReceive,
} from "../controllers/goodreceive.js";

const router = express.Router();

router.post("/goodreceive", addGoodReceive);

export default router;
