import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

const getCloudinarySignature = async (req, res) => {
  try {
    const res = await axios.get(`${url}/api/cloudinary-signature`);
    return { signature: res.data.signature, timestamp: res.data.timestamp };
  } catch (error) {
    console.error("Error getting Cloudinary signature", error);
    throw error;
  }
};

export { connectCloudinary, getCloudinarySignature };
