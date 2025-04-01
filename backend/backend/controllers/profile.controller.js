import bcryptjs from "bcryptjs";
import { GOVERNORATE_REGIONS, User } from "../models/user.model.js";

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "User not verified" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { userId } = req;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    governorate,
    region,
    password,
    newPassword,
    skills,
    profileImage,
    address,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "User not verified" });
    }

    if (
      governorate &&
      region &&
      !GOVERNORATE_REGIONS[governorate]?.includes(region)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid region for the selected governorate",
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (governorate) user.governorate = governorate;
    if (region) user.region = region;
    if (profileImage) user.profileImage = profileImage;
    if (address) user.address = address;
    if (Array.isArray(skills)) user.skills = skills;

    if (password && newPassword) {
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Current password is incorrect" });
      }
      user.password = await bcryptjs.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
