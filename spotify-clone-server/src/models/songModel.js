import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    }, // Optional
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Artist who uploaded
    image: { type: String, required: true }, // Song cover image
    file: { type: String, required: true }, // Audio file URL
    duration: { type: String, required: true }, // Length of song (e.g., "3:45")
    likesCount: { type: Number, default: 0 }, // Number of likes
    playCount: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false }, // Hidden until published
  },
  { timestamps: true }
);

const Song = mongoose.models.Song || mongoose.model("Song", songSchema);

export default Song;
