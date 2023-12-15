const { Router } = require("express");
const {
  postResetPassword,
  getResetPassword,
  postResetPasswordEmail,
} = require("../controllers/resetPasswordController.js");

const router = Router();

router.post("/reset-password", postResetPassword);

router.get("/reset-password/:id/:token", getResetPassword)

router.post("/reset-password/:id/:token", postResetPasswordEmail)

module.exports = router;
