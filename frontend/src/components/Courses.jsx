import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api"; // ✅ directly api call for search
import { useCourse } from "../context/courseContext";
import { icons } from "../assets/icons/icon";

export default function Courses() {
  const { courses, loading, error } = useCourse(); // context ka base data
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

 

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        if (searchTerm.trim() === "") {
          setFilteredCourses(courses);
          return;
        }
        const res = await api.get(`/courses/search?search=${searchTerm}`);
        setFilteredCourses(res.data.data);
        setCurrentPage(1); // reset to first page
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSearch();
    }, 500); // debounce for better performance

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, courses]);

  // ✅ Pagination
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredCourses]);

  const totalPages = useMemo(
    () => Math.ceil(filteredCourses.length / itemsPerPage),
    [filteredCourses]
  );

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 w-3/4 mx-auto sm:px-6 lg:px-12 py-8">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
            Featured Courses
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Explore our Popular Categories
          </p>
        </div>

      
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-3xl py-1 px-4 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:w-250 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Link key={item._id} to={`/courses/${item._id}`}>
              <div className="flex flex-col h-full rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      By {item.teacher}
                    </p>
                    <h1 className="font-medium text-sm sm:text-base line-clamp-1">
                      {item.name}
                    </h1>

                    <div className="flex overflow-auto gap-3 mt-1 text-xs sm:text-sm">
                      <p className="flex items-center gap-1">
                        <img src={icons.icon12} alt="" className="w-3 h-3" />{" "}
                        {item.weeks} weeks
                      </p>
                      <p className="flex items-center gap-1">
                        <img src={icons.icon11} alt="" className="w-3 h-3" />{" "}
                        {item.students} students
                      </p>
                    </div>
                  </div>

                  {/* Price + View More */}
                  <div className="mt-2">
                    <hr className="text-gray-300" />
                    <div className="flex justify-between items-center px-3 py-2">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 relative text-sm">
                          ${item.basePrice}
                          <span className="absolute w-full h-0.5 bg-gray-400 left-0 top-2"></span>
                        </p>
                        <p className="text-green-600 font-medium text-sm">
                          ${item.discountPrice}
                        </p>
                      </div>
                      <p className="text-sm font-medium hover:text-[#ff772e]">
                        View More
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-6">
            No courses found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 bg-[#F5F5F5] shadow-md w-full py-3 gap-2 rounded-3xl flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-full text-sm border transition-colors duration-200 ${
                currentPage === page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
