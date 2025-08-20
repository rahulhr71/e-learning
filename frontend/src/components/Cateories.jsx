import React from 'react'
import { useState } from 'react'
import { icons } from '../assets/icons/icon'
export default function Cateories() {
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
        <div>
            <br /><br />
            <div className='  w-[70%] m-auto  items-center '>
                <div className='flex justify-between  '>
                    <div className='flex flex-col'>
                        <h2 className='font-bold text-xl'>Top Categories</h2>
                        <p className='text-[10px]'>Explore our Populer Categories</p>
                    </div>
                    <button className='border rounded-3xl py-0 px-4 m-1'>All Categories</button>
                </div><br /><br />
                <div className='flex flex-wrap gap-4 justify-between'>
                    {
                        cards.map((item, index) => {
                            return (
                                <div className=' w-40 h-40 rounded-2xl border-1 box-border border-gray-200 shadow-xl flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer' onClick={() => { setActive(item.name) }} key={index}>
                                    <img src={item.logo} alt="" />
                                    <div className='flex flex-col justify-center items-center'>
                                        <h1 className={`font-bold mt-3 ${item.name === active ? "text-[#ff772e]" : "text-black"}`}>{item.name}</h1>
                                        <p className='text-sm '>{item.courses} Courses</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
