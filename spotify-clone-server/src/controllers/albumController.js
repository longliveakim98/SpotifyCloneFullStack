import { v2 as cloudinary } from "cloudinary";
import Album from "../models/albumModel.js";
import User from "../models/userModel.js";

const checkArtistExists = async (artistId) => {
  const artistExists = await User.exists({ _id: artistId });
  return !!artistExists; // Returns true if exists, false otherwise
};

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColour, artist } = req.body;

    const checkArtist = await checkArtistExists(artist);

    if (!checkArtist) {
      return res.json({ success: false, message: "Artist not found" });
    }

    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColour,
      artist,
      image: imageUpload.secure_url,
    };

    const album = Album(albumData);
    await album.save();
    res.json({ success: true, message: "Album added successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await Album.find({}).populate("artist", "name image");
    res.json({ success: true, albums: allAlbums });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.body.id);

    if (!album) {
      return res.json({ success: false, message: "Album not found" });
    }

    // Extract public_id from the Cloudinary URL
    const getPublicId = (url) => {
      const parts = url.split("/");
      const filename = parts[parts.length - 1].split(".")[0]; // Extracts file name
      return decodeURIComponent(filename); // Decode spaces (%20) into actual spaces
    };

    const imagePublicId = getPublicId(album.image);

    // Delete the album image from Cloudinary
    const imageDeleteResponse = await cloudinary.uploader.destroy(
      imagePublicId,
      {
        type: "upload",
        resource_type: "image",
      }
    );

    console.log("Album Image Delete Response:", imageDeleteResponse);

    // Delete the album from the database
    await Album.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Album removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getAlbumsByArtist = async (req, res) => {
  try {
    const { artist } = req.query; // Get artistId from query parameters

    if (!artist) {
      return res
        .status(400)
        .json({ success: false, message: "Artist ID is required" });
    }

    const albums = await Album.find(
      { artist: artist },
      "artist name image"
    ).populate("artist", "name image");

    res.json({ success: true, albums });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addAlbum, listAlbum, removeAlbum, getAlbumsByArtist };
