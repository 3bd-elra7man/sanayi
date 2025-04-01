import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    craftsman_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    images: [String],
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
serviceSchema.index({ craftsman_id: 1, deleted: 1 });
serviceSchema.index({ category: 1, deleted: 1 });

export const Service = mongoose.model("Service", serviceSchema);
