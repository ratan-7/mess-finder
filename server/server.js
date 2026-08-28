const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messRoutes = require("./routes/messRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const port = 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", authRoutes);
app.use("/api", messRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Mess finder successfully running here!!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "API is healthy and running...",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
