import { getArtist, getArtists } from "../controllers/artistController.js";
import express from "express";

const artistRouter = express.Router();

artistRouter.get("/list", getArtists);
artistRouter.get("/detail/:id", getArtist);

export default artistRouter;
