import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connection to MongoDb established");
  });
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
