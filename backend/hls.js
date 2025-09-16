
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB error:", err));

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
  public_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);

function encodeOverlayText(text = "") {
  return encodeURIComponent(text).replace(/%20/g, "+");
}
app.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!courseId || !title) return res.status(400).json({ message: "courseId and title required" });
    if (!req.file) return res.status(400).json({ message: "video file required" });

    const localPath = req.file.path;

    const result = await cloudinary.uploader.upload_large(localPath, {
      resource_type: "video",
      type: "authenticated",
      chunk_size: 20 * 1024 * 1024,
      folder: "course_videos",
    });

    try { fs.unlinkSync(localPath); } catch (e) {}

    const video = new Video({
      title,
      courseId,
      public_id: result.public_id,
    });
    await video.save();

    res.status(201).json({ message: "Uploaded", video });
  } catch (error) {
    console.error("upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/get-videos/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userEmail, userId } = req.body;
    if (!courseId) return res.status(400).json({ message: "Course ID required" });

    const videos = await Video.find({ courseId }).lean();
    const secureVideos = videos.map((v) => {
      const watermarkText = userEmail ? userEmail : userId ? `User:${userId}` : "Protected";
      const encodedText = encodeOverlayText(watermarkText);

      // Use string transformations so overlay is embedded into HLS stream
      const transformation = [
        
        { streaming_profile: "hd" },
        // overlay text: font Arial size 28, bottom-right y-offset 30, semi-transparent
        { overlay: { font_family: "Arial", font_size: 28, text: watermarkText }, gravity: "south_east", y: 30, opacity: 60 },
        { format: "m3u8" },
      ];

      const secureUrl = cloudinary.url(v.public_id, {
        resource_type: "video",
        type: "authenticated",
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
        transformation: transformation,
      });

      return { _id: v._id, title: v.title, url: secureUrl, public_id: v.public_id };
    });

    res.status(200).json({ videos: secureVideos });
  } catch (error) {
    console.error("get videos error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/delete/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId, { resource_type: "video", type: "authenticated" });
    await Video.deleteOne({ public_id: publicId });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/", (req, res) => res.send("HLS server running"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
