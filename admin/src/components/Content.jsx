import { useState } from "react";
import {
  Home,
BookOpen,
  Users,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react";

const SidebarItems = [
  { text: "Home", icon: <Home /> },
  { text: "Courses", icon: <BookOpen /> },
  { text: "Notes", icon: <FileText /> },
  { text: "Users", icon: <Users /> },
  { text: "Analytics", icon: <BarChart2 /> },
  { text: "Settings", icon: <Settings /> },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-lg border-b border-gray-700">
          Admin Panel
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

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">{active}</h1>

        {active === "Home" && <p>Welcome to Admin Dashboard!</p>}
        {active === "Courses" && <p>Manage all courses here.</p>}
        {active === "Notes" && <p>Upload and manage notes.</p>}
        {active === "Users" && <p>View and manage users.</p>}
        {active === "Analytics" && <p>Charts & reports here.</p>}
        {active === "Settings" && <p>Update system settings.</p>}
      </main>
    </div>
  );
}


