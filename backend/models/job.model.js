import mongoose from "mongoose";


const roundSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Aptitude Test", "Interview"
  qualifiedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Students qualified for this round

});

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    eligibilityCriteria: {
      tenthPercentage: { type: Number, default: 0 },
      twelfthPercentage: { type: Number, default: 0 },
      branch: { type: [String], default: [] },
      semesterClear: { type: Boolean, default: true },
    },
    totalApplications: { type: Number, default: 0 },
    appliedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    eligibleStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rounds: [roundSchema], // New Field
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);