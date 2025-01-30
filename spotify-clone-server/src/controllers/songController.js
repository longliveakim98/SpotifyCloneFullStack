import songModel from "../models/songModel.js";
import { v2 as cloudinary } from "cloudinary";

const addSong = async (req, res) => {
  try {
    const { name, desc, album, image, audio, audioDuration } = req.body;

    const duration = await `${Math.floor(audioDuration / 60)}:${Math.floor(
      audioDuration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image,
      file: audio,
      duration,
    };

    const song = songModel(songData);
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
    const song = await songModel.findById(req.body.id);

    if (!song) {
      return res.json({ success: false, message: "Song not found" });
    }

    // Extract public_id from the Cloudinary URLs
    const getPublicId = (url) => {
      const parts = url.split("/");
      const filename = parts[parts.length - 1].split(".")[0]; // Extracts file name
      return decodeURIComponent(filename); // Decode spaces (%20) into actual spaces
    };

    const imagePublicId = getPublicId(song.image);
    const audioPublicId = getPublicId(song.file);

    // Delete both the image and audio from Cloudinary
    const imageDeleteResponse = await cloudinary.api.delete_resources(
      [imagePublicId],
      {
        type: "upload",
        resource_type: "image",
      }
    );

    const audioDeleteResponse = await cloudinary.api.delete_resources(
      [audioPublicId],
      {
        type: "upload",
        resource_type: "video",
      }
    );

    console.log("Image Delete Response:", imageDeleteResponse.deleted);
    console.log("Audio Delete Response:", audioDeleteResponse.deleted);

    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { addSong, listSong, removeSong };
