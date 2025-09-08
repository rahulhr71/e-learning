import { useEffect, useState } from "react";
import api from "../utility/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
  });

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes/getnotes");
        if (res.status === 200) {
          setNotes(res.data);
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching notes");
      }
    };
    fetchNotes();
  }, []);

  // Add note
  const handleAdd = async () => {
    if (!newNote.title || !newNote.description || !newNote.image || !newNote.url) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await api.post("/notes/addnotes", newNote);
      if (res.status === 201) {
        setNotes([res.data, ...notes]); // backend returns newNote directly
        setNewNote({ title: "", description: "", image: "", url: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Error adding note");
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/notes/deletenote/${id}`);
      if (res.status === 200) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting note");
    }
  };

  // Start editing
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(notes[index]);
  };

  // Save edited note
  const handleSave = async (id) => {
    try {
      const res = await api.put(`/notes/updatenote/${id}`, editData);
      if (res.status === 200) {
        const updated = [...notes];
        updated[editingIndex] = res.data; // backend returns updatedNote
        setNotes(updated);
        setEditingIndex(null);
        setEditData({ title: "", description: "", image: "", url: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Error updating note");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Add Note */}
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
            placeholder="PDF URL"
            value={newNote.image}
            onChange={(e) => setNewNote({ ...newNote, image: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={newNote.url}
            onChange={(e) => setNewNote({ ...newNote, url: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
          <textarea
            placeholder="Description"
            value={newNote.description}
            onChange={(e) =>
              setNewNote({ ...newNote, description: e.target.value })
            }
            className="border p-2 rounded col-span-2"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div key={note._id || index} className="bg-white p-4 rounded-lg shadow flex flex-col">
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="text"
                  value={editData.image}
                  onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="text"
                  value={editData.url}
                  onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                  className="border p-1 w-full mb-2"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="border p-1 w-full mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(note._id)}
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
                {note.image && (
                  <img
                    src={note.image}
                    alt={note.title}
                    className="h-32 w-full object-cover rounded mb-2"
                  />
                )}
                <a
                  href={note.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  📄 {note.title}
                </a>
                <p className="text-gray-600 text-sm mt-2">{note.description}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
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
