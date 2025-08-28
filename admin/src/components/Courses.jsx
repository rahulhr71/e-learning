// components/Courses.jsx
import React,{useState} from "react";

export default function Courses() {
  return (
   <div>
    <CourseList/>
   </div>
  );
}

const CourseList = () => {
  const [courses, setCourses] = useState([
    {
      name: "Commercial Architecture",
      category: "Commercial",
      teacher: "John Doe",
      weeks: 4,
      students: 120,
      basePrice: 299,
      discountPrice: 150,
      thumbnail: "https://via.placeholder.com/150",
      lessons: 18,
    },
    {
      name: "Office Interior Design",
      category: "Office",
      teacher: "Kenny White",
      weeks: 3,
      students: 90,
      basePrice: 249,
      discountPrice: 129,
      thumbnail: "https://via.placeholder.com/150",
      lessons: 14,
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [newCourse, setNewCourse] = useState({
    name: "",
    category: "",
    teacher: "",
    weeks: "",
    students: "",
    basePrice: "",
    discountPrice: "",
    thumbnail: "",
    lessons: "",
  });

  // ✅ Delete course
  const handleDelete = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // ✅ Edit course
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(courses[index]);
  };

  // ✅ Save edited course
  const handleSave = () => {
    const updated = [...courses];
    updated[editingIndex] = editData;
    setCourses(updated);
    setEditingIndex(null);
    setEditData({});
  };

  // ✅ Add new course
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.teacher) {
      alert("Course name & teacher are required!");
      return;
    }
    setCourses([...courses, newCourse]);
    setNewCourse({
      name: "",
      category: "",
      teacher: "",
      weeks: "",
      students: "",
      basePrice: "",
      discountPrice: "",
      thumbnail: "",
      lessons: "",
    });
  };

  return (
    <div className="p-6">
      {/* ✅ Add Course Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-3">Add New Course</h2>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newCourse.category}
            onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Teacher"
            value={newCourse.teacher}
            onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Weeks"
            value={newCourse.weeks}
            onChange={(e) => setNewCourse({ ...newCourse, weeks: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Students"
            value={newCourse.students}
            onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Base Price"
            value={newCourse.basePrice}
            onChange={(e) => setNewCourse({ ...newCourse, basePrice: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Discount Price"
            value={newCourse.discountPrice}
            onChange={(e) => setNewCourse({ ...newCourse, discountPrice: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={newCourse.thumbnail}
            onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Lessons"
            value={newCourse.lessons}
            onChange={(e) => setNewCourse({ ...newCourse, lessons: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddCourse}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </div>

      {/* ✅ Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
          >
            <img
              src={course.thumbnail || "https://via.placeholder.com/150"}
              alt={course.name}
              className="w-40 h-28 object-cover rounded-md"
            />

            {editingIndex === index ? (
              <div className="w-full mt-3">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="text"
                  value={editData.teacher}
                  onChange={(e) =>
                    setEditData({ ...editData, teacher: e.target.value })
                  }
                  className="border p-1 w-full mb-2"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mt-2">{course.name}</h2>
                <p className="text-sm text-gray-600">{course.teacher}</p>
                <p className="text-sm">Lessons: {course.lessons}</p>
                <p className="text-sm">
                  Price:{" "}
                  <span className="line-through">${course.basePrice}</span>{" "}
                  <span className="text-green-600">${course.discountPrice}</span>
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};