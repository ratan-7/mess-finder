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

router.get("/mess", optionalAuth, getAllMess);
router.get("/mess/:id", optionalAuth, getMessById);
router.post("/mess", requireAdmin, addMess);
router.delete("/mess/:id", requireAdmin, removeMess);
router.patch("/mess/:id", requireAdmin, updateMess);

module.exports = router;
