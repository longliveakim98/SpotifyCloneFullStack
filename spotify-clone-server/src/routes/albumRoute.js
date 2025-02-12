import {
  addAlbum,
  listAlbum,
  removeAlbum,
  getAlbumsByArtist,
} from "../controllers/albumController.js";
import express from "express";
import upload from "../middleware/multur.js";

const albumRouter = express.Router();

albumRouter.post("/add", upload.single("image"), addAlbum);
albumRouter.get("/list", listAlbum);
albumRouter.post("/remove", removeAlbum);
albumRouter.get("/by-artist", getAlbumsByArtist);

export default albumRouter;
