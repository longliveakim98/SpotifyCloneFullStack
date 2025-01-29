import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const getAudioDetails = async (publicId) => {
  const cloudName = "dvnmyljfl"; // Your Cloudinary cloud name
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video/${publicId}`;

  const auth = {
    username: apiKey,
    password: apiSecret,
  };

  try {
    const response = await axios.get(url, { auth });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching audio details:", error);
  }
};

const addSong = async (req, res) => {
  try {
    const { name, desc, album, image, audio } = req.body;

    const audioDetail = getAudioDetails(name);

    const duration = `${Math.floor(audioDetail.duration / 60)}:${Math.floor(
      audioDetail.duration % 60
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
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { addSong, listSong, removeSong };
