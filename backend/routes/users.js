import express from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router();

//GET
router.get("/", getUser);

export default router;
