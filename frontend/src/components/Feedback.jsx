import React from 'react'

export default function Feedback() {
    const data = [
        { desc: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" },
        { desc: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" },
        { desc: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" },
        { desc: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound", author: "Roe Smith", designation: "Designer" }
    ]

    return (
        <div className="w-full px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {
                    data.map((item, index) => (
                        <div key={index} className="border border-[#ebebeb] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                            <p className="text-sm mb-4 text-gray-700">{item.desc}</p>
                            <h2 className="font-semibold">✪ {item.author}</h2>
                            <p className="text-xs text-gray-500">{item.designation}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
