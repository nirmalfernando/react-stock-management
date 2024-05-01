import express from "express";
import {
  addGoodReturn,
  getGoodReturnQty,
} from "../controllers/goodreturn.js";

const router = express.Router();

router.post("/goodreturn", addGoodReturn);
router.get("/return/qty/:id", getGoodReturnQty);

export default router;
