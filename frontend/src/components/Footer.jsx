import React from 'react'
import logo from '../assets/logo.png'

export default function Footer() {
  const programms = [
    { name: "Art and Design" },
    { name: "Business" },
    { name: "IT and Software" },
    { name: "Languages" },
    { name: "Programming" },
  ]

  return (
    <div className="bg-[#F5F5F5] mt-10">
      <div className="w-[90%] md:w-[72%] m-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        
        {/* Logo + About */}
        <div>
          <img src={logo} alt="logo" className="w-40 mb-3" />
          <p className="font-Jost font-light text-[#555555] text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Get Help + Programs */}
        <div className="flex justify-between md:justify-evenly">
          <div>
            <h1 className="font-bold">GET HELP</h1>
            <ul className="mt-3 space-y-2 font-Jost font-light text-[#555555] text-sm">
              <li>Contact Us</li>
              <li>Support</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold">PROGRAMS</h1>
            <ul className="mt-3 space-y-2 font-Jost font-light text-[#555555] text-sm">
              {programms.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h1 className="font-bold">CONTACT US</h1>
          <div className="mt-3 space-y-2 font-Jost font-light text-[#555555] text-sm">
            <p>Address: 2321 New Design Str, Lorem Ipsum 10 Hudson Yards, USA</p>
            <p>Tel: + (123) 2500-567-8988</p>
            <p>Mail: supportlms@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-[90%] md:w-[72%] m-auto text-center py-5 text-sm text-[#555555] border-t border-gray-300">
        Copyright © 2025 LearnPress LMS | Powered by RK TECH
      </div>
    </div>
  )
}
