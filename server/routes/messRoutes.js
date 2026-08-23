const express = require("express");
const router = express.Router();

const {
  getAllMess,
  getMessById,
  addMess,
  removeMess,
  updateMess,
} = require("../controllers/messController");

const { requireAdmin, optionalAuth } = require("../middleware/verifyToken");

router.get("/", optionalAuth, getAllMess);
router.get("/:id", optionalAuth, getMessById);
router.post("/", requireAdmin, addMess);
router.delete("/:id", requireAdmin, removeMess);
router.patch("/:id", requireAdmin, updateMess);

module.exports = router;
