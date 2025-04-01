import { Job } from "../models/job.model.js";

export const checkJobStatus = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.status === "Accepted" || job.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot update job after acceptance/completion",
      });
    }

    next();
  } catch (error) {
    console.error("Error in checkJobStatus: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
