import Song from "../models/songModel.js";
import { v2 as cloudinary } from "cloudinary";
import Album from "../models/albumModel.js";
import User from "../models/userModel.js";

const checkAlbumExists = async (albumId) => {
  const albumExists = await Album.exists({ _id: albumId });
  return !!albumExists; // Returns true if exists, false otherwise
};

const checkArtistExists = async (artistId) => {
  const artistExists = await User.exists({ _id: artistId });
  return !!artistExists; // Returns true if exists, false otherwise
};

const addSong = async (req, res) => {
  try {
    const { name, desc, artist, album, image, audio, audioDuration } = req.body;

    let checkAlbum = false;
    if (album) {
      checkAlbum = await checkAlbumExists(album);
    }
    const checkArtist = await checkArtistExists(artist);

    if (!checkAlbum && album) {
      return res.json({ success: false, message: "Album not found" });
    }

    if (!checkArtist) {
      return res.json({ success: false, message: "Artist not found" });
    }

    const duration = await `${Math.floor(audioDuration / 60)}:${Math.floor(
      audioDuration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      artist,
      image,
      file: audio,
      duration,
    };

    const song = Song(songData);
    await song.save();

    res.json({ success: true, message: "Song add successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await Song.find({}).populate({
      path: "album",
      select: "name artist",
      populate: { path: "artist", select: "name" }, // Fetch artist name
    });

    const formattedSongs = allSongs.map(
      ({
        _id,
        name,
        desc,
        artist,
        album,
        file,
        image,
        isPublic,
        likesCount,
        duration,
        createdAt,
        playCount,
      }) => ({
        _id,
        name,
        desc,
        artistId: album?.artist?._id,
        artist: album?.artist?.name || artist, // Handle missing artist
        album: album?.name,
        albumId: album?._id,
        file,
        image,
        isPublic,
        likesCount,
        duration,
        createdAt,
        playCount,
      })
    );

    res.json({ sucess: true, songs: formattedSongs });
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
    const imageDeleteResponse = await cloudinary.uploader.destroy(
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

    await Song.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const updatePlayCount = async (req, res) => {
  try {
    const { id } = req.params; // Get song ID from request params

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { $inc: { playCount: 1 } }, // Increment playCount by 1
      { new: true } // Return the updated document
    );

    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: "Failed to update play count" });
  }
};

export { addSong, listSong, removeSong, updatePlayCount };
