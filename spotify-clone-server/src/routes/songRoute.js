import {
  addSong,
  getSongsByAlbum,
  getSongsByArtist,
  listSong,
  removeSong,
  updatePlayCount,
} from "../controllers/songController.js";
import express from "express";
import upload from "../middleware/multur.js";

const songRouter = express.Router();

songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
);
songRouter.get("/list", listSong);
songRouter.get("/get-album-songs", getSongsByAlbum);
songRouter.get("/get-artist-songs", getSongsByArtist);
songRouter.post("/remove", removeSong);
songRouter.put("/play/:id", updatePlayCount);

export default songRouter;
