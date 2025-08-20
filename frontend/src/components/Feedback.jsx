import React from 'react'

export default function Feedback() {
    const data = [
        { desc: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" },
        { desc: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" },
        { desc: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" },
        { desc: "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" }
    ]
    return (
        <div>
            <div className='flex gap-3 w-[72%] m-auto'>
               {
                data.map((item,index)=>{
                    return(
                        <div key={index} className='border border-[#ebebeb] rounded-2xl p-3'>
                            <p className='text-[12px] m-5'>{item.desc}</p>
                            <h2 className='m-5'>✪ {item.author}</h2>
                            <p className='text-[10px] m-5 text-gray-500'>{item.designation}</p>
                        </div>
                    )
                })
               }
                
            </div>
        </div>
    )
}
