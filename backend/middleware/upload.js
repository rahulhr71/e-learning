const { v2: cloudinary } = require("cloudinary");
const Video = require("../model/CourseVideo");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadVideo = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    // Upload video securely (authenticated + HLS ready)
    const result = await cloudinary.uploader.upload_large(req.file.path, {
      resource_type: "video",
      type: "authenticated",  // 🔒 secure
      chunk_size: 20 * 1024 * 1024,
      folder: "course_videos",
    });

    const video = new Video({
      title,
      courseId,
      public_id: result.public_id, // store Cloudinary public_id
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
