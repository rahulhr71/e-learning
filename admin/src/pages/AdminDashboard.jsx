import  { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import Courses from "../components/Courses";
import Notes from "../components/Notes";
import Users from "../components/Users";
import Analytics from "../components/Analytics";
import Settings from "../components/Settings";

export default function AdminDashboard() {
  const [active, setActive] = useState("Home");
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active={active} setActive={setActive} />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-end"> <button className='bg-[#204cdc] border-primary border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
      Logout
    </button></div>
        <h1 className="text-2xl font-semibold mb-4">{active}</h1>
        {active === "Home" && <DashboardCards />}
        {active === "Courses" && <Courses />}
        {active === "Notes" && <Notes />}
        {active === "Users" && <Users />}
        {active === "Analytics" && <Analytics />}
        {active === "Settings" && <Settings />}
      </main>
    </div>
  );
}
