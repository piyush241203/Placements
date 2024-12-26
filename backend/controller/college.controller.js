import { User } from "../models/user.model.js";
import { College } from "../models/college.model.js";

// 1. Create a College
export const createCollege = async (req, res) => {
    const { name, address, subscription } = req.body; // Ensure subscription data is provided
    try {
      const existingCollege = await College.findOne({ name });
      if (existingCollege) return res.status(400).json({ message: "College already exists" });
  
      // Validate if subscription details are provided (you can add more validation if needed)
      if (!subscription || !subscription.endDate) {
        return res.status(400).json({ message: "Subscription endDate is required" });
      }
  
      const college = new College({ 
        name, 
        address, 
        subscription 
      });
      await college.save();
  
      res.status(201).json({ message: "College created successfully", college });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  // 2. Fetch All Colleges
  export const getAllColleges = async (req, res) => {
    try {
      const colleges = await College.find().populate("tnpAdmin", "email");
      res.status(200).json({ colleges });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // 3. Fetch a Single College
  export const getCollegeById = async (req, res) => {
    const { id } = req.params;
    try {
      const college = await College.findById(id).populate("tnpAdmin", "email");
      if (!college) return res.status(404).json({ message: "College not found" });
  
      res.status(200).json({ college });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // 4. Update College Information
  export const updateCollege = async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    try {
      const college = await College.findById(id);
      if (!college) return res.status(404).json({ message: "College not found" });
  
      if (name) college.name = name;
      if (address) college.address = address;
  
      await college.save();
      res.status(200).json({ message: "College updated successfully", college });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  // 6. Delete a College
  // 6. Delete a College
export const deleteCollege = async (req, res) => {
    const { id } = req.params;
    try {
      const college = await College.findByIdAndDelete(id);
      if (!college) return res.status(404).json({ message: "College not found" });
  
      // Also remove associated TNP Admin (optional)
      if (college.tnpAdmin) {
        await User.findByIdAndDelete(college.tnpAdmin);  // Ensure TNP Admin is deleted
      }
  
      res.status(200).json({ message: "College deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Toggle College Status (for suspending due to subscription issues)
export const toggleCollegeStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      const college = await College.findById(id);
      if (!college) return res.status(404).json({ message: "College not found" });
  
      // Toggle between active and suspended
      college.subscription.status =
        college.subscription.status === "active" ? "suspended" : "active";
  
      await college.save();
  
      res.status(200).json({
        message: `College status updated to ${college.subscription.status}`,
        college,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Track all subscriptions (Global Admin View)
  export const trackSubscriptions = async (req, res) => {
    try {
      const colleges = await College.find(
        {},
        "name subscription.planType subscription.endDate subscription.status"
      );
      res.status(200).json({ message: "Subscription data fetched", colleges });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
