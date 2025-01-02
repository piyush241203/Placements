import jwt from "jsonwebtoken";
import  { User }  from "../models/user.model.js";
import { College } from "../models/college.model.js";
import dotenv from "dotenv";
import { deleteImageFromCloudinary, uploadImageOnCloudinary } from "../cloud/cloudinary.js";

dotenv.config();

// Generate JWT token
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("token", token, {
    httpOnly: true, // Secure the cookie
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // Prevent CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// Global Admin creates a TNP Admin
export const createTnpAdmin = async (req, res) => {
  const { email, password, collegeId } = req.body;

  try {
    // 1. Check if College exists
    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ message: "College not found" });

    // 2. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // 3. Create a TNP Admin user
    const tnpAdmin = new User({ email, password, role: "tnp_admin", college: college._id });
    await tnpAdmin.save();

    // 4. Link TNP Admin to the college
    college.tnpAdmin = tnpAdmin._id;
    await college.save();

    res.status(201).json({ message: "TNP Admin created successfully", tnpAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// TNP Admin creates a Student
export const createStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure role-based access
    if (req.user.role !== "tnp_admin") {
      return res.status(403).json({ message: "Only TNP Admins can create students" });
    }

    // 1. Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // 2. Create a Student user linked to the same college as the TNP Admin
    const student = new User({ email, password, role: "student", college: req.user.college });
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Validate password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate JWT token and set it in cookies
    const tokenPayload = { id: user._id, role: user.role };

    // Add college to the payload if it exists
    if (user.college) {
      tokenPayload.college = user.college._id;
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',  
      sameSite: "Strict" 
    });

    res.status(200).json({ message: "Login successful", user: { id: user._id, role: user.role, token } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Logout User
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
};


// List all users of a specific college
export const listUsersOfCollege = async (req, res) => {
  try {
    // Get the college ID from the URL params
    const { collegeId } = req.params;

    // Ensure the current user is either a TNP Admin of that college or a Global Admin
    if (req.user.role !== 'global_admin') {
      const userCollege = await College.findById(collegeId);
      if (!userCollege) {
        return res.status(404).json({ message: "College not found" });
      }

      // Check if the current user is the TNP Admin of the college
      if (userCollege.tnpAdmin.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to view users for this college" });
      }
    }

    // Fetch all users related to the specific college
    const users = await User.find({ college: collegeId }).populate('college', 'name');
    
    // If no users found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found for this college" });
    }

    // Send the response with the list of users
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Fetch user by ID
export const fetchUserById = async (req, res) => {
  try {
    const { userId } = req.params; // User ID from the request params

    // Fetch the user by ID and populate necessary fields
    const user = await User.findById(userId)
      .populate("college", "name") // Populating the college name
      .populate("profile.appliedJobsHistory.jobId", "title company location type description logo"); // Populating job history with job details

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out null or deleted jobs from the appliedJobsHistory
    const filteredAppliedJobsHistory = user.profile.appliedJobsHistory.filter(
      (job) => job.jobId !== null
    );

    // Replace the original appliedJobsHistory with the filtered one
    user.profile.appliedJobsHistory = filteredAppliedJobsHistory;

    res.status(200).json({
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Ensure role-based access
    if (req.user.role !== "tnp_admin") {
      return res.status(403).json({ message: "Only TNP Admins can delete students" });
    }

    // Find the student to delete
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    // Ensure the student belongs to the same college as the TNP Admin
    if (student.college.toString() !== req.user.college.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this student" });
    }

    await User.findByIdAndDelete(studentId);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

};

// Middleware to ensure the user is a student
const isStudent = (user) => user.role === "student";

export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and the user ID is available in req.user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the previous profile picture from Cloudinary if exists
    if (user.profile.profilePic) {
      await deleteImageFromCloudinary(user.profile.profilePic);
    }

    // Upload the new profile picture to Cloudinary
    const result = await uploadImageOnCloudinary(req.file.path);

    // Update the user profile with the new profile picture URL
    user.profile.profilePic = result.secure_url;

    await user.save();
    
    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: result.secure_url,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Failed to update profile picture" });
  }
};


// Update Student Profile
export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user._id; // Authenticated student
    const updates = req.body;

    // Fetch the student
    const student = await User.findById(studentId);
    if (!student || !isStudent(student)) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update profile fields selectively
    if (updates.profile) {
      // Only update the fields that are included in the request body
      const profileUpdates = { ...updates.profile };

      // If the user has updated the 10th details, update those
      if (profileUpdates.tenthDetails !== undefined) {
        student.profile.tenthDetails = {
          ...student.profile.tenthDetails,
          ...profileUpdates.tenthDetails,
        };
      }

      // If the user has updated the 12th details, update those
      if (profileUpdates.twelfthDetails !== undefined) {
        student.profile.twelfthDetails = {
          ...student.profile.twelfthDetails,
          ...profileUpdates.twelfthDetails,
        };
      }

      // For other profile fields (like cgpa, achievements, etc.), update them as well
      student.profile = { ...student.profile, ...profileUpdates };
    }

    // Save the updated student profile
    await student.save();

    res.status(200).json({ message: "Profile updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// TNP Admin Dashboard - View Student Profile Completion
// TNP Admin or user can view profile completion details
export const getProfileCompletionDetails = async (req, res) => {
  try {
    // Check if the request is from a TNP Admin or the user themselves
    const userId = req.user._id;
    const userRole = req.user.role;

    // If the user is a TNP Admin, they can view any student in their college
    if (userRole === "tnp_admin") {
      // Fetch all students of the same college as the TNP Admin
      const students = await User.find({ college: req.user.college, role: "student" });

      // Calculate profile completion for each student
      const profileDetails = students.map((student) => ({
        id: student._id,
        name: `${student.profile.firstName || ""} ${student.profile.lastName || ""}`,
        email: student.email,
        profileCompletion: student.profileCompletion,
      }));

      return res.status(200).json({
        message: "Profile completion details fetched for all students",
        profileDetails,
      });
    }

    // If the user is not a TNP Admin, they can only view their own profile completion
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profileCompletion = {
      id: user._id,
      name: `${user.profile.firstName || ""} ${user.profile.lastName || ""}`,
      email: user.email,
      profileCompletion: user.profileCompletion,
    };

    return res.status(200).json({
      message: "Profile completion details fetched successfully",
      profileDetails: profileCompletion,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


