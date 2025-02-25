import express from "express";
import upload from "../middleware/multur.js";
import {
  addPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getPlaylist,
  listPlaylist,
  removePlaylist,
  editPlaylist,
} from "../controllers/playlistController.js";

const playlistRoute = express.Router();

playlistRoute.post("/add", upload.single("image"), addPlaylist);
playlistRoute.get("/list", listPlaylist);
playlistRoute.get("/:id", getPlaylist);
playlistRoute.post("/remove", removePlaylist);
playlistRoute.patch("/add-song", addSongToPlaylist);
playlistRoute.patch("/remove-song", removeSongFromPlaylist);
playlistRoute.patch("/edit", upload.single("image"), editPlaylist);

//   albumRouter.get("/by-user/:id", getAlbumsByArtist);

export default playlistRoute;
