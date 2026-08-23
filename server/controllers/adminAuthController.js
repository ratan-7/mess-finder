const dotenv=require("dotenv");
dotenv.config();
const Admin = require("../models/Admin");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
