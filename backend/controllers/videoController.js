
const Video = require("../model/CourseVideo");
exports.uploadVideo = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const video = new Video({
      title,
      url: req.file.path, // Cloudinary se jo URL aata hai
      courseId,
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
