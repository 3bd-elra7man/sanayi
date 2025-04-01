import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import serviceRoutes from "./routes/services.route.js";
import jobRoutes from "./routes/jobs.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



// Update CORS to use CLIENT_URL for production (Vercel frontend)
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));

app.use(express.json()); // Parse incoming requests: req.body
app.use(cookieParser()); // Parse incoming cookies

// Apply rate limiting to auth routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});