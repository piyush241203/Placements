import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    tnpAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the TNP Admin of this college
    },
    subscription: {
      planType: {
        type: String,
        enum: ["basic", "standard", "premium"], // Subscription plans
        default: "basic",
      },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date, required: true }, // Date when the subscription ends
      status: {
        type: String,
        enum: ["active", "suspended", "expired"],
        default: "active",
      },
    },
  },
  { timestamps: true }
);

export const College = mongoose.model("College", collegeSchema);
