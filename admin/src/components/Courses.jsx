import React, { useState, useEffect } from "react";
import api from "../utility/api";

export default function Courses() {
  return (
    <div>
      <CourseList />
    </div>
  );
}

const CourseList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get("/courses/getcourse");
        if (response.status === 200) {
          setData(response.data.data);
          setLoading(false);
        }
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

 
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...data[index] });
  };


  const handleSave = async () => {
    try {
      const updated = [...data];
      updated[editingIndex] = editData;
      setData(updated);

      await api.put(`/courses/update/${editData._id}`, editData); // assumes backend route
      setEditingIndex(null);
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

 
  const handleDelete = async (index) => {
    try {
      const courseToDelete = data[index];
      await api.delete(`/courses/delete/${courseToDelete._id}`); 
      setData(data.filter((_, i) => i !== index));
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  return (
    <div>
      
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

       
        {data.map((course, index) => (
          <div
            key={course._id || index}
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
                  <span className="text-green-600">
                    ${course.discountPrice}
                  </span>
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
