import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    craftsman_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },
    completionDate: {
      type: Date,
    },
    craftsman_rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    customer_rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Indexes for improved query performance
jobSchema.index({ location: "2dsphere" });
jobSchema.index({ customer_id: 1 });
jobSchema.index({ craftsman_id: 1 });
jobSchema.index({ service_id: 1, deleted: 1 });

export const Job = mongoose.model("Job", jobSchema);
