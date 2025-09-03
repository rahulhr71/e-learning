import React, { useState, useEffect } from 'react'
import { icons } from '../assets/icons/icon'
import { thumbnail } from '../assets/thumbnails/thumbnail'
import { Link } from 'react-router-dom'

export default function Courses() {
    const [active, setActive] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const Course = [
        { name: "Commercial Architecture", category: "Commercial", teacher: "John Doe", weeks: 4, students: 120, basePrice: 299, discountPrice: 150, thumbnail: thumbnail.i1, lessons: 18 },
        { name: "Office Interior Design", category: "Office", teacher: "Kenny White", weeks: 3, students: 90, basePrice: 249, discountPrice: 129, thumbnail: thumbnail.i2, lessons: 14 },
        { name: "Retail Shop Planning", category: "Shop", teacher: "Mohit", weeks: 5, students: 140, basePrice: 349, discountPrice: 200, thumbnail: thumbnail.i3, lessons: 22 },
        { name: "Smart Classroom Setup", category: "Educate", teacher: "Priya", weeks: 4, students: 110, basePrice: 289, discountPrice: 160, thumbnail: thumbnail.i4, lessons: 16 },
        { name: "Designing for Academies", category: "Academy", teacher: "Karan", weeks: 3, students: 100, basePrice: 259, discountPrice: 145, thumbnail: thumbnail.i5, lessons: 12 },
        { name: "Single Family Home Design", category: "Single family home", teacher: "John Doe", weeks: 6, students: 160, basePrice: 399, discountPrice: 240, thumbnail: thumbnail.i6, lessons: 28 },
        { name: "Studio Apartment Planning", category: "Studio", teacher: "Amit", weeks: 2, students: 85, basePrice: 199, discountPrice: 110, thumbnail: thumbnail.i7, lessons: 10 },
        { name: "University Campus Design", category: "University", teacher: "Anjali", weeks: 5, students: 200, basePrice: 349, discountPrice: 190, thumbnail: thumbnail.i8, lessons: 20 },
    ]

    const totalPages = Math.ceil(Course.length / itemsPerPage);
    const arr = Array.from({ length: totalPages }, (_, index) => index + 1);

    const [currentItems, setCurrentItems] = useState(Course.slice(0, itemsPerPage));

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(Course.slice(startIndex, endIndex));
    }, [currentPage]);

    return (
        <div className="px-4 sm:px-6 lg:px-12 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl">Featured Courses</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Explore our Popular Categories</p>
                </div>
                <button className="border rounded-3xl py-1 px-4 text-sm hover:bg-gray-200 transition">
                    All Categories
                </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {currentItems.map((item, index) => (
                    <Link to={`/courses/${item.name}`} key={index}>
                        <div
                            className="rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => setActive(item.name)}
                        >
                            <div className="h-36 sm:h-40 md:h-44 w-full overflow-hidden">
                                <img src={item.thumbnail} alt="" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col p-3 flex-1">
                                <p className="text-xs sm:text-sm text-gray-600">By {item.teacher}</p>
                                <h1 className="font-medium text-sm sm:text-base line-clamp-1">{item.name}</h1>
                                <div className="flex flex-wrap gap-3 mt-1 text-xs sm:text-sm">
                                    <p className="flex items-center gap-1">
                                        <img src={icons.icon12} alt="" className="w-3 h-3" /> {item.weeks} weeks
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <img src={icons.icon11} alt="" className="w-3 h-3" /> {item.students} students
                                    </p>
                                </div>
                            </div>
                            <hr className="text-gray-300" />
                            <div className="flex justify-between items-center px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-400 relative text-sm">
                                        ${item.basePrice}
                                        <span className="absolute w-full h-0.5 bg-gray-400 left-0 top-2"></span>
                                    </p>
                                    <p className="text-green-600 font-medium text-sm">${item.discountPrice}</p>
                                </div>
                                <p className="text-sm font-medium hover:text-[#ff772e]">View More</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center sm:justify-start items-center mt-6 bg-[#F5F5F5] shadow-md w-full py-3 gap-2 rounded-3xl flex-wrap">
                {arr.map((i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded text-sm ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-100'} border`}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </button>
                ))}
            </div>
        </div>
    )
}
