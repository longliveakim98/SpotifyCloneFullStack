import User from "../models/userModel.js"; // Adjust the import path as needed
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// Create a new user
export const signUp = async (req, res) => {
  try {
    const { name, username, password, email, role } = req.body;
    const imageFile = req.files?.image?.[0];

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Username or email already taken",
      });
    }

    let imageUrl = null;
    let confirmedRole = role ? role : "users";

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // Create a new user
    const newUser = new User({
      name,
      username,
      password, // Password will be hashed by the pre-save hook in the model
      email,
      image: imageUrl,
      role: confirmedRole,
    });

    // Save the user to the database
    await newUser.save();

    // Return the user data (excluding the password)
    const userResponse = newUser.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
