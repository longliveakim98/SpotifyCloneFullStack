import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute";
import connectDB from "./src/config/mongodb";
import connectCloudinary from "./src/config/cloudinary";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json()); //any request that comes in will be converted/ parsed into json
app.use(cors()); // allow frontend to make requests to backend, if frontend runs on different port number than backend server then we need to use cors

//initializing routes
app.use("/api/song", songRouter);
app.get("/", (req, res) => res.send("API WORKING"));

app.listen(port, () => console.log(`Server started on ${port}`));
