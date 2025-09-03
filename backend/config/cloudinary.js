const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

// 🔹 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 🔹 Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course_videos",       // Cloudinary folder
    resource_type: "video",        // Important: must allow video
    allowed_formats: ["mp4", "mov", "avi", "mkv"], // Allowed formats
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
