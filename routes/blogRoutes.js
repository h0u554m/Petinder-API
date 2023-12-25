// blogRoutes.js
const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// Create a new blog post
router.post("/create", blogController.createBlogPost);

// Get all blog posts
router.get("/getAll", blogController.getAllBlogPosts);

// Get blog posts by category
router.get("/getByCategory/:category", blogController.getBlogPostsByCategory);

// Update a blog post by ID
router.put("/update/:id", blogController.updateBlogPost);

// Delete a blog post by ID
router.delete("/delete/:id", blogController.deleteBlogPost);

module.exports = router;
