import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import crypto from "crypto";

// const validateSignature = (signature, timestamp, params) => {
//   const secretKey = process.env.CLOUDINARY_API_SECRET; // Ensure you have the correct secret key in your environment variables

//   // Recreate the string to sign
//   const stringToSign = `timestamp=${timestamp}${params}`;

//   // Generate the expected signature using the Cloudinary secret key
//   const expectedSignature = crypto
//     .createHash("sha1")
//     .update(stringToSign + secretKey)
//     .digest("hex");

//   // Compare the expected signature with the signature passed from the frontend
//   return expectedSignature === signature;
// };

const addSong = async (req, res) => {
  try {
    const { name, desc, album, signature, timestamp } = req.body;

    const expectedSignature = cloudinary.utils.api_sign_request(
      { public_id: name, timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    if (signature !== expectedSignature) {
      return res.json({
        success: false,
        message: `Invalid signature: Received ${signature}, Expected ${expectedSignature}`,
      });
    }

    const audioFile = req.files?.audio[0];
    const imageFile = req.files?.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      public_id: `${name}`,
      resource_type: "video",
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      public_id: `${name}`,
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = new songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song add successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ sucess: true, songs: allSongs });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { addSong, listSong, removeSong };
