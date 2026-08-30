import express from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// Create blog
// =========================
router.post("/", authMiddleware, createBlog);

// =========================
// Get all blogs
// PUBLIC ROUTE
// =========================
router.get("/", getAllBlogs);

// =========================
// Get my blogs
// =========================
router.get("/my-blogs", authMiddleware, getMyBlogs);

// =========================
// Get single blog
// PUBLIC ROUTE
// =========================
router.get("/:id", getBlogById);

// =========================
// Update blog
// =========================
router.put("/:id", authMiddleware, updateBlog);

// =========================
// Delete blog
// =========================
router.delete("/:id", authMiddleware, deleteBlog);

export default router;