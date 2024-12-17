import { College } from "../models/college.model.js";

export const checkSubscription = async (req, res, next) => {
  try {
    if (req.user.role === "global_admin") return next(); // Skip for Global Admins

    const college = await College.findById(req.user.college);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const { status, endDate } = college.subscription;
    if (status === "suspended" || new Date(endDate) < new Date()) {
      return res
        .status(403)
        .json({ message: "College subscription expired or suspended" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
