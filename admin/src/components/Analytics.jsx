// components/Analytics.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", users: 30, courses: 10 },
  { name: "Feb", users: 50, courses: 20 },
  { name: "Mar", users: 70, courses: 25 },
];

export default function Analytics() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Platform Growth</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#8884d8" />
        <Bar dataKey="courses" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
