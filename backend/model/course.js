const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Art & Design",
      "Development",
      "Communication",
      "VideoGrapgy",
      "Photography",
      "Marketing",
      "Content Writing",
      "Finance",
      "Science",
      "Network"
    ],
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  weeks: {
    type: Number,
    required: true,
  },
  students: {
    type: Number,
    default: 0,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  lessons: {
    type: Number,
    required: true,
  },
}, { timestamps: true });
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;