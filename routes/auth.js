const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forgotpassword", authController.forgotpassword);
router.put("/resetpassword/:resetToken", authController.resetpassword);

module.exports = router;
