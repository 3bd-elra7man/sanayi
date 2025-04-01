import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { GOVERNORATE_REGIONS, User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    governorate,
    region,
    role,
    phoneNumber,
  } = req.body;

  try {
    // Validate all fields are provided
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !governorate ||
      !region ||
      !role ||
      !phoneNumber
    ) {
      throw new Error("All fields are required");
    }

    // Check if the region is valid for the given governorate
    if (!GOVERNORATE_REGIONS[governorate]?.includes(region)) {
      return res.status(400).json({
        success: false,
        message: "Invalid region for the selected governorate",
      });
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user (no verification token needed)
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      governorate,
      region,
      role,
      phoneNumber,
      // isVerified is true by default (we'll update the model)
    });

    await user.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // Skip sending verification email
    res.status(201).json({
      success: true,
      message: "User created successfully. You can now log in.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // No need to check isVerified since email verification is removed
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Pass the entire user object to include role in the token
    generateTokenAndSetCookie(res, user);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  // Check if the token cookie is set
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Already logged out" });
  }

  // Clear the JWT cookie
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // Log the reset link instead of sending an email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log(`[Disabled] Password reset link for ${email}: ${resetUrl}`);

    res.status(200).json({
      success: true,
      message: "Password reset link logged to console (email sending disabled)",
      resetUrl, // Include the reset URL in the response for testing
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }


    // Update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // Log instead of sending reset success email
    console.log(`[Disabled] Password reset successful for ${user.email}`);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};