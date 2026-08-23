const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const otpStore = {};

exports.createOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        message: "Phone required",
      });
    }
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    otpStore[phone] = { code, expiresAt: Date.now() + 5 * 60 * 1000 };

    console.log(`OTP for ${phone}:${code}`);

    res.status(200).json({
      message: "OTP sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;
    const record = otpStore[phone];

    if (!record || record.code !== code || record.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    delete otpStore[phone];

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, otpVerified: true });
    } else {
      otpVerified: true;
      await User.save();
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
