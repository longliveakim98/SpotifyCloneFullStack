import { v2 as cloudinary } from "cloudinary";
import Playlist from "../models/playlistModel.js";
import User from "../models/userModel.js";
import Song from "../models/songModel.js";

const addPlaylist = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId, "playlists");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const userPlaylist = await Playlist.find({ owner: userId }, "_id");

    const name = `My Playlist #${userPlaylist.length + 1}`;

    // let imageUrl = null;
    // // if (req.file) {
    // //   const imageUpload = await cloudinary.uploader.upload(req.file.path, {
    // //     resource_type: "image",
    // //   });
    // //   imageUrl = imageUpload.secure_url;
    // // }

    const playlistData = {
      name,
      owner: userId,
    };

    const playlist = Playlist(playlistData);
    const playlistRes = await playlist.save();

    console.log(playlistRes);
    res.json({
      success: true,
      message: "Playlist added successfully",
      playlistRes,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const listPlaylist = async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const allPlaylists = await Playlist.find({ owner: user }).populate(
      "owner",
      "name image"
    );

    res.json({ success: true, playlists: allPlaylists });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ success: false, message: "Playlist ID is required" });
    }

    const playlist = await Playlist.findById(id)
      .populate({
        path: "songs",
        populate: {
          path: "artist", // Assuming "artist" is the field inside "songs"
          select: "name", // Select only necessary fields for artist
        },
      })
      .populate("owner", "name image"); // Populate the owner with selected fields

    if (!playlist) {
      return res.json({ success: false, message: "Playlist not found" });
    }

    res.json({ success: true, playlist });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const removePlaylist = async (req, res) => {
  try {
    const { id } = req.body;
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.json({ success: false, message: "Playlist not found" });
    }

    if (playlist.image) {
      const getPublicId = (url) => url.split("/").pop().split(".")[0];
      const imagePublicId = getPublicId(playlist.image);

      await cloudinary.uploader.destroy(imagePublicId, {
        type: "upload",
        resource_type: "image",
      });
    }

    await Playlist.findByIdAndDelete(id);

    res.json({ success: true, message: "Playlist removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const { songId, playlistId } = req.body;

    if (!songId || !playlistId) {
      return res.json({
        success: false,
        message: "Song ID and Playlist ID are required",
      });
    }
    const song = await Song.findById(songId).populate("artist");
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.json({ success: false, message: "Playlist not found" });
    }

    // Check if the song already exists in the playlist
    if (playlist.songs.includes(songId)) {
      return res.json({ success: false, message: "Song already in playlist" });
    }

    // if (!playlist.image && playlist.songs.length === 0) {
    //   playlist.image = song.image;
    // }

    // Add the song to the playlist
    playlist.songs.push(songId);
    await playlist.save();

    res.json({ success: true, message: "Song added to playlist", song });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId, playlistId } = req.body;

    if (!songId || !playlistId) {
      return res.status(400).json({
        success: false,
        message: "Song ID and Playlist ID are required",
      });
    }

    // Find playlist and remove song
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { songs: songId } }, // Removes the song ID from the songs array
      { new: true }
    );

    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    }

    res.json({
      success: true,
      message: "Song removed from playlist",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const editPlaylist = async (req, res) => {
  try {
    const { id, name, desc, oldImage } = req.body;
    const image = req.file;
    console.log(image);
    const playlist = await Playlist.findById(id)
      .populate({
        path: "songs",
        populate: {
          path: "artist",
          select: "name",
        },
      })
      .populate("owner", "name image");

    if (!playlist) {
      return res.json({ success: false, message: "Playlist not found" });
    }

    if (image) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      playlist.image = imageUpload.secure_url;
    }
    if (name) {
      playlist.name = name;
    }
    if (desc) {
      playlist.desc = desc;
    }
    await playlist.save();

    const getPublicId = (url) => {
      const parts = url.split("/");
      const filename = parts[parts.length - 1].split(".")[0]; // Extracts file name
      return decodeURIComponent(filename); // Decode spaces (%20) into actual spaces
    };

    const imagePublicId = getPublicId(oldImage);

    // Delete the album image from Cloudinary
    const imageDeleteResponse = await cloudinary.uploader.destroy(
      imagePublicId,
      {
        type: "upload",
        resource_type: "image",
      }
    );
    console.log("Playlist Image Delete Response:", imageDeleteResponse);
    console.log(playlist.image, playlist.name, playlist.desc);
    res.json({
      success: true,
      message: "Playlist updated successfully",
      playlist,
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  removeSongFromPlaylist,
  addPlaylist,
  listPlaylist,
  getPlaylist,
  removePlaylist,
  addSongToPlaylist,
  editPlaylist,
};
