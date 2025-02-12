import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bgColour: { type: String, required: true }, // Background color for album display
    image: { type: String, required: true }, // Album cover image
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Album owner
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // Songs inside album
    isPublic: { type: Boolean, default: false }, // Controls album visibility
  },
  { timestamps: true }
);

const Album = mongoose.models.Album || mongoose.model("Album", albumSchema);

export default Album;
