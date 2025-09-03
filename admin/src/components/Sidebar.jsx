// components/Sidebar.jsx
import React from "react";
import {
  Home,
  BookOpen,
  Users,
  FileText,
  BarChart2,
  Settings,PlusCircle,FilePlus
} from "lucide-react";

const SidebarItems = [
  { text: "Home", icon: <Home size={20} /> },
  { text: "All Courses", icon: <BookOpen size={20} /> },
  { text: "Add Course", icon: <PlusCircle size={20} /> }, // ✅ New
  { text: "All Notes", icon: <FileText size={20} /> },
  { text: "Add Notes", icon: <FilePlus size={20} /> },    // ✅ New
  { text: "Users", icon: <Users size={20} /> },
  { text: "Analytics", icon: <BarChart2 size={20} /> },
  { text: "Settings", icon: <Settings size={20} /> },
];


export default function Sidebar({ active, setActive }) {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        E-Learning Admin
      </div>
      <nav className="flex-1">
        {SidebarItems.map((item) => (
          <button
            key={item.text}
            onClick={() => setActive(item.text)}
            className={`flex items-center gap-3 w-full p-3 text-left hover:bg-gray-700 transition ${
              active === item.text ? "bg-gray-700" : ""
            }`}
          >
            {item.icon}
            {item.text}
          </button>
        ))}
      </nav>
    </aside>
  );
}
