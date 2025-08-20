import React from 'react'
import girl from '../assets/girl.png'

export default function Hero() {
    return (
        <div>
            <div className='bg-gradient-to-r from-[#FFF5BE] to-[#D0F7EA] h-[500px] w-full flex items-center'>
                <article className='ml-50 flex flex-col'>
                    <h1 className='text-4xl font-bold'>Build Skills with <br />
                        Online Course</h1>
                    <p>We denounce with righteous indignation and dislike men who are <br />so beguiled and demoralized that cannot trouble</p>
                    <button className='ml-0 bg-amber-600 p-3 m-5 rounded-2xl text-white font-bold cursor-pointer hover:bg-amber-500'>Post Comment</button>
                </article>
                <div class="w-120 h-125 overflow-hidden ">
                    <img src={girl} width={500} class="object-cover w-full h-full object-center" />
                </div>
            </div>
        </div>
    )
}
