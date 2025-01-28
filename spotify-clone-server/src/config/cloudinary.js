import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

const getCloudinarySignature = async (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp

  // Prepare the params that will be signed
  const params = {
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
  };

  // Generate the signature using Cloudinary's utils method
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_SECRET_KEY
  );

  res.json({
    signature,
    timestamp,
  });
};

export { connectCloudinary, getCloudinarySignature };
