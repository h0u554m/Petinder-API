const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh-token", authController.refreshToken);

module.exports = router;
