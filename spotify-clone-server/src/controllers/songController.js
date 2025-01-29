import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const { name, desc, album, image, audio, audioDuration } = req.body;

    const duration = await `${Math.floor(audioDuration / 60)}:${Math.floor(
      audioDuration % 60
    )}`;
    console.log(duration);
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
