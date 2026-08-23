const express = require("express");
const router = express.Router();

const {
  getAllMess,
  getMessById,
  addMess,
} = require("../controllers/messController");

router.get("/", getAllMess);
router.get("/:id", getMessById);
router.post("/", addMess);

module.exports = router;
