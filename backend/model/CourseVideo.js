const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const lessonSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  children: [chapterSchema],
});

const courseVideoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessons: [lessonSchema],
}, { timestamps: true });

module.exports = mongoose.model("CourseVideo", courseVideoSchema);
