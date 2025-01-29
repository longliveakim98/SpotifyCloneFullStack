import express from "express";
import { getCloudinarySignature } from "../config/cloudinary.js";

const cloudinaryRouter = express.Router();

cloudinaryRouter.post("/", getCloudinarySignature);

export default cloudinaryRouter;
