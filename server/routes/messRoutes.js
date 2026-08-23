const express = require("express");
const router = express.Router();

const {
  getAllMess,
  getMessById,
  addMess,
  removeMess,
  updateMess,
} = require("../controllers/messController");

router.get("/", getAllMess);
router.get("/:id", getMessById);
router.post("/", addMess);
router.delete("/:id", removeMess);
router.patch("/:id", updateMess);

module.exports = router;
