import express from "express";
import {
  createJob,
  updateJob,
  acceptJob,
  searchJobsByLocation,
} from "../controllers/job.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
import CheckRoleAuth from "../middleware/roleAuth.js";
import { validateJobMiddleware } from "../middleware/validation.js";
import { checkJobStatus } from "../middleware/jobRestrictions.js";
const router = express.Router();

// Create Job (Customer only)
router.post(
  "/",
  verifyToken,
  CheckRoleAuth(["Customer"]),
  validateJobMiddleware,
  createJob
);

// Update Job (Customer only, owns the job)
router.put(
  "/:jobId",
  verifyToken,
  CheckRoleAuth(["Customer"]),
  checkJobStatus,
  validateJobMiddleware,
  updateJob
);

// Accept Job (Craftsman only)
router.put(
  "/:jobId/accept",
  verifyToken, // Ensure the user is authenticated
  CheckRoleAuth(["Craftsman"]), // Ensure the user has "Craftsman" role
  acceptJob
);

// Search Jobs by Geolocation (Available to all users)
router.get("/location", searchJobsByLocation);

export default router;
