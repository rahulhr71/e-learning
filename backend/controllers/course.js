const Course = require('../model/course')
const { courseValidation } = require('../Services/validatins')
const addCourse = async (req, res) => {
    try {
        const { value, error } = courseValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const course = new Course(value);
        await course.save();

        res.status(201).json({
            message: "Course created successfully",
            course: course,
        });
    }
    catch (e) {
        res.status(300).json({ message: e.message })
    }
}
const searchCourse = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ message: "Search query is required" });
        }


        const filter = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { teacher: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ]
        };

        const data = await Course.find(filter);

        res.status(200).json({ data });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getCourse = async (req, res) => {
    try {
               const data = await Course.find({})
        res.status(200).json({ data });
    }
    catch (e) {
        res.status(300).json({ message: e.message })
    }
}
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" })
        }
        res.status(200).json({ message: "Course updated successfully", data: updatedCourse })
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCourse = await Course.findByIdAndDelete(id)
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" })
        }
        res.status(200).json({ message: "Course deleted successfully" })
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
const getCategoriesWithCount = async (req, res) => {
  try {

    const masterCategories = [
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
    ];


    const counts = await Course.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1
        }
      }
    ]);


    const countsMap = {};
    counts.forEach(c => {
      countsMap[c.category] = c.count;
    });

 
    const data = masterCategories.map(cat => ({
      category: cat,
      count: countsMap[cat] || 0
    }));

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};



module.exports = { addCourse, getCourse, updateCourse, deleteCourse ,searchCourse,getCategoriesWithCount};