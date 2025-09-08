import React, { useState, useEffect } from "react";
import { icons } from "../assets/icons/icon";
import { api } from "../api/api"; // apna axios instance

export default function Categories() {
  const [active, setActive] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping category name -> icon
  const categoryIcons = {
    "Art & Design": icons.icon1,
    "Development": icons.icon2,
    "Communication": icons.icon3,
    "VideoGrapgy": icons.icon4,
    "Photography": icons.icon5,
    "Marketing": icons.icon6,
    "Content Writing": icons.icon7,
    "Finance": icons.icon8,
    "Science": icons.icon9,
    "Network": icons.icon10,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/courses/categories"); // backend API
        if (res.status === 200) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <div className="w-[90%] md:w-[70%] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-bold text-2xl">Top Categories</h2>
            <p className="text-sm text-gray-500">Explore our Popular Categories</p>
          </div>
          <button className="border rounded-3xl py-1 px-5 text-sm hover:bg-[#ff772e] hover:text-white transition">
            All Categories
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(item.category)}
              className="w-full h-40 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer bg-white"
            >
              <img
                src={categoryIcons[item.category] || icons.icon1}
                alt={item.category}
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col justify-center items-center">
                <h1
                  className={`font-bold mt-3 text-center ${
                    item.category === active ? "text-[#ff772e]" : "text-gray-800"
                  }`}
                >
                  {item.category}
                </h1>
                <p className="text-xs text-gray-500">
                  {item.count} {item.count === 1 ? "Course" : "Courses"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
