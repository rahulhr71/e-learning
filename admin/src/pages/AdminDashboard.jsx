import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import Courses from "../components/Courses";
import Notes from "../components/Notes";
import Users from "../components/Users";
import Analytics from "../components/Analytics";
import Settings from "../components/Settings";
import AddCourse from "../components/AddCourse";

export default function AdminDashboard() {
  const [active, setActive] = useState("Home");
  return (
  <div className="flex h-screen bg-gray-100">
 
  <Sidebar active={active} setActive={setActive} />


  <main className="flex-1 w-full flex flex-col overflow-hidden">
  
    <div className="flex justify-end bg-white z-30 w-full p-3 sticky top-0">
      <button
        className="bg-[#204cdc] border-primary border rounded-full inline-flex items-center justify-center py-2 px-6 text-base font-medium text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 active:bg-[#1B44C8] active:border-[#1B44C8]"
      >
        Logout
      </button>
    </div>

    
    <div className="flex-1 overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{active}</h1>
      {active === "Home" && <DashboardCards />}
      {active === "All Courses" && <Courses />}
      {active === "Add Course" && <AddCourse />}
      {active === "All Notes" && <Notes />}
      {active === "Users" && <Users />}
      {active === "Analytics" && <Analytics />}
      {active === "Settings" && <Settings />}
    </div>
  </main>
</div>

  );
}
