import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    song: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
    ],
  },
  { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default Like;
