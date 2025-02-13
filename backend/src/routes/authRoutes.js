const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup); // ✅ Add Signup Route
router.post("/login", authController.login);  // ✅ Add Login Route


module.exports = router;
