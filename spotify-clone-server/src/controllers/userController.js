import User from "../models/userModel.js"; // Adjust the import path as needed
import mongoose from "mongoose";

// Create a new user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user detail", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Fetch all users, selecting only the specified fields
    const users = await User.find({}, "image name email role");

    // Check if users were found
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Respond with the retrieved users
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors that occur during the fetch
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const { image } = req.body;

  try {
    // Find the user by ID and update the role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating user profile picture",
        error: error.message,
      });
  }
};

export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    // Find the user by ID and update the role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user role", error: error.message });
  }
};

export const updateName = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    // Find the user by ID and update the name
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User name updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user name", error: error.message });
  }
};
