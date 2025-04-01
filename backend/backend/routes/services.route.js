import express from "express";
import {
  createService,
  updateService,
  deleteService,
  listServices,
} from "../controllers/service.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
import CheckRoleAuth from "../middleware/roleAuth.js";
import { validateServiceMiddleware } from "../middleware/validation.js"; // Adjust path as needed

const router = express.Router();

// Create Service (Craftsman only)
router.post(
  "/",
  verifyToken,
  CheckRoleAuth(["Craftsman"]),
  validateServiceMiddleware,
  createService
);

// Update Service (Craftsman only, owns the service)
router.put(
  "/:serviceId",
  verifyToken,
  CheckRoleAuth(["Craftsman"]),
  validateServiceMiddleware,
  updateService
);

// Delete Service (Craftsman only, owns the service)
router.delete(
  "/:serviceId",
  verifyToken, // Ensure the user is authenticated
  CheckRoleAuth(["Craftsman"]), // Ensure the user has "Craftsman" role
  deleteService
);

// List Services (Available to all users)
router.get("/", listServices);

export default router;
