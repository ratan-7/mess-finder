const express = require("express");
const router = express.Router();

const {createOtp} = require("../controllers/authController");

router.post("/sent-otp",createOtp);

module.exports=router;
