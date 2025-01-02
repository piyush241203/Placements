import express from "express";
import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  toggleCollegeStatus,
  deleteCollege,
  trackSubscriptions,
  renewSubscription,
} from "../controller/college.controller.js";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes for Global Admin only
router.post("/create", protect, authorizeRoles("global_admin"), createCollege);
router.get("/all", protect, authorizeRoles("global_admin"), getAllColleges);
router.get("/subscriptions", protect, authorizeRoles("global_admin"), trackSubscriptions);
router.get("/:id", protect, authorizeRoles("global_admin"), getCollegeById);
router.put("/update/:id", protect, authorizeRoles("global_admin"), updateCollege);
router.put("/status/:id", protect, authorizeRoles("global_admin"), toggleCollegeStatus);
router.delete("/delete/:id", protect, authorizeRoles("global_admin"), deleteCollege);
// Other routes...
router.put("/:id/renew-subscription",protect, authorizeRoles("global_admin"), renewSubscription);


export default router;
