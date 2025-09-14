const Note = require("../model/notes");

// GET all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addNotes = async (req, res) => {
  try {
    const { title, description, image, url } = req.body;
    const newNote = new Note({
      title,
      description,
      image,
      url,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, url } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, image, url },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getNotes, addNotes, updateNote, deleteNote };
