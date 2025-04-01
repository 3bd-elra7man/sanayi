import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { Service } from "../models/service.model.js";

// Create Job (Customer only)
export const createJob = async (req, res) => {
  const { serviceId, description, location, price } = req.body;
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "Customer") {
      return res
        .status(403)
        .json({ success: false, message: "Only customers can create jobs" });
    }

    const service = await Service.findById(serviceId);
    if (!service || service.deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const job = new Job({
      customer_id: userId,
      service_id: serviceId,
      description,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
      price,
    });

    await job.save();
    res.status(201).json({ success: true, message: "Job created", job });
  } catch (error) {
    console.error("Error in createJob: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Job (Customer only)
export const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const { description, price, location } = req.body;
  const { userId } = req;

  try {
    const job = await Job.findById(jobId);
    if (!job || job.customer_id.toString() !== userId || job.deleted) {
      return res
        .status(403)
        .json({ success: false, message: "Job not found or access denied" });
    }

    job.description = description || job.description;
    job.price = price || job.price;
    if (location) {
      job.location = {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      };
    }

    await job.save();
    res.status(200).json({ success: true, message: "Job updated", job });
  } catch (error) {
    console.error("Error in updateJob: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Accept Job (Craftsman only)
export const acceptJob = async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "Craftsman") {
      return res
        .status(403)
        .json({ success: false, message: "Only craftsmen can accept jobs" });
    }

    const job = await Job.findById(jobId);
    if (!job || job.status !== "Pending" || job.deleted) {
      return res.status(404).json({
        success: false,
        message: "Job not found or not available for acceptance",
      });
    }

    job.craftsman_id = userId;
    job.status = "Accepted";

    await job.save();
    res.status(200).json({ success: true, message: "Job accepted", job });
  } catch (error) {
    console.error("Error in acceptJob: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Geolocation-based Job Search
export const searchJobsByLocation = async (req, res) => {
  const { lat, lng, radius } = req.query;

  try {
    const jobs = await Job.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseFloat(radius) / 6378.1,
          ],
        },
      },
      deleted: false,
    });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error in searchJobsByLocation: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
