const BlogPost = require("../models/BlogPostModel"); // Make sure to replace this with the correct path

// Function to create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newPost = await BlogPost.create({
      title,
      content,
      authorId: req.user.userId,
      category,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const allPosts = await BlogPost.findAll();
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get blog posts by category
const getBlogPostsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const postsByCategory = await BlogPost.findAll({
      where: { category },
    });
    res.status(200).json(postsByCategory);
  } catch (error) {
    console.error("Error getting blog posts by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update a blog post by ID
const updateBlogPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const postId = req.params.id;
    const updatedPost = await BlogPost.update(
      { title, content, author },
      { where: { id: postId } }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a blog post by ID
const deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const userIdFromToken = req.user.userId; // Assuming your JWT payload includes user information, adjust accordingly
    const blogPost = await BlogPost.findByPk(postId);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    if (blogPost.authorId === userIdFromToken || req.user.role === "admin") {
      // User is authorized, proceed with deletion
      await BlogPost.destroy({ where: { id: postId } });
      res.status(204).end(); // No content after successful deletion
    } else {
      // User is not authorized
      res
        .status(403)
        .json({ error: "Forbidden - Not authorized to delete this post" });
    }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBlogPosts,
  updateBlogPost,
  createBlogPost,
  deleteBlogPost,
  getBlogPostsByCategory,
};
