// components/Users.jsx
import React, { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([
    { name: "John Doe", email: "john@example.com", role: "Student" },
    { name: "Priya Sharma", email: "priya@example.com", role: "Teacher" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Student" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", role: "Student" });


  const handleAdd = () => {
    if (!newUser.name || !newUser.email) {
      alert("Name and Email are required!");
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", role: "Student" });
  };


  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(users[index]);
  };


  const handleSave = () => {
    const updated = [...users];
    updated[editingIndex] = editData;
    setUsers(updated);
    setEditingIndex(null);
    setEditData({ name: "", email: "", role: "Student" });
  };

  return (
    <div className="p-6">

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-3">Add New User</h2>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="border p-1 w-full mb-2"                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="border p-1 w-full mb-2"
                />
                <select
                  value={editData.role}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                  className="border p-1 w-full mb-2"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-3 py-1 rounded"
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
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm font-medium">Role: {user.role}</p>
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
}
