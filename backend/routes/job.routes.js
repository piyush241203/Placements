import express from "express";
import {
  createJob,
  getAllJobs,
  getEligibleJobs,
  deleteJob,
  showEligibleStudents,
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


export default router;
