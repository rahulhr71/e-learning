
const Video = require("../model/CourseVideo");
exports.uploadVideo = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const video = new Video({
      title,
      url: req.file.path, 
      courseId,
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getVideosByCourse = async (req, res) => {
  try {
    console.log(req.params.id);
    
    const  courseId  = req.params.id;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }
    const videos = await Video.find({ courseId });
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

