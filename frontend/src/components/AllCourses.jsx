import { useState } from 'react'
import { icons } from '../assets/icons/icon'
import { thumbnail } from '../assets/thumbnails/thumbnail'
import { Link } from 'react-router-dom'

export default function AllCourses() {
  const Course = [
    { name: "Commercial Architecture", category: "Commercial", teacher: "John Doe", weeks: 4, students: 120, basePrice: 299, discountPrice: 150, thumbnail: thumbnail.i1, lessons: 18 },
    { name: "Office Interior Design", category: "Office", teacher: "Kenny White", weeks: 3, students: 90, basePrice: 249, discountPrice: 129, thumbnail: thumbnail.i2, lessons: 14 },
    { name: "Retail Shop Planning", category: "Shop", teacher: "Mohit", weeks: 5, students: 140, basePrice: 349, discountPrice: 200, thumbnail: thumbnail.i3, lessons: 22 },
    { name: "Smart Classroom Setup", category: "Educate", teacher: "Priya", weeks: 4, students: 110, basePrice: 289, discountPrice: 160, thumbnail: thumbnail.i4, lessons: 16 },
    { name: "Designing for Academies", category: "Academy", teacher: "Karan", weeks: 3, students: 100, basePrice: 259, discountPrice: 145, thumbnail: thumbnail.i5, lessons: 12 },
    { name: "Single Family Home Design", category: "Single family home", teacher: "John Doe", weeks: 6, students: 160, basePrice: 399, discountPrice: 240, thumbnail: thumbnail.i6, lessons: 28 },
    { name: "Studio Apartment Planning", category: "Studio", teacher: "Amit", weeks: 2, students: 85, basePrice: 199, discountPrice: 110, thumbnail: thumbnail.i7, lessons: 10 },
    { name: "University Campus Design", category: "University", teacher: "Anjali", weeks: 5, students: 200, basePrice: 349, discountPrice: 190, thumbnail: thumbnail.i8, lessons: 20 }
  ]

  const [categories, setCategories] = useState([
    { name: 'Commercial', selected: false },
    { name: 'Office', selected: false },
    { name: 'Shop', selected: false },
    { name: 'Educate', selected: false },
    { name: 'Academy', selected: false },
    { name: 'Studio', selected: false },
    { name: 'University', selected: false },
  ])

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
      ? Course.filter(course =>
          selectedCategories.includes(course.category.toLowerCase())
        )
      : Course

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="flex flex-col md:flex-row mt-23 mx-auto my-4 w-[95%] md:w-[80%] gap-5">
      {/* Courses List */}
      <div className="w-full md:w-[65%]">
        <div className="flex flex-col gap-6">
          {paginatedCourses.map((item, index) => (
            <Link
              to={`/courses/${item.name}`}
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
                    <p className="font-bold hover:text-[#ff772e] cursor-pointer">
                      View More
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center sm:justify-between items-center mt-5 bg-[#F5F5F5] shadow-2xl w-full py-3 gap-3 rounded-3xl text-sm sm:text-base">
          <button
            className={`mx-2 cursor-pointer font-medium ${
              currentPage > 1 ? 'text-black' : 'text-gray-400'
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
                className={`px-3 py-1 rounded ${
                  currentPage === num
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 border'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className={`mx-2 cursor-pointer font-medium ${
              currentPage < totalPages ? 'text-black' : 'text-gray-400'
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
                  Course.filter(
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
