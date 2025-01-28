import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import { connectCloudinary } from "./src/config/cloudinary.js";
import connectDB from "./src/config/mongodb.js";
import albumRouter from "./src/routes/albumRoute.js";
import cloudinaryRouter from "./src/routes/cloudinaryRouter.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//models

//middlewares
app.use(express.json()); //any request that comes in will be converted/ parsed into json
app.use(cors()); // allow frontend to make requests to backend, if frontend runs on different port number than backend server then we need to use cors

//initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/cloudinary-signature", cloudinaryRouter);
app.get("/", (req, res) => res.send("API WORKING"));

app.listen(port, () => console.log(`Server started on ${port}`));
