import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

const getCloudinarySignature = (req, res) => {
  const { timestamp } = req.query;

  if (!timestamp) {
    return res.status(400).json({ error: "Timestamp is required" });
  }

  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_SECRET_KEY
  );

  res.json({ signature });
};

export { connectCloudinary, getCloudinarySignature };
