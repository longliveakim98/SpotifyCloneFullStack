import express from "express";
import { searchArtist, searchMusic } from "../controllers/Search.js";

const searchRouter = express.Router();

searchRouter.get("/all", searchMusic);
searchRouter.get("/artist", searchArtist);

export default searchRouter;
