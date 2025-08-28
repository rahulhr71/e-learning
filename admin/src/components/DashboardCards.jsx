// components/DashboardCards.jsx
import React from "react";
import Footer from "./Footer";
export default function Dashboard() {
  const users=100;
  const courses=20;
  const revenue=100;
  return (
    <>
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="text-3xl">👥</div>
        <h3 className="text-lg font-semibold mt-2">Users</h3>
        <p className="text-xl font-bold">{users}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="text-3xl">📚</div>
        <h3 className="text-lg font-semibold mt-2">Courses</h3>
        <p className="text-xl font-bold">{courses}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="text-3xl">💰</div>
        <h3 className="text-lg font-semibold mt-2">Revenue</h3>
        <p className="text-xl font-bold">${revenue}</p>
      </div>
     
    </div>
     <Footer/>
    </>
  );
}
