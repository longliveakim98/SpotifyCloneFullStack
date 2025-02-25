import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import { connectCloudinary } from "./src/config/cloudinary.js";
import connectDB from "./src/config/mongodb.js";
import albumRouter from "./src/routes/albumRoute.js";
import cloudinaryRouter from "./src/routes/cloudinaryRouter.js";
import userRouter from "./src/routes/userRoute.js";
import authRouter from "./src/routes/authRouter.js";

import { searchMusic } from "./src/controllers/Search.js";
import searchRouter from "./src/routes/searchRoute.js";
import artistRouter from "./src/routes/artistRoute.js";
import playlistRoute from "./src/routes/playlistRoute.js";

const app = express();
const port = process.env.PORT || 4000;

//models

//middlewares
app.use(express.json()); //any request that comes in will be converted/ parsed into json
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://spotify-clone-full-stack-alpha.vercel.app",
      "https://spotify-clone-full-stack-mwn2.vercel.app",
      "https://spotify-clone-full-stack-k3rsgvil2-longliveakim98s-projects.vercel.app",
    ], // Allow requests only from your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    allowedHeaders: "*",
  })
); // allow frontend to make requests to backend, if frontend runs on different port number than backend server then we need to use cors

//initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/cloudinary-signature", cloudinaryRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/artist", artistRouter);
app.use("/api/search", searchRouter);
app.use("/api/playlist", playlistRoute);

app.get("/", (req, res) => res.send("API WORKING"));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
  // app config
  connectDB();
  connectCloudinary();
});
