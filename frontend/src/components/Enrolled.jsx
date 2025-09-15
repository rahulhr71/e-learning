import { useEffect, useState } from "react";
import {api} from "../api/api";
import { useAuth } from "../context/userContext";
import { BookOpen, Clock, Star, Users, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const MyCourses = () => {
  const { userC } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnrolledCourses = async () => {
    if (!userC) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await api.get(`/courses/my-courses/${userC._id}`);
      console.log(res.data.courses);
      
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load your courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, [userC]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg font-medium animate-pulse">
                Loading your courses...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
                <button 
                  onClick={fetchEnrolledCourses}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50   p-6">
        <Navbar/> <br /> <br /> <br />


      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Enrolled Courses
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Continue your learning journey with your enrolled courses
          </p>
        </div>

        {/* Empty State */}
        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Courses Yet
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
              You haven't enrolled in any course yet. Start learning today and unlock your potential!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Browse Courses
            </button>
          </div>
        ) : (
          /* Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((enrollment) => {
              const course = enrollment?.courseId;
              if(!course)
                return null
              return (
                <div
                  key={enrollment?._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2 group"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course?.thumbnail}
                      alt={course?.name || course?.title || "deleted"}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/400/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white" />
                    </div>
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                      ✓ Enrolled
                    </span>
                    {/* <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
                   {localStorage.getItem("c")}%
                    </div> */}
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    {/* Course Title */}
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {course?.name || course?.title}
                    </h2>

                    {/* Course Description */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {course?.overview || course?.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course?.weeks || '8'} weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course?.students || 0} students</span>
                      </div>
                      {course?.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course?.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Teacher */}
                    {course?.teacher && (
                      <p className="text-sm text-gray-500 mb-4">
                        by <span className="font-medium text-gray-700">{course?.teacher}</span>
                      </p>
                    )}

                    {/* Progress Bar */}
                    {/* <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Course Progress</span>
                        <span>{localStorage.getItem("c")}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${localStorage.getItem("c")}%` }}
                        ></div>
                      </div>
                    </div> */}

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-purple-600">
                          ₹{course?.discountPrice || course?.price}
                        </span>
                        {course?.basePrice && course?.basePrice !== course?.discountPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            ₹{course?.basePrice}
                          </span>
                        )}
                      </div>
                      <Link to={`/view-Course/${course?._id}`}>
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" />
                        Continue
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;   