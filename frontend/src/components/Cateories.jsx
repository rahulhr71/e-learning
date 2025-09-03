import React, { useState } from 'react'
import { icons } from '../assets/icons/icon'

export default function Categories() {
  const [active, setActive] = useState(null)

  const cards = [
        { name: "Art & Design", courses: 36, logo: icons.icon1 },
        { name: "Development", courses: 38, logo: icons.icon2 },
        { name: "Communication", courses: 26, logo: icons.icon3 },
        { name: "VideoGrapgy", courses: 16, logo: icons.icon4 },
        { name: "Photography", courses: 32, logo: icons.icon5 },
        { name: "Marketing", courses: 26, logo: icons.icon6 },
        { name: "Content Writing", courses: 37, logo: icons.icon7 },
        { name: "Finance", courses: 33, logo: icons.icon8 },
        { name: "Science", courses: 39, logo: icons.icon9 },
        { name: "Network", courses: 12, logo: icons.icon10 },
  ]

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
          {cards.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(item.name)}
              className="w-full h-40 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer bg-white"
            >
              <img src={item.logo} alt={item.name} className="w-10 h-10 object-contain" />
              <div className="flex flex-col justify-center items-center">
                <h1
                  className={`font-bold mt-3 text-center ${
                    item.name === active ? "text-[#ff772e]" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </h1>
                <p className="text-xs text-gray-500">{item.courses} Courses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
