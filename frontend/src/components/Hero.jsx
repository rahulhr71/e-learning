import React from 'react'
import girl from '../assets/girl.png'

export default function Hero({ scrollToComment }) {
    return (
        <div className="w-full relative mt-16">
            <div className="bg-gradient-to-r from-[#FFF5BE] to-[#D0F7EA] min-h-[500px] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16">

                {/* Text Section */}
                <article className="flex flex-col space-y-4 max-w-xl text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        Build Skills with <br />
                        Online Course
                    </h1>
                    <p className="text-gray-700 text-sm md:text-base">
                        We denounce with righteous indignation and dislike men who are <br />
                        so beguiled and demoralized that cannot trouble
                    </p>
                    <button className="bg-amber-600 px-6 py-3 rounded-2xl text-white font-bold cursor-pointer hover:bg-amber-500 transition mx-auto md:mx-0"  onClick={scrollToComment} >
                        Post Comment
                    </button>
                </article>

                {/* Image Section */}
              <div className="mt-6 md:mt-0 flex overflow-hidden justify-center md:justify-end w-full md:w-1/2">
  <img 
    src={girl} 
    alt="girl" 
    className="w-full h-[500px] object-cover object-center scale-101"
  />
</div>



            </div>
        </div>
    )
}
