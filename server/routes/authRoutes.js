const express = require("express");
const router = express.Router();

const { createOtp, verifyOtp } = require("../controllers/authController");

router.post("/sent-otp", createOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
