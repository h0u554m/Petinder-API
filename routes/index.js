const express = require("express");
const router = express.Router();
const authRoutes = require("../routes/authRoutes");
const blogRoutes = require("../routes/blogRoutes");
const jwtMiddleware = require("../middleware/jwtMiddleware"); // Import your JWT middleware

router.use("/auth", authRoutes);

router.use("/blog", jwtMiddleware, blogRoutes);

module.exports = router;
