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
    type: { type: String, required: true , enum: ["job", "Internship"], default: "job"},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    eligibilityCriteria: {
      branches: { type: [String], enum: ["CSE", "IT", "Aero", "Bio", "Mech", "EE", "ECE"]  },
      gender: { type: String, enum: ["Male", "Female"] },
      cgpa: { type: Number  },
      session: {type: String, enum: ["2023-2024", "2024-2025", "2025-2026"], default: "2024-2025"},
      jeeScore: { type: Number  },
      mhtCetScore : { type: Number  },
      tenthPercentage: { type: Number, default: 0 },
      twelfthPercentage: { type: Number, default: 0 },
      polyPercentage: { type: Number  },
      currentBacklogs: { type: Number  },
    },
    totalApplications: { type: Number, default: 0 },
    appliedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    eligibleStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rounds: [roundSchema], // New Field
    logo: { type: String },
    jobDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);