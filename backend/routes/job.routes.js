import express from "express";
import {
  createJob,
  getAllJobs,
  getEligibleJobs,
  deleteJob,
  showEligibleStudents,
  applyForJob,
  getAppliedStudents,
  createRounds,
  updateRoundResults,
  getNotifications,
} from "../controller/job.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes for TNP Admin
router.post("/create", protect, createJob);
router.get("/all", protect, getAllJobs);
router.delete("/:jobId", protect, deleteJob);

// Routes for Students
router.get("/eligible", protect, getEligibleJobs);

// Route to show eligible students before creating a job
router.post("/eligible-students", protect, showEligibleStudents);

router.post("/:jobId/apply", protect, applyForJob); // Apply for a job
router.get("/:jobId/applied-students",protect, getAppliedStudents); // View applied students
router.post("/:jobId/rounds", protect, createRounds); // Create rounds for a job
router.put("/:jobId/rounds/:roundId",protect, updateRoundResults); // Update round results
router.get("/notifications", protect, getNotifications); // Get notifications for students


export default router;
