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
  const timestamp = Math.round(new Date().getTime() / 1000); // Current time in seconds

  // Parameters to sign
  const params = {
    timestamp: timestamp,
    public_id: req.query.name, // Pass the song name as the public_id
  };

  // Generate the signature
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );

  // Send the signature and timestamp to the frontend
  res.json({ signature, timestamp });
};

export { connectCloudinary, getCloudinarySignature };
