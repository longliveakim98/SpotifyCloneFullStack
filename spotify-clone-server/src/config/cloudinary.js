import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true,
  });
};

const getCloudinarySignature = (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_SECRET_KEY
  );

  res.json({
    signature,
    timestamp, // Send this timestamp back to the frontend
  });
};

export { connectCloudinary, getCloudinarySignature };
