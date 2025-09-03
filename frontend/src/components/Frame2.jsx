import React from 'react'
import image from '../assets/frame2.png'

export default function Frame2() {
  return (
    <div className="w-[90%] md:w-[72%] m-auto rounded-md py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img src={image} alt="frame2" className="w-full h-auto rounded-md" />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 m-2 md:m-5">
          <h1 className="font-Exo text-xl md:text-2xl font-bold p-2 leading-snug">
            Grow your skills <br /> with LearnPress LMS
          </h1>

          <p className="text-sm text-gray-600 p-2">
            We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.
          </p>

          <div className="p-2 space-y-2 text-sm text-gray-700">
            <p>✅ Certification</p>
            <p>✅ Lifetime Access</p>
            <p>✅ Expert Mentors</p>
            <p>✅ Flexible Learning</p>
          </div>

          <button className="m-2 bg-amber-600 py-2 px-5 rounded-3xl text-white cursor-pointer hover:bg-amber-500 text-sm font-medium">
            Explore Course
          </button>
        </div>
      </div>
    </div>
  )
}
