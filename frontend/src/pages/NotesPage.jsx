import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function NotesPage() {
  const [notes] = useState([
    {
      id: 1,
      title: "Chapter 1 - Computer Basics",
      description: "Handwritten notes on fundamentals",
      image: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID",
    },
    {
      id: 2,
      title: "Chapter 2 - Data Structures",
      description: "Notes on arrays, linked lists",
      image: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID",
    },
    {
      id: 3,
      title: "Chapter 3 - Algorithms",
      description: "Sorting, Searching notes",
      image: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-Exo">

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Handwritten Notes
        </h1>

        {/* Search Box */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden h-40 sm:h-32 md:h-36">
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-sm md:text-base text-gray-800">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 mt-1 text-xs md:text-sm">
                    {note.description}
                  </p>
                </div>
                <a
                  href={note.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-600 text-sm hover:underline self-start"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm md:text-base">
            No notes found.
          </p>
        )}
      </div>
    </div>
    <Footer/>
            </>
  );
}
