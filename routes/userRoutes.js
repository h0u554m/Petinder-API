const { Router } = require("express");
const {
  login,
  register,
  getUsers,
} = require("../controllers/authController.js");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/users", getUsers);

module.exports = router;
