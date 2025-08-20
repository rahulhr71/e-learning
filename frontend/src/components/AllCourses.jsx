
import { useState, useEffect } from 'react'
import { icons } from '../assets/icons/icon'
import { thumbnail } from '../assets/thumbnails/thumbnail'

export default function AllCourses() {
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
    const [currentItems, setCurrentItems] = useState(Course.slice(0, 8));
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState(Course)
    const handlePre = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }

    }

    const [categories, setCategories] = useState([
        { name: 'Commercial', selected: false, count: 15 },
        { name: 'Office', selected: false, count: 15 },
        { name: 'Shop', selected: false, count: 15 },
        { name: 'Educate', selected: false, count: 15 },
        { name: 'Academy', selected: false, count: 15 },
        { name: 'Single family ', selected: false, count: 15 },
        { name: 'Studio', selected: false, count: 15 },
        { name: 'University', selected: false, count: 15 },
    ])
    const [teacher, setTeachers] = useState(null)



    const handleCheck = (i, name) => {
        const updatedCategories = categories.map((category) => {
            if (category.name === name) {
                return { ...category, selected: i };
            }
            return category;
        })
        setCategories(updatedCategories)
    }

    

    const totalPages = Math.ceil(Course.length / itemsPerPage);
    const arr = Array.from({ length: totalPages }, (_, index) => index + 1);
    const totalItems = Course.length;
    useEffect(() => {
        const handlePage = (e) => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setCurrentItems(Course.slice(startIndex, endIndex));
        }
        handlePage();
    }, [currentPage])
    const selectedCategories = categories
        .filter(cat => cat.selected)
        .map(cat => cat.name.trim().toLowerCase());

    const filteredCourses = currentItems.filter(course =>
        selectedCategories.includes(course.category.trim().toLowerCase())
    )
    const uniqueCategories = [...new Set(Course.map((course,index) => course.teacher))];
    console.log(uniqueCategories);
    return (
        <>
            <div className='flex mx-auto my-4 w-[80%] gap-5 '>
                <br /><br />
                <div className='  w-[60%]  items-center '>

                    <div className=' flex flex-col gap-8'>
                        {

                            filteredCourses.map((item, index) => {

                                return (

                                    <div className='flex gap-4  items-center bg-[#F5F5F5] overflow-hidden shadow-2xl w-full h-[180px] py-3 px-0 rounded-3xl' key={index}>
                                        <div>
                                            <img src={item.thumbnail} alt="thumbnail" className='w-80 h-45 ' />
                                        </div>
                                        <div className="flex flex-col w-full  justify-between h-[90%]">
                                            <div className="">
                                                <div className='flex flex-col gap-2'>
                                                    <div className='font-Exo'><span className='font-Jost text-[#555555] text-sm'>by</span> {item.teacher}</div>
                                                    <div className='font-Exo font-semibold text-2xl'>{item.name}</div>
                                                    <div className='flex gap-4'>
                                                        <p className='flex items-center '> <span> <img src={icons.icon12} alt="" /></span>{item.weeks} weeks</p>
                                                        <p className='flex items-center '><span> <img src={icons.icon11} alt="" /></span>{item.students} students</p>
                                                        <p className='flex items-center '><span> <img src={icons.icon7} alt="" width={13} /></span>{item.lessons} lessons</p>
                                                    </div>
                                                    {/* <hr className='h-6 text-' /> */}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center border-t-1 border-[#EAEAEA]  ">
                                                <div className='flex gap-2 items-center font-bold'>

                                                    <span className='text-gray-500 line-through'> {item.basePrice}</span>₹ {item.discountPrice}
                                                </div>
                                                <div>
                                                    <p className='font-bold hover:text-[#ff772e] cursor-pointer mx-3'>View More</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })

                        }

                    </div>
                    <div className='flex justify-between items-center mt-5 bg-[#F5F5F5] shadow-2xl w-full py-3 gap-3 rounded-3xl'>
                        <button className={`mx-5 cursor-pointer font-medium  ${currentPage >= 2 ? 'text-black' : 'text-gray-600'} hover:text-amber-600`} onClick={handlePre}>Previous</button>
                        <div>

                            {
                                arr.map((i) => {
                                    return (


                                        <button key={i} className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-100'} ml-4 border`}
                                            onClick={() => { setCurrentPage(i) }} value={i}>{i}</button>


                                    )
                                })
                            }
                        </div>
                        <button className={`mx-5 cursor-pointer font-medium ${currentPage < totalPages ? 'text-black' : 'text-gray-600'} hover:text-amber-600`} onClick={handleNext}>Next</button>
                    </div>
                </div>
                <div className='w-[37%]'>
                    <div>
                        <h1 className='font-semibold mb-2 ' >Course Category</h1>
                        <div className='flex flex-col gap-1 mx-3' >
                            {
                                categories.map((item, index) => {
                                    return (
                                        <div className='flex justify-between ' key={index}>
                                            <div>
                                                <input type="checkbox" className='accent-black cursor-pointer'  onChange={(e) => handleCheck(e.target.checked, item.name)} />
                                                <span className='text-sm'>{item.name}</span>
                                            </div>
                                            <p>{item.count}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* instructor */}
                        <div >
                            <h3 className="font-semibold mb-2">Instructors</h3>
                            {



                            }
                            <label className="flex items-center  gap-1 mx-3">
                                <input type="checkbox" className='accent-black cursor-pointer' />
                                <span>Kenny White </span>
                                <span className="ml-auto">15</span>
                            </label>

                        </div>
                        {/* Price */}
                        <div>
                            <h3 className="font-semibold mb-2">Price</h3>
                            {['all', 'free', 'paid'].map(option => (
                                <label key={option} className="flex items-center  gap-1 mx-3">
                                    <input
                                        type="checkbox"
                                        className='accent-black cursor-pointer'
                                        // checked={filters.price === option}
                                        onChange={() => handleChange('price', option)}
                                    />
                                    {option.charAt(0).toUpperCase() + option.slice(1)}{' '}
                                    <span className="ml-auto">15</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Review</h3>
                            {[5, 4, 3, 2, 1].map(stars => (
                                <label key={stars} className="flex items-center  gap-1 mx-3">
                                    <input
                                        type="checkbox"
                                        className='accent-black cursor-pointer'
                                        // checked={filters.review === String(stars)}
                                        onChange={() => handleChange('review', String(stars))}
                                    />
                                    <span className="text-yellow-400">
                                        {'★'.repeat(stars)}{' '}
                                        <span className="text-gray-300">{'★'.repeat(5 - stars)}</span>
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">(1,025)</span>
                                </label>
                            ))}
                        </div>

                        {/* Level */}
                        <div>
                            <h3 className="font-semibold mb-2">Level</h3>
                            {['all levels', 'beginner', 'intermidiate', 'expert'].map(level => (
                                <label key={level} className="flex items-center  gap-1 mx-3 capitalize">
                                    <input
                                        type="checkbox"
                                        // checked={filters.level === level.toLowerCase()}
                                        className='accent-black cursor-pointer'
                                        onChange={() => handleChange('level', level.toLowerCase())}
                                    />
                                    {level} <span className="ml-auto">15</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
