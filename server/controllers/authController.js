const User = require("../models/User");

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
