const express = require("express");
const router = express.Router();
const privateController = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.get("/", protect, privateController.getPrivateData);

module.exports = router;
