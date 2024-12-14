import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (you can add middleware to secure these routes later)
router.get("/user/:id", getUserDetails);
router.put("/user/:id", updateUserDetails);
router.delete("/user/:id", deleteUser);

export default router;
