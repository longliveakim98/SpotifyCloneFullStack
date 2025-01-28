import express from "express";
import { getCloudinarySignature } from "../config/cloudinary.js";

const cloudinaryRouter = express.Router();

cloudinaryRouter.get("/", getCloudinarySignature);

export default cloudinaryRouter;
