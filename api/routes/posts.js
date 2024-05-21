import express from "express";
import {
  getAllPosts,
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
} from "../controller/postsController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
