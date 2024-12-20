import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";


// Create Job with Eligibility Criteria
export const createJob = async (req, res) => {
  try {
    const jobData = req.body;

    // Ensure the user is authenticated and has the correct role
    if (req.user.role !== "tnp_admin") {
      return res.status(403).json({ message: "Access denied. Only TNP Admin can create a job." });
    }

    // Validate and create rounds for the job if provided
    const rounds = [];
    if (jobData.rounds && Array.isArray(jobData.rounds)) {
      for (let roundData of jobData.rounds) {
        const round = new Round(roundData); // Assuming you have a Round model
        await round.save();
        rounds.push(round._id);
      }
    }

    // Construct eligibility criteria dynamically
    const eligibilityCriteria = {
      role: "student",
      college: req.user.college, // Ensure students are from the same college
      "profile.tenthDetails.percentage": { $gte: jobData.eligibilityCriteria.tenthPercentage },
      "profile.twelfthDetails.percentage": { $gte: jobData.eligibilityCriteria.twelfthPercentage },
      "profile.studentType": jobData.eligibilityCriteria.studentType,
    };

    // Include branch criteria if provided
    if (jobData.eligibilityCriteria.branch && jobData.eligibilityCriteria.branch.length > 0) {
      eligibilityCriteria["profile.branch"] = { $in: jobData.eligibilityCriteria.branch };
    }

    // Include backlog criteria
    if (jobData.eligibilityCriteria.semesterClear) {
      eligibilityCriteria["profile.backlogs"] = { $lte: 0 };
    }

    // Fetch eligible students based on criteria
    const eligibleStudents = await User.find(eligibilityCriteria);

    // Create job with eligible students and include college, createdBy, and rounds
    const newJob = await Job.create({
      ...jobData,
      college: req.user.college, // Automatically get the college from the authenticated user
      createdBy: req.user._id,   // Automatically set createdBy to the authenticated user's ID
      eligibleStudents: eligibleStudents.map((student) => student._id),
      rounds: rounds, // Store the created rounds for this job
    });

    // Respond with the job and detailed eligible students information
    res.status(201).json({
      message: "Job created successfully",
      job: {
        ...newJob.toObject(),
        eligibleStudents: eligibleStudents.map((student) => ({
          _id: student._id,
          profile: student.profile,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create job", error: error.message });
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
    const studentId = req.user.id; // Assuming student ID is fetched from token

    // Fetch jobs where the student is eligible
    const jobs = await Job.find({ eligibleStudents: studentId });

    res.status(200).json({ message: "Eligible jobs fetched successfully", jobs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch eligible jobs", error: error.message });
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
  
  export const applyForJob = async (req, res) => {
    try {
      const { jobId } = req.params;
      const studentId = req.user._id;
  
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }
  
      // Check eligibility
      if (!job.eligibleStudents.includes(studentId)) {
        return res.status(403).json({ message: "You are not eligible to apply for this job." });
      }
  
      // Check if already applied
      if (job.appliedStudents.includes(studentId)) {
        return res.status(400).json({ message: "You have already applied for this job." });
      }
  
      // Add student to the job's appliedStudents list
      job.appliedStudents.push(studentId);
      await job.save();
  
      // Add job to the student's appliedJobsHistory
      const student = await User.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found." });
      }
  
      // Add the job and its details to the user's appliedJobsHistory
      student.profile.appliedJobsHistory.push({
        jobId: job._id,
        appliedOn: new Date(),
        roundsHistory: [], // Initialize rounds history as empty
      });
      await student.save();
  
      res.status(200).json({ message: "Successfully applied for the job." });
    } catch (error) {
      res.status(500).json({ message: "Failed to apply for the job", error: error.message });
    }
  };
  
  export const getAppliedStudents = async (req, res) => {
    try {
      const { jobId } = req.params;
  
      // Check if the user is either a global admin or tnp admin
      if (!["global_admin", "tnp_admin"].includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. Only global admins or TNP admins can access this data." });
      }
  
      const job = await Job.findById(jobId)
        .populate("appliedStudents", "profile.firstName profile.lastName profile.email");
  
      if (!job || job.college.toString() !== req.user.college.toString()) {
        return res.status(404).json({ message: "Job not found or unauthorized access." });
      }
  
      res.status(200).json({ appliedStudents: job.appliedStudents });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applied students", error: error.message });
    }
  };
  
  export const createRounds = async (req, res) => {
    try {
      console.log('Authenticated User:', req.user);  // Log the req.user object
  
      const { jobId } = req.params;
      const { rounds } = req.body; // Array of round names
  
      // Ensure the user is either Global Admin or TNP Admin
      if (req.user.role !== "global_admin" && req.user.role !== "tnp_admin") {
        return res.status(403).json({ message: "Access denied. Only Global Admin and TNP Admin can create rounds." });
      }
  
      const job = await Job.findById(jobId);
  
      if (!job || job.college.toString() !== req.user.college.toString()) {
        return res.status(404).json({ message: "Job not found or unauthorized access." });
      }
  
      // Append the new rounds to the existing rounds array
      const newRounds = rounds.map((round) => ({ name: round, qualifiedStudents: [] }));
      job.rounds.push(...newRounds); // Use push with spread to add multiple rounds
  
      await job.save();
  
      res.status(201).json({ message: "Rounds created successfully.", rounds: job.rounds });
    } catch (error) {
      res.status(500).json({ message: "Failed to create rounds", error: error.message });
    }
  };
  
 // Update Round Results
export const updateRoundResults = async (req, res) => {
  try {
    const { jobId, roundId } = req.params;
    const { qualifiedStudents } = req.body;

    // Fetch the job by jobId
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Find the round by roundId within the job's rounds array
    const round = job.rounds.id(roundId);
    if (!round) {
      return res.status(404).json({ message: "Round not found." });
    }

    // Update the qualified students for the round
    round.qualifiedStudents = qualifiedStudents || [];
    await job.save();

    res.status(200).json({ message: "Round results updated successfully.", round });
  } catch (error) {
    res.status(500).json({ message: "Failed to update round results.", error: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const studentId = req.user._id;
    const jobs = await Job.find({ appliedStudents: studentId });

    // Creating an array of notifications that includes both job and round details
    const notifications = jobs.flatMap((job) =>
      job.rounds.map((round) => ({
        jobTitle: job.title, // Adding job title to the notification
        roundName: round.name, // Round name
        status: round.qualifiedStudents.includes(studentId) ? "Qualified" : "Not Qualified", // Qualified status
        jobDetails: {
          jobId: job._id, // Job ID
          jobDescription: job.description, // Assuming description is part of the job model
          companyName: job.company, // Assuming company name is part of the job model
          jobLocation: job.location, // Assuming location is part of the job model
          // Add any other job details you want here
        },
      }))
    );

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
  }
};
