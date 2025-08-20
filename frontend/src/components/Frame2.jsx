import React from 'react'
import image from '../assets/frame2.png'

export default function Frame2() {
    return (
        <div>

            <React.Fragment>
                <div className=' w-[72%] m-auto rounded-md flex '>
                    <div className='min-w-[50%]' >
                        <img src={image} alt="frame2" />
                    </div>
                    <div className='w-[w-50%] m-5 '>
                        <h1 className='font-Exo text-2xl font-bold p-2'>Grow us your skill <br /> with LearnPress LMS</h1>
                        <p className='text-[12px] overflow-ellipsis p-2' >  We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.</p>
                         <p className='text-[12px] overflow-ellipsis p-2' >✅ Certification</p>
                         <p className='text-[12px] overflow-ellipsis p-2' >✅ Certification</p>
                         <p className='text-[12px] overflow-ellipsis p-2' >✅ Certification</p>
                         <p className='text-[12px] overflow-ellipsis p-2' >✅ Certification</p>
                          <button className='m-2 bg-amber-600 py-2 px-5  rounded-3xl text-white cursor-pointer hover:bg-amber-500 text-sm font-medium'>Explore Course</button>


                    </div>
                </div>
            </React.Fragment>


        </div>
    )
}
