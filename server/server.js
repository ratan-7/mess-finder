const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const port = 8000;

app.use(express.json());
connectDB();
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Mess finder successfully running here!!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
