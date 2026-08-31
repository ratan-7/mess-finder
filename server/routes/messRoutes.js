const express = require("express");
const router = express.Router();

const {
  getAllMess,
  getMessById,
  addMess,
  removeMess,
  updateMess,
  addOwnerMess,
  getMyMess,
  getAllMessAdmin,
} = require("../controllers/messController");

const {
  requireAdmin,
  optionalAuth,
  requireOwner,
} = require("../middleware/verifyToken");

router.get("/mess", optionalAuth, getAllMess);
router.get("/mess/admin/all", requireAdmin, getAllMessAdmin);
router.get("/mess/owner", requireOwner, getMyMess);
router.get("/mess/:id", optionalAuth, getMessById);

router.post("/mess", requireAdmin, addMess);
router.post("/mess/owner", requireOwner, addOwnerMess);

router.delete("/mess/:id", requireAdmin, removeMess);
router.patch("/mess/:id/status", requireAdmin, updateMess);

module.exports = router;
