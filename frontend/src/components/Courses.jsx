import React from 'react'
import { useState,useEffect } from 'react'
import { icons } from '../assets/icons/icon'
import { thumbnail } from '../assets/thumbnails/thumbnail'
import { use } from 'react'
import { Link } from 'react-router-dom'

export default function Courses() {
    const [active, setActive] = useState(null)
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 8;
    
   const Course = [
        {   
            name: "Commercial Architecture", category: "Commercial",
            teacher: "John Doe",
            weeks: 4,
            students: 120,
            basePrice: 299,
            discountPrice: 150,
            thumbnail: thumbnail.i1,
            lessons: 18,
        },
        {
            name: "Office Interior Design",
            category: "Office",
            teacher: "Kenny White",
            weeks: 3,
            students: 90,
            basePrice: 249,
            discountPrice: 129,
            thumbnail: thumbnail.i2,
            lessons: 14,
        },
        {
            name: "Retail Shop Planning",
            category: "Shop",
            teacher: "Mohit",
            weeks: 5,
            students: 140,
            basePrice: 349,
            discountPrice: 200,
            thumbnail: thumbnail.i3,
            lessons: 22,
        },
        {
            name: "Retail Shop Planning",
            category: "Shop",
            teacher: "Mohit",
            weeks: 5,
            students: 140,
            basePrice: 349,
            discountPrice: 200,
            thumbnail: thumbnail.i3,
            lessons: 22,
        },
        {
            name: "Retail Shop Planning",
            category: "Shop",
            teacher: "Mohit",
            weeks: 5,
            students: 140,
            basePrice: 349,
            discountPrice: 200,
            thumbnail: thumbnail.i3,
            lessons: 22,
        },
        {
            name: "Smart Classroom Setup",
            category: "Educate",
            teacher: "Priya",
            weeks: 4,
            students: 110,
            basePrice: 289,
            discountPrice: 160,
            thumbnail: thumbnail.i4,
            lessons: 16,
        },
        {
            name: "Designing for Academies",
            category: "Academy",
            teacher: "Karan",
            weeks: 3,
            students: 100,
            basePrice: 259,
            discountPrice: 145,
            thumbnail: thumbnail.i5,
            lessons: 12,
        },
        {
            name: "Single Family Home Design",
            category: "Single family home",
            teacher: "John Doe",
            weeks: 6,
            students: 160,
            basePrice: 399,
            discountPrice: 240,
            thumbnail: thumbnail.i6,
            lessons: 28,
        },
        {
            name: "Studio Apartment Planning",
            category: "Studio",
            teacher: "Amit",
            weeks: 2,
            students: 85,
            basePrice: 199,
            discountPrice: 110,
            thumbnail: thumbnail.i7,
            lessons: 10,
        },
        {
            name: "University Campus Design",
            category: "University",
            teacher: "Anjali",
            weeks: 5,
            students: 200,
            basePrice: 349,
            discountPrice: 190,
            thumbnail: thumbnail.i8,
            lessons: 20,
        },
        {
            name: "University Campus Design",
            category: "University",
            teacher: "Anjali",
            weeks: 5,
            students: 200,
            basePrice: 349,
            discountPrice: 190,
            thumbnail: thumbnail.i8,
            lessons: 20,
        },

    ]
    const totalPages = Math.ceil(Course.length / itemsPerPage);
    const arr= Array.from({ length: totalPages }, (_, index) => index + 1);
  
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = Course.length;
 
    
    const [currentItems, setCurrentItems] = useState(Course.slice(0, 8));

    useEffect(() => {
        const handlePage =(e)=>{
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setCurrentItems(Course.slice(startIndex, endIndex));
        }
        handlePage();
    },[currentPage])
    return (
        <div>
            <br /><br />
            <div className='  w-[70%] m-auto  items-center '>
                <div className='flex justify-between  '>
                    <div className='flex flex-col'>
                        <h2 className='font-bold text-xl'>Featured Courses</h2>
                        <p className='text-[10px]'>Explore our Populer Categories</p>
                    </div>
                    <button className='border rounded-3xl py-0 px-4 m-1'>All Categories</button>
                </div><br /><br />
                <div className='flex flex-wrap gap-4 justify-start'>
                    {
                        currentItems.map((item, index) => {
                            return (
                                <Link to={`/courses/${item.name}`}>
                                <div className=' w-52 h-60 rounded-xl border-1 box-border border-gray-200 shadow-xl overflow-hidden flex flex-col  transition-transform duration-300 hover:scale-110 cursor-pointer' onClick={() => { setActive(item.name) }} key={index}>
                                    <div className='h-[50%] w-full overflow-hidden  mt-0  object-cover'>
                                        <img src={item.thumbnail} alt="" className='object-fill w-full h-full'/>
                                    </div>
                                    <div className='flex flex-col m-2'>
                                        <p className='text-[12px] '>By  {item.teacher}</p>
                                        <h1 className={`font-medium line-clamp-1`}>{item.name}</h1>
                                        <div className='flex gap-3'>
                                            <p className='flex text-[12px] gap-1'><span><img src={icons.icon12} alt="" /></span>  {item.weeks} weeks</p>
                                            <p className='flex text-[12px] gap-1'><span><img src={icons.icon11} alt="" /></span>  {item.students} students</p>
                                        </div>
                                    </div>
                                    <hr className='text-gray-300' />
                                    <div className='flex justify-between'>
                                    <div className='flex items-center gap-2 m-2'>
                                        <p className='text-gray-400 relative'>${item.basePrice} <span className='w-9 bg-gray-400 h-0.5 absolute left-0 top-2.5'></span> </p> 
                                        <p className='text-green-500'>  ${item.discountPrice}</p>
                                    </div>
                                    <p className='m-2 font-medium text-sm hover:text-[#ff772e]'>View More</p>
                                    </div>
                                </div></Link>
                            )
                        })
                    }

                </div>
                <div className='flex justify-start items-center mt-5 bg-[#F5F5F5] shadow-2xl w-full py-3 gap-3 rounded-3xl'>
                   {
                    arr.map((i)=>{
                        return (
                            <button className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-100'} ml-4 border` }
                                onClick={()=>{setCurrentPage(i)}}
                                key={i} value={i}
                            >{i}</button>
                        )
                    })
                   }
                </div>
            </div>
        </div>
    )
}
