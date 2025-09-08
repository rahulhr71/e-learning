import React from "react";
import image from "../assets/frame4.png";
import image2 from "../assets/studentImage.png";
import { Link } from "react-router-dom";
export default function Frame4() {
  return (
    <div className="px-4 w-3/4 mx-auto sm:px-6 lg:px-0">
      <div className="relative bg-gradient-to-r from-[#C7E6F9] to-[#E8D1FE] flex flex-col sm:flex-row items-center sm:justify-between rounded-3xl overflow-hidden w-full max-w-5xl mx-auto h-auto sm:h-44 p-4 sm:p-0">
        
        {/* Background Image */}
        <img
          src={image}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20 sm:opacity-100"
        />

        {/* Left Section */}
        <div className="flex items-center gap-3 sm:ml-7 z-10 text-center sm:text-left">
          <img src={image2} width={60} sm:width={80} alt="" className="rounded-full" />
          <p className="text-sm sm:text-base font-medium">
            Let’s Start With Academy LMS
          </p>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 z-10 sm:mr-5">
          <Link to='/register'>
          <button className="border-2 cursor-pointer rounded-3xl text-sm font-medium py-2 px-5 hover:bg-gray-100 transition">
            I'm A Student
          </button>
          </Link>
          <button className="bg-amber-600 py-2 px-5 rounded-3xl text-white cursor-pointer hover:bg-amber-500 text-sm font-medium transition">
            Become An Instructor
          </button>
        </div>
      </div>
    </div>
  );
}
