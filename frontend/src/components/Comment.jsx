import React from 'react'

const Comment = () => {
    return (
        <div className='w-2/3 m-auto '>
            <h2 className='text-[30px] font-Exo font-medium'>Leave a Comment</h2>
            <p className='font-Exo'>Your email address will not published. require fields are marked *</p>
            <form className='p-3 flex flex-col' >
                <div className='flex gap-3 mb-3  justify-between '>
                    <input type="text" placeholder='Name*' required className='border p-3    w-[50%] rounded-sm ' />
                    <input type="email" placeholder='Email*' required name="" id="" className='border p-3    w-[50%] rounded-sm '/>
                </div>

                <textarea name="" id="" rows={4} placeholder='content*' className='border p-4 w-full'></textarea><br />
                 <button className="bg-amber-600 px-6 py-3 rounded-2xl text-white font-bold cursor-pointer hover:bg-amber-500 transition mx-auto md:mx-0">
                        Post Comment
                    </button>
            </form>
        </div>
    )
}

export default Comment
