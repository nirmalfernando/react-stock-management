import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/product";

const router = express.Router();

//Get the data from the database
router.get("/", getPosts);
router.get("/:id", getPost);

//Create the data for the database
router.post("/", addPost);

//Delete a data from the database
router.delete("/:id", deletePost);

//Update a data from the database
router.update("/:id", updatePost);

export default router;
