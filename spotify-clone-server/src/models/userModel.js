import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String, default: null },
    bgColour: { type: String, default: "#ffffff" },
    role: {
      type: String,
      enum: ["user", "artist", "admin"],
      default: "user",
    },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    lastPlayedSong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },
    lastPlayedAlbum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
