import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";
import User from "../models/userModel.js";

export const searchMusic = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for songs
    const songs = await Song.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Song name
      ],
    }).populate("artist", "name image username"); // Get artist details (name, image)

    // Search for albums
    const albums = await Album.find({
      name: { $regex: query, $options: "i" }, // Album name
    }).populate("artist", "name image username"); // Get artist details

    // Search for artists
    const artists = await User.find({
      name: { $regex: query, $options: "i" }, // Artist name
      role: "artist", // Only fetch artists
    }).select("name image username"); // Exclude password

    res.json({
      songs,
      albums,
      artists,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchArtist = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for artists
    const artists = await User.find({
      name: { $regex: query, $options: "i" }, // Artist name
      role: "artist", // Only fetch artists
    }).select("name image username"); // Exclude password

    res.json({
      artists,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
