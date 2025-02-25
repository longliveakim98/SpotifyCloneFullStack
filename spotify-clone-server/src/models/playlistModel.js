import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null }, // Optional cover image
    bgColour: { type: String, required: false, default: "#1E1E1E" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who created the playlist
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // Songs inside playlist
    isPublic: { type: Boolean, default: true }, // Private by default
  },
  { timestamps: true }
);

const Playlist =
  mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);
export default Playlist;
