import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ["job", "internship"], required: true }, // Job or Internship
    eligibilityCriteria: {
      branch: [{ type: String, required: true }], // Example: ["CSE", "IT"]
      tenthPercentage: { type: Number, required: true },
      twelfthPercentage: { type: Number, required: true },
      semesterClear: { type: Boolean, default: true }, // All semesters clear
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // TNP Admin
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true }, // Link job to college
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
