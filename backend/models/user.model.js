import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "tnp_admin", "global_admin"],
    default: "student",
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: function () {
      return this.role === "tnp_admin" || this.role === "student";
    },
  },
  profile: {
    firstName: String,
    lastName: String,
    phoneNum: String,
    collegeID: String,
    branch: String,
    tenthDetails: {
      schoolName: { type: String, default: null },
      percentage: { type: Number, default: null },
    },
    twelfthDetails: {
      schoolName: { type: String, default: null },
      percentage: { type: Number, default: null },
    },
    cgpa: { type: Number, default: null },
    backlogs: { type: Number, default: 0 },
    jeeScore: { type: Number, default: null },
    studentType: { type: String, enum: ["Regular", "DSY"], default: null },
    diplomaPercentage: { type: Number, default: null },
    achievements: [String],
    skills: [String],
    appliedJobsHistory: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        appliedOn: { type: Date, default: Date.now },
      },
    ],
  },
  
}, { timestamps: true });

// Virtual field for profile completion percentage
userSchema.virtual("profileCompletion").get(function () {
  const profileFields = [
    "firstName", "lastName", "phoneNum", "collegeID", "branch",
    "tenthDetails.schoolName", "tenthDetails.percentage",
    "twelfthDetails.schoolName", "twelfthDetails.percentage",
    "cgpa", "backlogs", "jeeScore", "studentType", "achievements", "skills",
  ];
  let completedFields = 0;

  profileFields.forEach((field) => {
    const fieldParts = field.split(".");
    const value = fieldParts.reduce((acc, part) => acc?.[part], this.profile);
    if (value) completedFields++;
  });

  return Math.round((completedFields / profileFields.length) * 100);
});

// Encrypt the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
