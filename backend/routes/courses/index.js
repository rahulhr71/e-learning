const router = require("express").Router();
const { enrollInCourse, getEnrolledCourses } = require("../../controllers/enrollInCourse");
const { addCourse, getCourse, updateCourse, deleteCourse, searchCourse, getCategoriesWithCount } = require("../../controllers/course");

// Course routes
router.get("/getcourse", getCourse);
router.post("/addcourse", addCourse);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);
router.get("/search", searchCourse);
router.get("/categories", getCategoriesWithCount);

// Enrollment routes
router.post("/enroll", enrollInCourse);
router.get("/my-courses/:userId", getEnrolledCourses);

module.exports = router;
