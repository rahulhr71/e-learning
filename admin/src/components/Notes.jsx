// components/Notes.jsx
import React, { useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([
    { title: "JavaScript Notes", link: "https://drive.google.com" },
    { title: "React Notes", link: "https://drive.google.com" },
  ]);

  const [newNote, setNewNote] = useState({ title: "", link: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ title: "", link: "" });

  // ✅ Add Note
  const handleAdd = () => {
    if (!newNote.title || !newNote.link) {
      alert("Both Title and Link are required!");
      return;
    }
    setNotes([...notes, newNote]);
    setNewNote({ title: "", link: "" });
  };

  // ✅ Delete Note
  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // ✅ Edit Note
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(notes[index]);
  };

  // ✅ Save Edited Note
  const handleSave = () => {
    const updated = [...notes];
    updated[editingIndex] = editData;
    setNotes(updated);
    setEditingIndex(null);
    setEditData({ title: "", link: "" });
  };

  return (
    <div className="p-6">
      {/* ✅ Add Note Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-3">Add New Note</h2>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Google Drive Link"
            value={newNote.link}
            onChange={(e) => setNewNote({ ...newNote, link: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* ✅ Notes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="text"
                  value={editData.link}
                  onChange={(e) =>
                    setEditData({ ...editData, link: e.target.value })
                  }
                  className="border p-1 w-full mb-2"
                />
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
                <a
                  href={note.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  📄 {note.title}
                </a>
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
