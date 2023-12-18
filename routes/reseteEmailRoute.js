const { Router } = require("express");
const { resetEmail } = require("../controllers/resetEmailController.js");

const router = Router();

router.post("/reset-email", resetEmail);

module.exports = router;
