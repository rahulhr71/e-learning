import React from 'react'

export default function Frame1() {
    const data = [
        { name: "Active Students", value: "3K" },
        { name: "Total Courses", value: "100" },
        { name: "Instructor", value: "100" },
        { name: "Satishfaction Rate", value: "100%" },
    ]
    return (
        <div>
            <React.Fragment>
                <div className='flex justify-center items-center flex-wrap gap-5'>

                    {data.map((item, index) => {
                        return (
                            <div className='w-53 h-30 bg-[#F5F5F5] rounded-lg p-4 flex flex-col items-center justify-center' key={index}>
                                <h1 className='text-2xl font-bold text-[#ff772e]'>{item.value}</h1>
                                <h1 className='text-[12px] font-medium'>{item.name}</h1>
                            </div>
                        )
                    }
                    )}
                </div>
            </React.Fragment>
        </div>
    )
}
