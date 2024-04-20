import express from "express";
import {
  addGoodReturn,
} from "../controllers/goodreturn.js";

const router = express.Router();

router.post("/goodreturn", addGoodReturn);

export default router;
