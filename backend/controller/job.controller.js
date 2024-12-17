import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";


// Create Job with Eligibility Criteria
export const createJob = async (req, res) => {
    const { title, description, eligibilityCriteria } = req.body;
  
    try {
      // Ensure only TNP Admin can create a job
      if (req.user.role !== "tnp_admin") {
        return res.status(403).json({ message: "Access denied. Only TNP Admin can create a job." });
      }
  
      // Create New Job
      const job = new Job({
        title,
        description,
        eligibilityCriteria, // Store the eligibility criteria with the job
        createdBy: req.user._id, // TNP Admin who created the job
        college: req.user.college, // Associate job with the college
      });
  
      await job.save();
      res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// GET All Jobs (TNP Admin)
export const getAllJobs = async (req, res) => {
  try {
    // Only TNP Admins can see all jobs for their college
    if (req.user.role !== "tnp_admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const jobs = await Job.find({ college: req.user.college });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET Eligible Jobs for Students
export const getEligibleJobs = async (req, res) => {
  try {
    // Students can view jobs matching their profile
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied." });
    }

    const jobs = await Job.find({
      college: req.user.college,
      "eligibilityCriteria.branch": req.user.branch,
      "eligibilityCriteria.tenthPercentage": { $lte: req.user.tenthPercentage },
      "eligibilityCriteria.twelfthPercentage": { $lte: req.user.twelfthPercentage },
      "eligibilityCriteria.semesterClear": req.user.semestersClear,
    });

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE Job
export const deleteJob = async (req, res) => {
  try {
    if (req.user.role !== "tnp_admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job || job.college.toString() !== req.user.college.toString()) {
      return res.status(404).json({ message: "Job not found or unauthorized access." });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Show Eligible Students Before Creating a Job
export const showEligibleStudents = async (req, res) => {
    const {
      branch,
      tenthPercentage,
      twelfthPercentage,
      cgpa,
      backlogs,
      skills,
      studentType,
      diplomaPercentage,
      jeeScore,
      achievements,
    } = req.body;
  
    try {
      // Only TNP Admins can access this functionality
      if (req.user.role !== "tnp_admin") {
        return res.status(403).json({ message: "Access denied. Only TNP Admins can view eligible students." });
      }
  
      // Find Eligible Students Based on Criteria
      const eligibleStudents = await User.find({
        role: "student",
        college: req.user.college, // Ensure students are from the same college
        ...(branch && { "profile.branch": branch }), // Filter by branch if provided
        ...(tenthPercentage && { "profile.tenthDetails.percentage": { $gte: tenthPercentage } }),
        ...(twelfthPercentage && { "profile.twelfthDetails.percentage": { $gte: twelfthPercentage } }),
        ...(cgpa && { "profile.cgpa": { $gte: cgpa } }),
        ...(backlogs !== undefined && { "profile.backlogs": { $lte: backlogs } }),
        ...(skills && { "profile.skills": { $in: skills } }),
        ...(studentType && { "profile.studentType": studentType }),
        ...(diplomaPercentage && { "profile.diplomaPercentage": { $gte: diplomaPercentage } }),
        ...(jeeScore && { "profile.jeeScore": { $gte: jeeScore } }),
        ...(achievements && { "profile.achievements": { $in: achievements } }),
      }).select(
        "profile.firstName profile.lastName profile.email profile.branch profile.tenthDetails.profile.percentage profile.twelfthDetails.profile.percentage profile.cgpa profile.backlogs profile.skills profile.jeeScore profile.diplomaPercentage profile.studentType profile.achievements"
      );
  
      res.status(200).json({
        totalEligibleStudents: eligibleStudents.length,
        students: eligibleStudents,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
