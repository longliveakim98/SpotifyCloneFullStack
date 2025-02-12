import User from "../models/userModel.js"; // Adjust the import path as needed
import mongoose from "mongoose";

export const getArtists = async (req, res) => {
  try {
    const artists = await User.find(
      { role: "artist" },
      "image name email role"
    );

    // Check if users were found
    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Respond with the retrieved users
    res.status(200).json(artists);
  } catch (error) {
    // Handle any errors that occur during the fetch
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await User.find({ _id: id }, "image name role");

    // Check if users were found
    if (artist.role === "user") {
      return res.status(404).json({ message: "User not an artist" });
    }

    // Respond with the retrieved users
    res.status(200).json(artist);
  } catch (error) {
    // Handle any errors that occur during the fetch
    res
      .status(500)
      .json({ message: "Error fetching artist detail", error: error.message });
  }
};
