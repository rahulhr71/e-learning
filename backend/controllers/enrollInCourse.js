const Enrollment = require("../model/Enrollment");

// ✅ Enroll a user into a course
const enrollInCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    // check if already enrolled
    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all enrolled courses of a user
const getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const courses = await Enrollment.find({ userId })
    .populate("courseId") 
    .populate("userId", "email"); 

    res.json({
      count: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { enrollInCourse, getEnrolledCourses };
