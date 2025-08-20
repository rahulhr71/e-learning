import React from 'react'
import image from '../assets/frame4.png'
import image2 from '../assets/studentImage.png'
export default function Frame4() {
    return (
        <div>
            <div className='w-[72%] m-auto relative bg-gradient-to-r h-44  from-[#C7E6F9] to-[#E8D1FE]  flex rounded-3xl items-center justify-between '>

                <img src={image} alt="" className='absolute' />
                <div className='ml-7 flex justify-center items-center gap-2'>
                    <img src={image2} width={80} alt="" />
                    <p>Let’s Start With Academy LMS</p>
                </div>
                <div className='absolute right-5'>
                    <button className='border-2 cursor-pointer rounded-3xl text-sm font-medium py-2 px-5   m-2'>I'm A Student</button>
                    <button className='  bg-amber-600 py-2 px-5  rounded-3xl text-white cursor-pointer hover:bg-amber-500 text-sm font-medium'>Become An Instructor</button>

                </div>

            </div>
        </div>
    )
}
