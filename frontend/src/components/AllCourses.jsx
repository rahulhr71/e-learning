import { useEffect, useState } from 'react'
import { icons } from '../assets/icons/icon'
import { thumbnail } from '../assets/thumbnails/thumbnail'
import { Link } from 'react-router-dom'
import { api } from '../api/api'
import { useCourse } from '../context/courseContext'
import { CheckCircle } from "lucide-react";
export default function AllCourses() {
  const { courses, loading, error, enrolledCourses, setEnrolledCourses, user } = useCourse();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.id) return;
      try {
        const res = await api.get(`/courses/my-courses/${user.id}`);
        console.log(user.id);
        setEnrolledCourses(res.data.courses);
        console.log(res.data.courses);


      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
      }
    };
    fetchEnrolledCourses();
  }, [user, setEnrolledCourses]);
  const [categories, setCategories] = useState([
    { name: 'Art & Design', selected: false },
    { name: 'Development', selected: false },
    { name: 'Communication', selected: false },
    { name: 'VideoGrapgy', selected: false },
    { name: 'Photography', selected: false },
    { name: 'Marketing', selected: false },
    { name: 'Content Writing', selected: false },
    { name: 'Finance', selected: false },
    { name: 'Science', selected: false },
    { name: 'Network', selected: false },
  ])
  // useEffect(()=>{
  //    const getCourses = async()=>{
  //     try {
  //       const {data} = await fetchCourses();
  //       setCourses(data.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //    }
  //     getCourses()
  // },[])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleCheck = (checked, name) => {
    const updated = categories.map(cat =>
      cat.name === name ? { ...cat, selected: checked } : cat
    )
    setCategories(updated)
    setCurrentPage(1)
  }

  const selectedCategories = categories
    .filter(cat => cat.selected)
    .map(cat => cat.name.toLowerCase())

  const filteredCourses =
    selectedCategories.length > 0
      ? courses.filter(course =>
        selectedCategories.includes(course.category.toLowerCase())
      )
      : courses

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  )
 const handleStart = async() => {
    try{
      if (!user) {
        alert("Please log in to start the course.");
        return;
      }
      const response = await api.post('courses/enroll', { userId: user.id, courseId: id });
      if (response.status === 201) {
        alert("Enrolled successfully!");
        setEnrolledCourses([...enrolledCourses, { _id: id }]);
      } else {
        alert("You are already enrolled in this course.");
      } 

    }catch(err){
      console.error(err);
    }
    

  }
  return (
    <div className="flex flex-col md:flex-row mt-23 mx-auto my-4 w-[95%] md:w-[80%] gap-5">
      {/* Courses List */}
      <div className="w-full md:w-[65%]">
        <div className="flex flex-col gap-6">
          {paginatedCourses.map((item, index) => {
            const isEnrolled = enrolledCourses.some(
              (c) => (c.courseId?._id || c._id) === item._id
            );
            return (
              <Link
                to={`/courses/${item._id}`}
                key={index}
                className="no-underline text-black"
              >
                <div className="flex flex-col sm:flex-row gap-4 bg-[#F5F5F5] shadow-lg rounded-xl p-3 h-auto sm:h-[180px]">
                  {/* Thumbnail */}
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-md"
                  />

                  {/* Course Info */}
                  <div className="flex flex-col justify-between flex-1">
                    <div className="flex flex-col gap-2">
                      <div className="font-Exo text-sm sm:text-base">
                        <span className="font-Jost text-[#555555] text-sm">
                          by
                        </span>{' '}
                        {item.teacher}
                      </div>
                      <div className="font-Exo font-semibold text-lg sm:text-xl">
                        {item.name}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                        <p className="flex items-center gap-1">
                          <img src={icons.icon12} alt="" /> {item.weeks} weeks
                        </p>
                        <p className="flex items-center gap-1">
                          <img src={icons.icon11} alt="" /> {item.students} students
                        </p>
                        <p className="flex items-center gap-1">
                          <img src={icons.icon7} alt="" width={13} /> {item.lessons} lessons
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2 text-sm sm:text-base">
                      <div className="flex gap-2 items-center font-bold">
                        <span className="text-gray-500 line-through">
                          ₹{item.basePrice}
                        </span>
                        ₹{item.discountPrice}
                      </div>
                      {isEnrolled && (
                        <div className=" bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Enrolled
                        </div>
                      ) || <button className='bg-amber-500 py-1 px-4 cursor-pointer hover:bg-amber-600 rounded-2xl text-white font-medium' onClick={handleStart}>Enroll Now</button>}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center sm:justify-between items-center mt-5 bg-[#F5F5F5] shadow-2xl w-full py-3 gap-3 rounded-3xl text-sm sm:text-base">
          <button
            className={`mx-2 cursor-pointer font-medium ${currentPage > 1 ? 'text-black' : 'text-gray-400'
              } hover:text-amber-600`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Previous
          </button>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded ${currentPage === num
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 border'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className={`mx-2 cursor-pointer font-medium ${currentPage < totalPages ? 'text-black' : 'text-gray-400'
              } hover:text-amber-600`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-[35%]">
        <h1 className="font-semibold mb-2">Course Category</h1>
        <div className="flex flex-col gap-2 mx-2">
          {categories.map((cat, index) => (
            <label key={index} className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  className="accent-black cursor-pointer mr-2"
                  checked={cat.selected}
                  onChange={e => handleCheck(e.target.checked, cat.name)}
                />
                <span className="text-sm">{cat.name}</span>
              </div>
              <p className="text-xs text-gray-500">
                {
                  courses.filter(
                    course =>
                      course.category.toLowerCase() === cat.name.toLowerCase()
                  ).length
                }
              </p>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
