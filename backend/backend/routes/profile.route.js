import express from "express";
import {
  updateProfile,
  getProfile,
} from "../controllers/profile.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route to get user profile
router.get("/", verifyToken, getProfile);

// Route to update user profile
router.put("/", verifyToken, updateProfile);

export default router;
