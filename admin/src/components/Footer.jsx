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
        <div className='bg-[#F5F5F5] mt-10'>
            <br />
            <div className='w-[72%] m-auto flex justify-between  '>
                <div className='w-[33%] gap-3' >
                    <img src={logo} alt="" className='w-50 mb-3' />
                    <p className='font-Jost font-light text-[#555555] text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className='w-[33%] gap-3 flex justify-evenly'  >
                    <div>
                        <h1 className='font-bold '>GET HELP</h1><br />
                        <ul className='font-Jost font-light text-[#555555] text-sm'>
                            <li>Contact Us</li>
                            <li>Support</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>

                        </ul>
                    </div>
                    <div >
                        <h1 className='font-bold '>PROGRAMS</h1><br />
                        <ul>
                            {
                                programms.map((item, index) => {
                                    return (
                                        <li key={index} className='font-Jost font-light text-[#555555] text-sm'>{item.name}</li>
                                    )
                                })
                            }
                            

                        </ul>
                        
                    </div>
                    
                </div>
                <div className='w-[33%] gap-5' >
                    <h1 className='font-bold '>CONTACT US</h1><br />
                    <p className='font-Jost font-light text-[#555555] text-sm'>Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA</p>
                    <p className='font-Jost font-light text-[#555555] text-sm'>Tel: + (123) 2500-567-8988  </p>
                    <p className='font-Jost font-light text-[#555555] text-sm'>Mail: supportlms@gmail.com</p>
                </div>

            </div>
            <div className='m-auto w-[72%] text-center p-10'>Copyright © 2025 LearnPress LMS | Powered by RK TECH</div>
            <br />
        </div>
    )
}
