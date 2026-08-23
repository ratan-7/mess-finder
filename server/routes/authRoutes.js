const express = require("express");
const router = express.Router();

const { sentOtp, verifyOtp } = require("../controllers/authController");

router.post("/sent-otp", sentOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
